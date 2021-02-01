import { handleActions } from "redux-actions";
import reduceReducers from "reduce-reducers";
import produce from "immer";

const initialState = {
  test: "",
  currentEntityId: null,
  currentEntityComponents: [],
  currentEntityComponentsUpdateList: [],
  currentEntityComponentsAddList: [],
  currentEntityComponentsRemoveList: [],
  availableComponents: [],
  // cameraPosition: { x: 0, y: 0 },
  cameraPosition: null,
  entities: [],
};

// const otherReducer = handleActions({
//   ACTION_NAME: produce((state, action) => {
//     state.something = action.payload;
//   })
// }, initialState);

const sceneEditorReducer = handleActions(
  {
    TEST: produce((state, action) => {
      state.test = action.payload;
    }),
    SET_CURRENT_ENTITY_ID: produce((state, action) => {
      state.currentEntityId = action.payload;
    }),
    SET_CURRENT_ENTITY_COMPONENTS: produce((state, action) => {
      state.currentEntityComponents = action.payload;
    }),
    SET_CURRENT_ENTITY_COMPONENTS_UPDATE_LIST: produce((state, action) => {
      state.currentEntityComponentsUpdateList = action.payload;
    }),
    SET_CURRENT_ENTITY_COMPONENTS_ADD_LIST: produce((state, action) => {
      state.currentEntityComponentsAddList = action.payload;
    }),
    SET_CURRENT_ENTITY_COMPONENTS_REMOVE_LIST: produce((state, action) => {
      state.currentEntityComponentsRemoveList = action.payload;
    }),
  },
  initialState
);

// export default reduceReducers(gameReducer, otherReducer, someOtherReducer);
export default reduceReducers(sceneEditorReducer);
