import { EntityId } from "../../../ecs/types";
import { SparseSetItem } from "../../../ecs/utils/SparseSet";

class SceneItem<T> extends SparseSetItem {
  private _itemRef: T;
  rendered: boolean;
  loaded: boolean;

  constructor(entityId: EntityId, itemRef: T) {
    super(entityId);
    this._itemRef = itemRef;
    this.rendered = false;
    this.loaded = false;
  }

  get itemRef() {
    return this._itemRef;
  }

  init = () => {
    // TODO: apply initialization data to create scene item ???
  };
}

export default SceneItem;
