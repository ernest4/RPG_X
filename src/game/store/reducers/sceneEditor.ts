import { handleActions } from "redux-actions";
import reduceReducers from "reduce-reducers";
import produce from "immer";

const initialState = {
  test: "",
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
  },
  initialState
);

// export default reduceReducers(gameReducer, otherReducer, someOtherReducer);
export default reduceReducers(sceneEditorReducer);
