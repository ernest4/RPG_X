import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { isNumber } from "../../../../../ecs/utils/Number";
import * as sceneEditorActions from "../../../../store/actions/sceneEditor";

const AddComponentButton = () => {
  const currentEntityId = useSelector((state: any) => state.sceneEditor.currentEntityId);

  // const availableComponents = useSelector((state: any) => state.sceneEditor.availableComponents);

  // TODO: diff between current entity components and available to only offer components entity doesnt already have
  const availableComponents = ["Transform", "Sprite"]; // TODO: testing placeholder, this will hold component class names (or classes?)

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
      {availableComponents.map((availableComponent, key) => {
        return (
          <option value={availableComponent} key={key}>
            {availableComponent}
          </option>
        );
      })}
    </select>
  );
};

export default AddComponentButton;
