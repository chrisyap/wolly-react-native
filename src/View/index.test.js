import React from "react";
import V, { AnimatedV } from "./index";

describe("V", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<V />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders row correctly", () => {
    const props = {
      flexDirection: "row"
    };
    const wrapper = shallow(<V {...props} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });

  it("renders alignments correctly", () => {
    const props = {
      alignItems: "center",
      alignContent: "center",
      justifyContent: "center"
    };
    const wrapper = shallow(<V {...props} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });
});

describe("AnimatedV", () => {
  it("renders correctly", () => {
    const wrapper = shallow(<AnimatedV />);
    expect(wrapper).toMatchSnapshot();
  });
});
