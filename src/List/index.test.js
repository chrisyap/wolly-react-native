import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemeConsumer } from 'styled-components';
import { darkTheme, lightTheme } from '../Theme';
import Txt from '../Text';
import List from './index';

const shallowWithTheme = (children, theme = lightTheme) => {
  ThemeConsumer._currentValue = theme;
  return shallow(children);
};

const Item = ({ item, onPress }) => (
  <TouchableOpacity onPress={onPress}>
    <Txt>{item.title}</Txt>
  </TouchableOpacity>
);

const renderItem = ({ item }) => {
  return <Item item={item} onPress={() => {}} />;
};

describe('List', () => {
  const defaultProps = {
    data: [
      {
        id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
        title: 'First Item',
      },
      {
        id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
        title: 'Second Item',
      },
      {
        id: '58694a0f-3da1-471f-bd96-145571e29d72',
        title: 'Third Item',
      },
    ],
  };

  it('renders correctly', () => {
    const wrapper = shallowWithTheme(
      <List {...defaultProps} renderItem={renderItem} keyExtractor={(item) => item.id} />,
      lightTheme
    );
    expect(wrapper).toMatchSnapshot();
  });

  it('renders dark theme correctly', () => {
    const wrapper = shallowWithTheme(
      <List {...defaultProps} renderItem={renderItem} keyExtractor={(item) => item.id} />,
      darkTheme
    );
    expect(wrapper).toMatchSnapshot();
  });
});
