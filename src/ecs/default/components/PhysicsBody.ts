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

// TODO: optimize with ArrayBuffers
class PhysicsBody extends Component {
  _values: number[];
  // TODO: ...
  constructor(entityId: EntityId, x: number, y: number, angular: number) {
    super(entityId);
    this._values = [x, y, angular];
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
}
