import { EntityId } from "../../types";
import Component from "../../Component";

// TODO: optimize with ArrayBuffers ??
class Tag extends Component {
  constructor(entityId: EntityId) {
    super(entityId);
  }

  serialize(): void {
    throw new Error("Method not implemented.");
  }

  load(componentObject: any): void {
    throw new Error("Method not implemented.");
  }
}

export default Tag;
