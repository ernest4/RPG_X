import { SparseSetItem } from "../../../ecs/utils/SparseSet";
import { EntityId } from "../../../ecs/types";

class SceneItem<T> extends SparseSetItem {
  private _ref: T;

  constructor(entityId: EntityId, ref: T) {
    super(entityId);
    this._ref = ref;
  }

  get ref() {
    return this._ref;
  }
}

export default SceneItem;
