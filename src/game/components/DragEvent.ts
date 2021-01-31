import Component from "../../ecs/Component";
import { EntityId } from "../../ecs/types";

// TODO: optimize with ArrayBuffers ??
class DragEvent extends Component {
  processed: boolean;
  dragX!: number;
  dragY!: number;

  constructor(entityId: EntityId) {
    super(entityId);
    this.processed = false;
  }
}

export default DragEvent;
