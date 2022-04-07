import React from 'react';
import V, { VProps } from '../View';
import Txt from '../Text';

interface TagProps extends VProps {
  black?: boolean;
  white?: boolean;
  success?: boolean;
  warning?: boolean;
  danger?: boolean;
  primary?: boolean;
  secondary?: boolean;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  outlined?: boolean;
}

const Tag: React.FC<TagProps> = ({ ...props }) => (
  <V
    bg={
      !props.outlined
        ? props.primary
          ? 'primary'
          : props.secondary
          ? 'secondaryAccent'
          : props.success
          ? 'success'
          : props.warning
          ? 'warning'
          : props.danger
          ? 'danger'
          : props.black
          ? 'black'
          : props.white
          ? 'white'
          : 'info'
        : undefined
    }
    borderWidth={props.outlined ? '1px' : undefined}
    borderColor={
      props.outlined
        ? props.primary
          ? 'primary'
          : props.secondary
          ? 'secondaryAccent'
          : props.success
          ? 'success'
          : props.warning
          ? 'warning'
          : props.danger
          ? 'danger'
          : props.black
          ? 'black'
          : props.white
          ? 'white'
          : 'info'
        : undefined
    }
    justifyContent="center"
    px={1}
    borderRadius="290486px"
    alignSelf="flex-start"
    {...props}
  >
    <Txt
      color={
        !props.outlined
          ? props.primary
            ? 'primaryText'
            : props.secondary
            ? 'secondaryAccentText'
            : props.success
            ? 'successText'
            : props.warning
            ? 'warningText'
            : props.danger
            ? 'dangerText'
            : props.black
            ? 'white'
            : props.white
            ? 'black'
            : 'infoText'
          : props.primary
          ? 'primary'
          : props.secondary
          ? 'secondaryAccent'
          : props.success
          ? 'success'
          : props.warning
          ? 'warning'
          : props.danger
          ? 'danger'
          : props.black
          ? 'black'
          : props.white
          ? 'white'
          : 'info'
      }
      fontSize={props.small ? 2 : props.medium ? 5 : props.large ? 7 : 4}
      semibold
      numberOfLines={1}
    >
      {props.children}
    </Txt>
  </V>
);

export default Tag;
