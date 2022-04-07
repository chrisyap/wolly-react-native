import React from 'react';
import { Animated, Dimensions, LayoutChangeEvent, StyleSheet } from 'react-native';
import { withTheme } from 'styled-components';
import type { Layout } from 'react-native-tab-view/lib/typescript/types';
import { TabView, TabBar, NavigationState, SceneRendererProps } from 'react-native-tab-view';
import Txt from '../Text';
import { AnimatedV } from '../View';
import { ThemeProps } from '../Theme';
import { isAndroid, isTablet } from '../Util';

interface TabsProps {
  routes: Route[];
  customIconTabBar?: boolean;
  tabBarPositionBottom?: string;
  enableLazy?: boolean;
  lazyPreloadDistance?: number;
  focused?: boolean;
  enableSwipe?: boolean;
  disableOnTabPress?: boolean;
  containerMaxHeight?: number;
  containerMinHeight?: number;
  getTabComponent?: (key: any) => any;
  runTabCallBack: (key: any) => void;
  getTabKeyByIndex: () => void;
  handleIndexChange?: (value: number) => void;
  theme: ThemeProps;
  headerIsLocked?: boolean;
  lockedHeadPos?: number;
  isScrolling?: boolean;
  renderScene?: (key: any) => any;
  initialSelectedIndex?: number;
  initialLayout?: Partial<Layout>;
  isCentered?: boolean;
}

type Route = {
  key: string;
  title: string;
  icon?: string;
  testId?: string;
};

type State = NavigationState<Route>;

interface TabsState extends State {
  headerHeight?: number;
}
class Tabs extends React.Component<TabsProps, TabsState> {
  headerFixedY = new Animated.Value(0);

  state = {
    index: this.props.initialSelectedIndex || 0,
    routes: this.props.routes,
    headerHeight: 0,
  };

  getHeaderHeight = (value: number): void => {
    this.setState({
      headerHeight: value,
    });
  };

  private getTabKeyByIndex = (index: number): string => this.props.routes[index].key;

  private handleIndexChange = (index: number): void => {
    this.setState({
      index,
    });
    this.props.runTabCallBack(this.getTabKeyByIndex(index));
    !!this.props.handleIndexChange && this.props.handleIndexChange(index);
  };

  private autoWidthTabBar = (props: SceneRendererProps & { navigationState: State }): JSX.Element => {
    const { headerIsLocked, isScrolling, lockedHeadPos, initialLayout, routes, isCentered } = this.props;

    const items = routes && routes.length;
    const cardWidth = initialLayout?.width || undefined;

    Animated.timing(this.headerFixedY, {
      toValue: lockedHeadPos ?? 0,
      duration: 100,
      useNativeDriver: true,
    }).start();

    const transparent = 'transparent';

    const styles = StyleSheet.create({
      indicatorStyle: {
        height: 3,
        marginBottom: -1,
        position: 'absolute',
        zIndex: 10,
        backgroundColor: items === 1 ? transparent : this.props.theme.colors.secondaryAccent,
      },
      style: {
        elevation: 0,
        backgroundColor: transparent,
        paddingTop: 0,
        paddingBottom: 0,
        height: isTablet ? 56 : 48,
        alignSelf: isCentered ? 'center' : 'flex-start',
      },
      tabStyle: {
        width: items === 1 ? '100%' : cardWidth ? cardWidth / items : 'auto',
      },
    });

    return (
      //TO DO: update with styled components//
      <AnimatedV
        borderBottomWidth={1}
        borderBottomColor={'secondaries.2'}
        onLayout={(e: LayoutChangeEvent) => this.getHeaderHeight(e.nativeEvent.layout.height)}
        position={headerIsLocked ? 'absolute' : undefined}
        bg={headerIsLocked ? (isTablet ? 'secondaries.0' : 'white') : undefined}
        style={{
          transform: [
            {
              translateY: !isScrolling ? this.headerFixedY : 0,
            },
          ],
        }}
        width={'100%'}
        zIndex={1000}
      >
        <TabBar
          {...props}
          getTestID={({ route }) => (route.testId ? `tab-${route.testId}` : `tab-${route.title}`)}
          scrollEnabled
          indicatorStyle={styles.indicatorStyle}
          style={styles.style}
          labelStyle={{ color: this.props.theme.colors.black }}
          tabStyle={styles.tabStyle}
          renderLabel={({ route, focused }) => (
            <Txt
              px={isTablet ? 2 : '4px'}
              semibold={!isTablet || focused}
              color={isTablet || focused ? 'black' : 'secondary'}
              letterSpacing={focused ? (isAndroid ? 0.2 : 0.5) : 1}
              textAlign={'center'}
            >
              {route.title}
            </Txt>
          )}
          onTabPress={({ preventDefault }) => {
            if (this.props.disableOnTabPress) {
              preventDefault();
            }
          }}
        />
      </AnimatedV>
    );
  };

  private renderScene = ({ route }: { route: Route }): JSX.Element => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const tab = this.props.getTabComponent ? this.props.getTabComponent(route.key) : '';
    // if (this.state.index > 2 && Math.abs(this.state.index - this.props.routes.indexOf(route)) > 2) {
    //   return <V />;
    // }
    return <>{tab}</>;
  };

  render(): React.ReactNode {
    const {
      tabBarPositionBottom,
      enableLazy,
      lazyPreloadDistance,
      enableSwipe,
      containerMaxHeight,
      containerMinHeight,
      renderScene,
      headerIsLocked,
    } = this.props;
    const { headerHeight } = this.state;
    const styles = StyleSheet.create({
      tabs: {
        maxHeight: containerMaxHeight ? containerMaxHeight : undefined,
        minHeight: containerMinHeight ? containerMinHeight + headerHeight : undefined,
        paddingTop: headerIsLocked ? headerHeight : 0,
      },
    });
    const initialLayout = this.props.initialLayout
      ? this.props.initialLayout
      : { width: Dimensions.get('window').width };

    return (
      <TabView
        style={styles.tabs}
        navigationState={this.state}
        renderScene={renderScene ?? this.renderScene}
        renderTabBar={this.autoWidthTabBar}
        tabBarPosition={tabBarPositionBottom ? 'bottom' : 'top'}
        onIndexChange={this.handleIndexChange}
        initialLayout={initialLayout}
        lazy={enableLazy}
        lazyPreloadDistance={lazyPreloadDistance}
        swipeEnabled={enableSwipe ? enableSwipe : false}
      />
    );
  }
}

export default withTheme(Tabs);
