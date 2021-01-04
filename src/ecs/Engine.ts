import { ComponentClass, DeltaTime, EntityId, QueryCallback, QuerySet } from "./types";
import EntityIdPool from "./engine/EntityIdPool";
import Component from "./Component";
import ComponentList from "./engine/ComponentList";

class Engine {
  _deltaTime: DeltaTime;
  _updating: boolean;
  // updateComplete: any; // TODO: better type?
  _systemUpdateFunctions: ((engine: Engine, deltaTime: DeltaTime) => void)[];
  _componentLists: { [key: string]: ComponentList };
  _entityIdPool: EntityIdPool;

  constructor() {
    // TODO: ...
    // TODO: preload the default set of update functions
    this._systemUpdateFunctions = [];
    this._deltaTime = 0;
    this._updating = false;
    this._componentLists = {};
    // this.updateComplete = new signals.Signal(); // TODO: signals?? https://github.com/millermedeiros/js-signals
    this._entityIdPool = new EntityIdPool();
  }

  addSystem = (system: System, priority?: number) => {
    // TODO: priority integer sorting
    // simple priority based on insertion order for now...
    this._systemUpdateFunctions.push(system.update);
  };

  // getSystem

  // removeSystem

  // removeAllSystems

  addComponent = (component: Component) => {
    // NOTE: indexing using component class name
    const componentClassName = component.constructor.name;
    let componentList = this._componentLists[componentClassName];

    if (!componentList) {
      componentList = new ComponentList();
      this._componentLists[componentClassName] = componentList;
    }

    componentList.add(component);

    return component;
  };

