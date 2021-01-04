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

import { EntityId } from "../../ecs/types";
import Component from "../../ecs/Component";

// TODO: optimize with ArrayBuffers
class PhysicsBody extends Component {
  _values: number[];
  // TODO: ...
  constructor(entityId: EntityId) {
    super(entityId);
    this._values = [];
  }
}

export default PhysicsBody;
