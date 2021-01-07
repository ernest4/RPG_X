// import { Scene as BabylonScene, Vector3 } from "babylonjs";
// import { Engine } from "../ecs";
// import ScenesManager from "./_legacy_ScenesManager";
// import componentClasses from "./components";
// import Movement from "./systems/Movement";
// import Render from "./systems/Render";
// import Input from "./systems/Input";

// class Scene {
//   private _active: boolean;
//   private _sceneName: string;
//   private _entityComponentSystem: Engine;
//   private _scene: BabylonScene;
//   private _scenesManager: ScenesManager;

//   // constructor(sceneName: string, scenesManager: ScenesManager, active = false) {
//   //   this._active = active;
//   //   this._sceneName = sceneName;
//   //   this._scenesManager = scenesManager;
//   //   this._scene = this.load();
//   //   this._entityComponentSystem = new Engine();

//   //   // TODO: asset manager
//   //   // TODO: input manager
//   // }

//   constructor(scenesManager: ScenesManager) {
//     this._scenesManager = scenesManager;
//     this._entityComponentSystem = this.initializeEntityComponentSystem();

//     // TODO: asset manager
//     // TODO: input manager
//   }

//   serialize = () => {
//     const sceneObject = {
//       active: this._active,
//       name: this._sceneName,
//       babylonScene: this.serializeBabylonScene(),
//       ecs: this._entityComponentSystem.serialize(),
//     };

//     return sceneObject;
//   };

//   load = (sceneObject): void => {
//     // TODO:
//     const { active, name, babylonScene, ecs } = sceneObject;

//     this._active = active;
//     this._sceneName = name;
//     this._scene = this.loadBabylonScene(babylonScene);
//     this._entityComponentSystem.load(ecs);
//   };

//   update = () => {
//     if (!this._active) return;

//     this._entityComponentSystem.update(this._scenesManager.renderEngine.getDeltaTime());
//     this._scene.render();
//   };

//   get active() {
//     return this._active;
//   }

//   get name() {
//     return this._sceneName;
//   }

//   activate = () => {
//     this._active = true;
//   };

//   deactivate = () => {
//     this._active = false;
//   };

//   private initializeEntityComponentSystem = () => {
//     const ecs = new Engine(componentClasses);

//     // TODO: preload the default set of update functions !!!
//     // TODO: handle priority lists...
//     // [
//     //   [sys, sys, ...], // INPUT: 0
//     //   [sys, sys,...], // AI: 1
//     //   ...
//     // ]
//     ecs.addSystem(new Input(ecs), PRIORITY.INPUT); // NOTE: process inputs from player
//     // ecs.addSystem(new AI(ecs), PRIORITY.AI); // TODO: essentially second set of inputs, but from computer. This is NOT a default system, but users will slot any AI system in this order of priority !!!
//     // ecs.addSystem(new Physics(ecs), PRIORITY.PHYSICS);
//     ecs.addSystem(new Movement(ecs), PRIORITY.MOVEMENT);
//     // ecs.addSystem(new Collision(ecs), PRIORITY.COLLISION);
//     // TODO: ... (more game specific systems, PRIORITY.GAMEPLAY) need to dynamically load after default ones are set...
//     // ecs.addSystem(new Render(ecs), PRIORITY.RENDER, (optional_inner_priority)); // NOTE: render the result
//     ecs.addSystem(new Render(ecs), PRIORITY.RENDER); // NOTE: render the result

//     return ecs;
//   };

//   private serializeBabylonScene = () => {
//     const scene = this._scene;

//     return {
//       gravity: [scene.gravity.x, scene.gravity.y, scene.gravity.z],
//       collisionsEnabled: scene.collisionsEnabled,
//     };
//   };

//   private loadBabylonScene = (babylonSceneObject): BabylonScene => {
//     // gravity: [x, y, z]
//     // collisionsEnabled: boolean
//     const { gravity, collisionsEnabled } = babylonSceneObject;

//     const scene = new BabylonScene(this._scenesManager.renderEngine);
//     if (gravity.length === 3) scene.gravity = new Vector3(...gravity);
//     scene.collisionsEnabled = collisionsEnabled;

//     return scene;
//   };
// }

// export default Scene;
