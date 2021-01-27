import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sceneEditorActions from "../../store/actions/sceneEditor";

const EditorApp = () => {
  const dispatch = useDispatch();
  const test = useSelector((state: any) => state.sceneEditor.test);

  // const [value, setValue] = useState(123);

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div
      onClick={() => dispatch(sceneEditorActions.test("editor message"))}
      className="fixed top-0 right-0 bg-blue-200"
      children={`editor wip: ${test}`}
    />
  );
};

export default EditorApp;
