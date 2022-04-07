import React from 'react';
import V, { VProps } from '../View';

interface Props extends VProps {
  lineBreak?: boolean;
  thick?: boolean;
}

const Divider: React.FC<Props> = ({ lineBreak, thick, ...props }) => (
  <V
    borderBottomWidth={lineBreak || thick ? '8px' : '1px'}
    borderBottomColor={'secondaries.2'}
    opacity={lineBreak || thick ? 0.5 : 1}
    {...props}
  />
);

export default Divider;
