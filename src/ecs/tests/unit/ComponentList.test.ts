import { context } from "../../../../tests/testAliases";
import Component from "../../Component";
import ComponentList from "../../engine/ComponentList";
import NumberComponent from "../helpers/components/NumberComponent";
import StringComponent from "../helpers/components/StringComponent";

describe(ComponentList, () => {
  const entityId1 = 123;
  const entityId2 = 456;
  const entityId3 = 789;

  let numberComponent1 = new NumberComponent(entityId1);
  let numberComponent2 = new NumberComponent(entityId2);
  let numberComponent3 = new NumberComponent(entityId3);

  let subject: ComponentList;

  beforeEach(() => {
    subject = new ComponentList();

    subject.add(numberComponent1);
    subject.add(numberComponent2);
    // subject.add(new StringComponent(entityId1));
  });

  describe("#add", () => {
    context("when component slot was reclaimed", () => {
      const originalComponent = new NumberComponent(entityId1);
      const anotherComponent = new NumberComponent(entityId1);

      let previousSize: number;

      beforeEach(() => {
        subject = new ComponentList(); // 0
        subject.add(originalComponent); // 1
        subject.remove(originalComponent); // 0

        previousSize = subject.size;

        subject.add(anotherComponent); // 0 -> 1
      });

      it("plugs that component slow gap with new component of same entityId", () => {
        expect(subject.get(entityId1)).toBe(anotherComponent);
      });

      it("increases list size", () => {
        expect(subject.size).toEqual(previousSize + 1);
      });
    });
  });

  // describe("#has", () => {
  //   context("when entity has component", () => {
  //     expect(subject.has(numberComponent1)).toEqual(true);
  //   });
  // });

  describe("#get", () => {
    let getComponentForEntity: Component | null;

    beforeEach(() => (getComponentForEntity = subject.get(entityId1)));

    context("when entity has the component", () => {
      it("returns the component", () => {
        expect(getComponentForEntity).toBe(numberComponent1);
        expect(getComponentForEntity?.entityId).toEqual(entityId1);
      });
    });

    context("when entity does not have the component", () => {
      beforeEach(() => (subject = new ComponentList()));

      context("when component never existed", () => {
        it("return null", () => {
          expect(subject.get(entityId1)).toEqual(null);
        });
      });

      context("when component was added", () => {
        beforeEach(() => {
          numberComponent1 = new NumberComponent(entityId1);
          numberComponent2 = new NumberComponent(entityId2);

          subject.add(numberComponent1);
          subject.add(numberComponent2);
        });

        context("when component was removed", () => {
          beforeEach(() => subject.remove(numberComponent1));

          it("return null", () => {
            expect(subject.get(entityId1)).toEqual(null);
          });
        });

        context("when all components were cleared", () => {
          beforeEach(() => subject.removeAll());

          it("return null", () => {
            expect(subject.get(entityId1)).toEqual(null);
          });
        });
      });
    });
  });

  describe("#remove", () => {
    context("when entity has the component", () => {
      let previousSize: number;

      beforeEach(() => {
        previousSize = subject.size;
      });

      it("returns removed component's original entityId", () => {
        expect(subject.remove(numberComponent1)).toEqual(entityId1);
      });

      it("reduces list size", () => {
        subject.remove(numberComponent1);
        expect(subject.size).toEqual(previousSize - 1);
      });
    });

    context("when component was already removed", () => {
      // TODO: ...
    });

    context("when all components were cleared", () => {
      // TODO: ...
    });
  });

  describe("#removeAll", () => {
    // TODO: ...
  });

  describe("#size", () => {
    it("returns the number of components in the list", () => {
      expect(subject.size).toEqual(2);

      subject.add(numberComponent3);
      expect(subject.size).toEqual(3);

      subject.remove(numberComponent1);
      expect(subject.size).toEqual(2);

      subject.remove(numberComponent2);
      expect(subject.size).toEqual(1);

      subject.remove(numberComponent3);
      expect(subject.size).toEqual(0);
    });
  });

  describe("#denseListStream", () => {
    // TODO: ...
  });

  describe("#denseListStreamClean", () => {
    // TODO: ...
  });
});
