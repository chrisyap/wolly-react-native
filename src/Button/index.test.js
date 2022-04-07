import React from "react";
import Btn from "./index";
import { lightTheme } from "../Theme";

const shallowWrapper = (props) =>
  shallow(<Btn theme={lightTheme} {...props} />)
    .dive()
    .dive()
    .dive();

describe("Btn", () => {
  const defaultProps = {
    children: "CTA"
  };
  it("renders correctly", () => {
    const wrapper = shallowWrapper(defaultProps);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders disabled correctly", () => {
    const props = {
      ...defaultProps,
      disabled: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders bold correctly", () => {
    const props = {
      ...defaultProps,
      bold: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders semibold correctly", () => {
    const props = {
      ...defaultProps,
      semibold: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders small correctly", () => {
    const props = {
      ...defaultProps,
      small: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders medium correctly", () => {
    const props = {
      ...defaultProps,
      medium: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders large correctly", () => {
    const props = {
      ...defaultProps,
      large: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders block correctly", () => {
    const props = {
      ...defaultProps,
      block: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders flat correctly", () => {
    const props = {
      ...defaultProps,
      flat: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders outlined correctly", () => {
    const props = {
      ...defaultProps,
      outlined: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders white outlined correctly", () => {
    const props = {
      ...defaultProps,
      outlined: true,
      white: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });

  // inverted
  it("renders inverted correctly", () => {
    const props = {
      ...defaultProps,
      inverted: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders primary inverted correctly", () => {
    const props = {
      ...defaultProps,
      inverted: true,
      primary: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders success inverted correctly", () => {
    const props = {
      ...defaultProps,
      inverted: true,
      success: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders info inverted correctly", () => {
    const props = {
      ...defaultProps,
      inverted: true,
      info: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders warning inverted correctly", () => {
    const props = {
      ...defaultProps,
      inverted: true,
      warning: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders danger inverted correctly", () => {
    const props = {
      ...defaultProps,
      inverted: true,
      danger: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders black inverted correctly", () => {
    const props = {
      ...defaultProps,
      inverted: true,
      black: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders white inverted correctly", () => {
    const props = {
      ...defaultProps,
      inverted: true,
      white: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders primary correctly", () => {
    const props = {
      ...defaultProps,
      primary: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders secondary correctly", () => {
    const props = {
      ...defaultProps,
      secondary: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders success correctly", () => {
    const props = {
      ...defaultProps,
      success: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders info correctly", () => {
    const props = {
      ...defaultProps,
      info: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders warning correctly", () => {
    const props = {
      ...defaultProps,
      warning: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders danger correctly", () => {
    const props = {
      ...defaultProps,
      danger: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders black correctly", () => {
    const props = {
      ...defaultProps,
      black: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders white correctly", () => {
    const props = {
      ...defaultProps,
      white: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });

  // Icons
  it("renders square correctly", () => {
    const props = {
      ...defaultProps,
      icon: "checked",
      square: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders round correctly", () => {
    const props = {
      ...defaultProps,
      icon: "checked",
      round: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders small round correctly", () => {
    const props = {
      ...defaultProps,
      icon: "checked",
      round: true,
      small: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders medium round correctly", () => {
    const props = {
      ...defaultProps,
      icon: "checked",
      round: true,
      medium: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders large round correctly", () => {
    const props = {
      ...defaultProps,
      icon: "checked",
      round: true,
      large: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });

  it("renders primary inverted square correctly", () => {
    const props = {
      ...defaultProps,
      icon: "checked",
      square: true,
      inverted: true,
      primary: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders success inverted square correctly", () => {
    const props = {
      ...defaultProps,
      icon: "checked",
      square: true,
      inverted: true,
      success: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders info inverted square correctly", () => {
    const props = {
      ...defaultProps,
      icon: "checked",
      square: true,
      inverted: true,
      info: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders warning inverted square correctly", () => {
    const props = {
      ...defaultProps,
      icon: "checked",
      square: true,
      inverted: true,
      warning: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
  it("renders danger inverted square correctly", () => {
    const props = {
      ...defaultProps,
      icon: "checked",
      square: true,
      inverted: true,
      danger: true
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });
});
