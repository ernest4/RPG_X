import { Engine } from "../../ecs";
import System from "../../ecs/System";

class Movement extends System {
  constructor(engine: Engine) {
    super(engine);
  }

  start(): void {
    // throw new Error("Method not implemented.");
  }

  update(): void {
    // throw new Error("Method not implemented.");
  }

  destroy(): void {
    // throw new Error("Method not implemented.");
  }
}

export default Movement;

// // this.cameras.main.y += this.scrollSpeed;
// this.cameras.main.pan(500, 500, 2000, "Power2"); // messing around with pan and zoom
// this.cameras.main.zoomTo(4, 3000);
// entity.components["Sprite"].y = 10 * deltaTime;

// events.emit("Movement", { y: 10 });

// this._scene.tweens.add({
//   targets: Sprite,
//   // @ts-ignore
//   y: PhysicsBody.velocity.linear.y, // meters / second
//   duration: 1, // second
//   // yoyo: true,
//   // delay: 1000,
//   // repeat: -1,
// });
