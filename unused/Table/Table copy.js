import React from 'react';
import { Button, StyleSheet, View, ScrollView, Text } from 'react-native';
import { Table, TableWrapper, Cell, Row } from 'react-native-table-component';
// import styled from 'styled-components';
// import { tint } from 'polished';
// import theme from '../Theme';
import PropTypes from 'prop-types';
import TableHead from './TableHead';
// import TableFoot from './TableFoot';
import TableBody from './TableBody';
// import TableRow from './TableRow';
// import { CellWrapper } from './Cell';
// import { DetectOverflow } from '../NabOverflowDetection';
// import { composed } from '../Theme/Composed';

// const GetHeaderNthChild = props => {
//   return `
//     &:nth-child(${props.headerCount}) {
//       ${CellWrapper} {
//         position: sticky;
//         z-index: 2;
//         &:nth-child(-n+${props.columnCount}) {
//           position: sticky;
//           border-right-width: ${props.columnCount && props.overflow && '1px'};
//           border-bottom-width: 2px;
//           top: 0;
//           left: 0;
//           z-index: 3;
//         }
//       }
//     }
//   `;
// };

// const GetFooterNthChild = props => {
//   return `
//     &:nth-child(-n+${props.columnCount}) {
//       position: sticky;
//       border-right-width: ${props.columnCount && props.overflow && '1px'};
//       border-top-width: 2px;
//       bottom: 0;
//       left: 0;
//       z-index: 3;
//     }
//   `;
// };

// const GetColumnNthChild = props => {
//   return `
//     &:nth-child(-n+${props.columnCount}) {
//       position: sticky;
//       border-right-width: ${props.columnCount && props.overflow && '1px'};
//       left: 0;
//       z-index: 2;
//     }
//   `;
// };

// const TableWrap = styled.div`
//   display: table;
//   border-collapse: separate;
//   background-color: white;
//   color: ${props => props.theme.colors.text};
//   width: 100%;
// `;
const ShaperTableWrap = props => {
  console.log('ShaperTableWrap ...', props);
  const { children } = props;
  return children;
};

// const ShaperTableWrapper = styled(DetectOverflow)`
//   margin-bottom: 1rem;
//   -webkit-overflow-scrolling: touch;
//   background-image: linear-gradient(90deg, #fff, #fff 50%, #fff),
//     linear-gradient(90deg, #fff, #fff 50%, #fff),
//     linear-gradient(90deg, rgba(0, 0, 0, 0.1), transparent),
//     linear-gradient(270deg, rgba(0, 0, 0, 0.1), transparent);
//   background-position: 0 50%, 100% 50%;
//   background-repeat: no-repeat;
//   background-color: #fff;
//   background-size: 40px 100%, 40px 100%, 15px 100%, 15px 100%;
//   background-attachment: local, local, scroll, scroll;
//   border: ${props =>
//     (props.bordered || props.hasBorders) &&
//     `1px solid ${props.theme.colors.secondaries[1]}`};
//
//   &::-webkit-scrollbar {
//     height: 4px;
//     width: 4px;
//   }
//
//   &::-webkit-scrollbar-track {
//     background-color: ${props => props.theme.colors.secondaries[1]};
//   }
//
//   &::-webkit-scrollbar-thumb {
//     background-color: ${props => props.theme.colors.secondary};
//     border: ${props => `1px solid ${props.theme.colors.secondary}`};
//   }
//
//   &::-webkit-scrollbar-corner {
//     background-color: transparent;
//   }
//
//   ${composed};
//
//   ${TableHead.HeadWrapper} {
//     ${TableRow} {
//       ${CellWrapper} {
//         border-right-width: ${props =>
//           (props.bordered || props.hasBorders) && '1px'};
//       }
//       ${props =>
//         GetHeaderNthChild({
//           theme: props.theme,
//           headerCount: props.headerCount,
//           columnCount: props.columnCount,
//           overflow: props.overflow,
//           ...props.headerProps
//         })};
//     }
//   }
//   ${TableFoot.FootWrapper} {
//     ${TableRow} {
//       ${CellWrapper} {
//         position: ${props => props.footerCount && 'sticky'};
//         bottom: ${props => props.footerCount && 0};
//         ${props =>
//           GetFooterNthChild({
//             theme: props.theme,
//             footerCount: props.footerCount,
//             columnCount: props.columnCount,
//             overflow: props.overflow,
//             ...props.headerProps
//           })};
//       }
//     }
//   }
//
//   ${TableBody.BodyWrap} {
//     ${CellWrapper} {
//       ${props =>
//         GetColumnNthChild({
//           columnCount: props.columnCount,
//           overflow: props.overflow
//         })};
//       border-width: ${props =>
//         (props.bordered || props.hasBorders) && '0 1px 1px 0'};
//       &:last-child {
//         border-right-width: 0;
//       }
//     }
//     ${TableRow} {
//       &:last-child {
//         ${CellWrapper} {
//           border-bottom-width: ${props =>
//             (props.bordered || props.hasBorders) && '0'};
//         }
//       }
//       &:nth-child(odd) {
//         ${CellWrapper} {
//           ${props => GetColumnNthChild({ columnCount: props.columnCount })};
//           background-color: ${props =>
//             (props.striped || props.hasStripes) &&
//             tint(0.7, props.theme.colors.secondaries[1])};
//         }
//       }
//       &:hover {
//         &:nth-child(even) {
//           ${CellWrapper} {
//             background-color: ${props =>
//               (props.hoverable || props.isHoverable) &&
//               tint(0.9, props.theme.colors.secondaries[1])};
//           }
//         }
//         &:nth-child(odd) {
//           ${CellWrapper} {
//             background-color: ${props =>
//               (props.striped || props.hasStripes) &&
//               (props.hoverable || props.isHoverable)
//                 ? tint(0.6, props.theme.colors.secondaries[1])
//                 : (props.hoverable || props.isHoverable) &&
//                   tint(0.9, props.theme.colors.secondaries[1])};
//           }
//         }
//       }
//     }
//   }
//
//   ${CellWrapper} {
//     padding-top: ${props =>
//       (props.narrow || props.isNarrow) && 'calc(.25em + 2px)'};
//     padding-bottom: ${props => (props.narrow || props.isNarrow) && '.25em'};
//   }
// `;
const ShaperTableWrapper = ({ children }) => children;

