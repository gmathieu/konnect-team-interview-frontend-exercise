import { abbreviateInt } from "../abbreviateInt";
import { describe, it, expect } from "vitest";

describe("abbreviateInt", () => {
  it("should abbreviateInt", () => {
    expect(abbreviateInt(1)).toEqual("1");
    expect(abbreviateInt(10)).toEqual("10");
    expect(abbreviateInt(100)).toEqual("0.1k");
    expect(abbreviateInt(1000)).toEqual("1k");
    expect(abbreviateInt(1200)).toEqual("1.2k");
    expect(abbreviateInt(1000000)).toEqual("1m");
    expect(abbreviateInt(1000000000)).toEqual("1b");
    expect(abbreviateInt(1000000000000)).toEqual("1t");
  });
});
