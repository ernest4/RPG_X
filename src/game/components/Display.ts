import { Sprite, SpriteManager } from "babylonjs";
import Component from "../../ecs/Component";
import { EntityId } from "../../ecs/types";

// TODO: Sprite a separate (and only) render component ? (A Mesh for 3d one ?)

// TODO: optimize with ArrayBuffers ??
class Display extends Component {
  private _inScene: boolean;
  private _shouldDispose: boolean;
  private _is2d: boolean;
  // TODO: make this into class / buffer view ...
  private _spriteManager: {
    url: string;
    capacity: number;
    cellSize: number;
    isPickable: false;
    ref?: SpriteManager; // This is just for render engine, wont be useful when serialized...
  };
  private _sprite: {
    isPickable: boolean;
    ref?: Sprite; // This is just for render engine, wont be useful when serialized...
  };

  constructor(entityId: EntityId) {
    super(entityId);
    this._inScene = false;
    this._shouldDispose = false;
    this._is2d = true;

    // TODO: move sprite manager to it's own component? then use parent/child connection for any
    // sprites that need the manager?
    this._spriteManager = { url: "", capacity: 0, cellSize: 0, isPickable: false };
    this._sprite = { isPickable: false };
  }

  get inScene() {
    return this._inScene;
  }

  get shouldDispose() {
    return this._shouldDispose;
  }

  get is2d(){
    return this._is2d
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

export default Display;
