import React from "react";
import { useSelector, useDispatch } from "react-redux";
import HorizontalSpace from "../../../../HorizontalSpace";
import * as sceneEditorActions from "../../../../../../store/actions/sceneEditor";

const Value = ({ value }: any) => {
  return <div className="w-max overflow-scroll">{getValueEditor(value)}</div>;
};

export default Value;

// TODO: figure out how to push changes to redux and sync them to game...

const getValueEditor = (value: any) => {
  if (value._values) return VectorEditor(value);
  if (typeof value === "boolean") return BooleanEditor(value);
  if (typeof value === "string") return StringEditor(value);
  if (!isNaN(value)) return NumberEditor(value);

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
        <input type="number" value={x} className="rounded p-1 bg-gray-700" onChange={onChange} />
      </div>
      <div className="flex pb-1">
        <div className="pr-4">y</div>
        <input type="number" value={y} className="rounded p-1 bg-gray-700" onChange={onChange} />
      </div>
      <div className="flex pb-1">
        <div className="pr-4">z</div>
        <input type="number" value={z} className="rounded p-1 bg-gray-700" onChange={onChange} />
      </div>
    </div>
  );
};

const BooleanEditor = (value: boolean) => {
  const onChange = (event: any) => {
    console.log(event.target); // WIP
    console.log(event.target.value); // WIP
  };

  return (
    <select value={value.toString()} onChange={onChange} className="rounded p-1 bg-gray-700">
      <option value="true">true</option>
      <option value="false">false</option>
    </select>
  );
};

const StringEditor = (value: string) => {
  const onChange = (event: any) => {
    console.log(event.target); // WIP
    console.log(event.target.value); // WIP
  };

  return (
    <input type="text" value={value} className="rounded p-1 bg-gray-700" onChange={onChange} />
  );
};

const NumberEditor = (value: number) => {
  const onChange = (event: any) => {
    console.log(event.target); // WIP
    console.log(event.target.value); // WIP
  };

  return (
    <input type="number" value={value} className="rounded p-1 bg-gray-700" onChange={onChange} />
  );
};
