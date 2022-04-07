import React from 'react';
import { Platform, View, ScrollView } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';

import V from '../View';
import PropTypes from 'prop-types';
import TableHead from './TableHead';
import TableBody from './TableBody';

const TableWrap = props => {
  const { children } = props;
  return children;
};

const TableWrapper = ({ children }) => children;

export default class Table extends React.Component {
  state = {
    field: null,
    ascending: true,
    overflow: false,
    key: +new Date(),
  };

  // Note: Quick fix for IoS defect jammed scrolling
  iosQuickFix = Platform.OS === 'ios' ? { height: vh(this.props.iosQuickFix || 2) } : {};
  iosQuickFix2 = Platform.OS === 'ios' ? { position: 'relative', top: this.props.iosQuickFix2 || -2 } : {};

  columnWidths = [];
  rowsWithStickyColumn = [];
  rowsWithoutStickyColumn = [];
  columnRef = null;
  fixedColumnRef = null;
  isFixedColumnScrolling = false;

  rowRef = null;
  headerRef = null;
  isHeaderScrolling = false;

  isSingle = this.props.headers && this.props.headers.length === 1;
  vScrollProps =
    this.props.stickyColumn && !this.isSingle
      ? {
          ref: ref => (this.columnRef = ref),
          onScroll: ev => {
            !this.isFixedColumnScrolling &&
              this.fixedColumnRef &&
              this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
          },
          onScrollBeginDrag: ev => {
            this.isFixedColumnScrolling = false;
            this.fixedColumnRef && this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
          },
          onScrollEndDrag: ev => {
            this.fixedColumnRef && this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
          },
          onMomentumScrollBegin: ev => {
            this.fixedColumnRef && this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
          },
          onMomentumScrollEnd: ev => {
            this.fixedColumnRef && this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
          },
        }
      : {};

