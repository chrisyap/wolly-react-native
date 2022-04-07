import React from 'react';
import { Cell } from './Cell';
import * as util from '../Util';

jest.mock('../Util');

const isTablet = (utility = util, boolean) => {
  utility.isTablet = boolean;
};

describe('Cell', () => {
  beforeEach(() => {
    isTablet(util, false);
  });

  const shallowWrapper = (props) =>
    shallow(<Cell {...props} />)
      .dive()
      .dive()
      .dive();

  const defaultProps = {
    children: 'Cell text',
  };

  it('renders correctly', () => {
    const wrapper = shallowWrapper(defaultProps);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders right aligned correctly', () => {
    const props = {
      ...defaultProps,
      align: 'right',
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders center aligned correctly', () => {
    const props = {
      ...defaultProps,
      align: 'center',
    };
    const wrapper = shallowWrapper(props);
    expect(wrapper).toMatchSnapshot();
  });

  describe('Tablet', () => {
    beforeEach(() => {
      isTablet(util, true);
    });

    it('renders correctly', () => {
      isTablet(util, true);
      const wrapperTablet = shallowWrapper(defaultProps);
      expect(wrapperTablet).toMatchSnapshot();
    });

    it('renders right aligned correctly', () => {
      const props = {
        ...defaultProps,
        align: 'right',
      };
      isTablet(util, true);
      const wrapperTablet = shallowWrapper(props);
      expect(wrapperTablet).toMatchSnapshot();
    });

    it('renders center aligned correctly', () => {
      const props = {
        ...defaultProps,
        align: 'center',
      };

      isTablet(util, true);
      const wrapperTablet = shallowWrapper(props);
      expect(wrapperTablet).toMatchSnapshot();
    });
  });
});
