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

// TODO: jest tests !!!!
export const ECS = {};

// wip...

// Entities (simple ids, generated by engine)
// Components (arrays of components, each storing entity id and also using sparse set for fast lookup) https://programmingpraxis.com/2012/03/09/sparse-sets/
// Systems (queries for engine to return all entities having certain components) (can start with
// basic naive query, later can first choose the smallest component array and only search for
// entities stemming from those).

// needs to store an iterate over the update function references for systems
// needs to be trigger by external ticker

// NOTE: more custom type examples
// type Foot = number;
// type Pound = number;

// type Patient = {
//   name: string;
//   height: Foot;
//   weight: Pound;
// };

// TODO: entity wrapper ??
class Entity {
  private _entityId: number;
  private _engine: Engine;

  constructor(entityId: EntityId, engine: Engine) {
    this._entityId = entityId;
    this._engine = engine;
  }

  get entityId() {
    return this._entityId;
  }

  // getComponent = <T extends Component>(componentClass: T) => {
  //   return this._engine.getComponent(componentClass);
  // };

  // addComponent = (component: Comment): Component => {
  //   // TODO: ...
  // };

  // other util methods... ??
}

// TODO: need a finiteStateMachine as well. https://www.richardlord.net/blog/ecs/finite-state-machines-with-ash.html
class EntityStateMachine {
  // TODO: wip

  createState = (name: string) => {
    // TODO: ...
  };

  // TODO: this will probably live on some 'State' class as part of FSM stuff, instead of EntityStateMachine
  add = (componentName: Symbol) => {
    // TODO: add component to particular state (needs to be called on state)
  };

  // TODO: this will probably live on some 'State' class as part of FSM stuff, instead of EntityStateMachine
  withInstance = (component: Component) => {
    // TODO: add component instance to particular state (needs to be called on state)
  };
}

type DeltaTime = number;
type EntityId = number;
type QuerySet = Component[];
type ComponentClass = { name: string; prototype: Component };
class Engine {
  _deltaTime: DeltaTime;
  updating: boolean;
  updateComplete: any; // TODO: better type?
  systemUpdateFunctions: ((engine: Engine, deltaTime: DeltaTime) => void)[];
  componentLists: { [key: string]: ComponentList };
  // oldEntityIdsPool: EntityId[];
  entityIdPool: EntityIdPool;

  constructor() {
    // TODO: ...
    this.systemUpdateFunctions = [];
    this._deltaTime = 0;
    this.updating = false;
    this.componentLists = {};
    // this.updateComplete = new signals.Signal(); // TODO: signals?? https://github.com/millermedeiros/js-signals
    this.entityIdPool = new EntityIdPool({});
  }

  addSystem = (system: System, priority?: number) => {
    // TODO: priority integer sorting
    // simple priority based on insertion order for now...
    this.systemUpdateFunctions.push(system.update);
  };

  // getSystem

  // removeSystem

  // removeAllSystems

  addComponent = (component: Component) => {
    // NOTE: indexing using component class name
    const componentClassName = component.constructor.name;
    let componentList = this.componentLists[componentClassName];

    if (!componentList) {
      componentList = new ComponentList();
      this.componentLists[componentClassName] = componentList;
    }

    componentList.add(component);

    return component;
  };

  removeComponent = (component: Component) => {
    // NOTE: indexing using component class name
    const componentClassName = component.constructor.name;
    const componentList = this.componentLists[componentClassName];
    if (!componentList) return;

    // const oldEntityId = componentList.remove(component);
    componentList.remove(component);
  };

  // TODO: ...
  // removeComponent = (componentClass, entityId) => {};

  // TODO: ...
  // getComponent = (componentClass, entityId) => {};

  createEntity = (): Entity => {
    return new Entity(this.generateEntityId(), this);

    // TODO: every single entity have PositionComponent and TagComponent by default ????
    // entity.addComponent(new PositionComponent(...))
    // entity.addComponent(new TagComponent(...))
    // return entity;
  };

  generateEntityId = (): EntityId => this.entityIdPool.getId();

  // TODO: ... involves purging all related components too
  removeEntity = (entityId: EntityId) => {
    // NOTE: In EnTT this happens by iterating every single sparse set in the registry, checking if it contains the entity, and deleting it if it does.
    Object.values(this.componentLists).forEach(componentList => {
      // TODO: add remove(entityId: EntityId) to ComponentList to remove component by entityId
      // more efficiently than this...
      const component = componentList.get(entityId);
      if (component) componentList.remove(component);
    });

    // TODO: reclaim entityId to be reused only when deleting Entity (for now) i.e. when all components gone...
    this.entityIdPool.reclaimId(entityId);
  };

  // TODO: ... probably involves purging components too
  removeAllEntities = () => {};

