import React, { Component } from 'react';
import { Animated, NativeSyntheticEvent, NativeScrollEvent, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView, KeyboardAwareScrollViewProps } from 'react-native-keyboard-aware-scroll-view';
import V, { VProps } from '../View';
import Scrollbar from '../Common/Scrollbar';

interface Props extends VProps, KeyboardAwareScrollViewProps {
  doNotGrow?: boolean;
  useRef?: (ref: JSX.Element) => void;
  hideScrollBar?: boolean;
}

const AnimatedKeyboardAwareScrollView = Animated.createAnimatedComponent(KeyboardAwareScrollView);

interface State {
  completeScrollBarHeight: number;
  contentWidth: number;
  scrollPos: Animated.Mapping;
  scrollbarWidth: number;
  scrollbarPosRight: number | string;
  scrollbarOpacity: Animated.Value | Animated.ValueXY;
  visibleScrollBarHeight: number;
}

class CustomScrollView extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = {
      completeScrollBarHeight: 1,
      contentWidth: 0,
      scrollPos: new Animated.Value(0),
      scrollbarPosRight: '2px',
      scrollbarOpacity: new Animated.Value(0),
      scrollbarWidth: 3,
      visibleScrollBarHeight: 0,
    };
  }

  componentDidMount(): void {}

  setCompleteScrollBarHeight = (width: number, height: number): void => {
    this.setState({
      contentWidth: width,
      completeScrollBarHeight: Math.ceil(height) - 10,
    });
  };

  setVisibleScrollBarHeight = (value: number): void => {
    this.setState({ visibleScrollBarHeight: Math.ceil(value) - 10 });
  };

  fadeIn = (): void => {
    // Will change fadeAnim value to 1 in 5 seconds
    const { completeScrollBarHeight, visibleScrollBarHeight } = this.state;
    if (completeScrollBarHeight > visibleScrollBarHeight) {
      Animated.timing(this.state.scrollbarOpacity, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }).start();
    }
  };

  fadeOut = (): void => {
    // Will change fadeAnim value to 0 in 3 seconds
    Animated.timing(this.state.scrollbarOpacity, {
      toValue: 0,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  };

  render(): React.ReactNode {
    const {
      completeScrollBarHeight,
      scrollPos,
      scrollbarPosRight,
      scrollbarOpacity,
      scrollbarWidth,
      visibleScrollBarHeight,
    } = this.state;

    const scrollIndicatorSize =
      completeScrollBarHeight > visibleScrollBarHeight
        ? (visibleScrollBarHeight * visibleScrollBarHeight) / completeScrollBarHeight
        : visibleScrollBarHeight;

    const difference = visibleScrollBarHeight > scrollIndicatorSize ? visibleScrollBarHeight - scrollIndicatorSize : 1;

    const scrollIndicatorPosition =
      scrollPos && visibleScrollBarHeight && completeScrollBarHeight
        ? Animated.multiply(scrollPos, visibleScrollBarHeight / completeScrollBarHeight).interpolate({
            inputRange: [0, Math.ceil(difference)],
            outputRange: [0, Math.ceil(difference)],
            extrapolate: 'clamp',
          })
        : 0;

    const { doNotGrow, hideScrollBar, onScroll, useRef, ...props } = this.props;

    return (
      <V flexGrow={doNotGrow ? 0 : 1} flexShrink={1} position="relative">
        <AnimatedKeyboardAwareScrollView
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(contentWidth, contentHeight) => {
            this.setCompleteScrollBarHeight(contentWidth, contentHeight);
          }}
          onLayout={({
            nativeEvent: {
              layout: { height },
            },
          }) => {
            this.setVisibleScrollBarHeight(height);
          }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollPos } } }], {
            listener: (e: NativeSyntheticEvent<NativeScrollEvent>) => {
              this.fadeIn();
              onScroll && onScroll(e);
            },
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
          onScrollBeginDrag={this.fadeIn}
          onScrollEndDrag={this.fadeOut}
          onMomentumScrollEnd={this.fadeOut}
          style={styles.scrollView}
          innerRef={useRef ? useRef : undefined}
          {...props}
        >
          {props.children}
        </AnimatedKeyboardAwareScrollView>
        {!hideScrollBar && (
          <Scrollbar
            positionRight={scrollbarPosRight}
            width={scrollbarWidth}
            height={scrollIndicatorSize}
            positionScroll={scrollIndicatorPosition}
            opacity={scrollbarOpacity as Animated.Value | Animated.AnimatedInterpolation}
          />
        )}
      </V>
    );
  }
}

export default CustomScrollView;

const styles = StyleSheet.create({
  scrollView: {
    flexGrow: 1,
  },
});
