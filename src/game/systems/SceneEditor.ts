import System from "../../ecs/System";
import initSceneEditor from "./sceneEditor/index"; // NOTE: importing this will run the editor app
import store from "../store";
import * as sceneEditorActions from "../store/actions/sceneEditor";
import { EntityId, QuerySet } from "../../ecs/types";
import InteractiveEvent from "../components/InteractiveEvent";
import Sprite from "../components/Sprite";
import Interactive from "../components/Interactive";
import DragEvent from "../components/DragEvent";
import { isNumber } from "../../ecs/utils/Number";

// TODO: to keep things sync, the SceneEditor systems pushes changes to redux and checks for changes
// in redux store to flush buffers on entity edits / creation
class SceneEditor extends System {
  start(): void {
    initSceneEditor();

    store.dispatch(sceneEditorActions.test("game message"));
  }

  update(): void {
    // later on, should print all entities in the scene for editor to select, without just relying
    // on Sprite entities. Probably will need to Tag all entities with some recognizable name then....
    this.engine.query(this.attachInteractiveToAllSprites, Sprite);
    this.engine.query(this.pushInteractiveEntityToRedux, InteractiveEvent); // TODO: Testing, later only 'clicked on' entity will be pushed
    this.engine.query(this.pushDragEntityToRedux, DragEvent); // TODO: Testing, later only 'clicked on' entity will be pushed
    this.streamCurrentEntityComponentsToRedux();
  }

  destroy(): void {}

  private attachInteractiveToAllSprites = (querySet: QuerySet) => {
    const [sprite] = querySet as [Sprite];

    const existingInteractiveComponent = this.engine.getComponent<Interactive>(
      Interactive,
      sprite.id
    );

    if (existingInteractiveComponent) {
      if (!existingInteractiveComponent.onPointerDown) {
        existingInteractiveComponent.onPointerDown = true;
        existingInteractiveComponent.onDrag = true;
      }
      return;
    }

    const interactive = new Interactive(sprite.id);
    interactive.onPointerDown = true;
    interactive.onDrag = true;
    this.engine.addComponent(interactive);
  };

  private pushInteractiveEntityToRedux = (querySet: QuerySet) => {
    const [interactiveEvent] = querySet as [InteractiveEvent];

    if (!interactiveEvent.pointerDown) return;

    store.dispatch(sceneEditorActions.setCurrentEntityId(interactiveEvent.id));
    this.pushEntityComponentsToRedux(interactiveEvent.id);
  };

  private pushDragEntityToRedux = (querySet: QuerySet) => {
    const [dragEvent] = querySet as [DragEvent];

    store.dispatch(sceneEditorActions.setCurrentEntityId(dragEvent.id));
    this.pushEntityComponentsToRedux(dragEvent.id);
  };

  private pushEntityComponentsToRedux = (entityId: EntityId) => {
    const components = this.engine.getComponents(entityId);
    store.dispatch(sceneEditorActions.setCurrentEntityComponents(components));
  };

  private streamCurrentEntityComponentsToRedux = () => {
    const currentEntityId = (store.getState().sceneEditor as any).currentEntityId;
    if (isNumber(currentEntityId)) this.pushEntityComponentsToRedux(currentEntityId);
  };
}

export default SceneEditor;
