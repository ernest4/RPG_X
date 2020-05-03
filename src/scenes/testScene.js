const {
  Scene,
  HemisphericLight,
  Vector3,
  Mesh,
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

import { log, debugLog } from "../debug";
import testMap from "../areas/testy.json"; // json loader works out the box with webpack, other file types need explicit webpack set up

const { name, tiles } = testMap;

log(`name ${name}, tiles ${tiles}`);

export default ({ engine, canvas }) => {
  // Create our first scene.
  const scene = new Scene(engine);

  // This creates and positions a free camera (non-mesh)
  const camera = new UniversalCamera("camera1", new Vector3(10, 10, 10), scene);
  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // set custom controls for rts style view and movement
  camera.inputs.clear();

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
  const box = Mesh.CreateBox("box1", 2, scene);

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
    new ExecuteCodeAction(ActionManager.OnPickTrigger, (event) => {
      const state = store.getState(); // read redux store
      log(state.showUi);
      store.dispatch(gameActions.showUI(!state.showUi)); // fire redux action
    })
  );

  const SPEED = 0.1;
  scene.actionManager = new ActionManager(scene);
  // scene.actionManager.registerAction(
  //   new ExecuteCodeAction({ trigger: ActionManager.OnKeyDownTrigger, parameter: "d" }, (event) => {
  //     camera.position.x += SPEED * engine.getDeltaTime();
  //     camera.position.z -= SPEED * engine.getDeltaTime();
  //   })
  // );

  // attempt to tween the value...
  // scene.actionManager
  //   .registerAction(
  //     new InterpolateValueAction(
  //       { trigger: ActionManager.OnKeyDownTrigger, parameter: "d" },
  //       camera,
  //       "position",
  //       new Vector3(camera.position.x + SPEED, camera.position.y, camera.position.z - SPEED),
  //       1000
  //     )
  //   )
  //   .then(
  //     new SetValueAction(
  //       { trigger: ActionManager.OnKeyDownTrigger, parameter: "d" },
  //       camera,
  //       "position",
  //       new Vector3(camera.position.x + SPEED, camera.position.y, camera.position.z - SPEED)
  //     )
  //   );

  // TODO: try custom animation https://www.tutorialspoint.com/babylonjs/babylonjs_animations.htm
  // simple tweening didnt seem to work. So set up custom animation with keyframes set in a tween
  // like pattern.

  scene.actionManager.registerAction(
    new ExecuteCodeAction({ trigger: ActionManager.OnKeyDownTrigger, parameter: "a" }, (event) => {
      camera.position.x -= SPEED * engine.getDeltaTime();
      camera.position.z += SPEED * engine.getDeltaTime();
    })
  );
  scene.actionManager.registerAction(
    new ExecuteCodeAction({ trigger: ActionManager.OnKeyDownTrigger, parameter: "w" }, (event) => {
      camera.position.x += SPEED * engine.getDeltaTime();
      camera.position.z += SPEED * engine.getDeltaTime();
    })
  );
  scene.actionManager.registerAction(
    new ExecuteCodeAction({ trigger: ActionManager.OnKeyDownTrigger, parameter: "s" }, (event) => {
      camera.position.x -= SPEED * engine.getDeltaTime();
      camera.position.z -= SPEED * engine.getDeltaTime();
    })
  );
  // up / down the camera height
  // scene.actionManager.registerAction(
  //   new ExecuteCodeAction({ trigger: ActionManager.OnKeyDownTrigger, parameter: "w" }, (event) => {
  //     camera.position.y += SPEED * engine.getDeltaTime();
  //   })
  // );
  // scene.actionManager.registerAction(
  //   new ExecuteCodeAction({ trigger: ActionManager.OnKeyDownTrigger, parameter: "s" }, (event) => {
  //     camera.position.y -= SPEED * engine.getDeltaTime();
  //   })
  // );
  // rotate camera wip
  // scene.actionManager.registerAction(
  //   new InterpolateValueAction(
  //     { trigger: ActionManager.OnKeyDownTrigger, parameter: "q" },
  //     (event) => {}
  //   )
  // );
  // scene.actionManager.registerAction(
  //   new InterpolateValueAction(
  //     { trigger: ActionManager.OnKeyDownTrigger, parameter: "e" },
  //     (event) => {}
  //   )
  // );

  // TODO:

  // Then can start building out rudimentary level with camera movement and left click
  // turn based movement using redux to manage game state.

  // Once thats ready, start looking at socket server on server.js and how client is gonna
  // communicate with it.

  // Finally look at storing game map on server, reading it, updateing based on client movement
  // and persisiting it in the file (later, in DB).

  // Move the box upward 1/2 its height
  box.position.y = 2;

  // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
  const ground = Mesh.CreateGround("ground1", 6, 6, 2, scene);
  // Create a grid material
  const groundMaterial = new StandardMaterial("groundMaterial", scene);
  groundMaterial.diffuseColor = new Color3(0, 1, 0);
  // Affect a material
  ground.material = groundMaterial;

  return scene;
};
