import React from 'react';
import styled, { ThemeContext } from 'styled-components/native';
import { GestureResponderEvent, TouchableOpacityProps } from 'react-native';
import { composed, ComposedProps } from '../Common/Composed';
import { ThemeProps } from '../Theme';
import Icon from '../Icon';
import Txt from '../Text';

interface BtnWrapperProps extends ComposedProps {
  icon?: string;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  outlined?: boolean;
  flat?: boolean;
  inverted?: boolean;
  block?: boolean;
  fullwidth?: boolean;
  primary?: boolean;
  secondary?: boolean;
  info?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  black?: boolean;
  white?: boolean;
  square?: boolean;
  round?: boolean;
  disabled?: boolean | null | undefined;
  theme?: ThemeProps;
}

const BtnWrapper = styled.TouchableOpacity<BtnWrapperProps>`
  flex-direction: row;
  height: ${(props) => (props.small ? '30px' : props.medium ? '44px' : props.large ? '56px' : '38px')};
  width: ${(props) =>
    props.icon && (props.square || props.round)
      ? props.small
        ? '30px'
        : props.medium
        ? '44px'
        : props.large
        ? '56px'
        : '38px'
      : props.block || props.fullwidth
      ? '100%'
      : 'auto'};
  background-color: ${(props) =>
    props.flat
      ? 'transparent'
      : props.outlined && props.white
      ? props.theme.colors.black
      : props.outlined && !props.white
      ? props.theme.colors.white
      : props.inverted
      ? props.primary
        ? props.theme.colors.primaries[1]
        : props.success
        ? props.theme.colors.successes[1]
        : props.info
        ? props.theme.colors.infos[1]
        : props.warning
        ? props.theme.colors.warnings[1]
        : props.danger
        ? props.theme.colors.dangers[1]
        : props.black
        ? props.theme.colors.blacks[0]
        : props.white
        ? props.theme.colors.secondaries[8]
        : props.theme.colors.secondaries[1]
      : props.primary
      ? props.theme.colors.primary
      : props.secondary
      ? props.theme.colors.secondaryAccent
      : props.success
      ? props.theme.colors.success
      : props.info
      ? props.theme.colors.info
      : props.warning
      ? props.theme.colors.warning
      : props.danger
      ? props.theme.colors.danger
      : props.black
      ? props.theme.colors.black
      : props.flat
      ? 'transparent'
      : props.theme.colors.backgrounds[1]};
  border-width: ${(props) =>
    !props.outlined &&
    (props.primary ||
      props.secondary ||
      props.success ||
      props.warning ||
      props.info ||
      props.danger ||
      props.black ||
      props.white ||
      props.flat ||
      props.inverted)
      ? '0'
      : '2px'};
  border-style: solid;
  border-radius: ${(props) => (props.round ? '290486px' : props.theme.radii[2])};
  border-color: ${(props) =>
    props.outlined && props.white
      ? props.theme.colors.white
      : props.primary
      ? props.theme.colors.primaries[5]
      : props.secondary
      ? props.theme.colors.secondaries[5]
      : props.success
      ? props.theme.colors.successes[5]
      : props.info
      ? props.theme.colors.infos[5]
      : props.warning
      ? props.theme.colors.warnings[5]
      : props.danger
      ? props.theme.colors.dangers[5]
      : props.black
      ? props.theme.colors.black
      : props.theme.colors.secondaries[5]};
  align-items: center;
  justify-content: center;
  padding-left: ${(props) => (props.icon ? '0' : '16px')};
  padding-right: ${(props) => (props.icon ? '0' : '16px')};
  opacity: ${(props) => (props.disabled ? 0.3 : 1)};
  ${composed};
`;

interface BtnProps extends ComposedProps, TouchableOpacityProps {
  icon?: string;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  outlined?: boolean;
  flat?: boolean;
  inverted?: boolean;
  block?: boolean;
  fullwidth?: boolean;
  primary?: boolean;
  secondary?: boolean;
  info?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  black?: boolean;
  white?: boolean;
  square?: boolean;
  round?: boolean;
  uppercase?: boolean;
  textProps?: object;
  onPress?: (event: GestureResponderEvent) => void;
  flex?: number;
  flexGrow?: number;
  flexShrink?: number;
  justifyContent?: string;
  alignContent?: string;
  alignItems?: string;
  theme?: ThemeProps;
}

const Btn: React.FC<BtnProps> = (props) => {
  const theme = React.useContext(ThemeContext) as ThemeProps;
  const textColor =
    props.outlined || props.inverted || props.flat
      ? props.primary
        ? theme?.colors.primaries[15]
        : props.secondary
        ? theme?.colors.secondaries[15]
        : props.success
        ? theme?.colors.successes[15]
        : props.info
        ? theme?.colors.infos[15]
        : props.warning
        ? theme?.colors.warnings[15]
        : props.danger
        ? theme?.colors.dangers[15]
        : props.black
        ? theme?.colors.black
        : props.white
        ? theme?.colors.white
        : theme?.colors.secondaries[18]
      : props.primary
      ? theme?.colors.primaryText
      : props.secondary
      ? theme?.colors.secondaryAccentText
      : props.success
      ? theme?.colors.successText
      : props.info
      ? theme?.colors.infoText
      : props.warning
      ? theme?.colors.warningText
      : props.danger
      ? theme?.colors.dangerText
      : props.black
      ? theme?.colors.white
      : props.white
      ? theme?.colors.black
      : theme?.colors.secondaries[18];
  return (
    <BtnWrapper onPress={!props.disabled ? props?.onPress : undefined} {...props}>
      {props?.icon && (
        <Icon
          name={props?.icon}
          small={props?.small}
          medium={props?.medium}
          large={props?.large}
          color={
            props.outlined || props.inverted || props.flat
              ? props.primary
                ? 'primaries.13'
                : props.secondary
                ? 'secondary'
                : props.success
                ? 'successes.13'
                : props.info
                ? 'infos.13'
                : props.warning
                ? 'warnings.13'
                : props.danger
                ? 'dangers.13'
                : props.black
                ? 'black'
                : props.white
                ? 'white'
                : 'secondaries.18'
              : props.primary
              ? 'primaryText'
              : props.secondary
              ? 'secondaryAccentText'
              : props.success
              ? 'successText'
              : props.info
              ? 'infoText'
              : props.warning
              ? 'warningText'
              : props.danger
              ? 'dangerText'
              : props.black
              ? 'white'
              : props.white
              ? 'black'
              : 'secondaries.18'
          }
          opacity={props?.disabled ? 0.3 : 1}
        />
      )}
      {props?.children && (
        <Txt
          semibold
          fontSize={
            props.small
              ? theme?.fontSizes[6]
              : props.medium
              ? theme?.fontSizes[8]
              : props.large
              ? theme?.fontSizes[10]
              : theme?.fontSizes[7]
          }
          color={textColor}
          uppercase={props?.uppercase}
          opacity={props.disabled ? 0.8 : 1}
          mx={props?.icon ? 1 : 0}
          {...props?.textProps}
        >
          {props?.children}
        </Txt>
      )}
    </BtnWrapper>
  );
};

export default Btn;
