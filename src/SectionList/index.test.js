import React from "react";
import List from "./index";
import { ThemeConsumer } from "styled-components";
import { darkTheme, lightTheme } from "../Theme";

const shallowWithTheme = (children, theme = lightTheme) => {
  ThemeConsumer._currentValue = theme;
  return shallow(children);
};

describe("List", () => {
  it("renders correctly", () => {
    const wrapper = shallowWithTheme(<List />, lightTheme);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders dark theme correctly", () => {
    const wrapper = shallowWithTheme(<List />, darkTheme);
    expect(wrapper).toMatchSnapshot();
  });
});
