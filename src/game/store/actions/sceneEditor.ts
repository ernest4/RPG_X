import { createAction } from "redux-actions";

export const test = createAction("TEST");
export const setCurrentEntityId = createAction("SET_CURRENT_ENTITY_ID");
export const setCurrentEntityComponents = createAction("SET_CURRENT_ENTITY_COMPONENTS");

export const setCurrentEntityComponentsUpdateList = createAction(
  "SET_CURRENT_ENTITY_COMPONENTS_UPDATE_LIST"
);
export const setCurrentEntityComponentsAddList = createAction(
  "SET_CURRENT_ENTITY_COMPONENTS_ADD_LIST"
);
export const setCurrentEntityComponentsRemoveList = createAction(
  "SET_CURRENT_ENTITY_COMPONENTS_REMOVE_LIST"
);
