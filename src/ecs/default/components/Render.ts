import Component from "../../Component";
import { EntityId } from "../../types";

// TODO: optimize with ArrayBuffers ??
class Render extends Component {
  constructor(entityId: EntityId) {
    super(entityId);
  }

  // TODO: ...
  // sprite
  // sprite manager
  // color
  // flip
  // material ??
  // sorting order (draw order) ??

  serialize(): void {
    throw new Error("Method not implemented.");
  }

  load(componentObject: any): void {
    throw new Error("Method not implemented.");
  }
}

export default Render;
