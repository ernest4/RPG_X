import { SparseSetItem } from "../../../ecs/utils/SparseSet";
import { EntityId } from "../../../ecs/types";

class SceneItem<T> extends SparseSetItem {
  private _ref: T;
  private _rendered: boolean;

  constructor(entityId: EntityId, ref: T) {
    super(entityId);
    this._ref = ref;
    this._rendered = false;
  }

  // get loading

  get ref() {
    return this._ref;
  }

  get rendered() {
    return this._rendered;
  }

  set rendered(newRendered: boolean) {
    this._rendered = newRendered;
  }

  // TODO: some notion of rendered or not...
}

export default SceneItem;
