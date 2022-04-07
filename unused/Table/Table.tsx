import React from 'react';
import { Platform, View, ScrollView } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import V from '../View';
import TableHead from './TableHead';
import TableBody from './TableBody';

const TableWrap = ({ children }: { children: any }) => children;

const TableWrapper = ({ children }: { children: any }) => children;

interface TableProps {
  iosQuickFix?: number;
  iosQuickFix2?: number;
  headers?: Array<{}>;
  headerProps?: any;
  data?: Array<any>;
  stickyColumn?: boolean;
  stickyHeader?: boolean;
  stickyColumnCount?: number;
  stickyHeaderCount?: number;
  externalSort?: (field: string, direction?: boolean) => void;
  defaultSortCol?: string;
  desc?: boolean;
  tableRow: any;
  testID?: string;
}

export default class Table extends React.Component<TableProps, {}> {
  state = {
    field: null,
    ascending: true,
    overflow: false,
    key: +new Date(),
  };

  // Note: Quick fix for IoS defect jammed scrolling
  iosQuickFix = Platform.OS === 'ios' ? { height: vh(this.props.iosQuickFix || 2) } : {};
  iosQuickFix2 = Platform.OS === 'ios' ? { position: 'relative', top: this.props.iosQuickFix2 || -2 } : {};

  columnWidths: any[] = [];
  rowsWithStickyColumn: any[] = [];
  rowsWithoutStickyColumn: any[] = [];
  columnRef?: any = null;
  fixedColumnRef?: any = null;
  isFixedColumnScrolling: boolean = false;

  rowRef?: any = null;
  headerRef?: any = null;
  isHeaderScrolling: boolean = false;

  isSingle = this.props.headers && this.props.headers.length === 1;
  vScrollProps =
    this.props.stickyColumn && !this.isSingle
      ? {
          ref: (ref: any) => (this.columnRef = ref),
          onScroll: (ev: any) => {
            !this.isFixedColumnScrolling &&
              this.fixedColumnRef &&
              this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
          },
          onScrollBeginDrag: (ev: any) => {
            this.isFixedColumnScrolling = false;
            this.fixedColumnRef && this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
          },
          onScrollEndDrag: (ev: any) => {
            this.fixedColumnRef && this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
          },
          onMomentumScrollBegin: (ev: any) => {
            this.fixedColumnRef && this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
          },
          onMomentumScrollEnd: (ev: any) => {
            this.fixedColumnRef && this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
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
              this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
          },
          onScrollBeginDrag: (ev: any) => {
            this.isHeaderScrolling = false;
            this.headerRef && this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
          },
          onScrollEndDrag: (ev: any) => {
            this.headerRef && this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
          },
          onMomentumScrollBegin: (ev: any) => {
            this.headerRef && this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
          },
          onMomentumScrollEnd: (ev: any) => {
            this.headerRef && this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
          },
        }
      : {};

  componentDidMount() {
    if (!this.props.externalSort && this.props.defaultSortCol) {
      this.sortTableStateBy(this.props.defaultSortCol, null, this.props.desc ? 'desc' : null);
    } else {
      this.setState({
        field: this.props.defaultSortCol && this.props.defaultSortCol,
        ascending: this.props.desc ? false : true,
      });
    }

    this.recreateColumns(this.props.data || []);
  }

  componentDidUpdate = (prevProps: { data?: Array<Object> }) => {
    if (this.props.data !== prevProps.data) {
      if (!this.props.externalSort && this.props.defaultSortCol) {
        this.sortTableStateBy(this.props.defaultSortCol);
      } else {
        this.recreateColumns(this.props.data || []);

        this.setState({
          key: +new Date(),
        });
      }
    }
  };

  isNumeric = (num: any) => {
    return !isNaN(num);
  };

  formatNumber = (figure: any) => {
    let num = figure ? figure : figure === 0 ? 0 : -Math.pow(10, 1000);
    if (!this.isNumeric(num)) {
      if (!this.isNumeric(Number(num.replace(/[^0-9.-]+/g, '')))) {
        return -Math.pow(10, 1000);
      }
      return Number(num.replace(/[^0-9.-]+/g, ''));
    } else {
      return Number(num);
    }
  };

