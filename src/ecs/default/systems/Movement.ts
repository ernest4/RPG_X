import { QuerySet } from "../../types";
import System from "../../System";
import PhysicsBody from "../components/PhysicsBody";
import Transform from "../components/Transform";

class Movement extends System {
  start(): void {}

  update(): void {
    // NOTE: streaming the entities one by one instead of creating new node lists...
    // const query = this.engine.query(Position, Velocity);
    // for (const querySet of query) this.updateEntity(querySet);

    this.engine.query(this.updateEntity, Transform, PhysicsBody);
  }

  private updateEntity = (querySet: QuerySet) => {
    const [transform, physicsBody] = querySet as [Transform, PhysicsBody];

    transform.position.x = physicsBody.linearVelocity.x * this.deltaTime;
    transform.position.y = physicsBody.linearVelocity.y * this.deltaTime;
    transform.position.z = physicsBody.linearVelocity.z * this.deltaTime;

    transform.rotation.x = physicsBody.angularVelocity.x * this.deltaTime;
    transform.rotation.y = physicsBody.angularVelocity.y * this.deltaTime;
    transform.rotation.z = physicsBody.angularVelocity.z * this.deltaTime;
  };

  destroy(): void {}
}

export default Movement;
