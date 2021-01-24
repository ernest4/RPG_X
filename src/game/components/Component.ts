import Entity from "../Entity";

abstract class Component {
  private _entity: Entity;

  constructor(entity: Entity) {
    this._entity = entity;
  }

  get entity() {
    return this._entity;
  }

  // gets run right after added
  abstract onAdd(onReadyCallback: Function): void;
  // gets run right before removed
  abstract onRemove(): void;
}

export default Component;
