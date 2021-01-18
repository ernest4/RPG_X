import System from "../../ecs/System";
import Sprite from "../components/Sprite";
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
  const entity1 = system.engine.generateEntityId();

  const transform1 = new Transform(entity1);
  transform1.scale.z = 1;
  system.engine.addComponent(transform1);

  const sprite1 = new Sprite(entity1);
  // const display1SpriteManager = display1.spriteManager;
  // display1SpriteManager.url = "assets/turtle.jpg";
  // display1SpriteManager.capacity = 1;
  // display1SpriteManager.cellSize = 640;

  sprite1.url = "assets/turtle.jpg";

  system.engine.addComponent(sprite1);
};
