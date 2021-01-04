// TODO: my own ecs implementation. Optimized for javascript in modern JS
// Based around Ash, though (hopefully) simpler cleaner more modern JS code, taking advantage of
// modern browser features like storing lists in arrays (that get packed in memory) rather than
// linked lists that suffer fromm cache misses.
//
// NOTE: If the array contains only objects, or a mixture of numbers and objects, it’ll
// backed by an array of pointers.
// If an array is (very) sparse, it’ll no longer be backed by an array in memory. Instead, it
// will be backed by a dictionary/hashtable, and it’ll take longer to both access elements and
// iterate through the array.
//
// NOTE: no need for for loops, modern helper methods like forEach and map / filter are optimized.
// Just make sure to use a cached Function to do logic.
//
// NOTE: if using sparse arrays, make sure to use array buffers to force localization of data,
// as regular arrays get downgraded to dictionaries by V8 once they becomes sparse. Otherwise make
// sure to fill regular arrays with 0s or something to not appear 'sparse'

import Engine from "./Engine";
// TODO: jest tests !!!!
export { Engine };

// wip...

// Entities (simple ids, generated by engine)
// Components (arrays of components, each storing entity id and also using sparse set for fast lookup) https://programmingpraxis.com/2012/03/09/sparse-sets/
// Systems (queries for engine to return all entities having certain components) (can start with
// basic naive query, later can first choose the smallest component array and only search for
// entities stemming from those).

// needs to store an iterate over the update function references for systems
// needs to be trigger by external ticker

// TODO: look at optimizing components by using ArrayBuffers where possible to store basic data
// close together in memory and maybe even in the component array...

// e.g. desired usage example (sketch) =============================================================

// interface PositionArguments {
//   entityId: EntityId;
//   x: number;
//   y: number;
//   rotation: number;
// }

// TODO: maybe go Unity way? https://docs.unity3d.com/Manual/Components.html
// Idea is that you have presets for components that are heavily optimized (as they are used all the
// time) like position and sprite components. These could be stored in pure ArrayBuffers, even in
// special ComponentList to maximize iteration speed.
//
// Then you have the catch all "Script" components that actually let you script game logic in a way
// that basically makes them equivalent to systems on their own (Systems as components idea). Of
// course there will be a default set of systems (maybe more optimized even) that handle default
// component types, including the Script components.
// Scripts system (and scripts storage) would need to be sophisticated enough to allow single
// entity to hold multiple scrip components (encapsulating logic into small nuggets).
//
// You'd have Entity class that mimic this basically https://docs.unity3d.com/Manual/class-GameObject.html
//
// NOTE: ironically it seems game developers and Unity itself are "rediscovering" ECS and going
// BACKWARDS to pure ECS approach over stray scripts https://levelup.gitconnected.com/a-simple-guide-to-get-started-with-unity-ecs-b0e6a036e707
// Citing better more modular architecture and improved performance as reasons hahahaha!
//
// BEST SOLUTION: keep everything as is basically... bets solution. That's what the new Unity DOTS
// does already. It works with system scripts and basic data component scripts.
// That said, can finish the generic implementation of ECS first, but then make an optimized version
// that uses ArrayBuffers after (either dynamically resolve which components can fit in ArrayBuffers
// or just specifically optimize the key components like Position and Velocity etc.).

// TODO: support for special Tag components? This will let you tag entities for queries.
// Tags will dynamically add new ComponentLists and systems at run time for each unique tag for
// efficient storage and query. This will be implemented using the ArrayBuffer optimization.
// So maybe not version 1...
// Otherwise tagging will be simply supported by creating empty components as tags

// TODO: some kinda state machine for animation...???
// class AnimationComponent extends Component {
//   constructor(entityId: EntityId) {
//     super(entityId);
//   }

//   // TODO: ...
//   // loop: boolean
//   // animations: {'name': {startCell: number, endCell: number, frameInterval: number (time between frames)}, ...} (frame information for different animations)
// }

// // TODO: probably want arcFollowCamera for my game...https://doc.babylonjs.com/divingDeeper/cameras
// const main = () => {
//   const engine = new Engine();

//   // input system
//   engine.addSystem(new MovementSystem(engine));
//   // render system
//   // other systems, order of addition matters!!

//   for (let i = 0; i < 10; i++) {
//     // const entityId = engine.generateEntityId();

//     // engine.addComponent(new PositionComponent(entityId, i * i, i + i, 0));
//     // engine.addComponent(new VelocityComponent(entityId, i, i, i));
//     // engine.addComponent(Velocity, [entity, i * 1, i * 1]);

//     const entity = engine.createEntity();

//     // entity.addComponent(new Transform(entity.entityId, i * i, i + i, 0));
//     // entity.addComponent(new PhysicsBody(entity.entityId, i, i, i));

//     // entity.addComponent(Position, i * i, i + i, 0);
//     // entity.addComponent(Velocity, i, i, i);

//     // entity.addComponent(Velocity,);
//     // entity.addComponent(Engine, i, i, i);
//   }

//   // some third party update function, babylon.js or phaser3 etc
//   // update = deltaTime => {
//   //   engine.update(deltaTime);
//   // };
// };
