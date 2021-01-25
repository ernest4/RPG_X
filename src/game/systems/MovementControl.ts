import { Engine } from "../../ecs";
import System from "../../ecs/System";
import { InputEventType, QuerySet } from "../../ecs/types";
import InputEvent from "../components/InputEvent";
import PhysicsBody from "../components/PhysicsBody";
import Player from "../components/Player";

const MOVEMENT_INPUTS = [
  { type: InputEventType.KEYDOWN, key: "A" },
  { type: InputEventType.KEYDOWN, key: "W" },
  { type: InputEventType.KEYDOWN, key: "S" },
  { type: InputEventType.KEYDOWN, key: "D" },
];

class MovementControl extends System {
  private _inputEventBuffer: InputEvent[];

  constructor(engine: Engine) {
    super(engine);
    this._inputEventBuffer = [];
  }

  start(): void {
    // throw new Error("Method not implemented.");
  }

  update(): void {
    // get movement related input events
    this.engine.query(this.filterInputEvents, InputEvent);

    // apply inputEvent to PhysicsBody
    this.engine.query(this.applyInputEvents, Player, PhysicsBody);
  }

  destroy(): void {
    // throw new Error("Method not implemented.");
  }

  private filterInputEvents = (querySet: QuerySet) => {
    const [inputEvent] = querySet as [InputEvent];

    if (this.isMovementInput(inputEvent)) this._inputEventBuffer.push(inputEvent);
  };

  private isMovementInput = ({ type, key }: InputEvent): boolean =>
    MOVEMENT_INPUTS.some(
      ({ type: existingType, key: existingKey }) => type === existingType && key === existingKey
    );

  private applyInputEvents = (querySet: QuerySet) => {
    const [player, physicsBody] = querySet as [Player, PhysicsBody];

    this._inputEventBuffer.forEach(({ type, key }) => {
      switch (key) {
        case "A":
          // TODO: magic values for now, but will probably come from some 'Stats' component that
          // defines the min/max speed of the Entity etc. (which in turn will be affected by
          // what mode of transport is in use e.g. 'on foot' or 'car' or 'helicopter' etc.)
          physicsBody.linearVelocity.x = -10;
          break;
        case "D":
          physicsBody.linearVelocity.x = 10;
          break;
        case "W":
          physicsBody.linearVelocity.y = 10;
          break;
        case "S":
          physicsBody.linearVelocity.y = -10;
          break;
        default:
          console.warn(
            "[MovementControl]: Input event not recognized, though it passed the filtering stage!"
          );
          console.warn({ key, type });
      }
    });

    this._inputEventBuffer = [];
  };
}

export default MovementControl;
