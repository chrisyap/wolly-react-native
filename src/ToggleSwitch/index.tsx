import React from 'react';
import { Platform, StyleSheet, Switch, SwitchProps } from 'react-native';
import { ThemeContext } from 'styled-components';
import { ThemeProps } from '../Theme';

interface ToggleSwitchProps extends SwitchProps {
  isDarkMode?: boolean;
}

const ToggleSwitch: React.FC<ToggleSwitchProps> = ({ onValueChange, value, testID, ...props }) => {
  const themeContext = React.useContext(ThemeContext) as ThemeProps;
  const styles = StyleSheet.create({
    switch: {
      opacity: props.disabled ? 0.5 : 1,
    },
  });
  return (
    <Switch
      trackColor={{
        false:
          Platform.OS === 'android'
            ? themeContext.colors.isDarkTheme
              ? themeContext.colors.secondaries[2]
              : themeContext.colors.secondaries[1]
            : themeContext.colors.secondaries[2],
        true:
          Platform.OS === 'android'
            ? themeContext.colors.isDarkTheme
              ? themeContext.colors.successes[5]
              : themeContext.colors.secondaries[3]
            : themeContext.colors.isDarkTheme
            ? themeContext.colors.success
            : themeContext.colors.secondary,
      }}
      thumbColor={
        Platform.OS === 'android'
          ? value
            ? themeContext.colors.success
            : themeContext.colors.isDarkTheme
            ? themeContext.colors.secondaries[5]
            : themeContext.colors.secondaries[2]
          : value
          ? themeContext.colors.isDarkTheme
            ? themeContext.colors.white
            : themeContext.colors.secondaries[0]
          : themeContext.colors.isDarkTheme
          ? themeContext.colors.secondaries[0]
          : themeContext.colors.white
      }
      ios_backgroundColor={
        themeContext.colors.isDarkTheme ? themeContext.colors.secondaries[5] : themeContext.colors.secondaries[2]
      }
      value={value}
      onValueChange={onValueChange}
      testID={testID}
      style={styles.switch}
      {...props}
    />
  );
};

export default ToggleSwitch;
