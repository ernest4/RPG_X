import { context } from "../../../../tests/testAliases";
import Vector3BufferView from "../../utils/Vector3BufferView";

describe(Vector3BufferView, () => {
  let describedClass = Vector3BufferView;
  let subject: Vector3BufferView;

  let arrayBufferSize = 3;
  let arrayBuffer: ArrayBuffer;
  let arrayBufferUInt32View: Uint32Array;

  let bufferValueAtIndex0 = 5;
  let bufferValueAtIndex1 = 6;
  let bufferValueAtIndex2 = 7;

  beforeEach(() => {
    arrayBuffer = new ArrayBuffer(arrayBufferSize * 4);
    arrayBufferUInt32View = new Uint32Array(arrayBuffer);
    arrayBufferUInt32View[0] = bufferValueAtIndex0;
    arrayBufferUInt32View[1] = bufferValueAtIndex1;
    arrayBufferUInt32View[2] = bufferValueAtIndex2;

    subject = new describedClass(arrayBuffer);
  });

  it("gets x", () => {
    expect(subject.x).toEqual(bufferValueAtIndex0);
  });

  it("sets x", () => {
    subject.x = 89;
    expect(arrayBufferUInt32View[0]).toEqual(89);
  });

  it("gets y", () => {
    expect(subject.y).toEqual(bufferValueAtIndex1);
  });

  it("sets y", () => {
    subject.y = 67;
    expect(arrayBufferUInt32View[1]).toEqual(67);
  });

  it("gets z", () => {
    expect(subject.z).toEqual(bufferValueAtIndex2);
  });

  it("sets z", () => {
    subject.z = 34;
    expect(arrayBufferUInt32View[2]).toEqual(34);
  });

  context("when Vector3BufferView does not fit in the buffer", () => {
    beforeEach(() => {
      arrayBuffer = new ArrayBuffer(1); // 1 byte
    });

    it("throws error", () => {
      expect(() => new describedClass(arrayBuffer)).toThrow(RangeError);
    });
  });

  context("when start offset is given", () => {
    let startOffset = 3;

    let bufferValueAtIndex3 = 6;
    let bufferValueAtIndex4 = 5;
    let bufferValueAtIndex5 = 4;

    beforeEach(() => {
      arrayBuffer = new ArrayBuffer(arrayBufferSize * 4 * 2);
      arrayBufferUInt32View = new Uint32Array(arrayBuffer);
      arrayBufferUInt32View[0] = 9;
      arrayBufferUInt32View[1] = 8;
      arrayBufferUInt32View[2] = 7;
      arrayBufferUInt32View[3] = bufferValueAtIndex3;
      arrayBufferUInt32View[4] = bufferValueAtIndex4;
      arrayBufferUInt32View[5] = bufferValueAtIndex5;

      subject = new describedClass(arrayBuffer, startOffset * 4);
    });

    it("uses that section of the ArrayBuffer", () => {
      expect(subject.x).toEqual(bufferValueAtIndex3);
      expect(subject.y).toEqual(bufferValueAtIndex4);
      expect(subject.z).toEqual(bufferValueAtIndex5);
    });
  });
});
