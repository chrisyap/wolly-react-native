import React from 'react';
import { StatusBar } from 'react-native';
import { SafeAreaInsetsContext } from 'react-native-safe-area-context';
import { ThemeContext } from 'styled-components';
import V, { VProps } from '../View';
import { ThemeProps } from '../Theme';
import { isTablet } from '../Util';

export interface HeaderProps extends VProps {
  bg?: string;
  isDarkMode?: boolean;
  isStatusBarHidden?: boolean;
  left?: any;
  title?: any;
  right?: any;
}

const Header: React.FC<HeaderProps> = ({ bg, isStatusBarHidden, left, title, right, ...props }) => {
  const insets = React.useContext(SafeAreaInsetsContext);
  const theme = React.useContext(ThemeContext) as ThemeProps;

  return (
    <V bg={bg ? bg : 'secondaries.0'} p={0} {...props}>
      <StatusBar
        backgroundColor={theme?.colors.secondaries[0]}
        barStyle={theme?.colors.isDarkTheme ? 'light-content' : 'dark-content'}
        hidden={isStatusBarHidden}
      />
      <V pt={insets?.top}>
        <V flexDirection="row" px={1} pb={isTablet ? 1 : '4px'}>
          <V justifyContent="center" alignItems="flex-start" minWidth={'60px'}>
            {left}
          </V>
          <V flexGrow={1} flexShrink={1} mx={2} justifyContent="center" alignItems="center">
            {title}
          </V>
          <V justifyContent="center" alignItems="flex-end" minWidth={'60px'}>
            {right}
          </V>
        </V>
      </V>
    </V>
  );
};

export default Header;
