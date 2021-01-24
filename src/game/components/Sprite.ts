import Entity from "../Entity";
import Component from "./Component";

class Sprite extends Component {
  x: number;
  y: number;
  textureUrl: any;
  frame: number;
  frameWidth: number;
  frameHeight: number;

  private _sprite!: Phaser.GameObjects.Sprite;
  private _scene!: Phaser.Scene;
  private _onReadyCallback!: Function;

  constructor(
    entity: Entity,
    x = 0,
    y = 0,
    textureUrl: string,
    frame: number,
    frameWidth: number,
    frameHeight: number
  ) {
    super(entity);
    this.x = x;
    this.y = y;
    this.textureUrl = textureUrl;
    this.frame = frame;
    this.frameWidth = frameWidth;
    this.frameHeight = frameHeight;
  }

  onAdd(onReadyCallback: Function): void {
    const { scene } = this.entity;

    this._onReadyCallback = onReadyCallback;

    const { textureUrl, frameWidth, frameHeight } = this;

    if (scene.textures.get(textureUrl).key !== "__MISSING") return this.onTextureLoaded();

    // scene.load.image(textureUrl, textureUrl); // add load task
    // scene.load.spritesheet(textureUrl, textureUrl, { frameWidth: 32, frameHeight: 48 });
    scene.load.spritesheet(textureUrl, textureUrl, { frameWidth, frameHeight });
    scene.load.once("complete", this.onTextureLoaded); // add callback of 'complete' event
    scene.load.start(); // start loading
  }

  onRemove(): void {
    // TODO: active(false); visible(false); .... pooling?

    this._sprite.destroy();
    // this._sprite = null; // destroy reference to allow garbage collection ??
  }

  private onTextureLoaded = () => {
    const {
      x,
      y,
      textureUrl,
      frame,
      entity: { scene },
    } = this;

    this._sprite = scene.add.sprite(x, y, textureUrl, frame);
    this._onReadyCallback();
  };
}

export default Sprite;
