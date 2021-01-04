import { EntityId } from "./types";

// custom components will extend this.
abstract class Component {
  // NO METHODS ON COMPONENTS !!!
  entityId: EntityId;

  constructor(entityId: EntityId) {
    this.entityId = entityId;
  }
}

export default Component;

// OK. Step back. We need to purify the approach.
// [Components] need to be pure, primitive data only, numbers and strings.
// 1. this will let them be pure serializable data containers (can't serialize pointers)
// 2. ecs can stay decoupled and still have scope for ArrayBuffer optimizations

// [Renderer] needs to be entirely encapsulated in the Render system.
// 1. Will hold a scenes graph from the renderer.
// 2. Initialize and Add items to scene graph from info of Render component.
// 3. Dispose and Swap scenes based on signals from GameManger etc.

// [GameManager] this first system will orchestrate everything. Signal game serialization and
// deserialization, switch scenes signals etc.

// Need to get own external tick provider for the ECS. https://github.com/abiyasa/ashteroids-js/blob/master/src/utils/tickprovider.js

// ECS stays pure. Any optimizations will be transparent to the game !!!

// Renderer doesn't care about ecs, only manages it's scene graph. Scene graph will be updated from
// components found in ECS.