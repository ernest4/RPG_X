const {
  Scene,
  HemisphericLight,
  Vector3,
  MeshBuilder,
  StandardMaterial,
  ActionManager,
  ExecuteCodeAction,
  Color3,
  UniversalCamera,
  InterpolateValueAction,
  SetValueAction,
} = BABYLON;

import store from "../store";
import * as gameActions from "../store/actions/game";

import { log, debugLog, showFPS } from "../debug";
import testMap from "../areas/testy.json"; // json loader works out the box with webpack, other file types need explicit webpack set up
// import addRTSCamera from "../cameras/addRTSCamera";
import addFPSCamera from "../cameras/addFPSCamera";

const { name, tiles } = testMap;

log(`name ${name}, tiles ${tiles}`);

export default ({ engine, canvas }) => {
  // TODO: for in game UI on various things, make the UI inside the game world!! very cool https://www.babylonjs-playground.com/#Q81PBV#6

  // Create our first scene.
  const scene = new Scene(engine);

  //Set gravity for the scene (G force like, on Y-axis)
  scene.gravity = new BABYLON.Vector3(0, -0.9, 0);

  // const camera = addRTSCamera({ name: "camera1", engine, scene });
  const camera = addFPSCamera({ name: "player", position: new Vector3(10, 10, 10), scene, canvas });

  //Then apply collisions and gravity to the active camera
  camera.checkCollisions = true;
  camera.applyGravity = true;

  // Enable Collisions
  scene.collisionsEnabled = true;

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  // Hemispheric light provides ambient lighting
  const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Set default ambient lighting. Tweaking this is good way to create moods with
  // blue lighting for sad, dark, scary.
  // Orange lighting for light, bright, energetic.
  // Red light if you're in a building on fire or in a spaceship with hight alert.
  // Simple black and white if you're in outer space (pich black shadows, i.e. no back light).
  light.diffuse = new Color3(0.95, 0.95, 0.95);
  light.specular = new Color3(0.95, 0.95, 0.95);
  light.groundColor = new Color3(0.3, 0.3, 0.3);

  // Our built-in 'box' shape. Params: name, subdivs, size, scene
  const box = MeshBuilder.CreateBox("box1", { height: 5, width: 2, depth: 0.5 }, scene);

  const ballMaterial = new StandardMaterial("ballMaterial", scene);
  ballMaterial.diffuseColor = new Color3(1, 0, 0);
  box.material = ballMaterial;
  box.actionManager = new ActionManager(scene);
  // box.actionManager.registerAction(
  //   new ExecuteCodeAction(
  //     // { trigger: ActionManager.OnPickTrigger, parameter: box },
  //     // { trigger: ActionManager.OnKeyUpTrigger, parameter: "r" },
  //     ActionManager.OnPickTrigger,
  //     function (event) {
  //       log(`mesh was pressed. Event: ${event}`);
  //       alert("hi");
  //     }
  //   )
  // );
  box.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPickTrigger, event => {
      const state = store.getState(); // read redux store
      log(state.showUi);
      store.dispatch(gameActions.showUI(!state.showUi)); // fire redux action
    })
  );

  // TODO:

  // Then can start building out rudimentary level with camera movement and left click
  // turn based movement using redux to manage game state.

  // MAP target size 50x50, 100x50 and 100 x 100 = 10,000 tiles. 4 leves of height (no height for now)?

  // Once thats ready, start looking at socket server on server.js and how client is gonna
  // communicate with it.

  // Finally look at storing game map on server, reading it, updateing based on client movement
  // and persisiting it in the file (later, in DB).

  // Move the box upward 1/2 its height
  box.position.y = 2;

  // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
  const ground = MeshBuilder.CreateGround(
    "ground1",
    { height: 6, width: 6, subdivisions: 2 },
    scene
  );
  // Create a grid material
  const groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseColor = new Color3(0, 1, 0);
  // Affect a material
  ground.material = groundMaterial;

  // Create rendering pipeline for motion blur
  // var pipeline = new BABYLON.StandardRenderingPipeline("standard", scene, 1.0, null, [camera]);
  // pipeline.MotionBlurEnabled = true;
  // pipeline.motionStrength = 0.1;
  // pipeline.motionBlurSamples = 32;

  // GUI
  var advancedTexture = BABYLON.GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");

  showFPS(scene, advancedTexture);

  return scene;
};
