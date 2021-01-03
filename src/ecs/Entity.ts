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

  addComponent = (component: Component): Component => {
    return this._engine.addComponent(component);
  };

  // other util methods... ??

  // removeComponent

  // removeAllComponents
}
