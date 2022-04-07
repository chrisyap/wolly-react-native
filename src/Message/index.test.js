import { shallow } from 'enzyme';
import React from 'react';
import Message from './';
import Txt from '../Text';
import * as util from '../Util';

jest.mock('../Util');

const isTablet = (utility, boolean) => {
  utility.isTablet = boolean;
};

describe('Message', () => {
  const defaultProps = {
    children: 'Message goes here',
    isOpened: true,
    onClose: jest.fn(),
  };
  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('Mobile', () => {
    beforeEach(() => {
      isTablet(util, false);
    });
    it('renders closed correctly', () => {
      const props = {
        ...defaultProps,
        isOpened: false,
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
      wrapper.unmount();
    });

    it('renders default correctly', () => {
      const wrapper = shallow(<Message {...defaultProps} />);
      expect(wrapper).toMatchSnapshot();
      wrapper.find('TouchableOpacity').props().onPress();
      expect(defaultProps.onClose).toBeCalled();
    });

    it('renders default without icon correctly', () => {
      const props = {
        ...defaultProps,
        hasNoIcon: true,
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
    });

    it('renders success correctly', () => {
      const props = {
        ...defaultProps,
        success: true,
        testId: 'message-id',
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders warning correctly', () => {
      const props = {
        ...defaultProps,
        warning: true,
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders error correctly', () => {
      const props = {
        ...defaultProps,
        danger: true,
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders with custom icon correctly', () => {
      const props = {
        ...defaultProps,
        icon: 'checked',
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders with components children correctly', () => {
      const props = {
        ...defaultProps,
        children: <Txt>Message goes here</Txt>,
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('component did update', async () => {
      const wrapper = shallow(<Message {...defaultProps} />);
      wrapper.setProps({ isOpened: false });
      await new Promise((resolve) => setTimeout(resolve, 1000));
      expect(wrapper.instance().state.isVisible).toBeFalsy();
    });
  });

  //tablet
  describe('Tablet', () => {
    beforeEach(() => {
      isTablet(util, true);
    });
    it('renders default correctly', () => {
      const wrapper = shallow(<Message {...defaultProps} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders success correctly ', () => {
      const props = {
        ...defaultProps,
        success: true,
        testId: 'message-id',
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders warning correctly', () => {
      const props = {
        ...defaultProps,
        warning: true,
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders error correctly', () => {
      const props = {
        ...defaultProps,
        danger: true,
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders with custom icon correctly', () => {
      const props = {
        ...defaultProps,
        icon: 'checked',
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
    it('renders with components children correctly', () => {
      const props = {
        ...defaultProps,
        children: <Txt>Message goes here</Txt>,
      };
      const wrapper = shallow(<Message {...props} />);
      expect(wrapper).toMatchSnapshot();
    });
  });
});
