import React from "react";
import { useSelector } from "react-redux";
import Container from "../Container";
import HorizontalSpace from "../HorizontalSpace";
import AddComponentButton from "./inspector/AddComponentButton";
import Components from "./inspector/Components";
import RemoveEntityButton from "./inspector/RemoveEntityButton";

const STYLE = { height: "100vh" };
const Inspector = () => {
  const currentEntityId = useSelector((state: any) => state.sceneEditor.currentEntityId);

  return (
    <div
      className="fixed top-0 right-0 bg-gray-600 flex flex-col w-96 overflow-y-scroll"
      style={STYLE}
    >
      <div className="p-4 bg-gray-500 text-white rounded sticky top-0 border-b-2">
        <div className="flex justify-between">
          <div>Entity Id: {currentEntityId}</div>
          <RemoveEntityButton />
        </div>
      </div>
      <Components />
      <HorizontalSpace />
      <AddComponentButton />
      <HorizontalSpace />
    </div>
  );
};

export default Inspector;
