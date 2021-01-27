import { Scene } from "phaser";
import { Engine } from "../../ecs";
import System from "../../ecs/System";
import { InputEventType, InputObject, QuerySet } from "../../ecs/types";
import InputEvent from "../components/InputEvent";
import Sprite from "../components/Sprite";
import Interactive from "../components/Interactive";

class Interaction extends System {
  private _interactiveEventObjectBuffer: InputObject[];

  constructor(engine: Engine) {
    super(engine);
    this._interactiveEventObjectBuffer = [];
  }

  start(): void {
    // async collect input events into buffer
    // this._inputs.forEach(this.registerInputCallback);
  }

  update(): void {
    this.engine.query(this.registerInteractiveEntityListeners, Sprite, Interactive);
    // this.engine.query(this.cleanUpEvents, InputEvent);
    // sync flush input event buffer and create a sequence of input events
    // this.createInteractiveEventEntities();
  }

  destroy(): void {}

  private registerInteractiveEntityListeners = (querySet: QuerySet) => {
    const [sprite, interactive] = querySet as [Sprite, Interactive];

    if (!sprite.loaded) return;
    if (interactive.loaded) return;

    sprite.phaserSpriteRef?.setInteractive();

    // deregister all listeners
    sprite.phaserSpriteRef?.off("pointerdown", () => {});
    sprite.phaserSpriteRef?.off("pointerup", () => {});
    sprite.phaserSpriteRef?.off("pointerover", () => {});
    sprite.phaserSpriteRef?.off("pointerout", () => {});

    // re-register relevant listeners
    if(interactive.onPointerDown) sprite.phaserSpriteRef?.on("pointerdown", () => {});
    // sprite.phaserSpriteRef?.[interactive.onPointerDown ? "on" : "off"]("pointerup", () => {});
    // sprite.phaserSpriteRef?.[interactive.onPointerDown ? "on" : "off"]("pointerover", () => {});
    // sprite.phaserSpriteRef?.[interactive.onPointerDown ? "on" : "off"]("pointerout", () => {});
    // TODO: ...

    interactive.loaded = true;
  };

  // private registerInputCallback = ({ type, key }: InputObject) => {
  //   this._scene.input.keyboard.on(`${type}-${key}`, (e: any) => {
  //     this._interactiveEventObjectBuffer.push({ type, key });
  //   });
  // };

  // any input events that have travelled full circle and weren't removed by any system are removed
  // private cleanUpEvents = (querySet: QuerySet) => {
  //   const [inputEvent] = querySet as [InputEvent];

  //   // NOTE: for the moment, this is non-leaky as removeEntity will reclaim the entityId. This is
  //   // good as input events will occur and disappear all the time...
  //   this.engine.removeEntity(inputEvent.id);
  // };

  private createInteractiveEventEntities = () => {
    // this._interactiveEventObjectBuffer.forEach(({ type, key }) => {
    //   const entityId = this.engine.generateEntityId();
    //   const inputEvent = new InputEvent(entityId);
    //   inputEvent.type = type;
    //   inputEvent.key = key;
    //   this.engine.addComponent(inputEvent);
    // });
    // this._interactiveEventObjectBuffer = [];
  };
}

export default Interaction;
