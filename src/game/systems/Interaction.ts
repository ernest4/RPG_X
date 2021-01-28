import { Engine } from "../../ecs";
import System from "../../ecs/System";
import { InteractiveEventType, InteractiveObject, QuerySet } from "../../ecs/types";
import Sprite from "../components/Sprite";
import Interactive from "../components/Interactive";
import InteractiveEvent from "../components/InteractiveEvent";
import SparseSet from "../../ecs/utils/SparseSet";

class Interaction extends System {
  private _interactiveEventObjectBuffer: InteractiveObject[];
  private _interactiveComponentsSet: SparseSet;

  constructor(engine: Engine) {
    super(engine);
    this._interactiveEventObjectBuffer = [];
    this._interactiveComponentsSet = new SparseSet();
  }

  start(): void {
    // async collect input events into buffer
    // this._inputs.forEach(this.registerInputCallback);
  }

  // TODO: end goal is to generate event components ('InteractiveEvent') that correspond to the appropriate entity ??
  update(): void {
    this.engine.query(this.registerInteractiveEntityListeners, Interactive);
    this.disposeUnusedInteractiveComponents();

    // TODO: deal with creation and removal of InteractiveEvent components
    this.engine.query(this.cleanUpInteractiveEventComponents, InteractiveEvent);
    this.createInteractiveEventComponents();
  }

  destroy(): void {}

  private registerInteractiveEntityListeners = (querySet: QuerySet) => {
    const [interactive] = querySet as [Interactive];

    const sprite = this.engine.getComponent<Sprite>(Sprite, interactive.id);

    // NOTE: Interactive without Sprite doesn't make sense, so dispose of it
    if (!sprite) return this.disposeUnusedInteractiveComponent(interactive);
    if (!sprite.loaded) return; // NOTE: sprite not ready to register listeners yet
    if (interactive.loaded) return (interactive.processed = true);

    // We have a a valid new Interactive component, or existing one with listener changes...
    const phaserSprite = sprite.phaserSpriteRef!;
    phaserSprite.setInteractive();

    const spriteInteractionEventHandler = (type: InteractiveEventType) => {
      this._interactiveEventObjectBuffer.push({ type, entityId: interactive.id });
    };

    // deregister all listeners
    this.deregisterInteractiveListeners(phaserSprite);

    // re-register relevant listeners
    if (interactive.onPointerDown) {
      phaserSprite.on(InteractiveEventType.POINTER_DOWN, () =>
        spriteInteractionEventHandler(InteractiveEventType.POINTER_DOWN)
      );
    }

    if (interactive.onPointerUp) {
      phaserSprite.on(InteractiveEventType.POINTER_UP, () =>
        spriteInteractionEventHandler(InteractiveEventType.POINTER_UP)
      );
    }

    if (interactive.onPointerOver) {
      phaserSprite.on(InteractiveEventType.POINTER_OVER, () =>
        spriteInteractionEventHandler(InteractiveEventType.POINTER_OVER)
      );
    }

    if (interactive.onPointerOut) {
      phaserSprite.on(InteractiveEventType.POINTER_OUT, () =>
        spriteInteractionEventHandler(InteractiveEventType.POINTER_OUT)
      );
    }

    interactive.loaded = true;
    interactive.processed = true; // NOTE: mark scene items as processed, so disposeUnusedInteractiveComponents() leaves it alone

    // keep track of interactive component ref
    this._interactiveComponentsSet.add(interactive);
  };

  private deregisterInteractiveListeners = (phaserSprite: Phaser.GameObjects.Sprite) => {
    phaserSprite.off(InteractiveEventType.POINTER_DOWN);
    phaserSprite.off(InteractiveEventType.POINTER_UP);
    phaserSprite.off(InteractiveEventType.POINTER_OVER);
    phaserSprite.off(InteractiveEventType.POINTER_OUT);
  };

  private disposeUnusedInteractiveComponents = () => {
    this._interactiveComponentsSet.stream((interactive: Interactive) => {
      this.disposeUnusedInteractiveComponent(interactive);
    });
  };

  private disposeUnusedInteractiveComponent = (interactive: Interactive) => {
    if (interactive.processed) {
      interactive.processed = false; // NOTE: reset the flag before next update
      return;
    }

    const sprite = this.engine.getComponent<Sprite>(Sprite, interactive.id);

    const phaserSprite = sprite?.phaserSpriteRef;

    // deregister listeners if phaser sprite ref present. If sprite not present, then it must have
    // de-registered all listeners before removal anyway.
    if (phaserSprite) this.deregisterInteractiveListeners(phaserSprite);

    this._interactiveComponentsSet.remove(interactive);
    // NOTE: Interactive without Sprite doesn't make sense, so remove it from entity
    if (!sprite) this.engine.removeComponent(interactive);
  };

  // any input events that have travelled full circle and weren't removed by any system are removed
  private cleanUpInteractiveEventComponents = (querySet: QuerySet) => {
    const [interactiveEvent] = querySet as [InteractiveEvent];

    this.engine.removeComponent(interactiveEvent);
  };

  // NOTE: these get attached to same entity (so only 1 exists at a time?? buggy ??)
  private createInteractiveEventComponents = () => {
    this._interactiveEventObjectBuffer.forEach(({ type, entityId }) => {
      const interactiveEvent = new InteractiveEvent(entityId);
      interactiveEvent.type = type;
      this.engine.addComponent(interactiveEvent);
    });

    this._interactiveEventObjectBuffer = [];
  };
}

export default Interaction;
