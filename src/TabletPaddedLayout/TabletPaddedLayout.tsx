import React from 'react';
import { ViewProps } from 'react-native';
import { useDeviceOrientation } from '@react-native-community/hooks';
import V, { VProps } from '../View';
import { convertToPercent } from '../Util';

interface Props extends VProps, ViewProps {
  totalColumns?: number;
  columns?: number;
}

const PaddedLayoutView: React.FunctionComponent<Props> = ({ columns, totalColumns = 12, ...props }) => {
  const isLandscape = useDeviceOrientation()?.landscape;
  const col = columns ? columns : isLandscape ? 2 : 1;
  return <V mx={`${convertToPercent(col / totalColumns)}`} {...props} />;
};

export default PaddedLayoutView;
