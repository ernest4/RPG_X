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

const HorizontalSpace = () => <div className="pt-4" />;

const Container = ({ children }: any) => {
  return <div {...{ className: "p-4 bg-gray-500 text-white rounded", children }} />;
};

const Component = ({ currentEntityComponent }: any) => {
  return (
    <div>
      <div className="flex justify-between">
        <Title title={currentEntityComponent.constructor.name} />
        <RemoveButton />
      </div>
      <HorizontalSpace />
      <div>
        {JSON.stringify({
          ...currentEntityComponent,
        })}
      </div>
    </div>
  );
};

const Title = ({ title }: { title: string }) => {
  return <div className="font-bold">{title}</div>;
};

const RemoveButton = () => {
  return <button className="px-1 bg-red-400 rounded capitalize">remove</button>;
};
