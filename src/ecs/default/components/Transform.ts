class Transform extends Component {
  _values: [number, number, number, number, number, number, number, number, number];
  // TODO: ...

  // nice interface example, but wanna keep things fast...
  // constructor({ entityId, x, y, rotation }: PositionArguments) {
  //   super(entityId);
  //   this._values = [x, y, rotation];
  // }

  constructor(entityId: EntityId) {
    super(entityId);
    // TODO: [positionX, positionY, positionZ, rotationX, rotationY, rotationZ, scaleX, scaleY, scaleZ]
    this._values = [0, 0, 0, 0, 0, 0, 0, 0, 0];
  }

  // TODO: dynamically create these???
  // Heres JS snippet as guide https://github.com/playcanvas/engine/blob/master/src/framework/components/component.js#L35
  // maybe...couldn't seem to get it working properly in console.
  get x() {
    return this._values[0];
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

  get rotation() {
    return this._values[2];
  }

  set rotation(value: number) {
    this._values[2] = value;
  }

  // distanceTo = (position: Position): number => {
  //   // TODO: wip...
  // };
}
