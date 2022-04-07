import React from 'react';
import V, { VProps } from '../View';

interface CellProps extends VProps {
  align?: 'right' | 'center' | 'left';
}

const Cell: React.FC<CellProps> = props => (
  <V
    py={props.py || 2}
    px={props.px || 4}
    flexDirection="row"
    justifyContent={props.align === 'right' ? 'flex-end' : props.align === 'center' ? 'center' : 'flex-start'}
    {...props}
  />
);

export { Cell };
