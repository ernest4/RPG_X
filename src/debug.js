const DEBUG = process.env.DEBUG_LOG === "true" || process.env.NODE_ENV !== "production";

export const log = msg => console.log(`[Pulse Client]: ${msg}`);

export const debugLog = msg => {
  if (DEBUG) console.log(`[Pulse Client]: ${msg}`);
};

export const showFPS = (scene, advancedTexture) => {
  // TODO: add GUI text element
  const fpsText = new BABYLON.GUI.TextBlock();
  // fpsText.text = "Hello world";
  fpsText.color = "white";
  fpsText.fontSize = 24;
  advancedTexture.addControl(fpsText);

  scene.onBeforeRenderObservable.add(() => {
    fpsText.text = scene.getEngine().getFps().toFixed() + " fps";
  });
};
