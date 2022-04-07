import React from 'react';
import PaddedLayoutView from './TabletPaddedLayout';
import { useDeviceOrientation } from '@react-native-community/hooks';

jest.mock('@react-native-community/hooks');

describe('PaddedLayoutView', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<PaddedLayoutView />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders in landscape correctly', () => {
    useDeviceOrientation.mockReturnValue({ landscape: true });
    const wrapper = shallow(<PaddedLayoutView />);
    expect(wrapper).toMatchSnapshot();
  });

  it('renders correctly with columns specified', () => {
    const props = {
      columns: 2,
    };
    const wrapper = shallow(<PaddedLayoutView {...props} />);
    expect(wrapper).toMatchSnapshot();
  });
});
