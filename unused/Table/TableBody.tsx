import React from 'react';
const BodyWrap = ({ children }: { children: any }) => children;

const Body = ({ TableRow, ...props }: { TableRow: any }) => {
  return <BodyWrap {...props}>{TableRow}</BodyWrap>;
};

export default { Body, BodyWrap };
