import Engine from "../../Engine";
import System from "../../System";

class TestySystem extends System {
  // TODO: ...
  start(): void {
    throw new Error("Method not implemented.");
  }
  update(): void {
    throw new Error("Method not implemented.");
  }
  destroy(): void {
    throw new Error("Method not implemented.");
  }
}

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
  describe("#query", () => {});
  describe("#deltaTime", () => {});
});
