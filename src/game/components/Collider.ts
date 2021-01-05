import { EntityId } from "../../ecs/types";
import Component from "../../ecs/Component";

// TODO: optimize with ArrayBuffers ??
class Collider extends Component {
  constructor(entityId: EntityId) {
    super(entityId);
  }
}

export default Collider;
