import System from "../../ecs/System";

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
};
