import System from "../../ecs/System";
import initSceneEditor from "./sceneEditor/index"; // NOTE: importing this will run the editor app
import store from "../store";
import * as sceneEditorActions from "../store/actions/sceneEditor";
class SceneEditor extends System {
  start(): void {
    initSceneEditor();

    store.dispatch(sceneEditorActions.test("game message"));
  }

  update(): void {
    // throw new Error("Method not implemented.");
    // TODO: attack clickable and draggable components to all entities with transform component
    // store.dispatch(editorActions.showUI(!store.getState().showUi));
  }

  destroy(): void {
    // throw new Error("Method not implemented.");
  }
}

export default SceneEditor;
