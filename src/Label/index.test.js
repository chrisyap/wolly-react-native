import React from 'react';
import Label from './index';

describe('Label', () => {
  const defaultProps = {
    children: 'Text goes here',
  };
  it('renders correctly', () => {
    const wrapper = shallow(<Label {...defaultProps} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with required prop correctly', () => {
    const props = {
      ...defaultProps,
      required: true,
    };
    const wrapper = shallow(<Label {...props} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });
  it('renders with uppercase text correctly', () => {
    const props = {
      ...defaultProps,
      uppercase: true,
    };
    const wrapper = shallow(<Label {...props} />)
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });
});
