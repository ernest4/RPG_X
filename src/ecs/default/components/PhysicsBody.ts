// TODO: maybe instead of velocity standalone, have it part of PhysicsBody component like in Unity
// and heavily optimize that??
// PhysicsBody {
// mass: number
// linearDamping: number
// angularDamping: number
// linearVelocity: [x,y,z]
// angularVelocity: [x,y,z]
// gravityFactor: number
// }

import { EntityId } from "../../types";
import Component from "../../Component";

// TODO: optimize with ArrayBuffers
class PhysicsBody extends Component {
  _values: number[];
  // TODO: ...
  constructor(entityId: EntityId) {
    super(entityId);
    this._values = [];
  }

  // TODO: dynamically create these???
  get x() {
    return this._values[0]; // TODO: enums for array index like in Collider
  }

  set x(value: number) {
    this._values[0] = value;
  }

  get y() {
    return this._values[1];
  }

  set y(value: number) {
    this._values[1] = value;
  }

  get angular() {
    return this._values[2];
  }

  set angular(value: number) {
    this._values[2] = value;
  }

  serialize(): void {
    throw new Error("Method not implemented.");
  }

  load(componentObject: any): void {
    throw new Error("Method not implemented.");
  }
}

export default PhysicsBody;
