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

  const display1 = new Display(sprite1);
  const display1SpriteManager = display1.spriteManager;
  display1SpriteManager.url = "assets/turtle.jpg";
  display1SpriteManager.capacity = 1;
  display1SpriteManager.cellSize = 64;

  system.engine.addComponent(display1);
};