  update = (deltaTime: DeltaTime) => {
    this.deltaTime = deltaTime;
    // TODO: cycle through the systems, in priority
    this.updating = true;
    this.systemUpdateFunctions.forEach(this.callSystemUpdateFunction);
    this.updating = false;
    // this.updateComplete.dispatch(); // TODO: signals??
  };

  *getQuerySetIteratorFor(...componentClasses: ComponentClass[]) {
    // TODO: ...
    // Query function will take shortest componentlist and loop throught the dense list of it.
    // For each denselist component with valid entityid, will check that components entityid against the rest of desired component lists and get those components (if present).
    // If no early bailouts (so all query conditions met) yield the queryset.
    // Query should be streamed via the query set, letting you operate on each component, instead of constructing an array of all results (dont waste time creating intermediary array...)

    // NOTE: finding shortest component list
    let shortestComponentListIndex = 0;

    let shortestComponentList = this.componentLists[
      componentClasses[shortestComponentListIndex].name
    ];
    componentClasses.forEach((componentClass, index) => {
      const nextShortestComponentList = this.componentLists[componentClass.name];

      if (nextShortestComponentList.size < shortestComponentList.size) {
        shortestComponentList = nextShortestComponentList;
        shortestComponentListIndex = index;
      }
    });

    // NOTE: cycling through the shortest component list
    // const componentsIterator = shortestComponentList.denseListStream();
    const componentsIterator = shortestComponentList.denseListStreamClean();

    for (const component of componentsIterator) {
      // TODO: if the entity of this component, has all the other componentClasses, yield it and it's components
      // otherwise, continue
      // componentClasses.forEach((componentClass, index) => {

      // });

      const entityId = component.entityId;

      // TODO: optimize by caching querySet array ??
      const querySet: QuerySet = [];

      const componentClassesLength = componentClasses.length;
      for (let i = 0; i < componentClassesLength; i++) {
        if (i === shortestComponentListIndex) continue; // NOTE: skip checking the shortest list !

        const componentClassName = componentClasses[i].name;
        const anotherComponent = this.componentLists[componentClassName].get(entityId);

        if (anotherComponent) querySet.push(anotherComponent);
        else break; // NOTE: soon as we discover a missing component, abandon further pointless search for that entityId !

        // NOTE: yield querySet if all components found for entityId
        if (i + 1 === componentClassesLength) yield querySet;
      }
    }
  }

  get deltaTime() {
    return this._deltaTime;
  }

  // private

  private callSystemUpdateFunction(
    systemUpdateFunction: (engine: Engine, deltaTime: DeltaTime) => void
  ) {
    systemUpdateFunction(this, this.deltaTime);
  }
}

type EntityIdPoolParams = {
  lastUsedEntityId?: EntityId;
  reclaimedEntityIdPool?: EntityId[];
  reclaimedEntityIdPoolSize?: number;
};

class EntityIdPool {
  private _lastUsedEntityId: EntityId;
  private _reclaimedEntityIdPoolSize: number;
  private _reclaimedEntityIdPool: EntityId[];
  // TODO: ...
  // first check this.oldEntityIdsPool ...
  // TODO: for the pool, you dont want to pop() or shrink the array. Use an array, keep custom
  // index tracker that gets incremented with each new item.
  // When removing, return the last item and count down the item counter.
  // Don't actually delete or pop off anything. This array needs to as fast as anything else.
  // Probably need a custom class for this as well?? FreeEntityIdPool ??
  // otherwise if pool is empty ...
  // keep track of this.lastEntityId and get the next integer after
  // maybe package this and above pool into single class EntityIdPool ??

  // TODO: need to think about when and how this entityId pool will be saved and reinitialized
  // along with the rest of the games entities...
  constructor({
    lastUsedEntityId,
    reclaimedEntityIdPool,
    reclaimedEntityIdPoolSize,
  }: EntityIdPoolParams) {
    this._lastUsedEntityId = lastUsedEntityId || -1;
    this._reclaimedEntityIdPool = reclaimedEntityIdPool || [];
    this._reclaimedEntityIdPoolSize = reclaimedEntityIdPoolSize || 0;
  }

  reclaimId = (entityId: EntityId) => {
    this._reclaimedEntityIdPool[++this._reclaimedEntityIdPoolSize] = entityId;
  };

  getId = (): EntityId => {
    this._reclaimedEntityIdPoolSize--;

    if (0 < this._reclaimedEntityIdPoolSize) {
      return this._reclaimedEntityIdPool[this._reclaimedEntityIdPoolSize];
    }

    return ++this._lastUsedEntityId;
  };
}

// custom components will extend this.
class Component {
  entityId: EntityId;

