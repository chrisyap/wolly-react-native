import React from 'react';
import { Animated } from 'react-native';
import V, { AnimatedV } from '../View';

interface Props {
  positionRight: number | string | '2px';
  width: number | string | '3px';
  height: number | string | 0;
  positionScroll: number | Animated.Value | Animated.AnimatedInterpolation;
  opacity: number | Animated.Value | Animated.AnimatedInterpolation | 0;
}

const Scrollbar: React.FunctionComponent<Props> = (props) => {
  return (
    <V position="absolute" height="100%" right={props.positionRight} width={props.width} py={'5px'}>
      <AnimatedV
        backgroundColor={'black'}
        width={props.width}
        borderRadius={8}
        height={props.height}
        style={{
          transform: [
            {
              translateY: props.positionScroll,
            },
          ],
          opacity: props.opacity,
        }}
      />
    </V>
  );
};

export default Scrollbar;
