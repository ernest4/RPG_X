import Component from "../../ecs/Component";
import { EntityId } from "../../ecs/types";

// TODO: optimize with ArrayBuffers ??
class Camera extends Component {
  // TODO: make this into class / buffer view ...

  constructor(entityId: EntityId) {
    super(entityId);
    // wip
  }
}

export default Camera;
