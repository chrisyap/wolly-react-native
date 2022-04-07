import React from 'react';
import V, { VProps } from '../View';
import { isTablet } from '../Util';

interface CellProps extends VProps {
  align?: 'right' | 'center' | 'left';
}

const Cell: React.FC<CellProps> = (props) => (
  <V
    py={props.py || isTablet ? 2 : 1}
    px={props.px || 2}
    flexDirection="row"
    justifyContent={props.align === 'right' ? 'flex-end' : props.align === 'center' ? 'center' : 'flex-start'}
    {...props}
  />
);

export { Cell };
