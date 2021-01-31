import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sceneEditorActions from "../../../store/actions/sceneEditor";
import HorizontalSpace from "../HorizontalSpace";
import Component from "./inspector/Component";

const STYLE = { height: "100vh" };
const Inspector = () => {
  const dispatch = useDispatch();
  const test = useSelector((state: any) => state.sceneEditor.test);
  const currentEntityId = useSelector((state: any) => state.sceneEditor.currentEntityId);
  const currentEntityComponents = useSelector(
    (state: any) => state.sceneEditor.currentEntityComponents
  );

  return (
    <div
      onClick={() => dispatch(sceneEditorActions.test("editor message"))}
      className="fixed top-0 right-0 bg-gray-600 flex flex-col w-96 overflow-y-scroll"
      style={STYLE}
    >
      <Container>Entity Id: {currentEntityId}</Container>
      {currentEntityComponents.map((currentEntityComponent: any, key: number) => {
        return (
          <div key={key}>
            <HorizontalSpace />
            <Container>
              <Component {...{ currentEntityComponent }} />
            </Container>
          </div>
        );
      })}
      <HorizontalSpace />
    </div>
  );
};

export default Inspector;

const Container = ({ children }: any) => {
  return <div {...{ className: "p-4 bg-gray-500 text-white rounded", children }} />;
};
