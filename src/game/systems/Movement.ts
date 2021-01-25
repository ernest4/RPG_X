import { Engine } from "../../ecs";
import System from "../../ecs/System";
import { QuerySet } from "../../ecs/types";
import PhysicsBody from "../components/PhysicsBody";
import Transform from "../components/Transform";

class Movement extends System {
  constructor(engine: Engine) {
    super(engine);
  }

  start(): void {
    // throw new Error("Method not implemented.");
  }

  update(): void {
    // apply PhysicsBody to transform
    this.engine.query(this.updateTransforms, Transform, PhysicsBody);
  }

  destroy(): void {
    // throw new Error("Method not implemented.");
  }

  private updateTransforms = (querySet: QuerySet) => {
    const [transform, physicsBody] = querySet as [Transform, PhysicsBody];

    const seconds = this.deltaTime / 1000;

    transform.position.x += physicsBody.linearVelocity.x * seconds;
    transform.position.y += physicsBody.linearVelocity.y * seconds;

    transform.rotation.z += physicsBody.angularVelocity.z * seconds;
  };
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
