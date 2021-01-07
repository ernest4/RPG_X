// import { Engine, Nullable } from "babylonjs";
// import Scene from "./_legacy_Scene";

// // Testing...
// import SAMPLE_GAME_STATE from "./tests/gameState";

// class ScenesManager {
//   private _scenes: Scene[];
//   private _renderEngine: Engine;

//   constructor() {
//     this._scenes = [];

//     // TODO: add the banner to the top with social media links !!!
//     this._renderEngine = this.initializeRenderEngine();
//   }

//   // add = (name: string, active: boolean) => {
//   //   this._scenes.push(new Scene(name, this, active));
//   // };

//   // TODO: load whole game from serialized JSON blob
//   // load = (url: URL) => {
//   load = () => {
//     // TODO: load this from file over the network, use axios if needed to fetch this
//     // const gameStateJsonString = await fetch("/assets/game.json", () => JSON...)
//     // const gameStateJson = JSON.parse(gameStateJsonString);

//     // TESTING: ...
//     const gameStateJson = SAMPLE_GAME_STATE;

//     this._scenes = gameStateJson.scenes.map(this.loadScene);
//   };

//   switch = (sceneName: string) => {
//     this._scenes.forEach(scene => {
//       scene.name === sceneName ? scene.activate() : scene.deactivate();
//     });
//   };

//   get renderEngine(): Engine {
//     return this._renderEngine;
//   }

//   private initializeRenderEngine = () => {
//     const canvas = document.getElementById("canvas") as Nullable<
//       HTMLCanvasElement | WebGLRenderingContext
//     >;

//     const engine = new Engine(canvas);

//     engine.runRenderLoop(this.update);

//     window.addEventListener("resize", () => engine.resize());

//     return engine;
//   };

//   private loadScene = (sceneObject): Scene => {
//     const scene = new Scene(this);
//     scene.load(sceneObject);
//     return scene;
//   };

//   private update = () => this._scenes.forEach(scene => scene.update());
// }

// export default ScenesManager;
