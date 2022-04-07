import React from 'react';

const BodyWrap: React.FC<{ children: React.ReactNode }> = ({ children }) => <>{children}</>;

const Body: React.FunctionComponent<{ TableRow: React.ReactNode }> = ({ TableRow, ...props }) => {
  return <BodyWrap {...props}>{TableRow}</BodyWrap>;
};

export default { Body, BodyWrap };
