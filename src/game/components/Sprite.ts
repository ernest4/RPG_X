import Component from "../../ecs/Component";
import { EntityId } from "../../ecs/types";

// TODO: optimize with ArrayBuffers ??
class Sprite extends Component {
  // TODO: make this into class / buffer view ...
  // private _spriteManager: { url: string; capacity: number; cellSize: number; isPickable: boolean };
  // private _sprite: { isPickable: boolean };

  constructor(entityId: EntityId) {
    super(entityId);

    // TODO: move sprite manager to it's own 'SpriteManager' component? then use parent/child
    // connection for any sprites that need the manager?
    // this._spriteManager = { url: "", capacity: 0, cellSize: 0, isPickable: false };
    // this._sprite = { isPickable: false };

    // this._quad = { frame: 0 };
    // this._image = { key: "", url: "", normalMap: "" };
    // this._spriteSheet = {
    //   key: "",
    //   url: "",
    //   normalMap: "",
    //   frameConfig: {
    //     frameWidth: 0,
    //     frameHeight: 0,
    //     startFrame: 0,
    //     // endFrame: endFrame,
    //     // margin: margin,
    //     // spacing: spacing
    //   },
    // };

    this._frame = 0;
    this._key = ""; // NOTE: will be same as url basically
    this._url = "";
    this._normalMap = null;
    this._frameWidth = 1024; // Arbitrary high value unless specified
    this._frameHeight = 1024;
    // startFrame: 0,
    // endFrame: endFrame,
    // margin: margin,
    // spacing: spacing
  }

  // get spriteManager() {
  //   return this._spriteManager;
  // }

  // get sprite() {
  //   return this._sprite;
  // }

  get quad() {
    return this._quad;
  }

  // TODO: ...s
  // color
  // flip
  // material ??
  // sorting order (draw order) ?? need that...
}

export default Sprite;
