import Component from "../../ecs/Component";
import { EntityId, InteractiveEventType } from "../../ecs/types";

// TODO: optimize with ArrayBuffers ??
class InteractiveEvent extends Component {
  type!: InteractiveEventType;
  processed: boolean;

  constructor(entityId: EntityId) {
    super(entityId);
    this.processed = false;
  }

  get pointerDown() {
    return this.type === InteractiveEventType.POINTER_DOWN;
  }

  get pointerUp() {
    return this.type === InteractiveEventType.POINTER_UP;
  }

  get pointerOver() {
    return this.type === InteractiveEventType.POINTER_OVER;
  }

  get pointerOut() {
    return this.type === InteractiveEventType.POINTER_OUT;
  }
}

export default InteractiveEvent;
