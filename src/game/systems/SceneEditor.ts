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
import Component from "../../ecs/Component";
import * as availableComponents from "../components";

const NON_EDITOR_COMPONENTS = [DragEvent, InputEvent, InteractiveEvent].map(({ name }) => name);

class SceneEditor extends System {
  start(): void {
    initSceneEditor();

    const permittedEditorComponents = Object.keys(availableComponents).filter(
      availableComponentName => {
        return !NON_EDITOR_COMPONENTS.some(
          nonEditorComponentName => nonEditorComponentName === availableComponentName
        );
      }
    );

    store.dispatch(sceneEditorActions.setAvailableComponentsList(permittedEditorComponents));
  }

  update(): void {
    this.pullCurrentEntityComponentsFromRedux();
    // later on, should print all entities in the scene for editor to select, without just relying
    // on Sprite entities. Probably will need to Tag all entities with some recognizable name then....
    this.engine.query(this.attachInteractiveToAllSprites, Sprite);
    this.engine.query(this.pushInteractiveEntityToRedux, InteractiveEvent);
    this.engine.query(this.pushDragEntityToRedux, DragEvent);
    this.streamCurrentEntityComponentsToRedux();
  }

  destroy(): void {}

  private pullCurrentEntityComponentsFromRedux = () => {
    const currentEntityId = (store.getState().sceneEditor as any).currentEntityId;
    if (isNumber(currentEntityId)) this.pullEntityComponentsFromRedux(currentEntityId);
  };

  private pullEntityComponentsFromRedux = (entityId: EntityId) => {
    // NOTE: call order is important here !!
    this.processAddList(entityId);
    this.processUpdateList(entityId);
    this.processRemoveList(entityId);
  };

  private processAddList = (entityId: EntityId) => {
    const sceneEditorStore = store.getState().sceneEditor as any;
    const components = this.engine.getComponents(entityId);
    const currentEntityComponentsAddList = sceneEditorStore.currentEntityComponentsAddList;

    if (currentEntityComponentsAddList?.length === 0) return;

    currentEntityComponentsAddList.forEach((componentToAddName: string) => {
      if (components.some(({ constructor: { name } }) => componentToAddName === name)) return;

      this.engine.addComponent(new (availableComponents as any)[componentToAddName](entityId));
    });

    store.dispatch(sceneEditorActions.setCurrentEntityComponentsAddList([]));
  };

  // TODO: wip ...
  private processUpdateList = (entityId: EntityId) => {
    const sceneEditorStore = store.getState().sceneEditor as any;
    const components = this.engine.getComponents(entityId);
    const currentEntityComponentsUpdateList = sceneEditorStore.currentEntityComponentsUpdateList;

    if (currentEntityComponentsUpdateList?.length === 0) return;

    // currentEntityComponentsUpdateList.forEach((componentToAddName: string) => {
    //   if (components.some(({ constructor: { name } }) => componentToAddName === name)) return;

    //   this.engine.addComponent(new (availableComponents as any)[componentToAddName](entityId));
    // });

    store.dispatch(sceneEditorActions.setCurrentEntityComponentsUpdateList([]));
  };

  private processRemoveList = (entityId: EntityId) => {
    const sceneEditorStore = store.getState().sceneEditor as any;
    const components = this.engine.getComponents(entityId);
    const currentEntityComponentsRemoveList = sceneEditorStore.currentEntityComponentsRemoveList;

    if (currentEntityComponentsRemoveList?.length === 0) return;

    components.forEach((component: Component) => {
      if (
        !currentEntityComponentsRemoveList.some(
          (componentToRemoveName: string) => componentToRemoveName === component.constructor.name
        )
      )
        return;

      this.engine.removeComponent(component);
    });

    store.dispatch(sceneEditorActions.setCurrentEntityComponentsRemoveList([]));
  };

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
