import React from 'react';
import renderer from 'react-test-renderer';
import 'jest-styled-components';
import Txt from './index';

const Util = jest.requireMock('../Util');
jest.mock('../Util', () => ({
  isTablet: false,
}));

describe('Txt', () => {
  const defaultProps = {
    children: 'Text goes here',
  };
  beforeEach(() => {
    Util.isTablet = false;
  });
  it('renders correctly', () => {
    const tree = renderer.create(<Txt {...defaultProps} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders correctly for tablet', () => {
    Util.isTablet = true;
    const props = {
      ...defaultProps,
      fontSize: Util.isTablet ? 8 : 7,
    };
    const tree = renderer.create(<Txt {...props} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders with light font correctly', () => {
    const props = {
      ...defaultProps,
      light: true,
    };
    const wrapper = shallow(<Txt {...props} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with semibold font correctly', () => {
    const props = {
      ...defaultProps,
      semibold: true,
    };
    const wrapper = shallow(<Txt {...props} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with bold font correctly', () => {
    const props = {
      ...defaultProps,
      bold: true,
    };
    const wrapper = shallow(<Txt {...props} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders underlined correctly', () => {
    const props = {
      ...defaultProps,
      underline: true,
    };
    const wrapper = shallow(<Txt {...props} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders lineThrough correctly', () => {
    const props = {
      ...defaultProps,
      lineThrough: true,
    };
    const wrapper = shallow(<Txt {...props} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders underlineLineThrough correctly', () => {
    const props = {
      ...defaultProps,
      underlineLineThrough: true,
    };
    const wrapper = shallow(<Txt {...props} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });

  it('renders uppercase correctly', () => {
    const props = {
      ...defaultProps,
      uppercase: true,
    };
    const wrapper = shallow(<Txt {...props} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });
});
