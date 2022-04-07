import React from 'react';
import { Animated, LayoutChangeEvent, StyleSheet } from 'react-native';
import styled from 'styled-components/native';
import { composed } from '../Common/Composed';
import V, { VProps } from '../View';
import Scrollbar from '../Common/Scrollbar';

const StyledSectionList = styled(Animated.SectionList as new () => Animated.SectionList<any>)`
  ${composed};
`;

interface Props extends VProps {
  doNotGrow?: boolean;
}

interface State {
  completeScrollBarHeight: number;
  contentWidth: number;
  scrollPos: Animated.Mapping;
  scrollbarWidth: number;
  scrollbarPosRight: number | string;
  scrollbarOpacity: Animated.Value | Animated.ValueXY;
  visibleScrollBarHeight: number;
}

class CustomSectionList extends React.Component<Props, State> {
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

    const { doNotGrow, ...props } = this.props;

    const styles = StyleSheet.create({
      list: { flexGrow: 1 },
    });

    return (
      <V flexGrow={doNotGrow ? 0 : 1} flexShrink={1} position="relative">
        <StyledSectionList<React.ElementType>
          showsVerticalScrollIndicator={false}
          onContentSizeChange={(contentWidth: number, contentHeight: number) => {
            this.setCompleteScrollBarHeight(contentWidth, contentHeight);
          }}
          onLayout={(e: LayoutChangeEvent) => {
            this.setVisibleScrollBarHeight(e.nativeEvent.layout.height);
          }}
          onScroll={Animated.event([{ nativeEvent: { contentOffset: { y: scrollPos } } }], {
            listener: () => this.fadeIn(),
            useNativeDriver: false,
          })}
          scrollEventThrottle={16}
          onScrollBeginDrag={this.fadeIn}
          onScrollEndDrag={this.fadeOut}
          onMomentumScrollEnd={this.fadeOut}
          style={styles.list}
          {...props}
        />
        <Scrollbar
          positionRight={scrollbarPosRight}
          width={scrollbarWidth}
          height={scrollIndicatorSize}
          positionScroll={scrollIndicatorPosition}
          opacity={scrollbarOpacity as Animated.Value | Animated.AnimatedInterpolation}
        />
      </V>
    );
  }
}

export default CustomSectionList;
