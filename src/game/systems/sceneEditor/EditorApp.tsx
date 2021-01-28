import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as sceneEditorActions from "../../store/actions/sceneEditor";

const EditorApp = () => {
  // const dispatch = useDispatch();
  // const test = useSelector((state: any) => state.sceneEditor.test);

  // const [value, setValue] = useState(123);

  // useEffect(() => {
  //   window.addEventListener("resize", handleResize);
  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return <Inspector />;
};

export default EditorApp;

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
      className="fixed top-0 right-0 bg-gray-600 flex flex-col w-96"
    >
      <Container>Entity Id: {currentEntityId}</Container>
      {currentEntityComponents.map((currentEntityComponent: any, key: number) => {
        return (
          <div key={key}>
            <HorizontalSpace />
            <Container>
              {JSON.stringify({
                component: currentEntityComponent.name,
                ...currentEntityComponent,
              })}
            </Container>
          </div>
        );
      })}
    </div>
  );
};

const HorizontalSpace = () => <div className="pt-4" />;

const Container = ({ children }: any) => {
  return <div {...{ className: "p-4 bg-gray-500 text-white rounded", children }} />;
};
