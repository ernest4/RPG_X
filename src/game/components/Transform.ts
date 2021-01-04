// TODO: optimize this to act as basic view into ComponentList pure ArrayBuffer for Transform

import { EntityId } from "../../ecs/types";
import Component from "../../ecs/Component";
import Vector3DataView from "../../ecs/utils/Vector3DataView";

// components
class Transform extends Component {
  private _values: Uint32Array;
  position: Vector3DataView;
  rotation: Vector3DataView;
  scale: Vector3DataView;

  // TODO: more constructors...
  constructor(entityId: EntityId) {
    super(entityId);
    // TODO: [positionX, positionY, positionZ, rotationX, rotationY, rotationZ, scaleX, scaleY, scaleZ]
    // this._values = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    this._values = new Uint32Array(9);
    // this._position = new Position(this._values);
    this.position = new Vector3DataView(this._values);
    this.rotation = new Vector3DataView(this._values, 3);
    this.scale = new Vector3DataView(this._values, 6);

    // TODO: hold the parent here ???
    // this._sparent = entityId;
    // when parent transform changes, child transform changes (thats how Unity does it)
    // get/set parent ???
    // this._children = entityId[]; ???
  }

  // get position() {
  //   return this._position;
  // }

  // get rotation() {
  //   return this._rotation;
  // }

  // get scale() {
  //   return this._scale;
  // }

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

  // TODO: this should live on some Serializer system !!!
  // components are just data containers !!! no methods !!!
  // serialize() {
  //   return {
  //     entityId: this.entityId,
  //     position: {
  //       x: this.position.x,
  //       y: this.position.y,
  //       z: this.position.z,
  //     },
  //     rotation: {
  //       x: this.rotation.x,
  //       y: this.rotation.y,
  //       z: this.rotation.z,
  //     },
  //     scale: {
  //       x: this.scale.x,
  //       y: this.scale.y,
  //       z: this.scale.z,
  //     },
  //   };
  // }

  // load(componentObject): void {
  //   // throw new Error("Method not implemented.");
  //   // return this.constructor(5);
  //   const { position, rotation, scale } = componentObject;

  //   this.position.x = position.x;
  //   this.position.y = position.y;
  //   this.position.z = position.z;

  //   this.rotation.x = rotation.x;
  //   this.rotation.y = rotation.y;
  //   this.rotation.z = rotation.z;

  //   this.scale.x = scale.x;
  //   this.scale.y = scale.y;
  //   this.scale.z = scale.z;
  // }

  // distanceTo = (position: Position): number => {
  //   // TODO: wip...
  // };
}

export default Transform;
