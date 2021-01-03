// custom components will extend this.
abstract class Component {
  entityId: EntityId;

  constructor(entityId: EntityId) {
    this.entityId = entityId;
  }
}
