import { Scene } from "phaser";
import { Engine } from "../../ecs";
import System from "../../ecs/System";
import { InputEventType, InputObject, QuerySet } from "../../ecs/types";
import InputEvent from "../components/InputEvent";

const DEFAULT_INPUTS = [
  { type: InputEventType.KEYDOWN, key: "UP" },
  { type: InputEventType.KEYDOWN, key: "DOWN" },
  { type: InputEventType.KEYDOWN, key: "LEFT" },
  { type: InputEventType.KEYDOWN, key: "RIGHT" },
  { type: InputEventType.KEYDOWN, key: "A" },
  { type: InputEventType.KEYDOWN, key: "W" },
  { type: InputEventType.KEYDOWN, key: "S" },
  { type: InputEventType.KEYDOWN, key: "D" },
];

class Input extends System {
  private _scene: Scene;
  private _inputs: InputObject[];

  constructor(engine: Engine, scene: Scene, inputs?: InputObject[] | undefined) {
    super(engine);
    this._scene = scene;
    this._inputs = inputs || DEFAULT_INPUTS;
  }

  start(): void {
    this._inputs.forEach(this.registerInputCallback);
  }

  update(): void {
    this.engine.query(this.cleanUpEvents, InputEvent);
  }

  private registerInputCallback = ({ type, key }: InputObject) => {
    this._scene.input.keyboard.on(`${type}-${key}`, (e: any) => {
      const entityId = this.engine.generateEntityId();
      const inputEvent = new InputEvent(entityId);
      inputEvent.type = type;
      inputEvent.key = key;
      this.engine.addComponent(inputEvent);
    });
  };

  // any input events that have travelled full circle and weren't removed by any system are removed
  private cleanUpEvents = (querySet: QuerySet) => {
    const [inputEvent] = querySet as [InputEvent];

    // NOTE: for the moment, this is non-leaky as removeEntity will reclaim the entityId. This is
    // good as input events will occur and disappear all the time...
    this.engine.removeEntity(inputEvent.id);
  };

  destroy(): void {}
}

export default Input;
