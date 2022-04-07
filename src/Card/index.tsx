import React from 'react';
import { ThemeContext } from 'styled-components';
import V, { VProps } from '../View';
import { ThemeProps } from '../Theme';
import { isTablet } from '../Util';

export type CardProps = VProps;

const Card: React.FC<VProps> = (props) => {
  const theme = React.useContext(ThemeContext) as ThemeProps;
  return (
    <V
      bg="white"
      borderTopWidth={isTablet ? 0 : 1}
      borderLeftWidth={isTablet ? 0 : 1}
      borderRightWidth={isTablet ? 0 : 1}
      borderBottomWidth={isTablet ? 0 : 2}
      borderRadius={isTablet ? theme?.radii[3] : theme?.radii[1]}
      borderColor={'secondaries.2'}
      overflow="hidden"
      p={'1px'}
      {...props}
    />
  );
};

export default Card;
