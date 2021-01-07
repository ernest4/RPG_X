// // const {
// // Scene,
// // HemisphericLight,
// // Vector3,
// // MeshBuilder,
// // StandardMaterial,
// // ActionManager,
// // ExecuteCodeAction,
// // Color3,
// // UniversalCamera,
// // InterpolateValueAction,
// // SetValueAction,
// // } = BABYLON;

// import {
//   Scene,
//   Vector3,
//   HemisphericLight,
//   MeshBuilder,
//   StandardMaterial,
//   ActionManager,
//   ExecuteCodeAction,
//   Color3,
//   UniversalCamera,
//   InterpolateValueAction,
//   SetValueAction,
// } from "babylonjs";

// import { AdvancedDynamicTexture } from "babylonjs-gui";

// import store from "../store";
// import * as gameActions from "../store/actions/game";

// // import addRTSCamera from "../cameras/addRTSCamera";
// import addFPSCamera from "../cameras/addFPSCamera";
// import { showFPS } from "../debug";

// export default ({ engine, canvas }) => {
//   // TODO: for in game UI on various things, make the UI inside the game world!! very cool https://www.babylonjs-playground.com/#Q81PBV#6

//   // Create our first scene.
//   const scene = new Scene(engine);

//   //Set gravity for the scene (G force like, on Y-axis)
//   scene.gravity = new Vector3(0, -0.9, 0);

//   // const camera = addRTSCamera({ name: "camera1", engine, scene });
//   const camera = addFPSCamera({ name: "player", position: new Vector3(10, 10, 10), scene, canvas });

//   //Then apply collisions and gravity to the active camera
//   camera.checkCollisions = true;
//   camera.applyGravity = true;

//   // Enable Collisions
//   scene.collisionsEnabled = true;

//   // This creates a light, aiming 0,1,0 - to the sky (non-mesh)
//   // Hemispheric light provides ambient lighting
//   const light = new HemisphericLight("light1", new Vector3(0, 1, 0), scene);
//   // Default intensity is 1. Let's dim the light a small amount
//   light.intensity = 0.7;

//   // Set default ambient lighting. Tweaking this is good way to create moods with
//   // blue lighting for sad, dark, scary.
//   // Orange lighting for light, bright, energetic.
//   // Red light if you're in a building on fire or in a spaceship with hight alert.
//   // Simple black and white if you're in outer space (pitch black shadows, i.e. no back light).
//   light.diffuse = new Color3(0.95, 0.95, 0.95);
//   light.specular = new Color3(0.95, 0.95, 0.95);
//   light.groundColor = new Color3(0.3, 0.3, 0.3);

//   // Our built-in 'box' shape. Params: name, subdivs, size, scene
//   const box = MeshBuilder.CreateBox("box1", { height: 5, width: 2, depth: 0.5 }, scene);

//   const ballMaterial = new StandardMaterial("ballMaterial", scene);
//   ballMaterial.diffuseColor = new Color3(1, 0, 0);
//   box.material = ballMaterial;
//   box.actionManager = new ActionManager(scene);
//   // box.actionManager.registerAction(
//   //   new ExecuteCodeAction(
//   //     // { trigger: ActionManager.OnPickTrigger, parameter: box },
//   //     // { trigger: ActionManager.OnKeyUpTrigger, parameter: "r" },
//   //     ActionManager.OnPickTrigger,
//   //     function (event) {
//   //       log(`mesh was pressed. Event: ${event}`);
//   //       alert("hi");
//   //     }
//   //   )
//   // );
//   box.actionManager.registerAction(
//     new ExecuteCodeAction(ActionManager.OnPickTrigger, event => {
//       const state = store.getState(); // read redux store
//       // log(state.showUi);
//       store.dispatch(gameActions.showUI(!state.showUi)); // fire redux action
//     })
//   );

//   // TODO:

//   // Then can start building out rudimentary level with camera movement and left click
//   // turn based movement using redux to manage game state.

//   // MAP target size 50x50, 100x50 and 100 x 100 = 10,000 tiles. 4 leves of height (no height for now)?

