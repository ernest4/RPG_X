import Component from "../../ecs/Component";
import { EntityId } from "../../ecs/types";

// TODO: optimize with ArrayBuffers ??
class Sprite extends Component {
  // TODO: make this into class / buffer view ...
  private _spriteManager: { url: string; capacity: number; cellSize: number; isPickable: boolean };
  private _sprite: { isPickable: boolean };

  constructor(entityId: EntityId) {
    super(entityId);

    // TODO: move sprite manager to it's own 'SpriteManager' component? then use parent/child
    // connection for any sprites that need the manager?
    this._spriteManager = { url: "", capacity: 0, cellSize: 0, isPickable: false };
    this._sprite = { isPickable: false };
  }

  get spriteManager() {
    return this._spriteManager;
  }

  get sprite() {
    return this._sprite;
  }

  // TODO: ...s
  // color
  // flip
  // material ??
  // sorting order (draw order) ?? need that...
}

export default Sprite;
