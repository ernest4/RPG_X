import Component from "../../ecs/Component";
import { EntityId } from "../../ecs/types";

class Sprite extends Component {
  textureUrl!: string;
  frame: number;
  frameWidth!: number;
  frameHeight!: number;

  constructor(entityId: EntityId) {
    super(entityId);
    this.frame = 0;
  }
}

export default Sprite;
