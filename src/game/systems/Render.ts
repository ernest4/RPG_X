import System from "../../ecs/System";

class Render extends System {
  start(): void {
    // TODO: add to display item to scene
  }

  update(): void {
    // for every entity with display object and position:
    // add position & rotation info to display object https://github.com/abiyasa/ashteroids-js/blob/master/src/systems/ThreeRenderSystem.js#L78
  }

  destroy(): void {}
}

export default Render;
