import System from "../../ecs/System";
import Display from "../components/Display";
import Transform from "../components/Transform";

// TODO: [GameManager] this first system will orchestrate everything. Signal game serialization and
// deserialization, switch scenes signals etc.
class GameManager extends System {
  start(): void {
    // TODO:
    setUpTestScene(this);
  }

  update(): void {
    // TODO: ...
  }

  destroy(): void {}
}

export default GameManager;

const setUpTestScene = (system: System) => {
  // TODO: ...
  const sprite1 = system.engine.generateEntityId();

  const transform1 = new Transform(sprite1);
  system.engine.addComponent(transform1);

  const render1 = new Display(sprite1);
  system.engine.addComponent(render1);
};