  sortTableStateBy = (field: string, sortType?: any, dir?: any) => {
    let tempData = this.props.data;
    if (sortType && sortType !== true) sortType = sortType.toLowerCase();
    const newDir =
      dir && dir !== 'desc'
        ? true
        : dir && dir === 'desc'
        ? false
        : this.state.field !== field
        ? true
        : this.state.ascending
        ? false
        : true;

    this.setState(
      {
        field: field,
        ascending: newDir,
      },
      () => {
        if (!this.props.externalSort) {
          // TODO: Chris to confirm why 100ms wait
          //setTimeout(() => {
          if (newDir) {
            if (sortType === 'number') {
              tempData && tempData.sort((a: any, b: any) => this.formatNumber(a[field]) - this.formatNumber(b[field]));
            } else {
              tempData &&
                tempData.sort((a: any, b: any) => {
                  return a[field] < b[field] ? -1 : b[field] < a[field] ? 1 : 0;
                });
            }
          } else {
            if (sortType === 'number') {
              tempData && tempData.sort((a: any, b: any) => this.formatNumber(b[field]) - this.formatNumber(a[field]));
            } else {
              tempData &&
                tempData.sort((a: any, b: any) => {
                  return b[field] < a[field] ? -1 : a[field] < b[field] ? 1 : 0;
                });
            }
          }

          this.setState({
            key: +new Date(),
          });
          this.recreateColumns(tempData || []);
          //}, 100);
        }
      }
    );

    if (this.props.externalSort) {
      this.props.externalSort(field, newDir || undefined);
    }
  };

  recreateColumns = (data: Array<Object>) => {
    this.rowsWithoutStickyColumn = [];
    this.rowsWithStickyColumn = [];
    data.forEach((row, index) => {
      const tableRow = this.props.tableRow(row);

      if (index === 0) {
        tableRow.props.children.forEach((child: { props: { width: number } }) => {
          this.columnWidths.push(child.props.width);
        });
      }

      if (this.props.stickyColumn) {
        const rowWithoutStickyColumn = React.cloneElement(tableRow, [tableRow.props], tableRow.props.children.slice(1));
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

  render() {
    const { data, defaultSortCol, headers, testID, tableRow, desc, ...props } = this.props;

    let stickyColumn = Math.min(props.stickyColumn ? 1 : 0);
    let stickyHeader = Math.min(props.stickyHeader ? 1 : 0);

    const { key, ascending, field, overflow } = this.state;

    return (
      <V borderTopWidth={3} borderColor="blacks.0">
        <V
          // position={Platform.OS === 'ios' && props.iosQuickFix2 ? 'relative' : undefined}
          mt={Platform.OS === 'ios' ? -vh(props.iosQuickFix2 || 2) : undefined}
          borderBottomWidth={2}
          borderColor="blacks.0"
        >
          <V maxHeight={vh(80)} zIndex={0} {...props}>
            <V testID={testID}>
              <V height={Platform.OS === 'ios' ? vh(props.iosQuickFix || 2) : undefined} />
              <V flexDirection="row">
                {!!stickyColumn && (
                  <V borderRightWidth="1px" borderColor="blacks.1">
                    <ScrollView
                      bounces={false}
                      style={{ maxHeight: vh(80) }}
                      nestedScrollEnabled={true}
                      stickyHeaderIndices={!!stickyHeader && headers ? [0] : []}
                      ref={ref => (this.fixedColumnRef = ref)}
                      onScroll={ev => {
                        this.isFixedColumnScrolling &&
                          this.columnRef &&
                          this.columnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                      }}
                      onScrollBeginDrag={ev => {
                        this.isFixedColumnScrolling = true;
                        this.columnRef &&
                          this.columnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                      }}
                      onScrollEndDrag={ev => {
                        this.columnRef &&
                          this.columnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                      }}
                      onMomentumScrollBegin={ev => {
                        this.columnRef &&
                          this.columnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                      }}
                      onMomentumScrollEnd={ev => {
                        this.columnRef &&
                          this.columnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                      }}
                      showsVerticalScrollIndicator={false}
                      scrollEventThrottle={16}
                    >
                      {headers && (
                        <TableHead.Head
                          ascending={ascending}
                          headers={[headers[0]]}
                          widths={[this.columnWidths[0]]}
                          selectedField={field}
                          sort={this.sortTableStateBy}
                          {...props.headerProps}
                        />
                      )}
                      <ScrollView
                        horizontal
                        bounces={false}
                        showsHorizontalScrollIndicator={false}
                        scrollEventThrottle={10}
                      >
                        <V>
                          <TableBody.Body key={key} TableRow={this.rowsWithStickyColumn} />
                        </V>
                      </ScrollView>
                    </ScrollView>
                  </V>
                )}

                <View>
                  <ScrollView
                    bounces={false}
                    style={{ maxHeight: vh(80) }}
                    nestedScrollEnabled={true}
                    stickyHeaderIndices={this.props.stickyHeader && headers ? [0] : []}
                    scrollEventThrottle={16}
                    showsVerticalScrollIndicator={false}
                    {...this.vScrollProps}
                  >
                    {headers && (
                      <V mr="111px">
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
                      </V>
                    )}
                    <ScrollView
                      horizontal
                      bounces={false}
                      nestedScrollEnabled={true}
                      showsHorizontalScrollIndicator={false}
                      scrollEventThrottle={10}
                      {...this.hScrollProps}
                    >
                      <V mr="111px">
                        <TableBody.Body key={key} TableRow={this.rowsWithoutStickyColumn} />
                      </V>
                    </ScrollView>
                  </ScrollView>
                </View>
              </V>
            </V>
          </V>
        </V>
      </V>
    );
  }
}
