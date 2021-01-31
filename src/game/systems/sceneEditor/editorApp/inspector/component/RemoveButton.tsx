import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HorizontalSpace from "../../../HorizontalSpace";
import * as sceneEditorActions from "../../../../../store/actions/sceneEditor";

const RemoveButton = () => {
  const dispatch = useDispatch();

  const onRemove = () => {
    // dispatch(sceneEditorActions.test("editor message"));
    // TODO: push to redux new component set
  };

  return (
    <button className="px-1 bg-red-400 rounded capitalize" onClick={onRemove}>
      remove
    </button>
  );
};

export default RemoveButton;
