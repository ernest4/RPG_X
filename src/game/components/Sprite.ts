import Component from "../../ecs/Component";
import { EntityId } from "../../ecs/types";

// TODO: create parent 'LoadableComponent/AsyncComponent extends Component' that contains the common 'loaded' boolean ??
class Sprite extends Component {
  textureUrl: string;
  frame: number;
  frameWidth: number;
  frameHeight: number;
  loaded: boolean;
  phaserSpriteRef: Phaser.GameObjects.Sprite | undefined; // NOTE: this should be ignored / discarded by any serializer

  constructor(entityId: EntityId) {
    super(entityId);
    this.frame = 0;
    this.loaded = false;
    this.textureUrl = "";
    this.frameWidth = 0;
    this.frameHeight = 0;
  }
}

export default Sprite;
