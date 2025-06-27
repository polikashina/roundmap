import path from "path";
import {
  jest,
  describe,
  beforeEach,
  afterEach,
  test,
  expect,
} from "@jest/globals";
import { getLocalIdent } from "../../src/utils/getLocalIdent.js";

describe("getLocalIdent", () => {
  // Store the original Math.random function
  const originalMathRandom = Math.random;

  // Mock context objects for different scenarios
  const createContext = (resourcePath, rootContext) => ({
    resourcePath,
    rootContext,
  });

  beforeEach(() => {
    // Mock Math.random to return a predictable value
    Math.random = jest.fn(() => 0.123456789);
  });

  afterEach(() => {
    // Restore the original Math.random function
    Math.random = originalMathRandom;
  });

  test("should return localName as is when path starts with /src/ui/components/", () => {
    const context = createContext(
      "/root/src/ui/components/Button/Button.css",
      "/root"
    );
    const localName = "button";

    const result = getLocalIdent(context, null, localName);

    expect(result).toBe(localName);
  });

  test("should return formatted name with random suffix for other paths", () => {
    const context = createContext(
      "/root/src/components/Header/Header.css",
      "/root"
    );
    const localName = "header";

    const result = getLocalIdent(context, null, localName);

    // Check the format of the result
    expect(result).toMatch(/^header__header--[a-z0-9]{5}$/);
  });

  test("should handle file with extension correctly", () => {
    const context = createContext(
      "/root/src/pages/HomePage/HomePage.module.css",
      "/root"
    );
    const localName = "container";

    const result = getLocalIdent(context, null, localName);

    // Check the format of the result
    expect(result).toMatch(/^homepage\.module__container--[a-z0-9]{5}$/);
  });

  test("should convert result to lowercase", () => {
    const context = createContext(
      "/root/src/components/NavBar/NavBar.css",
      "/root"
    );
    const localName = "NavItem";

    const result = getLocalIdent(context, null, localName);

    // Check the format of the result
    expect(result).toMatch(/^navbar__navitem--[a-z0-9]{5}$/);
  });
});
