import React from 'react';
import ScrollBar from './Scrollbar';

describe('Scrollbar', () => {
  it('renders correctly', () => {
    const wrapper = shallow(<ScrollBar />);
    expect(wrapper).toMatchSnapshot();
  });
});
