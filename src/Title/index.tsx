import React from 'react';
import Txt, { TxtProps } from '../Text';
import { isTablet } from '../Util';

export interface TitleProps extends TxtProps {
  ellipsizeMode?: 'head' | 'middle' | 'tail' | 'clip';
  numberOfLines?: number;
}

const Title: React.FC<TitleProps> = ({ fontSize, ...props }) => <Txt semibold fontSize={fontSize} {...props} />;

export default Title;

Title.defaultProps = {
  fontSize: isTablet ? 10 : 9,
  color: 'text',
};
