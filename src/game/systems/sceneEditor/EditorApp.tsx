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
      style={{ position: "fixed", top: 0, right: 0 }}
      onClick={() => dispatch(sceneEditorActions.test("editor message"))}
      className="bg-blue-500" // tailwind.css test .... not working yet !!
    >
      editor wip: {test}
    </div>
  );
};

export default EditorApp;
