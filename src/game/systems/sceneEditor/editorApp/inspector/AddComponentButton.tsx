import React from "react";
import { useSelector, useDispatch } from "react-redux";
import Component from "../../../../../ecs/Component";
import { isNumber } from "../../../../../ecs/utils/Number";
import * as sceneEditorActions from "../../../../store/actions/sceneEditor";

const AddComponentButton = () => {
  const dispatch = useDispatch();

  const currentEntityId = useSelector((state: any) => state.sceneEditor.currentEntityId);

  // const componentsRemoveList = useSelector(
  //   (state: any) => state.sceneEditor.currentEntityComponentsRemoveList
  // );

  const availableComponentsList = useSelector(
    (state: any) => state.sceneEditor.availableComponentsList
  );

  const currentEntityComponents = useSelector(
    (state: any) => state.sceneEditor.currentEntityComponents
  );

  const extraAvailableComponents = availableComponentsList.filter(
    (availableComponentName: string) => {
      return !currentEntityComponents.some(
        (currentEntityComponent: Component) =>
          currentEntityComponent.constructor.name === availableComponentName
      );
    }
  );

  // TODO: diff between current entity components and available to only offer components entity doesnt already have
  // const availableComponents = ["Transform", "Sprite"]; // TODO: testing placeholder, this will hold component class names (or classes?)
  // const availableComponents = Object.keys(availableComponentsHash);

  // const onRemove = (event: any) => {
  //   if (!componentsRemoveList) return;

  //   const componentToRemoveName = component.constructor.name;
  //   if (componentsRemoveList.some((component: string) => component === componentToRemoveName))
  //     return;

  //   dispatch(
  //     sceneEditorActions.setCurrentEntityComponentsRemoveList([
  //       ...componentsRemoveList,
  //       componentToRemoveName,
  //     ])
  //   );
  // };

  const onChange = (event: any) => {
    console.log(event.target); // WIP
    console.log(event.target.value); // WIP

    // register component class with values to a buffer, game engine will pull that in and initialize the classes.

    // or

    // could just initialize yourself. you have the entityId which wont change since you're added components to same entity...
  };

  if (!isNumber(currentEntityId)) return <div />;

  return (
    <select
      value={"Add Component"}
      onChange={onChange}
      className="rounded bg-gray-400 p-2 text-white700"
    >
      <option value={"Add Component"}>Add Component</option>
      {extraAvailableComponents.map((extraAvailableComponent: string, key: number) => {
        return (
          <option value={extraAvailableComponent} key={key}>
            {extraAvailableComponent}
          </option>
        );
      })}
    </select>
  );
};

export default AddComponentButton;
