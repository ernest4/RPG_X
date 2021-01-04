// TODO: optimize this to act as basic view into ComponentList pure ArrayBuffer for Transform

import { EntityId } from "../../types";
import Component from "../../Component";
import Vector3DataView from "../../utils/Vector3DataView";

// components
class Transform extends Component {
  private _values: Uint32Array;
  private _position: Vector3DataView;
  private _rotation: Vector3DataView;
  private _scale: Vector3DataView;

  // TODO: more constructors...
  constructor(entityId: EntityId) {
    super(entityId);
    // TODO: [positionX, positionY, positionZ, rotationX, rotationY, rotationZ, scaleX, scaleY, scaleZ]
    // this._values = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this._values = new Uint32Array(9);
    // this._position = new Position(this._values);
    this._position = new Vector3DataView(this._values);
    this._rotation = new Vector3DataView(this._values, 3);
    this._scale = new Vector3DataView(this._values, 6);
  }

  get position() {
    return this._position;
  }

  get rotation() {
    return this._rotation;
  }

  get scale() {
    return this._scale;
  }

  // get positionX() {
  //   return this._values[TransformValueIndexes.POSITION_X];
  // }

  // set positionX(value: number) {
  //   this._values[TransformValueIndexes.POSITION_X] = value;
  // }

  // get positionY() {
  //   return this._values[TransformValueIndexes.POSITION_Y];
  // }

  // set positionY(value: number) {
  //   this._values[TransformValueIndexes.POSITION_Y] = value;
  // }

  // get positionZ() {
  //   return this._values[TransformValueIndexes.POSITION_Z];
  // }

  // set positionZ(value: number) {
  //   this._values[TransformValueIndexes.POSITION_Z] = value;
  // }

  // get rotationX() {
  //   return this._values[TransformValueIndexes.ROTATION_X];
  // }

  // set rotationX(value: number) {
  //   this._values[TransformValueIndexes.ROTATION_X] = value;
  // }

  // get rotationY() {
  //   return this._values[TransformValueIndexes.ROTATION_Y];
  // }

  // set rotationY(value: number) {
  //   this._values[TransformValueIndexes.ROTATION_Y] = value;
  // }

  // get rotationZ() {
  //   return this._values[TransformValueIndexes.ROTATION_Z];
  // }

  // set rotationZ(value: number) {
  //   this._values[TransformValueIndexes.ROTATION_Z] = value;
  // }

  // get scaleX() {
  //   return this._values[TransformValueIndexes.SCALE_X];
  // }

  // set scaleX(value: number) {
  //   this._values[TransformValueIndexes.SCALE_X] = value;
  // }

  // get scaleY() {
  //   return this._values[TransformValueIndexes.SCALE_Y];
  // }

  // set scaleY(value: number) {
  //   this._values[TransformValueIndexes.SCALE_Y] = value;
  // }

  // get scaleZ() {
  //   return this._values[TransformValueIndexes.SCALE_Z];
  // }

  // set scaleZ(value: number) {
  //   this._values[TransformValueIndexes.SCALE_Z] = value;
  // }

  serialize(): void {
    // throw new Error("Method not implemented.");
  }

  load(componentObject): void {
    // throw new Error("Method not implemented.");
    // return this.constructor(5);
    const { position, rotation, scale } = componentObject;

    this.position.x = position.x;
    this.position.y = position.y;
    this.position.z = position.z;
    this.rotation.x = rotation.x;
    this.rotation.y = rotation.y;
    this.rotation.z = rotation.z;
    this.scale.x = scale.x;
    this.scale.y = scale.y;
    this.scale.z = scale.z;
  }

  // distanceTo = (position: Position): number => {
  //   // TODO: wip...
  // };
}

export default Transform;
