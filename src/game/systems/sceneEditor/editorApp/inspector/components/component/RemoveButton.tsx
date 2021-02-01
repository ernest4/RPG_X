import React from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sceneEditorActions from "../../../../../../store/actions/sceneEditor";

const RemoveButton = ({ component }: any) => {
  const dispatch = useDispatch();

  const componentsRemoveList = useSelector(
    (state: any) => state.sceneEditor.currentEntityComponentsRemoveList
  );

  const onRemove = (event: any) => {
    if (!componentsRemoveList) return;

    const componentToRemoveName = component.constructor.name;
    if (componentsRemoveList.some((component: string) => component === componentToRemoveName))
      return;

    dispatch(
      sceneEditorActions.setCurrentEntityComponentsRemoveList([
        ...componentsRemoveList,
        componentToRemoveName,
      ])
    );
  };

  return (
    <button className="px-1 bg-red-400 rounded capitalize" onClick={onRemove}>
      remove
    </button>
  );
};

export default RemoveButton;