const sliceRow = (comp, fromIndex, toIndex) => {
  //....
  return comp;
};

export default class ShaperTable extends React.Component {
  state = {
    tableHead: ['Head', 'Head2', 'Head3', 'Head4', 'Head5', 'Head6', 'Head7', 'Head8', 'Head9'],
    tableHead0: ['Head0'],
    widthArr: [40, 60, 80, 100, 120, 140, 160, 180, 200],
    asc0: false,
    // original
    field: null,
    ascending: true,
    overflow: false,
    sortedData: [],
  };

  rowWithStickyColumn = [];
  // this.props.stickyColumn &&
  // React.cloneElement(this.props.tableRow, [this.props.tableRow.props], [this.props.tableRow.props.children[0]]);
  rowWithoutStickyColumn = [];
  // this.props.stickyColumn
  //   ? React.cloneElement(this.props.tableRow, [this.props.tableRow.props], this.props.tableRow.props.children.slice(1))
  //   : this.props.tableRow;

  // {React.cloneElement(headView, [headView.props], [headView.props.children[0]])}
  //     <Text>xxx</Text>
  //     {React.cloneElement(headView, [headView.props], headView.props.children.slice(1))}

  // {React.createElement(headView.type, [headView.props], [headView.props.children[0]])}
  //     <Text>xxx</Text>
  //     {React.createElement(headView.type, [headView.props], headView.props.children.slice(1))}

  columnRef = null;
  fixedColumnRef = null;
  isFixedColumnScrolling = false;

  rowRef = null;
  headerRef = null;
  isheaderScrolling = false;

  componentDidMount = () => {
    if (!this.props.externalSort && this.props.defaultSortCol) {
      this.sortTableStateBy(this.props.defaultSortCol, null, this.props.desc ? 'desc' : null);
    } else {
      this.setState({
        field: this.props.defaultSortCol && this.props.defaultSortCol,
        ascending: this.props.desc ? false : true,
        sortedData: this.props.data,
      });
    }

    // if (this.props.stickyColumn) {
    // data.forEach(row => {
    //   // const tableRow = this.props.tableRow(row[0]);
    //   this.rowWithStickyColumn.push(this.props.tableRow(row[0]));
    //   this.rowWithoutStickyColumn.push(this.props.tableRow(row.slice(1)));
    //   // this.rowWithStickyColumn.push(React.cloneElement(tableRow, [tableRow.props], [tableRow.props.children[0]]));
    //   // this.rowWithoutStickyColumn.push(
    //   //   React.cloneElement(tableRow, [tableRow.props], tableRow.props.children.slice(1))
    //   // );
    // });
    // }
  };

