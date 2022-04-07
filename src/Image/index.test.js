import { shallow } from 'enzyme';
import React from 'react';
import Image from './index';

describe('Image', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<Image />);
    expect(wrapper).toMatchSnapshot();
  });
});
