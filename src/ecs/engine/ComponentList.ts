// NOTE: when using sparse arrays, make sure to use array buffers to force localization of data,
// as regular arrays get downgraded to dictionaries by V8 once they becomes sparse. Otherwise make
// sure to fill regular arrays with 0s or something to not appear 'sparse'

// TODO: look at optimizing components by using ArrayBuffers where possible to store basic data
// close together in memory and maybe even in the component array...

import Component from "../Component";
import { EntityId } from "../types";

// large ArrayBuffer...

// TODO: jest tests !!!!
class ComponentList {
  // TODO: based on https://programmingpraxis.com/2012/03/09/sparse-sets/
  // has dense set (primary iteration) and sparse set (fast membership lookup)
  _denseList: Component[];
  _denseListComponentCount: number;
  _sparseList: number[];

  constructor() {
    // TODO: will want to optimize these lists to use ArrayBuffer for dense memory access where
    // possible.
    this._denseList = [];
    this._denseListComponentCount = 0;
    // TODO: Sparse lists will become hash maps in V8 optimizer. They are less efficient in speed
    // compared too arrays. So maybe use fixed size ArrayBuffer as well? Dynamically grow it yourself?
    this._sparseList = [];
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
      this._denseList[this._sparseList[currentComponentEntityId]] = component;
    } else {
      // NOTE: create new entity component slot
      const denseListIndex = this._denseList.push(component);
      this._sparseList[currentComponentEntityId] = denseListIndex;
    }

    this._denseListComponentCount++;
  };

  has = (entityId: EntityId): boolean => !!this.get(entityId);

  get = (entityId: EntityId): Component | null => {
    const denseListIndex = this._sparseList[entityId];
    const component = this._denseList[denseListIndex];

    if (this._denseListComponentCount < denseListIndex) return null;
    if (component.entityId !== entityId) return null;

    return component;
  };

  remove = (component: Component): EntityId | undefined => {
    const denseListIndex = this._sparseList[component.entityId];

    // const currentEntityId = ...
    if (this._denseListComponentCount < denseListIndex) return;
    // if (this.denseList[denseListIndex].entityId !== component.entityId) return;
    if (this._denseList[denseListIndex] !== component) return; // NOTE: entity object ref should work as well...

    const oldEntityId = component.entityId;
    // this.denseList[denseListIndex].entityId = -1; // NOTE: -1 designates unused / invalid entityId
    component.entityId = -1; // NOTE: -1 designates unused / invalid entityId // NOTE: entity object ref should work as well...

    return oldEntityId;
  };

  removeAll = (): number => {
    const oldDenseListComponentCount = this._denseListComponentCount;
    this._denseListComponentCount = 0;
    return oldDenseListComponentCount;
  };

  get size() {
    return this._denseListComponentCount;
  }

  *denseListStream() {
    for (let i = 0; i < this._denseListComponentCount; i++) {
      yield this._denseList[i];
    }
  }

  *denseListStreamClean() {
    for (let i = 0; i < this._denseListComponentCount; i++) {
      const component = this._denseList[i];

      if (!component?.entityId || component.entityId === -1) continue;

      yield component;
    }
  }

  // denseListCleanForEach(callback: (activeComponent: Component) => void) {
  //   for (let i = 0; i < this._denseListComponentCount; i++) {
  //     const component = this._denseList[i];

  //     if (!component?.entityId || component.entityId === -1) continue;

  //     callback(component);
  //   }
  // }
}

export default ComponentList;

// TODO: this is not responsibility of ECS... external Class or system should do this...
// serialize = () => {};

// load = ({ componentClassName, componentsData }) => {
//   componentsData.forEach(componentData => {
//     // const component = eval(`new ${componentClassName}(${componentData.entityId})`) as Component;
//     const componentClass = this._componentClasses[componentClassName];
//     const component = new componentClass(componentData.entityId);
//     component.load(componentData);
//     this.add(component);
//   });
// };
