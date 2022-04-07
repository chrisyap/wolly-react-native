import React from 'react';
import Input from './index';
import { lightTheme } from '../Theme';
import * as util from '../Util';

jest.mock('../Util');

const isTablet = (utility, boolean) => {
  utility.isTablet = boolean;
};

describe('Input', () => {
  const defaultProps = {
    theme: lightTheme,
    label: 'Label goes here',
  };
  beforeEach(() => {
    isTablet(util, false);
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  it('renders default correctly', () => {
    const wrapper = shallow(<Input {...defaultProps} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders password correctly', () => {
    const props = {
      ...defaultProps,
      password: true,
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders with icon correctly', () => {
    const props = {
      ...defaultProps,
      icon: 'search',
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders default with error correctly', () => {
    const props = {
      ...defaultProps,
      error: true,
      errorMessage: 'Error goes here',
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders default with multiple errors correctly', () => {
    const props = {
      ...defaultProps,
      error: true,
      errorMessage: ['Error goes here', 'Error 2 goes here'],
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders default with icon and error correctly', () => {
    const props = {
      ...defaultProps,
      icon: 'search',
      error: true,
      errorMessage: 'Error goes here',
    };
    const wrapper = shallow(<Input {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
