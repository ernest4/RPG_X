class Vector3BufferView {
  private _values: Uint32Array;

  constructor(values: ArrayBuffer, startByteOffset = 0) {
    // Uint32Array will error out at runtime if it can't construct itself at the right size
    this._values = new Uint32Array(values, startByteOffset, 3);
  }

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

  get z() {
    return this._values[2];
  }

  set z(value: number) {
    this._values[2] = value;
  }
}

export default Vector3BufferView;
