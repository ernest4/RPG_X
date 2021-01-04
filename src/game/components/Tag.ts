import { EntityId } from "../../ecs/types";
import Component from "../../ecs/Component";

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
