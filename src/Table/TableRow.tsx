import React from 'react';
import { TouchableOpacity } from 'react-native';
import V, { VProps } from '../View';

interface RowProps extends VProps {
  header?: boolean;
  odd?: boolean;
  onPress?: () => void;
  children: any;
}

const Row: React.FC<RowProps> = (props: RowProps) => (
  <>
    {props.onPress ? (
      <TouchableOpacity onPress={props.onPress}>
        <V
          flexDirection="row"
          borderBottomWidth={props.header ? '2px' : 0}
          minHeight={props.header ? 0 : '40px'}
          bg={props.odd ? 'rowOdd' : 'white'}
          borderColor={'secondaries.2'}
          {...props}
        >
          {props.children}
        </V>
      </TouchableOpacity>
    ) : (
      <V
        flexDirection="row"
        borderBottomWidth={props.header ? '2px' : 0}
        minHeight={props.header ? 0 : '40px'}
        bg={props.odd ? 'rowOdd' : 'transparent'}
        borderColor={'secondaries.2'}
        {...props}
      >
        {props.children}
      </V>
    )}
  </>
);

export default Row;
