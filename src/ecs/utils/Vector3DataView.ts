import { Vector3ViewIndexes } from "../types";

class Vector3DataView {
  // private _values: TransformValues;
  private _values: Uint32Array;
  private _startOffset: number;

  constructor(transformValues: Uint32Array, startOffset = 0) {
    this._startOffset = startOffset;
    this._values = transformValues;
  }

  get x() {
    return this._values[Vector3ViewIndexes.X + this._startOffset];
  }

  set x(value: number) {
    this._values[Vector3ViewIndexes.X + this._startOffset] = value;
  }

  get y() {
    return this._values[Vector3ViewIndexes.Y + this._startOffset];
  }

  set y(value: number) {
    this._values[Vector3ViewIndexes.Y + this._startOffset] = value;
  }

  get z() {
    return this._values[Vector3ViewIndexes.Z + this._startOffset];
  }

  set z(value: number) {
    this._values[Vector3ViewIndexes.Z + this._startOffset] = value;
  }
}

export default Vector3DataView;
