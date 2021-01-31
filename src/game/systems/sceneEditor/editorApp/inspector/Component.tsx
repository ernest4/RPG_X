import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HorizontalSpace from "../../HorizontalSpace";
import * as sceneEditorActions from "../../../../store/actions/sceneEditor";
import RemoveButton from "./component/RemoveButton";
import Title from "./component/Title";
import Value from "./component/Value";

const Component = ({ currentEntityComponent }: any) => {
  return (
    <div>
      <div className="flex justify-between pb-4 border-b-2">
        <Title title={currentEntityComponent.constructor.name} />
        <RemoveButton />
      </div>
      <HorizontalSpace />
      <div>
        {Object.entries(currentEntityComponent).map(([property, value]) => {
          if (property === "_id") return <div />; // NOTE: just hiding redundant exposition of internal implementation
          if (property === "_values") return <div />; // NOTE: just hiding redundant exposition of internal implementation
          if (property === "loaded") return <div />; // NOTE: just hiding redundant exposition of internal implementation
          if (property === "processed") return <div />; // NOTE: just hiding redundant exposition of internal implementation

          return (
            <>
              <HorizontalSpace />
              <div className="flex justify-between">
                <div className="w-max">{property}</div>
                <Value value={value} />
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
};

export default Component;
