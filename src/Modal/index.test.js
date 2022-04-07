import React from 'react';
import { ThemeConsumer } from 'styled-components';
import * as hooks from '@react-native-community/hooks';
import Btn from '../Button';
import { lightTheme, darkTheme } from '../Theme';
import * as util from '../Util';
import Modal from './index';

jest.mock('../Theme');
jest.mock('@react-native-community/hooks');
jest.mock('../Util');

const defaultProps = {
  onClose: jest.fn(),
  title: 'Test title',
  onReset: jest.fn(),
  scrollProps: {},
  closeLabel: 'Close',
  hasCloseBtn: true,
  isFullScreen: true,
  orientation: 'LANDSCAPE-RIGHT',
};

const shallowWithTheme = (props, theme) => {
  ThemeConsumer._currentValue = theme;
  return shallow(<Modal {...props} />);
};

const isTablet = (utility = util, boolean) => {
  utility.isTablet = boolean;
};

describe('Modal', () => {
  beforeEach(() => {
    hooks.useDeviceOrientation.mockReturnValue({ landscape: false });
    isTablet(util, false);
  });
  describe('render', () => {
    it('renders correctly for lightTheme', () => {
      const wrapper = shallowWithTheme(defaultProps, lightTheme);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly for darkTheme', () => {
      const wrapper = shallowWithTheme(defaultProps, darkTheme);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly for fullscreen with status bar hidden', () => {
      const props = { ...defaultProps, ...{ coverScreen: false } };
      const wrapper = shallowWithTheme(props, lightTheme);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly without reset', () => {
      const props = {
        ...defaultProps,
        onReset: undefined,
      };
      const wrapper = shallowWithTheme(props, lightTheme);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with custom button', () => {
      const props = {
        ...defaultProps,
        customBtn: <Btn>Custom button</Btn>,
      };
      const wrapper = shallowWithTheme(props, lightTheme);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly without close label', () => {
      const props = {
        ...defaultProps,
        closeLabel: undefined,
      };
      const wrapper = shallowWithTheme(props, lightTheme);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with orientation landscape left', () => {
      const props = {
        ...defaultProps,
        orientation: 'LANDSCAPE-LEFT',
      };
      const wrapper = shallowWithTheme(props, lightTheme);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly with orientation portrait', () => {
      const props = {
        ...defaultProps,
        orientation: 'PORTRAIT',
      };
      const wrapper = shallowWithTheme(props, lightTheme);
      expect(wrapper).toMatchSnapshot();
    });

    // Tablet
    it('renders correctly on tablet for lightTheme', () => {
      isTablet(util, true);
      const wrapper = shallowWithTheme(defaultProps, lightTheme);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders correctly on tablet (landscape) for lightTheme', () => {
      hooks.useDeviceOrientation.mockReturnValue({ landscape: true });
      isTablet(util, true);
      const wrapper = shallowWithTheme(defaultProps, lightTheme);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
