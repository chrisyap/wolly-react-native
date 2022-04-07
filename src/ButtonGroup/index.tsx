import React from 'react';
import { Animated, LayoutChangeEvent, StyleSheet } from 'react-native';
import { withTheme } from 'styled-components';
import V from '../View';
import { ThemeProps } from '../Theme';
import { isAndroid } from '../Util/index';

type Props = {
  selected: number;
  children: Array<React.ReactNode>;
  card?: boolean;
  theme: ThemeProps;
};

type Button = { index: number; x: number; y: number; height: number; width: number; context: any };

type State = {
  btns: Button[] | [];
  selected: number;
  xVal: Animated.Value;
  widthVal: Animated.Value;
  heightVal: Animated.Value;
  bgColor: Animated.Value;
  children: React.ReactNode;
};
class BtnGroupView extends React.Component<Props, State> {
  state = {
    btns: [],
    selected: this.props.selected,
    xVal: new Animated.Value(0),
    widthVal: new Animated.Value(0),
    heightVal: new Animated.Value(0),
    bgColor: new Animated.Value(0),
    children: [],
  };

  componentDidMount(): void {
    this.init();
  }

  componentDidUpdate = (prevProps: Props, prevState: State): void => {
    if (prevState.btns !== this.state.btns) {
      this.init(true);
    }
    if (prevProps.children !== this.props.children) {
      this.toggleAnimation(prevProps.selected);
    }
    if (prevProps.selected !== this.state.selected) {
      this.toggleAnimation(prevProps.selected);
    }
  };

  init = (noAnimation?: boolean): void => {
    this.toggleAnimation(this.state.selected, noAnimation);
  };

  clearBtns = (): void => {
    this.setState({ btns: [] });
  };

  toggleAnimation = (index: number, noAnimation?: boolean): void => {
    const tempX = 0;
    const tempHeight = 0;
    const tempWidth = 0;
    const btn = this.state.btns.find((x: Button) => x.index === index) as Button | undefined;

    const time = noAnimation ? 0 : 300;

    Animated.parallel([
      Animated.timing(this.state.xVal, {
        toValue: btn ? btn.x : tempX,
        duration: time,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.heightVal, {
        toValue: btn ? btn.height : tempHeight,
        duration: 0,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.widthVal, {
        toValue: btn ? (isAndroid ? btn.width + 1 : btn.width) : tempWidth,
        duration: time,
        useNativeDriver: false,
      }),
      Animated.timing(this.state.bgColor, {
        toValue: btn ? btn.context : 0,
        duration: time,
        useNativeDriver: false,
      }),
    ]).start(() => this.setState({ selected: index }));
  };

  onLayout = (index: number, event: LayoutChangeEvent, context: any): void => {
    const btns = this.state.btns.filter((item: Button) => item.index !== index);
    const { x, y, height, width } = event.nativeEvent.layout;
    this.setState({ btns: [...btns, { index, x, y, height, width, context }] });
  };

  render(): React.ReactNode {
    const themeColors = this.props.theme?.colors;
    const BackgroundColorConfig = this.state.bgColor.interpolate({
      inputRange: [0, 0.25, 0.5, 0.75, 1],
      outputRange: [
        themeColors.secondaryAccent,
        themeColors.success,
        themeColors.info,
        themeColors.warning,
        themeColors.danger,
      ],
    });

    const styles = StyleSheet.create({
      box: {
        backgroundColor: themeColors.secondaryAccent,
        position: 'absolute',
        left: 1,
        top: 1,
        width: 0,
        height: 0,
        zIndex: -1,
      },
    });

    const animatedHighlight = {
      left: this.state.xVal,
      width: this.state.widthVal,
      height: this.state.heightVal,
      backgroundColor: this.state.bgColor,
      borderTopLeftRadius: this.state.selected === 0 ? 2 : 0,
      borderBottomLeftRadius: this.state.selected === 0 ? 2 : 0,
      borderTopRightRadius: this.state.selected === this.props.children?.length - 1 ? 2 : 0,
      borderBottomRightRadius: this.state.selected === this.props.children?.length - 1 ? 2 : 0,
    };

    const childrenWithProps =
      this.props.children &&
      React.Children.map(
        this.props.children,
        (child: any, index) =>
          child &&
          React.cloneElement(child, {
            borderWidth: 0,
            borderLeftWidth: index !== 0 ? 1 : 0,
            borderColor: this.props.card ? 'secondaries.2' : 'btnGroupBorder',
            borderRadius: 0,
            bg: 'transparent',
            secondary: child.props.secondary ? true : index !== this.props.selected,
            flat: index !== this.props.selected,
            opacity: child.props.disabled ? 0.8 : 1,
            flexGrow: 1,
            onPress: () => {
              child.props.onPress && child.props.onPress();
              this.toggleAnimation(index);
            },
            onLayout: (event: LayoutChangeEvent) =>
              this.onLayout(
                index,
                event,
                child.props && child.props.success
                  ? 0.25
                  : child.props && child.props.info
                  ? 0.5
                  : child.props && child.props.warning
                  ? 0.75
                  : child.props && child.props.danger
                  ? 1
                  : 0
              ),
            style: {
              height:
                child.props && child.props.large
                  ? 54
                  : child.props && child.props.medium
                  ? 42
                  : child.props && child.props.small
                  ? 28
                  : 36,
            },
          })
      );

    return (
      <V position="relative" bg="white" {...this.props}>
        <V
          flexDirection="row"
          borderWidth={1}
          borderBottomWidth={this.props.card ? 2 : 1}
          borderColor={this.props.card ? 'secondaries.2' : 'btnGroupBorder'}
          borderRadius={4}
          position="relative"
        >
          {childrenWithProps}
        </V>
        <V as={Animated.View} style={[styles.box, animatedHighlight, { backgroundColor: BackgroundColorConfig }]} />
      </V>
    );
  }
}

export default withTheme(BtnGroupView);
