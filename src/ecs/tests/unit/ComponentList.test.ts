import { context } from "../../../../tests/testAliases";
import Component from "../../Component";
import ComponentList from "../../engine/ComponentList";
import NumberComponent from "../helpers/components/NumberComponent";
import StringComponent from "../helpers/components/StringComponent";

describe(ComponentList, () => {
  const entityId1 = 123;
  const entityId2 = 456;
  const entityId3 = 789;

  const numberComponent1 = new NumberComponent(entityId1);
  const numberComponent2 = new NumberComponent(entityId2);
  const numberComponent3 = new NumberComponent(entityId3);

  let subject: ComponentList;

  beforeEach(() => {
    subject = new ComponentList();

    subject.add(numberComponent1);
    subject.add(numberComponent2);
    // subject.add(new StringComponent(entityId1));
  });

  describe("#add", () => {
    // TODO: ...
  });

  describe("#has", () => {
    // TODO: ...
  });

  describe("#get", () => {
    let getComponentForEntity: Component | null;

    beforeEach(() => {
      getComponentForEntity = subject.get(entityId1);
    });

    context("when entity has the component", () => {
      it("returns the component", () => {
        expect(getComponentForEntity).toBeInstanceOf(NumberComponent);
        expect(getComponentForEntity?.entityId).toEqual(entityId1);
      });
    });

    context("when entity does not have the component", () => {
      // TODO: ...
    });
  });

  describe("#remove", () => {
    // TODO: ...
  });

  describe("#removeAll", () => {
    // TODO: ...
  });

  // describe("#size", () => {
  //   it("returns the number of components in the list", () => {
  //     expect(subject.size).toEqual(2);

  //     subject.add(numberComponent3);
  //     expect(subject.size).toEqual(3);

  //     subject.remove(numberComponent1);
  //     expect(subject.size).toEqual(2);

  //     subject.remove(numberComponent2);
  //     expect(subject.size).toEqual(1);

  //     subject.remove(numberComponent3);
  //     expect(subject.size).toEqual(0);
  //   });
  // });

  describe("#denseListStream", () => {
    // TODO: ...
  });

  describe("#denseListStreamClean", () => {
    // TODO: ...
  });
});
