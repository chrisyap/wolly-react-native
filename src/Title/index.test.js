import React from 'react';
import { shallow } from 'enzyme';
import Title from './index';
import * as util from '../Util';

jest.mock('../Util');

const isTablet = (utility, boolean) => {
  utility.isTablet = boolean;
};

describe('Title', () => {
  const shallowWrapper = (props) =>
    shallow(<Title {...props} />)
      .dive()
      .dive()
      .dive();

  const defaultProps = {
    children: 'Title goes here',
  };

  describe('Mobile', () => {
    it('renders correctly', () => {
      isTablet(util, false);
      const wrapper = shallowWrapper(defaultProps);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Tablet', () => {
    it('renders correctly', () => {
      isTablet(util, true);
      const wrapper = shallowWrapper(defaultProps);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
