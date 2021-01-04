import { EntityId } from "./types";
import Component from "./Component";
import Engine from "./Engine";

// TODO: entity wrapper ??

// TODO: jest tests !!!!
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

  addComponent = (component: Component): Component => {
    return this._engine.addComponent(component);
  };

  // other util methods... ??

  // removeComponent

  // removeAllComponents
}

export default Entity;
