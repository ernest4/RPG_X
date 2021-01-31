import React from "react";
import HorizontalSpace from "../../HorizontalSpace";

const Component = ({ currentEntityComponent }: any) => {
  return (
    <div>
      <div className="flex justify-between">
        <Title title={currentEntityComponent.constructor.name} />
        <RemoveButton />
      </div>
      <HorizontalSpace />
      <div>{JSON.stringify({ ...currentEntityComponent })}</div>
    </div>
  );
};

export default Component;

const Title = ({ title }: { title: string }) => {
  return <div className="font-bold">{title}</div>;
};

const RemoveButton = () => {
  return <button className="px-1 bg-red-400 rounded capitalize">remove</button>;
};
