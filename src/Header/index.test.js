import React from 'react';
import Header from './index';
import { ThemeConsumer } from 'styled-components';
import { lightTheme, darkTheme } from '../Theme';
import * as util from '../Util';

jest.mock('../Util');

const isTablet = (utility, boolean) => {
  utility.isTablet = boolean;
};

describe('Header', () => {
  const defaultProps = {
    title: 'App title',
  };

  const shallowWithTheme = (props = defaultProps, theme = lightTheme) => {
    ThemeConsumer._currentValue = theme;
    return shallow(<Header {...props} />);
  };

  describe('Mobile', () => {
    beforeEach(() => {
      isTablet(util, false);
    });
    it('renders correctly', () => {
      const wrapper = shallowWithTheme();
      expect(wrapper).toMatchSnapshot();
    });

    it('renders with no content correctly', () => {
      const props = {};
      const wrapper = shallowWithTheme(props);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders with custom bg correctly', () => {
      const props = {
        ...defaultProps,
        bg: 'red',
      };
      const wrapper = shallowWithTheme(props);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders with dark theme correctly', () => {
      const props = {
        ...defaultProps,
      };

      const wrapper = shallowWithTheme(props, darkTheme);
      expect(wrapper).toMatchSnapshot();
    });
  });

  describe('Tablet', () => {
    beforeEach(() => {
      isTablet(util, true);
    });
    it('renders correctly', () => {
      const wrapper = shallowWithTheme();
      expect(wrapper).toMatchSnapshot();
    });
  });
});
