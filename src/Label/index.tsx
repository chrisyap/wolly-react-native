import React from 'react';
import Txt, { TxtProps } from '../Text';
import { isTablet } from '../Util';

export interface LabelProps extends TxtProps {
  required?: boolean;
  uppercase?: boolean;
}

const Label: React.FC<LabelProps> = (props) => (
  <Txt fontSize={isTablet ? 7 : props.uppercase ? 5 : 6} uppercase={props.uppercase} color="secondary" {...props}>
    {props.children} {props.required && '*'}
  </Txt>
);

export default Label;