  hScrollProps =
    this.props.headers && !this.isSingle
      ? {
          ref: ref => (this.rowRef = ref),
          onScroll: ev => {
            !this.isHeaderScrolling &&
              this.headerRef &&
              this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
          },
          onScrollBeginDrag: ev => {
            this.isHeaderScrolling = false;
            this.headerRef && this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
          },
          onScrollEndDrag: ev => {
            this.headerRef && this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
          },
          onMomentumScrollBegin: ev => {
            this.headerRef && this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
          },
          onMomentumScrollEnd: ev => {
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

    this.recreateColumns(this.props.data);
  }

  componentDidUpdate = prevProps => {
    if (this.props.data !== prevProps.data) {
      if (!this.props.externalSort && this.props.defaultSortCol) {
        this.sortTableStateBy(this.props.defaultSortCol);
      } else {
        this.recreateColumns(this.props.data);

        this.setState({
          key: +new Date(),
        });
      }
    }
  };

  isNumeric = num => {
    return !isNaN(num);
  };

  formatNumber = figure => {
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

  sortTableStateBy = (field, sortType, dir) => {
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
              tempData.sort((a, b) => this.formatNumber(a[field]) - this.formatNumber(b[field]));
            } else {
              tempData.sort((a, b) => {
                return a[field] < b[field] ? -1 : b[field] < a[field] ? 1 : 0;
              });
            }
          } else {
            if (sortType === 'number') {
              tempData.sort((a, b) => this.formatNumber(b[field]) - this.formatNumber(a[field]));
            } else {
              tempData.sort((a, b) => {
                return b[field] < a[field] ? -1 : a[field] < b[field] ? 1 : 0;
              });
            }
          }

          this.setState({
            key: +new Date(),
          });
          this.recreateColumns(tempData);
          //}, 100);
        }
      }
    );

    if (this.props.externalSort) {
      this.props.externalSort(field, newDir);
    }
  };

  handleOverflowChange = isOverflowed => {
    this.setState({
      overflow: isOverflowed ? true : false,
    });
  };

  recreateColumns = data => {
    this.rowsWithoutStickyColumn = [];
    this.rowsWithStickyColumn = [];
    data.forEach((row, index) => {
      const tableRow = this.props.tableRow(row);

      if (index === 0) {
        tableRow.props.children.forEach(child => {
          this.columnWidths.push(child.props.width);
        });
      }

      if (this.props.stickyColumn) {
        const rowWithoutStickyColumn = React.cloneElement(tableRow, [tableRow.props], tableRow.props.children.slice(1));
        this.rowsWithoutStickyColumn.push(rowWithoutStickyColumn);
        const rowWithStickyColumn = React.cloneElement(tableRow, [tableRow.props], [tableRow.props.children[0]]);
        this.rowsWithStickyColumn.push(rowWithStickyColumn);
      } else {
        this.rowsWithoutStickyColumn.push(tableRow);
      }
    });
  };

  setHeaderRef = ref => {
    this.headerRef = ref;
  };

  setIsHeaderScrolling = isHeaderScrolling => {
    this.isHeaderScrolling = isHeaderScrolling;
  };

  render() {
    const {
      className,
      clickFunc,
      data,
      defaultSortCol,
      footers,
      hasNoScroll,
      fullwidth,
      headers,
      id,
      sortedCol,
      tableRow,
      desc,
      ...props
    } = this.props;

    let stickyColumn = Math.min(
      props.stickyColumn ? props.stickyColumn : props.stickyColumnCount && props.stickyColumnCount
    );
    let stickyHeader = Math.min(
      props.stickyHeader ? props.stickyHeader : props.stickyHeaderCount && props.stickyHeaderCount
    );
    let stickyFooter = Math.min(
      props.stickyFooter ? props.stickyFooter : props.stickyFooterCount && props.stickyFooterCount
    );

    const { key, ascending, field, overflow } = this.state;

    return (
      <React.Fragment>
        <V style={this.iosQuickFix2}>
          <TableWrapper
            headerCount={stickyHeader}
            columnCount={stickyColumn}
            footerCount={stickyFooter}
            onOverflowChange={this.handleOverflowChange}
            overflow={overflow && !hasNoScroll}
            style={{ maxHeight: !hasNoScroll && '80vh', zIndex: 0 }}
            {...props}
          >
            <TableWrap id={id}>
              <V style={this.iosQuickFix} />

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
                          <TableBody.Body
                            key={key}
                            TableRow={this.rowsWithStickyColumn}
                            overflow={overflow}
                            clickFunc={clickFunc}
                          />
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
                        <TableBody.Body
                          index={key}
                          key={key}
                          TableRow={this.rowsWithoutStickyColumn}
                          overflow={overflow}
                          clickFunc={clickFunc}
                        />
                      </V>
                    </ScrollView>
                  </ScrollView>
                </View>
              </V>
            </TableWrap>
          </TableWrapper>
        </V>
      </React.Fragment>
    );
  }
}

Table.propTypes = {
  bordered: PropTypes.bool,
  hasBorders: PropTypes.bool,
  className: PropTypes.string,
  data: PropTypes.array.isRequired,
  defaultSortCol: PropTypes.string,
  hasNoScroll: PropTypes.bool,
  fullwidth: PropTypes.bool,
  headers: PropTypes.array,
  hoverable: PropTypes.bool,
  isHoverable: PropTypes.bool,
  narrow: PropTypes.bool,
  isNarrow: PropTypes.bool,
  overflow: PropTypes.bool,
  striped: PropTypes.bool,
  hasStrips: PropTypes.bool,
  tableRow: PropTypes.any,
  stickyHeaderCount: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
  stickyColumnCount: PropTypes.oneOfType([PropTypes.bool, PropTypes.number]),
};

Table.defaultProps = {
  data: [],
  // theme,
  stickyHeaderCount: false,
  stickyColumnCount: false,
};

TableWrap.defaultProps = {
  // theme,
};