  constructor(entityId: EntityId) {
    this.entityId = entityId;
  }
}

class ComponentList {
  // TODO: based on https://programmingpraxis.com/2012/03/09/sparse-sets/
  // has dense set (primary iteration) and sparse set (fast membership lookup)
  denseList: Component[];
  denseListComponentCount: number;
  sparseList: number[];

  constructor() {
    // TODO: will want to optimize these lists to use ArrayBuffer for dense memory access where
    // possible.
    this.denseList = [];
    this.denseListComponentCount = 0;
    // TODO: Sparse lists will become hash maps in V8 optimizer. They are less efficient in speed
    // compared too arrays. So maybe use fixed size ArrayBuffer as well? Dynamically grow it yourself?
    this.sparseList = [];
  }

  add = (component: Component) => {
    // TODO: once entity (or component) is removed, there will be holes in the list. The entity will
    // be there but will have -1 for entityId. Over time you might end up with large gaps of -1...
    // Since we can't delete elements from array without downgrading it to slower data type on V8,
    // need to instead reuse those slots with new components (for new entityIds).
    // For this to work, the global engine needs to be aware of what entityIds have been released
    // out and reuse them when returning from engine.generateEntityId().

    const currentComponentEntityId = component.entityId;

    const existingComponent = this.get(currentComponentEntityId);

    if (!existingComponent?.entityId || existingComponent.entityId === -1) {
      // NOTE: plug the existing free entity component slot in dense list
      this.denseList[this.sparseList[currentComponentEntityId]] = component;
    } else {
      // NOTE: create new entity component slot
      const denseListIndex = this.denseList.push(component);
      this.sparseList[currentComponentEntityId] = denseListIndex;
    }

    this.denseListComponentCount++;
  };

  has = (entityId: EntityId): boolean => !!this.get(entityId);

  get = (entityId: EntityId): Component | null => {
    const denseListIndex = this.sparseList[entityId];
    const component = this.denseList[denseListIndex];

    if (this.denseListComponentCount < denseListIndex) return null;
    if (component.entityId !== entityId) return null;

    return component;
  };

  remove = (component: Component): EntityId | undefined => {
    const denseListIndex = this.sparseList[component.entityId];

    // const currentEntityId = ...
    if (this.denseListComponentCount < denseListIndex) return;
    // if (this.denseList[denseListIndex].entityId !== component.entityId) return;
    if (this.denseList[denseListIndex] !== component) return; // NOTE: entity object ref should work as well...

    const oldEntityId = component.entityId;
    // this.denseList[denseListIndex].entityId = -1; // NOTE: -1 designates unused / invalid entityId
    component.entityId = -1; // NOTE: -1 designates unused / invalid entityId // NOTE: entity object ref should work as well...

    return oldEntityId;
  };

  get size() {
    return this.denseListComponentCount;
  }

  *denseListStream() {
    for (let i = 0; i < this.denseListComponentCount; i++) {
      yield this.denseList[i];
    }
  }

  *denseListStreamClean() {
    for (let i = 0; i < this.denseListComponentCount; i++) {
      const component = this.denseList[i];

      if (!component?.entityId || component.entityId === -1) continue;

      yield component;
    }
  }
}

// TODO: look at optimizing components by using ArrayBuffers where possible to store basic data
// close together in memory and maybe even in the component array...

class System {
  // deltaTime: DeltaTime;
  private _engine: Engine;
  // engine: Engine;

  // constructor(engine: Engine) {
  //   // TODO: ...
  //   this.engine = engine;
  // }

  constructor(engine: Engine) {
    // TODO: ...
    // this.deltaTime = 0;
    this._engine = engine;
  }

  start() {
    // TODO: init stuff, engine should run this when system right after system is added
    throw new Error("unimplemented");
  }

  // update = (deltaTime: DeltaTime) => {
  //   throw new Error("unimplemented");
  // };

  update() {
    throw new Error("unimplemented");
  }

  destroy() {
    // TODO: clean up stuff, engine should run this when system right before system is removed
    throw new Error("unimplemented");
  }

  get engine() {
    return this._engine;
  }

  get deltaTime() {
    return this._engine.deltaTime;
  }
}

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
class Position extends Component {
  _values: number[];
  // TODO: ...

  // nice interface example, but wanna keep things fast...
  // constructor({ entityId, x, y, rotation }: PositionArguments) {
  //   super(entityId);
  //   this._values = [x, y, rotation];
  // }

  constructor(entityId: EntityId, x: number, y: number, rotation: number) {
    super(entityId);
    this._values = [x, y, rotation];
  }

  // TODO: dynamically create these???
  // Heres JS snippet as guide https://github.com/playcanvas/engine/blob/master/src/framework/components/component.js#L35
  // maybe...couldn't seem to get it working properly in console.
  get x() {
    return this._values[0];
  }

