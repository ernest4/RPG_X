import { EntityId } from "../types";

// TODO: jest tests !!!!
class EntityIdPool {
  private _lastUsedEntityId: EntityId;
  private _reclaimedEntityIdPoolSize: number;
  private _reclaimedEntityIdPool: EntityId[];

  // TODO: need to think about when and how this entityId pool will be saved and reinitialized
  // along with the rest of the games entities...
  constructor() {
    this._lastUsedEntityId = -1;
    this._reclaimedEntityIdPool = []; // TODO: optimize with ArrayBuffer
    this._reclaimedEntityIdPoolSize = 0;
  }

  reclaimId = (entityId: EntityId) => {
    this._reclaimedEntityIdPool[this._reclaimedEntityIdPoolSize++] = entityId;
  };

  getId = (): EntityId => {
    const index = this._reclaimedEntityIdPoolSize - 1;

    if (0 <= index) {
      this._reclaimedEntityIdPoolSize--;
      return this._reclaimedEntityIdPool[index];
    }

    return ++this._lastUsedEntityId;
  };

  clearPool = (): number => {
    const oldReclaimedEntityIdPoolSize = this._reclaimedEntityIdPoolSize;
    this._reclaimedEntityIdPoolSize = 0;
    return oldReclaimedEntityIdPoolSize;
  };

  get size(): number {
    return this._reclaimedEntityIdPoolSize;
  }
}

export default EntityIdPool;
