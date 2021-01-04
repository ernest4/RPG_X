import { EntityId } from "../../ecs/types";
import Component from "../../ecs/Component";

// TODO: optimize with ArrayBuffers ??

// TODO: some kinda state machine for animation...???
class Animation extends Component {
  constructor(entityId: EntityId) {
    super(entityId);
  }

  // TODO: ...
  // loop: boolean
  // animations: {'name': {startCell: number, endCell: number, frameInterval: number (time between frames)}, ...} (frame information for different animations)
}

export default Animation;
