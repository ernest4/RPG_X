import { Engine, PerformanceMonitor } from "babylonjs";
// import { Engine } from "@babylonjs/core/Engines/engine";
// import { PerformanceMonitor } from "@babylonjs/core/Misc/performanceMonitor";

// Required side effects to populate the Create methods on the mesh class. Without this, the bundle would be smaller but the createXXX methods from mesh would not be accessible.
// import "@babylonjs/core/Meshes/meshBuilder";

import { log, debugLog } from "./debug";
import testScene from "./scenes/testScene";

log(`Running in ${process.env.NODE_ENV !== "production" ? "dev" : "prod"} mode`);

// Get the canvas element from the DOM.
const canvas = document.getElementById("renderCanvas");

// Associate a Babylon Engine to it.
const engine = new Engine(canvas);

// test scene
const scene = testScene({ engine, canvas });

// const performanceMonitor = new PerformanceMonitor();

// Render every frame
engine.runRenderLoop(() => {
  scene.render();

  // log(1000 / engine.getDeltaTime());
  // log(performanceMonitor.averageFPS());
});

// the canvas/window resize event handler
window.addEventListener("resize", function () {
  engine.resize();
});
