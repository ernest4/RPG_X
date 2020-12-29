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

export const ECS = {};

// wip...

// Entities (simple ids, generated by engine)
// Components (arrays of components, each storing entity id and also using sparse set for fast lookup) https://programmingpraxis.com/2012/03/09/sparse-sets/
// Systems (queries for engine to return all entities having certain components) (can start with
// basic naive query, later can first choose the smallest component array and only search for
// entities stemming from those).

// needs to store an iterate over the update function references for systems
// needs to be trigger by external ticker
class Engine {
  updating: boolean;
  updateComplete: any; // TODO: better type?

  constructor() {
    // TODO: ...
    this.updating = false;
    // this.updateComplete = new signals.Signal(); // TODO: signals?? https://github.com/millermedeiros/js-signals
  }

  // TODO: system & priority integer
  addSystem = (system, priority) => {};

  // getSystem

  // removeSystem

  // removeAllSystems

  // TODO: ...
  generateEntityId = () => {};

  // TODO: ... probably involves purging components too
  removeEntity = () => {};

  // TODO: ... probably involves purging components too
  removeAllEntities = () => {};

  update = (deltaTime: number) => {
    // TODO: cycle through the systems, in priority

    this.updating = true;
    // Ash snippet
    // for (var system = this.systemList.head; system; system = system.next) {
    //   system.update(time);
    // }
    this.updating = false;
    // this.updateComplete.dispatch(); // TODO: signals??
  };
}

// custom components will extend this.
class Component {
  // TODO: need to enforce passing in entity id as first and mandatory item, followed by any number
  // of params
  constructor(entityId: number, ...rest: any[]) {
    // TODO: ...
  }
}

// TODO: look at optimizing components by using ArrayBuffers where possible to store basic data
// close together in memory and maybe even in the component array...

class System {
  constructor() {
    // TODO: ...
  }

  update = (deltaTime: number) => {
    throw new Error("unimplemented");
  };
}
