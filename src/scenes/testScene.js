import {
  Scene,
  HemisphericLight,
  FreeCamera,
  Vector3,
  Mesh,
  StandardMaterial,
  ActionManager,
  ExecuteCodeAction,
  Color3,
} from "babylonjs";

import store from "../store";
import * as gameActions from "../store/actions/game";

import { log, debugLog } from "../debug";
import testMap from "../areas/testy.json"; // json loader works out the box with webpack, other file types need explicit webpack set up

const { name, tiles } = testMap;

log(`name ${name}, tiles ${tiles}`);

export default ({ engine, canvas }) => {
  // Create our first scene.
  const scene = new Scene(engine);

  // This creates and positions a free camera (non-mesh)
  const camera = new FreeCamera("camera1", new Vector3(0, 5, -10), scene);
  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
  const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
  // Default intensity is 1. Let's dim the light a small amount
  light.intensity = 0.7;

  // Our built-in 'sphere' shape. Params: name, subdivs, size, scene
  const sphere = Mesh.CreateSphere("sphere1", 16, 2, scene);

  const ballMaterial = new StandardMaterial("ballMaterial", scene);
  ballMaterial.diffuseColor = new Color3(1, 0, 0);
  sphere.material = ballMaterial;
  sphere.actionManager = new ActionManager(scene);
  // sphere.actionManager.registerAction(
  //   new ExecuteCodeAction(
  //     // { trigger: ActionManager.OnPickTrigger, parameter: sphere },
  //     // { trigger: ActionManager.OnKeyUpTrigger, parameter: "r" },
  //     ActionManager.OnPickTrigger,
  //     function (event) {
  //       log(`mesh was pressed. Event: ${event}`);
  //       alert("hi");
  //     }
  //   )
  // );
  sphere.actionManager.registerAction(
    new ExecuteCodeAction(ActionManager.OnPickTrigger, (event) => {
      // console.log(event);
      const state = store.getState(); // read redux store
      log(state.showUi);
      store.dispatch(gameActions.showUI(!state.showUi)); // fire redux action
    })
  );

  // TODO: add on click and hook that up to redux to check if that works.

  // Then can start building out rudimentary level with camera movement and left click
  // turn based movement using redux to manage game state.

  // Once thats ready, start looking at socket server no server.js and how client is gonna
  // communicate with it.

  // Finally look at storing game map on server, reading it, updateing based on client movement
  // and persisiting it in the file (later, in DB).

  // Move the sphere upward 1/2 its height
  sphere.position.y = 2;

  // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
  const ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);
  // Create a grid material
  const groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseColor = new Color3(0, 1, 0);
  // Affect a material
  ground.material = groundMaterial;

  return scene;
};
