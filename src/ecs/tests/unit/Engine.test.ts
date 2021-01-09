import Engine from "../../Engine";
import System from "../../System";

class TestySystem1 extends System {
  // TODO: ...
  constructor(engine: Engine) {
    super(engine);
  }

  start(): void {
    // TODO: add some entities for testing...
    throw new Error("Method not implemented.");
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
  destroy(): void {
    throw new Error("Method not implemented.");
  }
}

// class TestySystem2 extends System {
//
// }

// class TestySystem3 extends System {
//
// }

describe(Engine, () => {
  //
  it("...", () => {});

  describe("#addSystem", () => {});
  describe("#addComponent", () => {});
  describe("#removeComponent", () => {});
  describe("#generateEntityId", () => {});
  describe("#removeEntity", () => {});
  describe("#removeAllEntities", () => {});
  describe("#update", () => {});
  describe("#query", () => {
    // context -> when no components exist in a list
    // context -> when lists are different lengths
    // ...
  });
  describe("#deltaTime", () => {});
});
