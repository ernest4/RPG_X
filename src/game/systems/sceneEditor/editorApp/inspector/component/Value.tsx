import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HorizontalSpace from "../../../HorizontalSpace";
import * as sceneEditorActions from "../../../../../store/actions/sceneEditor";

const Value = ({ value }: any) => {
  return <div className="w-max overflow-scroll">{getValueEditor(value)}</div>;
};

export default Value;

const getValueEditor = (value: any) => {
  if (value._values) return VectorEditor(value);

  // TODO:
  // boolean
  // number
  // string

  return JSON.stringify(value); // unknown / ref / catch all
};

const VectorEditor = ({ _values: { 0: x, 1: y, 2: z } }: any) => {
  const onChange = (event: any) => {
    console.log(event.target); // WIP
    console.log(event.target.value); // WIP
  };

  return (
    <div>
      <div className="flex pb-1">
        <div className="pr-4">x</div>
        <input type="number" value={x} className="text-black rounded p-1" onChange={onChange} />
      </div>
      <div className="flex pb-1">
        <div className="pr-4">y</div>
        <input type="number" value={y} className="text-black rounded p-1" onChange={onChange} />
      </div>
      <div className="flex pb-1">
        <div className="pr-4">z</div>
        <input type="number" value={z} className="text-black rounded p-1" onChange={onChange} />
      </div>
    </div>
  );
};

//  <div>{JSON.stringify({ ...currentEntityComponent })}</div>
