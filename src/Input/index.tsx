import React from 'react';
import { ColorValue, Platform, TouchableOpacity, TextInput, TextInputProps, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { ThemeContext } from 'styled-components';
import { composed, ComposedProps } from '../Common/Composed';
import Icon from '../Icon';
import Label from '../Label';
import Txt from '../Text';
import V from '../View';
import { ThemeProps } from '../Theme';
import { getTestIdProp, isTablet } from '../Util';

interface InputWrapperProps extends ComposedProps {
  icon?: string;
  error?: boolean;
  theme: ThemeProps;
  disabled?: boolean;
  hasNoBorder?: boolean;
  light?: boolean;
  semibold?: boolean;
  bold?: boolean;
}

interface InputFieldProps extends TextInputProps {
  icon?: string;
  inputProps?: object;
  label?: any;
  labelTestID?: string;
  required?: boolean;
  password?: boolean;
  error?: boolean;
  errorMessage?: any;
  testID?: string;
  theme?: ThemeProps;
  justifyContent?: any;
  useRef?: React.RefObject<TextInput>;
  disabled?: boolean;
  isDarkMode?: boolean;
  errorTestID?: string;
  placeholderColor?: string;
  iconColor?: string;
  hasNoBorder?: boolean;
}

const InputWrapper = styled.TextInput<InputWrapperProps>`
  border: ${(props) =>
    `1px solid ${
      props.error
        ? props.theme.colors.danger
        : props.hasNoBorder
        ? props.theme.colors.white
        : props.theme.colors?.secondaryAccent
    }`};
  border-radius: ${(props) =>
    props.theme.radii ? (isTablet && props.hasNoBorder ? props.theme.radii[3] : props.theme.radii[2]) : 0};
  height: ${(props) => (isTablet ? (props.hasNoBorder ? '60px' : '44px') : '38px')};
  padding-left: ${(props) => (props.icon ? (isTablet ? (props.hasNoBorder ? '70px' : '62px') : '36px') : '8px')};
  padding-right: 8px;
  padding-top: 0px;
  padding-bottom: 0px;
  margin: 0px;
  font-family: ${(props) =>
    props.light
      ? 'SourceSansPro-Light'
      : props.semibold
      ? 'SourceSansPro-Semibold'
      : props.bold
      ? 'SourceSansPro-Bold'
      : 'SourceSansPro'};
  font-size: ${(props) =>
    props.theme.fontSizes ? (isTablet ? `${props.theme.fontSizes[8]}` : `${props.theme.fontSizes[7]}`) : '16px'};
  color: ${(props) => props.theme.colors?.text};
  opacity: ${(props) => (props.disabled ? 0.5 : 1)};
  ${composed};
`;

const InputField: React.FC<InputFieldProps> = ({
  inputProps,
  label,
  testID,
  errorTestID,
  labelTestID,
  ...props
}: InputFieldProps) => {
  const [inputState, setInputState] = React.useState<{
    showPassword: boolean;
  }>({ showPassword: props.password || false });

  const setShowPassword = (showPassword: boolean | null): void => {
    setInputState({ showPassword: !showPassword });
  };

  const theme = React.useContext(ThemeContext) as ThemeProps;

  const placeholderTextColor: ColorValue | undefined = props.placeholderColor
    ? props.placeholderColor
    : theme?.colors.isDarkTheme
    ? '#666666'
    : '#bbbbbb';

  const styles = StyleSheet.create({
    touch: {
      position: 'absolute',
      right: Platform.OS === 'ios' ? 26 : 0,
      zIndex: 100,
      padding: isTablet ? 12 : 10,
      top: 0,
      flexDirection: 'row',
    },
  });

  return (
    <React.Fragment>
      {label && (
        <Label mb="2px" {...getTestIdProp(labelTestID)}>
          {label}
        </Label>
      )}
      <V position="relative" justifyContent="center">
        {props.icon && (
          <Icon
            flex={0}
            name={props.icon}
            zIndex={10}
            color={props.error ? 'dangers.3' : props.iconColor || 'secondary'}
            medium={isTablet && props.hasNoBorder}
            opacity={0.8}
            position="absolute"
            width={36}
            marginLeft={isTablet ? (props.hasNoBorder ? 3 : 2) : 0}
            // alignItems="center"
          />
        )}
        {props.password && (
          <TouchableOpacity
            style={styles.touch}
            onPress={() => setShowPassword(inputState.showPassword)}
            testID={!inputState.showPassword ? 'hide' : 'show'}
          >
            <Txt fontFamily="SourceSansPro-Bold" fontSize={5} color={props.error ? 'dangers.3' : 'secondary'}>
              {!inputState.showPassword ? 'HIDE' : 'SHOW'}
            </Txt>
          </TouchableOpacity>
        )}
        <InputWrapper
          error={props.error}
          {...getTestIdProp(testID)}
          icon={props.icon}
          {...inputProps}
          secureTextEntry={inputState.showPassword}
          ref={props.useRef}
          editable={!props.disabled}
          spellCheck={false}
          allowFontScaling={false}
          autoCorrect={false}
          autoCompleteType={'off'}
          textAlignVertical="center"
          bg={'white'}
          placeholderTextColor={placeholderTextColor}
          keyboardAppearance={theme?.colors.isDarkTheme ? 'dark' : 'light'}
          {...props}
        />
      </V>
      {props.error && props.errorMessage && (
        <V mt={1}>
          {Array.isArray(props.errorMessage) ? (
            props.errorMessage.map((message, m) => (
              <Txt
                key={m}
                color="danger"
                lineHeight={isTablet ? '18px' : '16px'}
                pt="2px"
                {...getTestIdProp(`${errorTestID || 'error-message'}-${m}`)}
              >
                {message}
              </Txt>
            ))
          ) : (
            <Txt color="danger" lineHeight={isTablet ? '18px' : '16px'} pt="2px" {...getTestIdProp(errorTestID)}>
              {props.errorMessage}
            </Txt>
          )}
        </V>
      )}
    </React.Fragment>
  );
};

export default InputField;