  componentDidUpdate = prevProps => {
    if (this.props.data !== prevProps.data) {
      if (!this.props.externalSort && this.props.defaultSortCol) {
        this.sortTableStateBy(this.props.defaultSortCol);
      } else {
        this.setState({
          sortedData: this.props.data,
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

    this.setState({
      field: field,
      ascending: newDir,
    });

    if (!this.props.externalSort) {
      setTimeout(() => {
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
          sortedData: tempData,
        });
      }, 100);
    } else {
      this.props.externalSort(field, newDir);
    }
  };

  handleOverflowChange = isOverflowed => {
    this.setState({
      overflow: isOverflowed ? true : false,
    });
  };

  setHeaderRef = ref => (this.headerRef = ref);

  render() {
    // console.log('rowWithoutStickyColumn', this.rowWithoutStickyColumn);
    // if (this.props) {
    //   return <Text>ddd</Text>;
    // }

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

    const { ascending, field, overflow, sortedData } = this.state;

    //
    const tableData = [];
    const tableData0 = [];
    for (let i = 0; i < 30; i += 1) {
      const rowData = [];
      for (let j = 0; j < 9; j += 1) {
        rowData.push(`${i}${j}`);
      }
      tableData.push(rowData);
      tableData0.push([`${i}`]);
    }

    // if (this.props) {
    //   return (
    //     <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
    //       {tableData.map((rowData, index) => (
    //         <Row
    //           key={index}
    //           data={rowData}
    //           widthArr={[10]}
    //           style={[{ height: 40, backgroundColor: '#E7E6E1' }, index % 2 && { backgroundColor: '#F7F6E7' }]}
    //           textStyle={{ textAlign: 'center', fontWeight: '100' }}
    //         />
    //       ))}
    //     </Table>
    //   );
    // }

    return (
      <React.Fragment>
        <ShaperTableWrapper
          headerCount={stickyHeader}
          columnCount={stickyColumn}
          footerCount={stickyFooter}
          onOverflowChange={this.handleOverflowChange}
          overflow={overflow && !hasNoScroll}
          style={{ maxHeight: !hasNoScroll && '80vh', zIndex: 0 }}
          {...props}
        >
          <ShaperTableWrap id={id}>
            {/*headers && (
              <TableHead.Head
                ascending={ascending}
                headers={headers}
                selectedField={field}
                sort={this.sortTableStateBy}
                {...props.headerProps}
              />
            )*/}

            {/*<TableBody.Body
              data={sortedData ? sortedData : data}
              TableRow={tableRow}
              overflow={overflow}
              clickFunc={clickFunc}
            />*/}

            {/*footers && (
              <TableFoot.Foot
                ascending={ascending}
                footers={footers}
                selectedField={field}
                sort={this.sortTableStateBy}
                {...props.footerProps}
              />
            )*/}

            <View style={{ flexDirection: 'row' }}>
              <View>
                <ScrollView
                  ref={ref => (this.columnRef = ref)}
                  bounces={false}
                  style={{ height: 900 }}
                  nestedScrollEnabled={true}
                  stickyHeaderIndices={!!stickyHeader ? [0] : []}
                  onScroll={ev => {
                    !this.isFixedColumnScrolling &&
                      this.fixedColumnRef &&
                      this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                  }}
                  onScrollBeginDrag={ev => {
                    this.isFixedColumnScrolling = false;
                    this.fixedColumnRef &&
                      this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                  }}
                  onScrollEndDrag={ev => {
                    this.fixedColumnRef &&
                      this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                  }}
                  onMomentumScrollBegin={ev => {
                    this.fixedColumnRef &&
                      this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                  }}
                  onMomentumScrollEnd={ev => {
                    this.fixedColumnRef &&
                      this.fixedColumnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                  }}
                  scrollEventThrottle={16}
                  showsVerticalScrollIndicator={false}
                >
                  {/*
                  <ScrollView
                    bounces={false}
                    horizontal
                    nestedScrollEnabled={true}
                    ref={ref => (this.headerRef = ref)}
                    onScroll={ev =>
                      this.isheaderScrolling &&
                      this.rowRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false })
                    }
                    onScrollBeginDrag={ev => {
                      this.isheaderScrolling = true;
                      this.rowRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
                    }}
                    onScrollEndDrag={ev => {
                      this.rowRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
                    }}
                    onMomentumScrollBegin={ev => {
                      this.rowRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
                    }}
                    onMomentumScrollEnd={ev => {
                      this.rowRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                  >
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                      <TableWrapper style={{ flexDirection: 'row', backgroundColor: '#FFF1C1' }}>
                        <Cell data={this.state.tableHead[0]} width={this.state.widthArr[0]} style={styles.header} />
                        <Cell data={this.state.tableHead[1]} width={this.state.widthArr[1]} style={styles.header} />
                        <Cell data={this.state.tableHead[2]} width={this.state.widthArr[2]} style={styles.header} />
                        <Cell data={this.state.tableHead[3]} width={this.state.widthArr[3]} style={styles.header} />
                        <Cell data={this.state.tableHead[4]} width={this.state.widthArr[4]} style={styles.header} />
                        <Cell data={this.state.tableHead[5]} width={this.state.widthArr[5]} style={styles.header} />
                        <Cell data={this.state.tableHead[6]} width={this.state.widthArr[6]} style={styles.header} />
                        <Cell data={this.state.tableHead[7]} width={this.state.widthArr[7]} style={styles.header} />
                        <Cell data={this.state.tableHead[8]} width={this.state.widthArr[8]} style={styles.header} />
                      </TableWrapper>
                    </Table>
                  </ScrollView>
                  */}

                  <ScrollView
                    bounces={false}
                    horizontal
                    nestedScrollEnabled={true}
                    ref={ref => (this.rowRef = ref)}
                    onScroll={ev =>
                      !this.isheaderScrolling &&
                      this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false })
                    }
                    onScrollBeginDrag={ev => {
                      this.isheaderScrolling = false;
                      this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
                    }}
                    onScrollEndDrag={ev => {
                      this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
                    }}
                    onMomentumScrollBegin={ev => {
                      this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
                    }}
                    onMomentumScrollEnd={ev => {
                      this.headerRef.scrollTo({ x: ev.nativeEvent.contentOffset.x, animated: false });
                    }}
                    showsVerticalScrollIndicator={false}
                    scrollEventThrottle={16}
                  >
                    {/*}
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                      {tableData.map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={[10]}
                          style={[
                            { height: 40, backgroundColor: '#E7E6E1' },
                            index % 2 && { backgroundColor: '#F7F6E7' },
                          ]}
                          textStyle={{ textAlign: 'center', fontWeight: '100' }}
                        />
                      ))}
                    </Table>
                    */}

                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                      <TableBody.Body
                        data={(sortedData ? sortedData : data).slice(stickyColumn ? 1 : 0)}
                        TableRow={<Row data={['aa']} widthArr={[100]} />}
                        overflow={overflow}
                        clickFunc={clickFunc}
                      />
                      {/* (stickyColumn ? tableData.slice(1) : tableData).map((rowData, index) => (
                        <Row
                          key={index}
                          data={rowData}
                          widthArr={this.state.widthArr}
                          style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                          textStyle={styles.text}
                        />
                      )) */}
                    </Table>
                  </ScrollView>
                </ScrollView>
              </View>
            </View>
          </ShaperTableWrap>
        </ShaperTableWrapper>
      </React.Fragment>
    );
  }
}

ShaperTable.propTypes = {
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

ShaperTable.defaultProps = {
  data: [],
  // theme,
  stickyHeaderCount: false,
  stickyColumnCount: false,
};

ShaperTableWrap.defaultProps = {
  // theme,
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  header: { height: 50, backgroundColor: '#537791' },
  text: { textAlign: 'center', fontWeight: '100' },
  row: { height: 40, backgroundColor: '#E7E6E1' },
});
