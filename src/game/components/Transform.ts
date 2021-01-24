import Component from "./Component";
import Vector3BufferView from "../utils/Vector3BufferView";
import Entity from "../Entity";

class Transform extends Component {
  private _values: Uint32Array;
  position: Vector3BufferView;
  rotation: Vector3BufferView;
  scale: Vector3BufferView;

  constructor(
    entity: Entity,
    x = 0,
    y = 0,
    z = 0,
    rotationX = 0,
    rotationY = 0,
    rotationZ = 0,
    scaleX = 1,
    scaleY = 1,
    scaleZ = 1
  ) {
    super(entity);
    this._values = new Uint32Array(9);
    this.position = new Vector3BufferView(this._values);
    this.rotation = new Vector3BufferView(this._values, 3 * 4);
    this.scale = new Vector3BufferView(this._values, 6 * 4);

    this.position.x = x;
    this.position.y = y;
    this.position.z = z;

    this.rotation.x = rotationX;
    this.rotation.y = rotationY;
    this.rotation.z = rotationZ;

    this.scale.x = scaleX;
    this.scale.y = scaleY;
    this.scale.z = scaleZ;
  }

  onAdd(onReadyCallback: Function): void {
    // throw new Error("Method not implemented.");
    onReadyCallback();
  }

  onRemove(): void {
    // throw new Error("Method not implemented.");
  }
}

export default Transform;
