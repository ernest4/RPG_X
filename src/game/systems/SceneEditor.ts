import System from "../../ecs/System";
import initSceneEditor from "./sceneEditor/index"; // NOTE: importing this will run the editor app
import store from "../store";
import * as sceneEditorActions from "../store/actions/sceneEditor";
import Player from "../components/Player";
import { QuerySet } from "../../ecs/types";

// TODO: to keep things sync, the SceneEditor systems pushes changes to redux and checks for changes
// in redux store to flush buffers on entity edits / creation
class SceneEditor extends System {
  start(): void {
    initSceneEditor();

    store.dispatch(sceneEditorActions.test("game message"));
  }

  update(): void {
    // throw new Error("Method not implemented.");
    // TODO: attack clickable and draggable components to all entities with transform component
    this.engine.query( ... attach Interactive component to all antities with Sprite); // later on, should print all entities in the scene for editor to select, without just relying on Sprite entities. Probably will need to Tag all entities with some recognizable name then....

    // store.dispatch(editorActions.showUI(!store.getState().showUi));

    // this.engine.query(this.pushEntityToInspector, Player); // TODO: Testing, later only 'clicked on' entity will be pushed
    this.engine.query(this.pushEntityToInspector, InteractiveEvent); // TODO: Testing, later only 'clicked on' entity will be pushed
  }

  destroy(): void {
    // throw new Error("Method not implemented.");
  }

  private pushEntityToInspector = (querySet: QuerySet) => {
    // const [player] = querySet as [Player];
    const [interactiveEvent] = querySet as [InteractiveEvent];

    // TODO: check redux before pushing to it ??
    // store.dispatch(sceneEditorActions.setCurrentEntityId(player.id));
    // const components = this.engine.getComponents(player.id);
    // store.dispatch(sceneEditorActions.setCurrentEntityComponents(components));

    store.dispatch(sceneEditorActions.setCurrentEntityId(interactiveEvent.id));
    const components = this.engine.getComponents(interactiveEvent.id);
    store.dispatch(sceneEditorActions.setCurrentEntityComponents(components));
  };
}

export default SceneEditor;
