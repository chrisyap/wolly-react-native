import React from "react";
import ConditionalWrapper from "./ConditionalWrapper";
import Txt from "../Text/index";
import V from "../View/index";

describe("ConditionalWrapper", () => {
  const defaultProps = {
    children: <Txt>Children</Txt>,
    condition: false,
    wrapper: (children) => <V>{children}</V>
  };

  it("renders correctly without condition", () => {
    const wrapper = shallow(<ConditionalWrapper {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders correctly with condition", () => {
    const props = {
      ...defaultProps,
      condition: true
    };
    const wrapper = shallow(<ConditionalWrapper {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
