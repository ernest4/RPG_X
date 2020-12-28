import { Engine, Nullable, PerformanceMonitor } from "babylonjs";

import { log, debugLog } from "./debug";
import testScene from "./scenes/testScene";

import { testAdder } from "./testy2";

testAdder(1, 3);
// testAdder("abc", 3);

log(`Running in ${process.env.NODE_ENV !== "production" ? "dev" : "prod"} mode`);

// Get the canvas element from the DOM.
const canvas = document.getElementById("renderCanvas") as Nullable<
  HTMLCanvasElement | WebGLRenderingContext
>;

// TODO: add the banner to the top with social media links !!!

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
