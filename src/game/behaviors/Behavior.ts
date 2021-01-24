import Entity from "../Entity";

abstract class Behavior {
  private _entity: Entity;

  constructor(entity: Entity) {
    this._entity = entity;
  }

  get entity() {
    return this._entity;
  }

  // gets run right after added
  abstract onAdd(): void;
  // gets run right before removed
  abstract onRemove(): void;
}

export default Behavior;

// class Action {
//   // call
// }

// class Render extends Action {}

// class Movement extends Action {}

// class AI extends Action {
//   constructor(entity: Entity) {
//     // TODO: ...
//     // TODO: register itself to callback based on some event
//   }

//   // inherited override...
//   call = () => {
//     // logic here
//   }

//   private callbackLogic = () => {
//     // TODO: ...
//   };
// }
