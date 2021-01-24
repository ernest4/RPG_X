import Component from "./Component";
import Vector3BufferView from "../utils/Vector3BufferView";
import Entity from "../Entity";

// PhysicsBody {
// mass: number
// linearDamping: number
// angularDamping: number
// linearVelocity: [x,y,z]
// angularVelocity: [x,y,z]
// gravityFactor: number
// }

class PhysicsBody extends Component {
  private _values: Uint32Array;
  velocity: { linear: Vector3BufferView };
  // rotation: Vector3BufferView;
  // scale: Vector3BufferView;

  constructor(entity: Entity, velocityX = 0, velocityY = 0, velocityZ = 0) {
    super(entity);
    this._values = new Uint32Array(9);
    this.velocity = {
      linear: new Vector3BufferView(this._values),
      // angular: ...
    };

    // this.velocity = new Vector3BufferView(this._values);
    // this.rotation = new Vector3BufferView(this._values, 3 * 4);
    // this.scale = new Vector3BufferView(this._values, 6 * 4);

    const linearVelocity = this.velocity.linear;
    linearVelocity.x = velocityX;
    linearVelocity.y = velocityY;
    linearVelocity.z = velocityZ;

    // this.rotation.x = rotationX;
    // this.rotation.y = rotationY;
    // this.rotation.z = rotationZ;

    // this.scale.x = scaleX;
    // this.scale.y = scaleY;
    // this.scale.z = scaleZ;
  }

  onAdd(onReadyCallback: Function): void {
    // throw new Error("Method not implemented.");
    onReadyCallback();
  }

  onRemove(): void {
    // throw new Error("Method not implemented.");
  }
}

export default PhysicsBody;
