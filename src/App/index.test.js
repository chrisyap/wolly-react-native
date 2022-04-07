import React from "react";
import App from "./index";

describe("App", () => {
  const defaultProps = {
    theme: "light"
  };
  it("renders correctly", () => {
    const wrapper = shallow(<App {...defaultProps} />).dive();
    expect(wrapper).toMatchSnapshot();
  });
  it("renders dark theme correctly", () => {
    const props = {
      theme: "dark"
    };
    const wrapper = shallow(<App {...props} />).dive();
    expect(wrapper).toMatchSnapshot();
  });
});
