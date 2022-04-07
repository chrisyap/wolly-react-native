import React from 'react';
import { ThemeConsumer } from 'styled-components';
import { Animated, Platform, ScrollView } from 'react-native';
import { vh } from 'react-native-expo-viewport-units';

import TableHead from './TableHead';
import TableBody from './TableBody';
import V, { AnimatedV, VProps } from '../View';

type ConditionalWrapperProps = {
  children: React.ReactElement;
  condition: boolean;
  wrapper: (children: React.ReactElement) => JSX.Element;
};

const ConditionalWrapper: React.FC<ConditionalWrapperProps> = ({ condition, wrapper, children }) =>
  condition ? wrapper(children) : children;

interface TableProps extends VProps {
  iosQuickFix?: number;
  iosQuickFix2?: number;
  headers?: Array<{}>;
  headerProps?: any;
  data?: any | null;
  stickyColumn?: boolean;
  stickyHeader?: boolean;
  // stickyColumnCount?: number;
  // stickyHeaderCount?: number;
  externalSort?: (field: string, direction?: boolean) => void;
  defaultSortCol?: string;
  desc?: boolean;
  tableRow?: any;
  testID?: string;
  onScroll?: (event: React.SyntheticEvent) => void;
  headerIsLocked?: boolean;
  lockedHeadPos?: number;
  isScrolling?: boolean;
}

