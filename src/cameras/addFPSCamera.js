const { ActionManager, ExecuteCodeAction, Vector3, UniversalCamera } = BABYLON;

export default ({ name, scene, position, canvas }) => {
  const SPEED = 0.1;

  // This creates and positions a free camera (non-mesh)
  const camera = new UniversalCamera(name, position || new Vector3(10, 10, 10), scene);
  camera.ellipsoid = new BABYLON.Vector3(0.4, 2, 0.4); // standing up
  // camera.ellipsoid = new BABYLON.Vector3(0.4, 1, 0.4); // croutching
  camera.minZ = 0.1; // near cliping plane

  // This targets the camera to scene origin
  camera.setTarget(Vector3.Zero());
  // This attaches the camera to the canvas
  camera.attachControl(canvas, true);

  // //Then apply collisions and gravity to the active camera
  // camera.checkCollisions = true;
  // camera.applyGravity = true;

  // set custom controls for rts style view and movement
  // camera.inputs.clear();

  // scene.actionManager = new ActionManager(scene);
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

  // scene.actionManager.registerAction(
  //   new ExecuteCodeAction({ trigger: ActionManager.OnKeyDownTrigger, parameter: "a" }, (event) => {
  //     camera.position.x -= SPEED * engine.getDeltaTime();
  //     camera.position.z += SPEED * engine.getDeltaTime();
  //   })
  // );
  // scene.actionManager.registerAction(
  //   new ExecuteCodeAction({ trigger: ActionManager.OnKeyDownTrigger, parameter: "w" }, (event) => {
  //     camera.position.x += SPEED * engine.getDeltaTime();
  //     camera.position.z += SPEED * engine.getDeltaTime();
  //   })
  // );
  // scene.actionManager.registerAction(
  //   new ExecuteCodeAction({ trigger: ActionManager.OnKeyDownTrigger, parameter: "s" }, (event) => {
  //     camera.position.x -= SPEED * engine.getDeltaTime();
  //     camera.position.z -= SPEED * engine.getDeltaTime();
  //   })
  // );
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

  return camera;
};
