import System from "../../ecs/System";
import initSceneEditor from "./sceneEditor/index"; // NOTE: importing this will run the editor app
import store from "../store";
import * as sceneEditorActions from "../store/actions/sceneEditor";
import { QuerySet } from "../../ecs/types";
import InteractiveEvent from "../components/InteractiveEvent";
import Sprite from "../components/Sprite";
import Interactive from "../components/Interactive";

// TODO: to keep things sync, the SceneEditor systems pushes changes to redux and checks for changes
// in redux store to flush buffers on entity edits / creation
class SceneEditor extends System {
  start(): void {
    initSceneEditor();

    store.dispatch(sceneEditorActions.test("game message"));
  }

  update(): void {
    // TODO: attach clickable components to all entities
    // TODO: attach draggable to all entities

    // later on, should print all entities in the scene for editor to select, without just relying
    // on Sprite entities. Probably will need to Tag all entities with some recognizable name then....
    this.engine.query(this.attachInteractiveToAllSprites, Sprite);
    // store.dispatch(editorActions.showUI(!store.getState().showUi));
    this.engine.query(this.pushEntityToInspector, InteractiveEvent); // TODO: Testing, later only 'clicked on' entity will be pushed
  }

  destroy(): void {
    // throw new Error("Method not implemented.");
  }

  private attachInteractiveToAllSprites = (querySet: QuerySet) => {
    const [sprite] = querySet as [Sprite];

    const existingInteractiveComponent = this.engine.getComponent<Interactive>(
      Interactive,
      sprite.id
    );

    if (existingInteractiveComponent) {
      if (!existingInteractiveComponent.onPointerDown) {
        existingInteractiveComponent.onPointerDown = true;
      }
      return;
    }

    const interactive = new Interactive(sprite.id);
    interactive.onPointerDown = true;
    this.engine.addComponent(interactive);
  };

  private pushEntityToInspector = (querySet: QuerySet) => {
    const [interactiveEvent] = querySet as [InteractiveEvent];

    store.dispatch(sceneEditorActions.setCurrentEntityId(interactiveEvent.id));
    const components = this.engine.getComponents(interactiveEvent.id);
    store.dispatch(sceneEditorActions.setCurrentEntityComponents(components));
  };
}

export default SceneEditor;
