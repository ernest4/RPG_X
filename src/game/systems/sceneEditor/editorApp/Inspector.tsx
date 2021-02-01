import React from "react";
import { useSelector } from "react-redux";
import Container from "../Container";
import HorizontalSpace from "../HorizontalSpace";
import AddComponentButton from "./inspector/AddComponentButton";
import Components from "./inspector/Components";

const STYLE = { height: "100vh" };
const Inspector = () => {
  const currentEntityId = useSelector((state: any) => state.sceneEditor.currentEntityId);

  return (
    <div
      className="fixed top-0 right-0 bg-gray-600 flex flex-col w-96 overflow-y-scroll"
      style={STYLE}
    >
      <Container>Entity Id: {currentEntityId}</Container>
      <Components />
      <HorizontalSpace />
      <AddComponentButton />
      <HorizontalSpace />
    </div>
  );
};

export default Inspector;
