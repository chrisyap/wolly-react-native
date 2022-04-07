import { Animated } from 'react-native';
import styled from 'styled-components/native';
import { composed, ComposedProps } from '../Common/Composed';

export interface VProps extends ComposedProps {
  flexDirection?: string;
  flexGrow?: number;
  flexShrink?: number;
  alignContent?: string;
  alignItems?: string;
  alignSelf?: string;
  justifyContent?: string;
}

const V = styled.View<VProps>`
  flex-direction: ${(props) => (props.flexDirection ? props.flexDirection : 'column')};
  align-content: ${(props) => (props.alignContent ? props.alignContent : 'flex-start')};
  align-items: ${(props) => (props.alignItems ? props.alignItems : 'stretch')};
  justify-content: ${(props) => (props.justifyContent ? props.justifyContent : 'flex-start')};
  ${composed};
`;

export const AnimatedV = styled(Animated.View)<VProps>`
  ${composed};
`;

export default V;