  set x(value: number) {
    this._values[0] = value;
  }

  get y() {
    return this._values[1];
  }

  set y(value: number) {
    this._values[1] = value;
  }

  get rotation() {
    return this._values[2];
  }

  set rotation(value: number) {
    this._values[2] = value;
  }
}

// TODO: support for special Tag components? This will let you tag entities for queries.
// Tags will dynamically add new ComponentLists and systems at run time for each unique tag for
// efficient storage and query. This will be implemented using the ArrayBuffer optimization.
// So maybe not version 1...
// Otherwise tagging will be simply supported by creating empty components as tags

// TODO: maybe instead of velocity standalone, have it part of PhysicsBody component like in Unity
// and heavily optimize that??
// PhysicsBody {
// mass: number
// linearDamping: number
// angularDamping: number
// linearVelocity: [x,y,z]
// angularVelocity: [x,y,z]
// gravityFactor: number
// }
// TODO: also PhysicsShape (with 2 options, circle (sphere) and box (cube)) that will be involved in
// collision detection.
// PhysicsShape {
// shapeType: number (SPHERE = 0 | BOX = 1)
// radius: number (SPHERE)
// size: [x,y,z] (BOX)
// center: [x,y,z]
// orientation: [x,y,z] ??? whats this
// collisionFilter: {belongsTo, collidesWith} // ... need to think about this. Naive collision,
// everything collides with everything, but that's not performant nor desired. Player will collide
// with most things but NPCs might not...
// }

// actually not everything that checks for collision, will have velocity (like static objects)
// so might keep velocity separate from physics body
// 3 components => velocity, collider & physicsBody
class Velocity extends Component {
  _values: number[];
  // TODO: ...
  constructor(entityId: EntityId, x: number, y: number, angular: number) {
    super(entityId);
    this._values = [x, y, angular];
  }

  // TODO: dynamically create these???
  get x() {
    return this._values[0];
  }

  set x(value: number) {
    this._values[0] = value;
  }

  get y() {
    return this._values[1];
  }

  set y(value: number) {
    this._values[1] = value;
  }

  get angular() {
    return this._values[2];
  }

  set angular(value: number) {
    this._values[2] = value;
  }
}

class SpriteComponent extends Component {
  constructor(entityId: EntityId) {
    super(entityId);
  }

  // TODO: ...
  // sprite
  // sprite manager
  // color
  // flip
  // material ??
  // sorting order (draw order) ??
}

class AnimationComponent extends Component {
  constructor(entityId: EntityId) {
    super(entityId);
  }

  // TODO: ...
  // loop: boolean
  // animations: {'name': {startCell: number, endCell: number, frameInterval: number (time between frames)}, ...} (frame information for different animations)
}

// TODO: remove the class wrapper?? maybe like in ECSY, no need for standalone class for system...
// just a function...
class MovementSystem extends System {
  start() {}

  update() {
    // NOTE: streaming the entities one by one instead of creating new node lists...
    const querySetIterator = this.engine.getQuerySetIteratorFor(Position, Velocity);
    for (const querySet of querySetIterator) this.updateEntity(querySet);
  }

  updateEntity = (querySet: QuerySet) => {
    const [position, velocity] = querySet;

    // TODO: fix the types and interface !!!
    position.x = velocity.x * this.deltaTime;
    position.y = velocity.y * this.deltaTime;
    position.rotation = velocity.angularVelocity * this.deltaTime;
  };

  destroy() {}
}

class RenderSystem extends System {
  start() {
    // TODO: add to display item to scene
  }

  update() {
    // for every entity with display object and position:
    // add position & rotation info to display object https://github.com/abiyasa/ashteroids-js/blob/master/src/systems/ThreeRenderSystem.js#L78
  }
}

// TODO: probably want arcFollowCamera for my game...https://doc.babylonjs.com/divingDeeper/cameras
const main = () => {
  const engine = new Engine();

  // input system
  engine.addSystem(new MovementSystem(engine));
  // render system
  // other systems, order of addition matters!!

  for (let i = 0; i < 10; i++) {
    // const entityId = engine.generateEntityId();

    // engine.addComponent(new PositionComponent(entityId, i * i, i + i, 0));
    // engine.addComponent(new VelocityComponent(entityId, i, i, i));
    // engine.addComponent(Velocity, [entity, i * 1, i * 1]);

    const entity = engine.createEntity();

    entity.addComponent<Position>(i * i, i + i, 0);
    entity.addComponent<Velocity>(i, i, i);
  }

  // some third party update function, babylon.js or phaser3 etc
  // update = deltaTime => {
  //   engine.update(deltaTime);
  // };
};
