import { EntityId } from "./types";

// custom components will extend this.
abstract class Component {
  entityId: EntityId;

  constructor(entityId: EntityId) {
    this.entityId = entityId;
  }

  abstract serialize(): void;
  abstract load(componentObject): void;
}

export default Component;
