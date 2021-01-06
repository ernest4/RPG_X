// NOTE: when using sparse arrays, make sure to use array buffers to force localization of data,
// as regular arrays get downgraded to dictionaries by V8 once they becomes sparse. Otherwise make
// sure to fill regular arrays with 0s or something to not appear 'sparse'

// TODO: look at optimizing components by using ArrayBuffers where possible to store basic data
// close together in memory and maybe even in the component array...

import Component from "../Component";
import { EntityId } from "../types";
import { isNumber } from "../utils/Number";

// large ArrayBuffer...

// TODO: jest tests !!!!
class ComponentList {
  // TODO: based on https://programmingpraxis.com/2012/03/09/sparse-sets/
  // has dense set (primary iteration) and sparse set (fast membership lookup)
  private _denseList: Component[];
  private _denseListComponentCount: number;
  private _sparseList: number[];

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
    if (component.entityId < 0) return; // NOTE: guard against negative ids

    // TODO: once entity (or component) is removed, there will be holes in the list. The entity will
    // be there but will have -1 for entityId. Over time you might end up with large gaps of -1...
    // Since we can't delete elements from array without downgrading it to slower data type on V8,
    // need to instead reuse those slots with new components (for new entityIds).
    // For this to work, the global engine needs to be aware of what entityIds have been released
    // out and reuse them when returning from engine.generateEntityId().

    const currentComponentEntityId = component.entityId;

    let existingComponent;

    const denseListIndex = this._sparseList[currentComponentEntityId];

    if (isNumber(denseListIndex)) existingComponent = this._denseList[denseListIndex];

    if (existingComponent?.entityId === -1) {
      // NOTE: plug the existing free entity component slot in dense list
      this._denseList[this._sparseList[currentComponentEntityId]] = component;
    } else {
      // NOTE: create new entity component slot
      const denseListIndex = this._denseList.push(component) - 1;
      this._sparseList[currentComponentEntityId] = denseListIndex;
    }

    this._denseListComponentCount++;
  };

  // has = (entityId: EntityId): boolean => !!this.get(entityId);

  get = (entityId: EntityId): Component | null => {
    const denseListIndex = this._sparseList[entityId];
    if (!isNumber(denseListIndex)) return null;

    if (this._denseListComponentCount < denseListIndex + 1) return null;

    const component = this._denseList[denseListIndex];
    if (component.entityId !== entityId) return null;

    return component;
  };

  remove = (component: Component): EntityId | null => {
    if (component.entityId < 0) return null; // NOTE: guard against negative ids

    const denseListIndex = this._sparseList[component.entityId];
    if (!isNumber(denseListIndex)) return null;

    if (this._denseListComponentCount < denseListIndex + 1) return null;
    if (this._denseList[denseListIndex].entityId !== component.entityId) return null;

    const oldEntityId = component.entityId;
    component.entityId = -1; // NOTE: -1 designates unused / invalid entityId

    this._denseListComponentCount--;

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
