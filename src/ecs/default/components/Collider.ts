// TODO: also PhysicsShape (or Collider) (with 2 options, circle (sphere) and box (cube)) that will be involved in
// collision detection.
// PhysicsShape {
// shapeType: number (BOX = 1 | SPHERE = 0)
// trigger: boolean (to support pickable ???)
// radius: number (SPHERE)
// size: [x,y,z] (BOX)
// center: [x,y,z] // The position of the Collider in the object’s local space
// orientation: [x,y,z] ??? whats this (most likely don't need it for my game, keep it simple)
// collisionFilter: {belongsTo, collidesWith} // ... need to think about this. Naive collision,
// everything collides with everything, but that's not performant nor desired. Player will collide
// with most things but NPCs might not...
// }

// TODO: optimize with ArrayBuffers
class Collider extends Component {
  _values: [number, number, number, number, number]; // TODO: wip...

  // TODO: ... wip
  constructor(entityId: EntityId) {
    super(entityId);
    // [shapeType, SPHERE(radius), BOX(x, y, z)]
    this._values = [parseInt(ShapeType.BOX), 0, 0, 0, 0];
  }

  get shapeType(): ShapeType {
    return this._values[ColliderValueIndexes.SHAPE_TYPE].toString() as ShapeType;
  }

  set shapeType(value: ShapeType) {
    this._values[ColliderValueIndexes.SHAPE_TYPE] = parseInt(value);
  }

  get radius() {
    return this._values[ColliderValueIndexes.SPHERE_RADIUS];
  }

  set radius(value: number) {
    this._values[ColliderValueIndexes.SPHERE_RADIUS] = value;
  }

  get boxSizeX(): number {
    return this._values[ColliderValueIndexes.BOX_SIZE_X];
  }

  set boxSizeX(value: number) {
    this._values[ColliderValueIndexes.BOX_SIZE_X] = value;
  }

  get boxSizeY(): number {
    return this._values[ColliderValueIndexes.BOX_SIZE_Y];
  }

  set boxSizeY(value: number) {
    this._values[ColliderValueIndexes.BOX_SIZE_Y] = value;
  }

  get boxSizeZ(): number {
    return this._values[ColliderValueIndexes.BOX_SIZE_Z];
  }

  set boxSizeZ(value: number) {
    this._values[ColliderValueIndexes.BOX_SIZE_Z] = value;
  }

  // NOTE: wrappers less efficient...maybe not use them ??
  // get boxSize(): BoxColliderSize {
  //   return { x: this.boxSizeX, y: this.boxSizeX, z: this.boxSizeX };
  // }

  // TODO: wip
  // collidesWith = (otherCollider: Collider): boolean => {
  //   return false;
  // };
}
