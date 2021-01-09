import Component from "../../ecs/Component";
import { EntityId } from "../../ecs/types";

// TODO: Sprite a separate (and only) render component ? (A Mesh for 3d one ?)

// TODO: optimize with ArrayBuffers ??
class Mesh extends Component {
  // private _is2d: boolean;
  // // TODO: make this into class / buffer view ...
  // private _spriteManager: { url: string; capacity: number; cellSize: number; isPickable: boolean };
  // private _sprite: { isPickable: boolean };

  constructor(entityId: EntityId) {
    super(entityId);
    // WIIIIP
    // TODO: mesh & material

    // this._is2d = true;

    // // TODO: move sprite manager to it's own component? then use parent/child connection for any
    // // sprites that need the manager?
    // this._spriteManager = { url: "", capacity: 0, cellSize: 0, isPickable: false };
    // this._sprite = { isPickable: false };
  }

  // get is2d() {
  //   return this._is2d;
  // }

  // get spriteManager() {
  //   return this._spriteManager;
  // }

  // get sprite() {
  //   return this._sprite;
  // }

  // TODO: ...s
  // color
}

export default Mesh;