//   // Once thats ready, start looking at socket server on server.js and how client is gonna
//   // communicate with it.

//   // Finally look at storing game map on server, reading it, updateing based on client movement
//   // and persisiting it in the file (later, in DB).

//   // Move the box upward 1/2 its height
//   box.position.y = 2;

//   // Our built-in 'ground' shape. Params: name, width, depth, subdivs, scene
//   const ground = MeshBuilder.CreateGround(
//     "ground1",
//     { height: 6, width: 6, subdivisions: 2 },
//     scene
//   );
//   // Create a grid material
//   const groundMaterial = new StandardMaterial("groundMaterial", scene);
//   groundMaterial.diffuseColor = new Color3(0, 1, 0);
//   // Affect a material
//   ground.material = groundMaterial;

//   // Create rendering pipeline for motion blur
//   // var pipeline = new BABYLON.StandardRenderingPipeline("standard", scene, 1.0, null, [camera]);
//   // pipeline.MotionBlurEnabled = true;
//   // pipeline.motionStrength = 0.1;
//   // pipeline.motionBlurSamples = 32;

//   // GUI
//   // var advancedTexture = GUI.AdvancedDynamicTexture.CreateFullscreenUI("UI");
//   var advancedTexture = AdvancedDynamicTexture.CreateFullscreenUI("UI");

//   // TODO: set up the top bar with social info https://doc.babylonjs.com/snippets/openurl
//   // TODO: set up basic fps scene https://www.babylonjs-playground.com/#U8MEB0#0 , https://doc.babylonjs.com/babylon101/cameras
//   // TODO: set up netcode for players playing in real time in the secene
//   // TODO: investigate ui customization https://www.html5gamedevs.com/topic/40142-can-we-customize-the-look-of-babylonjsgui/
//   // TODO: investigate procedural generation https://en.wikipedia.org/wiki/Procedural_texture , https://www.youtube.com/watch?v=uUfV41HE_Dg
//   showFPS(advancedTexture, scene);
//   // TODO: art style for ammo in the fps low poly space game https://www.google.com/search?q=deus+ex+ammo&rlz=1C5CHFA_enIE838IE838&sxsrf=ALeKk02qKNLBZWJcgCGemAFdr69nyLPnCw:1591296438659&source=lnms&tbm=isch&sa=X&ved=2ahUKEwj8ndWX6ejpAhVhRBUIHbMOC0IQ_AUoAXoECAwQAw&biw=1440&bih=789#imgrc=9x-ZbNKIhsU7PM
//   // TODO: checkoout papercraft as examples for low poly 3d art https://www.google.com/search?q=papercraft+car&rlz=1C5CHFA_enIE838IE838&sxsrf=ALeKk00FmQeOMGmyxp0VkJiaLbbH0WtKow:1590947735783&source=lnms&tbm=isch&sa=X&ved=2ahUKEwia05aV1t7pAhVZShUIHbyoBOoQ_AUoAXoECA4QAw&biw=1440&bih=789
//   // TODO: check out tutorials for characters in low poly 3d https://www.youtube.com/watch?v=Ljl_QFs9xhE

//   // TODO: check put cool top fuel dragsters https://www.google.com/search?q=drag+racer+cars&rlz=1C5CHFA_enIE838IE838&sxsrf=ALeKk00QzyTwIA-o-pUFJQMVF36joAzwwg:1590854787477&tbm=isch&source=iu&ictx=1&fir=6IvmvjwVGWwqTM%253A%252CQHMJxPcyWnHl9M%252C%252Fm%252F02b9x&vet=1&usg=AI4_-kSwhg9d1FvS_-cCkT3MwTg1eYEUuQ&sa=X&ved=2ahUKEwiWqPzz-9vpAhV1RxUIHYUXDS8Q_B0wGnoECAYQAw

//   // TODO: check out scifi art https://www.pinterest.ie/etagonam/futuristic-design-and-scifi-art/

//   return scene;
// };
