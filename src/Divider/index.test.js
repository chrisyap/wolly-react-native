import React from 'react';
import Divider from './index';
import { lightTheme } from '../Theme';

describe('Divider', () => {
  const defaultProps = {
    theme: lightTheme,
  };
  it('renders correctly', () => {
    const wrapper = shallow(<Divider {...defaultProps} />)
      .dive()
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });
  it('renders thick divider correctly', () => {
    const wrapper = shallow(<Divider thick {...defaultProps} />)
      .dive()
      .dive()
      .dive();
    expect(wrapper).toMatchSnapshot();
  });
});
