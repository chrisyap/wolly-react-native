import React from 'react';
import Card from './index';
import Txt from '../Text';
import * as util from '../Util';

jest.mock('../Util');

const isTablet = (utility = util, boolean) => {
  utility.isTablet = boolean;
};

describe('Card', () => {
  beforeEach(() => {
    isTablet(util, false);
  });
  const defaultProps = {
    p: 2,
    children: <Txt>Test</Txt>,
  };
  it('renders correctly', () => {
    const wrapper = shallow(<Card {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly in tablet', () => {
    isTablet(util, true);
    const wrapper = shallow(<Card {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });
});
