import Component from "../../ecs/Component";
import { EntityId } from "../../ecs/types";

// TODO: Sprite a separate (and only) render component ? (A Mesh for 3d one ?)

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
  // sorting order (draw order) ?? need that...

  serialize(): void {
    throw new Error("Method not implemented.");
  }

  load(componentObject: any): void {
    throw new Error("Method not implemented.");
  }
}

export default Render;
