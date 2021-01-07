import { EntityId } from "./types";
import { SparseSetItem } from "./utils/SparseSet";

// custom components will extend this.
abstract class Component extends SparseSetItem {
  // NO METHODS ON COMPONENTS !!!

  constructor(entityId: EntityId) {
    super(entityId);
  }
}

export default Component;

// OK. Step back. We need to purify the approach.
// [DONE]
// [Components] need to be pure, primitive data only, numbers and strings.
// 1. this will let them be pure serializable data containers (can't serialize pointers)
// 2. ecs can stay decoupled and still have scope for ArrayBuffer optimizations

// [Renderer] needs to be entirely encapsulated in the Render system.
// 1. Will hold a scenes graph from the renderer.
// 2. Initialize and Add items to scene graph from info of Render component.
// 3. Dispose and Swap scenes based on signals from GameManger etc.
// Some sprite specific stuff, animation, instancing and events (picking) https://playground.babylonjs.com/#9RUHH#5

// [GameManager] this first system will orchestrate everything. Signal game serialization and
// deserialization, switch scenes signals etc.

// [DONE] Need to get own external tick provider for the ECS. https://github.com/abiyasa/ashteroids-js/blob/master/src/utils/tickprovider.js

// ECS stays pure. Any optimizations will be transparent to the game !!!

// Renderer doesn't care about ecs, only manages it's scene graph. Scene graph will be updated from
// components found in ECS.

// NOTE: for serializing text to binary
// var t = new TextEncoder()
// var encoded = t.encode("abcdefghijklmnopqrstuvxyz") // Uint8Array(25) [97, 98, 99, 100, 101, 102, 103, 104, 105, 106, 107, 108, 109, 110, 111, 112, 113, 114, 115, 116, 117, 118, 120, 121, 122]
// var d = new TextDecoder("utf-8");
// d.decode(encoded); // "abcdefghijklmnopqrstuvxyz"
