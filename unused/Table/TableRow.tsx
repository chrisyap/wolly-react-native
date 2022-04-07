import React from 'react';
import V, { VProps } from '../View';

const Row: React.FC<VProps> = props => {
  return (
    <V flexDirection="row" borderBottomWidth="1px" minHeight={'40px'} borderColor="blacks.0" {...props}>
      {props.children}
    </V>
  );
};

export default Row;
