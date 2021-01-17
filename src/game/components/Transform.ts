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
