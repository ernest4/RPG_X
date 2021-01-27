import Component from "../../ecs/Component";
import { EntityId } from "../../ecs/types";

// TODO: create parent 'LoadableComponent/AsyncComponent extends Component' that contains the common 'loaded' boolean ??
class Interactive extends Component {
  loaded: boolean;
  private _onPointerDown: boolean;
  private _onPointerUp: boolean;
  private _onPointerOver: boolean;
  private _onPointerOut: boolean;

  constructor(entityId: EntityId) {
    super(entityId);
    this.loaded = false;
    this._onPointerDown = false;
    this._onPointerUp = false;
    this._onPointerOver = false;
    this._onPointerOut = false;
  }

  get onPointerDown() {
    return this._onPointerDown;
  }

  set onPointerDown(value) {
    this.loaded = false; // mark as dirty and in need of re-initialization
    this._onPointerDown = value;
  }

  get onPointerUp() {
    return this._onPointerUp;
  }

  set onPointerUp(value) {
    this.loaded = false; // mark as dirty and in need of re-initialization
    this._onPointerUp = value;
  }

  get onPointerOver() {
    return this._onPointerOver;
  }

  set onPointerOver(value) {
    this.loaded = false; // mark as dirty and in need of re-initialization
    this._onPointerOver = value;
  }

  get onPointerOut() {
    return this._onPointerOut;
  }

  set onPointerOut(value) {
    this.loaded = false; // mark as dirty and in need of re-initialization
    this._onPointerOut = value;
  }
}

export default Interactive;