export default class Table extends React.Component<TableProps, {}> {
  headerFixedY = new Animated.Value(0);
  state = {
    field: null,
    ascending: true,
    key: Number(new Date()),
    isOverflow: false,
    headerHeight: 0,
  };
  // Note: Quick fix for IoS defect jammed scrolling
  iosQuickFix = Platform.OS === 'ios' ? { height: vh(this.props.iosQuickFix || 2) } : {};
  iosQuickFix2 = Platform.OS === 'ios' ? { position: 'relative', top: this.props.iosQuickFix2 || -2 } : {};
  columnWidths: any[] = [];
  rowsWithStickyColumn: any[] = [];
  rowsWithoutStickyColumn: any[] = [];
  columnRef?: any = null;
  fixedColumnRef?: any = null;
  isFixedColumnScrolling = false;
  rowRef?: any = null;
  headerRef?: any = null;
  isHeaderScrolling = false;
  isSingle = this.props.headers && this.props.headers.length === 1;
  vScrollProps =
    this.props.stickyColumn && !this.isSingle
      ? {
          ref: (ref: any) => (this.columnRef = ref),
          onScroll: (ev: any) => {
            !this.isFixedColumnScrolling &&
              this.fixedColumnRef &&
              this.fixedColumnRef.scrollTo({
                y: ev.nativeEvent.contentOffset.y,
                animated: false,
              });
            this.props.onScroll;
          },
          onScrollBeginDrag: (ev: any) => {
            this.isFixedColumnScrolling = false;
            this.fixedColumnRef &&
              this.fixedColumnRef.scrollTo({
                y: ev.nativeEvent.contentOffset.y,
                animated: false,
              });
          },
          onScrollEndDrag: (ev: any) => {
            this.fixedColumnRef &&
              this.fixedColumnRef.scrollTo({
                y: ev.nativeEvent.contentOffset.y,
                animated: false,
              });
          },
          onMomentumScrollBegin: (ev: any) => {
            this.fixedColumnRef &&
              this.fixedColumnRef.scrollTo({
                y: ev.nativeEvent.contentOffset.y,
                animated: false,
              });
          },
          onMomentumScrollEnd: (ev: any) => {
            this.fixedColumnRef &&
              this.fixedColumnRef.scrollTo({
                y: ev.nativeEvent.contentOffset.y,
                animated: false,
              });
          },
        }
      : {};
  hScrollProps =
    this.props.headers && !this.isSingle
      ? {
          ref: (ref: any) => (this.rowRef = ref),
          onScroll: (ev: any) => {
            !this.isHeaderScrolling &&
              this.headerRef &&
              this.headerRef.scrollTo({
                x: ev.nativeEvent.contentOffset.x,
                animated: false,
              });
            this.props.onScroll;
          },
          onScrollBeginDrag: (ev: any) => {
            this.isHeaderScrolling = false;
            this.headerRef &&
              this.headerRef.scrollTo({
                x: ev.nativeEvent.contentOffset.x,
                animated: false,
              });
          },
          onScrollEndDrag: (ev: any) => {
            this.headerRef &&
              this.headerRef.scrollTo({
                x: ev.nativeEvent.contentOffset.x,
                animated: false,
              });
          },
          onMomentumScrollBegin: (ev: any) => {
            this.headerRef &&
              this.headerRef.scrollTo({
                x: ev.nativeEvent.contentOffset.x,
                animated: false,
              });
          },
          onMomentumScrollEnd: (ev: any) => {
            this.headerRef &&
              this.headerRef.scrollTo({
                x: ev.nativeEvent.contentOffset.x,
                animated: false,
              });
          },
        }
      : {};
  componentDidMount() {
    if (!this.props.externalSort && this.props.defaultSortCol) {
      this.sortTableStateBy(this.props.defaultSortCol, null, this.props.desc ? 'desc' : null);
    } else {
      this.setState({
        field: this.props.defaultSortCol && this.props.defaultSortCol,
        ascending: !this.props.desc,
      });
    }

    this.recreateColumns(this.props.data || []);
  }
  componentDidUpdate = (prevProps: any, prevState: any) => {
    if (this.props.data !== prevProps.data) {
      if (!this.props.externalSort && this.props.defaultSortCol) {
        this.sortTableStateBy(
          this.props.defaultSortCol,
          null,
          prevState.ascending && !this.props.desc ? 'asc' : !prevState.ascending && this.props.desc && 'desc'
        );
      } else {
        this.recreateColumns(this.props.data || []);

        this.setState({
          key: Number(new Date()),
          ascending: !this.props.desc,
          field: this.props.defaultSortCol,
        });
      }
    }
  };
  isNumeric = (num: any) => {
    return !isNaN(num);
  };
  formatNumber = (figure: any) => {
    const num = figure ? figure : figure === 0 ? 0 : -(10 ** 1000);
    if (!this.isNumeric(num)) {
      if (!this.isNumeric(Number(num.replace(/[^0-9.-]+/g, '')))) {
        return -(10 ** 1000);
      }
      return Number(num.replace(/[^0-9.-]+/g, ''));
    } else {
      return Number(num);
    }
  };
  sortTableStateBy = (field: string, sortType?: any, dir?: any) => {
    const tempData = this.props.data;
    if (sortType && sortType !== true) sortType = sortType.toLowerCase();
    const newDir =
      dir && dir !== 'desc'
        ? true
        : dir && dir === 'desc'
        ? false
        : this.state.field !== field
        ? true
        : !this.state.ascending;

    this.setState(
      {
        field,
        ascending: newDir,
      },
      () => {
        if (!this.props.externalSort) {
          // TODO: Chris to confirm why 100ms wait
          // setTimeout(() => {
          if (newDir) {
            if (sortType === 'number') {
              tempData && tempData.sort((a: any, b: any) => this.formatNumber(a[field]) - this.formatNumber(b[field]));
            } else {
              tempData &&
                tempData.sort((a: any, b: any) => {
                  return a[field] < b[field] ? -1 : b[field] < a[field] ? 1 : 0;
                });
            }
          } else if (sortType === 'number') {
            tempData && tempData.sort((a: any, b: any) => this.formatNumber(b[field]) - this.formatNumber(a[field]));
          } else {
            tempData &&
              tempData.sort((a: any, b: any) => {
                return b[field] < a[field] ? -1 : a[field] < b[field] ? 1 : 0;
              });
          }

          this.setState({
            key: Number(new Date()),
          });
          this.recreateColumns(tempData || []);
          // }, 100);
        }
      }
    );

    if (this.props.externalSort) {
      this.props.externalSort(field, newDir);
    }
  };
  recreateColumns = (data: Array<Record<string, any>>) => {
    this.rowsWithoutStickyColumn = [];
    this.rowsWithStickyColumn = [];
    this.props.tableRow &&
      data.forEach((row, index) => {
        const tableRow = this.props.tableRow(row);

        if (index === 0) {
          tableRow.props.children.forEach((child: { props: { width: number } }) => {
            this.columnWidths.push(child.props.width);
          });
        }

        if (this.props.stickyColumn) {
          const rowWithoutStickyColumn = React.cloneElement(
            tableRow,
            [tableRow.props],
            tableRow.props.children.slice(1)
          );
          this.rowsWithoutStickyColumn.push(rowWithoutStickyColumn);
          const rowWithStickyColumn: any = React.cloneElement(tableRow, [tableRow.props], [tableRow.props.children[0]]);
          this.rowsWithStickyColumn.push(rowWithStickyColumn);
        } else {
          this.rowsWithoutStickyColumn.push(tableRow);
        }
      });
  };
  setHeaderRef = (ref: any) => {
    this.headerRef = ref;
  };
  setIsHeaderScrolling = (isHeaderScrolling: boolean) => {
    this.isHeaderScrolling = isHeaderScrolling;
  };
  checkIfOverflow = (height: number, width: number) => {
    if (Boolean(height) && Boolean(width)) {
      this.setState({
        isOverflow: height > vh(80),
      });
    }
  };
  getHeaderHeight = (value: number) => {
    this.setState({
      headerHeight: value,
    });
  };
  render() {
    const { headers, testID, onScroll, headerIsLocked, lockedHeadPos, isScrolling, ...props } = this.props;

    const stickyColumn = Math.min(props.stickyColumn ? 1 : 0);
    const stickyHeader = Math.min(props.stickyHeader ? 1 : 0);

    const { key, ascending, field, isOverflow, headerHeight } = this.state;

    Animated.timing(this.headerFixedY, {
      toValue: lockedHeadPos && lockedHeadPos > 0 ? lockedHeadPos : 0,
      duration: 100,
      useNativeDriver: true, // <-- Add this
    }).start();

    return (
      <V
        // position={Platform.OS === 'ios' && props.iosQuickFix2 ? 'relative' : undefined}
        mt={Platform.OS === 'ios' ? -vh(props.iosQuickFix2 || 1) : undefined}
        // mb={Platform.OS === 'ios' ? vh(props.iosQuickFix2 || 2) : undefined}
      >
        <V maxHeight={!stickyHeader ? '100%' : vh(70)} zIndex={0} {...props}>
          <V testID={testID}>
            <V height={Platform.OS === 'ios' ? vh(props.iosQuickFix || 1) : undefined} />
            <V flexDirection="row">
              {Boolean(stickyColumn) && (
                <V borderRightWidth="3px" borderColor="secondaries.2" pb={isOverflow ? 2 : 0}>
                  <ConditionalWrapper
                    condition={Boolean(stickyHeader)}
                    wrapper={(children) => (
                      <ScrollView
                        bounces={false}
                        onContentSizeChange={(width, height) => {
                          this.checkIfOverflow(height, width);
                        }}
                        nestedScrollEnabled={true}
                        stickyHeaderIndices={Boolean(stickyHeader) && headers ? [0] : []}
                        ref={(ref: any) => (this.fixedColumnRef = ref)}
                        onScroll={(ev: any) => {
                          this.isFixedColumnScrolling &&
                            this.columnRef &&
                            this.columnRef.scrollTo({
                              y: ev.nativeEvent.contentOffset.y,
                              animated: false,
                            });
                          onScroll && onScroll(ev);
                        }}
                        onScrollBeginDrag={(ev) => {
                          this.isFixedColumnScrolling = true;
                          this.columnRef &&
                            this.columnRef.scrollTo({
                              y: ev.nativeEvent.contentOffset.y,
                              animated: false,
                            });
                        }}
                        onScrollEndDrag={(ev) => {
                          this.columnRef &&
                            this.columnRef.scrollTo({
                              y: ev.nativeEvent.contentOffset.y,
                              animated: false,
                            });
                        }}
                        onMomentumScrollBegin={(ev) => {
                          this.columnRef &&
                            this.columnRef.scrollTo({
                              y: ev.nativeEvent.contentOffset.y,
                              animated: false,
                            });
                        }}
                        onMomentumScrollEnd={(ev) => {
                          this.columnRef &&
                            this.columnRef.scrollTo({
                              y: ev.nativeEvent.contentOffset.y,
                              animated: false,
                            });
                        }}
                        showsVerticalScrollIndicator={false}
                        scrollEventThrottle={16}
                      >
                        {children}
                      </ScrollView>
                    )}
                  >
                    <>
                      {headers && (
                        <AnimatedV
                          position={headerIsLocked ? 'absolute' : undefined}
                          top={headerIsLocked ? 0 : undefined}
                          zIndex={headerIsLocked ? 1000 : undefined}
                          style={{
                            transform: [
                              {
                                translateY: !isScrolling ? this.headerFixedY : 0,
                              },
                            ],
                          }}
                          onLayout={(e: any) => this.getHeaderHeight(e.nativeEvent.layout.height)}
                        >
                          <TableHead.Head
                            ascending={ascending}
                            headers={[headers[0]]}
                            widths={[this.columnWidths[0]]}
                            selectedField={field}
                            sort={this.sortTableStateBy}
                            {...props.headerProps}
                          />
                        </AnimatedV>
                      )}
                      <ScrollView
                        horizontal
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={10}
                      >
                        <V mt={`${headerIsLocked ? headerHeight : 0}px`}>
                          <TableBody.Body key={key} TableRow={this.rowsWithStickyColumn} />
                        </V>
                      </ScrollView>
                    </>
                  </ConditionalWrapper>
                </V>
              )}

              <V pb={isOverflow ? 2 : 0}>
                <ConditionalWrapper
                  condition={Boolean(stickyHeader)}
                  wrapper={(children) => (
                    <ScrollView
                      bounces={false}
                      nestedScrollEnabled={true}
                      stickyHeaderIndices={Boolean(stickyHeader) && headers ? [0] : []}
                      scrollEventThrottle={16}
                      showsVerticalScrollIndicator={false}
                      {...this.vScrollProps}
                    >
                      {children}
                    </ScrollView>
                  )}
                >
                  <>
                    {headers && (
                      <AnimatedV
                        mr={stickyColumn ? this.columnWidths[0] : undefined}
                        position={headerIsLocked ? 'absolute' : undefined}
                        top={headerIsLocked ? 0 : undefined}
                        zIndex={headerIsLocked ? 1000 : undefined}
                        style={{
                          transform: [
                            {
                              translateY: !isScrolling ? this.headerFixedY : 0,
                            },
                          ],
                        }}
                      >
                        <TableHead.Head
                          ascending={ascending}
                          headers={stickyColumn ? headers.slice(1) : headers}
                          widths={stickyColumn ? this.columnWidths.slice(1) : this.columnWidths}
                          selectedField={field}
                          sort={this.sortTableStateBy}
                          rowRef={this.rowRef}
                          setHeaderRef={this.setHeaderRef}
                          isHeaderScrolling={this.isHeaderScrolling}
                          setIsHeaderScrolling={this.setIsHeaderScrolling}
                          {...props.headerProps}
                        />
                      </AnimatedV>
                    )}
                    <ThemeConsumer>
                      {(theme) => (
                        <ScrollView
                          horizontal
                          bounces={false}
                          nestedScrollEnabled={true}
                          showsHorizontalScrollIndicator={false}
                          indicatorStyle={theme.colors.isDarkTheme ? 'white' : 'black'}
                          scrollEventThrottle={10}
                          {...this.hScrollProps}
                        >
                          <V mr={stickyColumn ? this.columnWidths[0] : 0} mt={`${headerIsLocked ? headerHeight : 0}px`}>
                            <TableBody.Body key={key} TableRow={this.rowsWithoutStickyColumn} />
                          </V>
                        </ScrollView>
                      )}
                    </ThemeConsumer>
                  </>
                </ConditionalWrapper>
              </V>
            </V>
          </V>
        </V>
      </V>
    );
  }
}
