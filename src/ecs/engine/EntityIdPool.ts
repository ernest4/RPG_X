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

  // TODO: One solution to above question ???
  // constructor({
  //   lastUsedEntityId,
  //   reclaimedEntityIdPool,
  //   reclaimedEntityIdPoolSize,
  // }: EntityIdPoolParams) {
  //   this._lastUsedEntityId = lastUsedEntityId || -1;
  //   this._reclaimedEntityIdPool = reclaimedEntityIdPool || [];
  //   this._reclaimedEntityIdPoolSize = reclaimedEntityIdPoolSize || 0;
  // }

  reclaimId = (entityId: EntityId) => {
    this._reclaimedEntityIdPool[++this._reclaimedEntityIdPoolSize] = entityId;
  };

  getId = (): EntityId => {
    this._reclaimedEntityIdPoolSize--;

    if (0 < this._reclaimedEntityIdPoolSize) {
      return this._reclaimedEntityIdPool[this._reclaimedEntityIdPoolSize];
    }

    return ++this._lastUsedEntityId;
  };

  reset = (): number => {
    const oldReclaimedEntityIdPoolSize = this._reclaimedEntityIdPoolSize;
    this._reclaimedEntityIdPoolSize = 0;
    return oldReclaimedEntityIdPoolSize;
  };

  // resetClean = () => {
  //   this._lastUsedEntityId = -1;
  //   this._reclaimedEntityIdPool = [];
  //   this._reclaimedEntityIdPoolSize = 0;
  // };
}

export default EntityIdPool;

// TODO: not the responsibility of this class !!
// serialize = () => {
//   return {
//     lastUsedEntityId: this._lastUsedEntityId,
//     reclaimedEntityIdPool: this._reclaimedEntityIdPool.slice(0, this._reclaimedEntityIdPoolSize),
//     reclaimedEntityIdPoolSize: this._reclaimedEntityIdPoolSize,
//   };
// };

// load = entityIdPoolObject => {
//   const { lastUsedEntityId, reclaimedEntityIdPool } = entityIdPoolObject;

//   this._lastUsedEntityId = lastUsedEntityId;
//   this._reclaimedEntityIdPool = reclaimedEntityIdPool;
//   this._reclaimedEntityIdPoolSize = reclaimedEntityIdPool.length;
// };
