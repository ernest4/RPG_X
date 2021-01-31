import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HorizontalSpace from "../../HorizontalSpace";
import * as sceneEditorActions from "../../../../store/actions/sceneEditor";

const Component = ({ currentEntityComponent }: any) => {
  return (
    <div>
      <div className="flex justify-between">
        <Title title={currentEntityComponent.constructor.name} />
        <RemoveButton />
      </div>
      <HorizontalSpace />
      {/* <div>{JSON.stringify({ ...currentEntityComponent })}</div> */}
      <div>
        {Object.entries(currentEntityComponent).map(([property, value]) => {
          return (
            <div>
              <div>{property}</div>
              <div>{JSON.stringify(value)}</div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Component;

const Title = ({ title }: { title: string }) => {
  return <div className="font-bold">{title}</div>;
};

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
