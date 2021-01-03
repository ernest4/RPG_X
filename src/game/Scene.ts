import { Scene as BabylonScene, Vector3 } from "babylonjs";
import { Engine } from "../ecs";
import ScenesManager from "./ScenesManager";

class Scene {
  private _active: boolean;
  private _sceneName: string;
  private _entityComponentSystem: Engine;
  private _scene: BabylonScene;
  private _scenesManager: ScenesManager;

  // constructor(sceneName: string, scenesManager: ScenesManager, active = false) {
  //   this._active = active;
  //   this._sceneName = sceneName;
  //   this._scenesManager = scenesManager;
  //   this._scene = this.load();
  //   this._entityComponentSystem = new Engine();

  //   // TODO: asset manager
  //   // TODO: input manager
  // }

  constructor(scenesManager: ScenesManager) {
    this._scenesManager = scenesManager;
    this._entityComponentSystem = new Engine();

    // TODO: asset manager
    // TODO: input manager
  }

  serialize = () => {
    const sceneObject = {
      active: this._active,
      name: this._sceneName,
      babylonScene: this.serializeBabylonScene(this._scene),
      ecs: this._entityComponentSystem.serialize(),
    };

    return sceneObject;
  };

  load = (sceneObject): void => {
    // TODO:
    const { active, name, babylonScene, ecs } = sceneObject;

    this._active = active;
    this._sceneName = name;
    this._scene = this.loadBabylonScene(babylonScene);
    this._entityComponentSystem.load(ecs);
  };

  update = () => {
    if (!this._active) return;

    this._entityComponentSystem.update(this._scenesManager.renderEngine.getDeltaTime());
    this._scene.render();
  };

  get active() {
    return this._active;
  }

  get name() {
    return this._sceneName;
  }

  activate = () => {
    this._active = true;
  };

  deactivate = () => {
    this._active = false;
  };

  private serializeBabylonScene = () => {
    const scene = this._scene;

    return {
      gravity: [scene.gravity.x, scene.gravity.y, scene.gravity.z],
      collisionsEnabled: scene.collisionsEnabled,
    };
  };

  private loadBabylonScene = (babylonSceneObject): BabylonScene => {
    // gravity: [x, y, z]
    // collisionsEnabled: boolean
    const { gravity, collisionsEnabled } = babylonSceneObject;

    const scene = new BabylonScene();
    if (gravity.length === 3) scene.gravity = new Vector3(...gravity);
    scene.collisionsEnabled = collisionsEnabled;

    return scene;
  };
}

export default Scene;
