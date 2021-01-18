import Component from "../../ecs/Component";
import { EntityId } from "../../ecs/types";

// TODO: optimize with ArrayBuffers ??
class Sprite extends Component {
  // TODO: make this into class / buffer view ...
  // private _spriteManager: { url: string; capacity: number; cellSize: number; isPickable: boolean };
  // private _sprite: { isPickable: boolean };

  // private _key: string;
  url: string;
  frame: number;
  normalMap: null;
  frameWidth: number;
  frameHeight: number;

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

    // this._key = ""; // NOTE: will be same as url basically
    this.url = "";
    this.frame = 0;
    this.normalMap = null;
    this.frameWidth = 1024; // Arbitrary high value unless specified
    this.frameHeight = 1024;
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

  // get frame() {
  //   return this._quad;
  // }

  // get quad() {
  //   return this._quad;
  // }

  // TODO: ...s
  // color
  // flip
  // material ??
  // sorting order (draw order) ?? need that...
}

export default Sprite;