  removeComponent = (component: Component) => {
    // NOTE: indexing using component class name
    const componentClassName = component.constructor.name;
    const componentList = this._componentLists[componentClassName];
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

  generateEntityId = (): EntityId => this._entityIdPool.getId();

  removeEntity = (entityId: EntityId) => {
    // NOTE: In EnTT this happens by iterating every single sparse set in the registry, checking if it contains the entity, and deleting it if it does.
    Object.values(this._componentLists).forEach(componentList => {
      // TODO: add remove(entityId: EntityId) to ComponentList to remove component by entityId
      // more efficiently than this...
      const component = componentList.get(entityId);
      if (component) componentList.remove(component);
    });

    // TODO: reclaim entityId to be reused only when deleting Entity (for now) i.e. when all components gone...
    this._entityIdPool.reclaimId(entityId);
  };

  // NOTE: fast O(1) bulk operations
  removeAllEntities = () => {
    Object.values(this._componentLists).forEach(componentList => {
      componentList.removeAll();
    });

    this._entityIdPool.reset();
  };

  update(deltaTime: DeltaTime) {
    this._deltaTime = deltaTime;
    // TODO: cycle through the systems, in priority
    this._updating = true;
    this._systemUpdateFunctions.forEach(this.callSystemUpdateFunction);
    this._updating = false;
    // this.updateComplete.dispatch(); // TODO: signals??
  }

  // *query(...componentClasses: ComponentClass[]) {
  //   // TODO: ...
  //   // Query function will take shortest componentlist and loop throught the dense list of it.
  //   // For each denselist component with valid entityid, will check that components entityid against the rest of desired component lists and get those components (if present).
  //   // If no early bailouts (so all query conditions met) yield the queryset.
  //   // Query should be streamed via the query set, letting you operate on each component, instead of constructing an array of all results (dont waste time creating intermediary array...)

  //   // NOTE: finding shortest component list
  //   let shortestComponentListIndex = 0;

  //   let shortestComponentList = this._componentLists[
  //     componentClasses[shortestComponentListIndex].name
  //   ];
  //   componentClasses.forEach((componentClass, index) => {
  //     const nextShortestComponentList = this._componentLists[componentClass.name];

  //     if (nextShortestComponentList.size < shortestComponentList.size) {
  //       shortestComponentList = nextShortestComponentList;
  //       shortestComponentListIndex = index;
  //     }
  //   });

  //   // NOTE: cycling through the shortest component list
  //   // const componentsIterator = shortestComponentList.denseListStream();
  //   const componentsIterator = shortestComponentList.denseListStreamClean();

  //   for (const component of componentsIterator) {
  //     // TODO: if the entity of this component, has all the other componentClasses, yield it and it's components
  //     // otherwise, continue
  //     // componentClasses.forEach((componentClass, index) => {

  //     // });

  //     const entityId = component.entityId;

  //     // TODO: optimize by caching querySet array ??
  //     const querySet: QuerySet = [];

  //     const componentClassesLength = componentClasses.length;
  //     for (let i = 0; i < componentClassesLength; i++) {
  //       if (i === shortestComponentListIndex) continue; // NOTE: skip checking the shortest list !

  //       const componentClassName = componentClasses[i].name;
  //       const anotherComponent = this._componentLists[componentClassName].get(entityId);

  //       if (anotherComponent) querySet.push(anotherComponent);
  //       else break; // NOTE: soon as we discover a missing component, abandon further pointless search for that entityId !

  //       // NOTE: yield querySet if all components found for entityId
  //       if (i + 1 === componentClassesLength) yield querySet;
  //     }
  //   }
  // }

  query(callback: QueryCallback, ...componentClasses: ComponentClass[]) {
    // TODO: ...
    // Query function will take shortest componentlist and loop throught the dense list of it.
    // For each denselist component with valid entityid, will check that components entityid against the rest of desired component lists and get those components (if present).
    // If no early bailouts (so all query conditions met) yield the queryset.
    // Query should be streamed via the query set, letting you operate on each component, instead of constructing an array of all results (dont waste time creating intermediary array...)

    // NOTE: finding shortest component list
    let shortestComponentListIndex = 0;

    let shortestComponentList = this._componentLists[
      componentClasses[shortestComponentListIndex].name
    ];
    componentClasses.forEach((componentClass, index) => {
      const nextShortestComponentList = this._componentLists[componentClass.name];

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
        const anotherComponent = this._componentLists[componentClassName].get(entityId);

        if (anotherComponent) querySet.push(anotherComponent);
        else break; // NOTE: soon as we discover a missing component, abandon further pointless search for that entityId !

        // NOTE: yield querySet if all components found for entityId
        // if (i + 1 === componentClassesLength) yield querySet;
        if (i + 1 === componentClassesLength) callback(querySet);
      }
    }
  }

  get deltaTime() {
    return this._deltaTime;
  }

  serialize = () => {
    // TODO: export all component state to object
  };

  load = (ecsObject): void => {
    // TODO: import all component state to Engine

    const { entityIdPool, componentLists } = ecsObject;

    // TODO: preload the default set of update functions + any active update systems from the serialization?
    // Look them up using string system name from the key of import object

    this._componentLists = this.loadComponentLists(componentLists);
    this._entityIdPool.load(entityIdPool);
  };

  // // TODO: filepath?? probably caller of this method will need to do that
  // toJSON = () => {
  //   // TODO: ...
  //   JSON.stringify(this.serialize());
  // };

  // // TODO: filepath?? probably caller of this method will need to do that
  // fromJSON = (jsonString: string) => {
  //   // TODO: ...
  //   this.deserialize(JSON.parse(jsonString));
  // };

  // private

  private callSystemUpdateFunction = (
    systemUpdateFunction: (engine: Engine, deltaTime: DeltaTime) => void
  ) => systemUpdateFunction(this, this.deltaTime);

  private loadComponentLists = (componentListsObject): { [key: string]: ComponentList } => {
    const componentLists = {};

    Object.entries(componentLists).forEach(([componentClassName, componentsData]) => {
      const componentList = new ComponentList();
      componentList.load({ componentClassName, componentsData });
      this._componentLists[componentClassName] = componentList;

      // // componentsData.forEach(componentData => componentList.add(...));

      // componentsData.forEach(componentData =>
      //   componentList.add(eval(`new ${componentClassName}(${componentData})`))
      // );

      // // eval(`console.log(new Testy(78).wow)`)
    });

    return componentLists;
  };
}

export default Engine;
