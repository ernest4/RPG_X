// TODO: optimize this to act as basic view into SparseSet pure ArrayBuffer for Transform

import { EntityId } from "../../ecs/types";
import Component from "../../ecs/Component";
import Vector3BufferView from "../../ecs/utils/Vector3BufferView";

// components
class Transform extends Component {
  private _values: Uint32Array;
  position: Vector3BufferView;
  rotation: Vector3BufferView;
  scale: Vector3BufferView;

  // TODO: more constructors...
  constructor(entityId: EntityId) {
    super(entityId);
    this._values = new Uint32Array(9);
    this.position = new Vector3BufferView(this._values);
    this.rotation = new Vector3BufferView(this._values, 3 * 4);
    this.scale = new Vector3BufferView(this._values, 6 * 4);

    // TODO: hold the parent here ???
    // this._sparent = entityId;
    // when parent transform changes, child transform changes (thats how Unity does it)
    // get/set parent ???
    // this._children = entityId[]; ???
  }

  // NO METHODS IN COMPONENTS !!! (just put this in some util library or system...)
  // distanceTo = (position: Position): number => {
  //   // TODO: wip...
  // };
}

export default Transform;

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
