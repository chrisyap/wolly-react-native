import React from 'react';
import { createIconSetFromIcoMoon } from 'react-native-vector-icons';
import styled from 'styled-components/native';
import { composed, ComposedProps } from '../Common/Composed';
import V from '../View';
import { ThemeProps } from '../Theme';
import ShaperConfig from '../Assets/Fonts/shaper-icons.json';

interface IconProps extends ComposedProps {
  name: string;
  color?: string;
  size?: any;
  style?: object;
  small?: boolean;
  medium?: boolean;
  large?: boolean;
  primary?: boolean;
  secondary?: boolean;
  success?: boolean;
  info?: boolean;
  warning?: boolean;
  danger?: boolean;
  iconProps?: object;
  theme?: ThemeProps;
}

const Ico = createIconSetFromIcoMoon(ShaperConfig) as typeof Icon;

const StyledIcon = styled(Ico)`
  ${composed}
`;

const Icon: React.FC<IconProps> = (props) => {
  return (
    <V alignContent="center" alignItems="center" justifyContent="center" {...props}>
      <StyledIcon
        name={props?.name}
        color={props?.color}
        fontSize={props?.small ? 7 : props?.medium ? 14 : props?.large ? 16 : props?.fontSize}
        {...props?.iconProps}
      />
    </V>
  );
};

export default Icon;

Icon.defaultProps = {
  color: 'secondary',
  fontSize: 10,
};
