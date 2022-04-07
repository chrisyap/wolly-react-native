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
          {!!stickyColumn && (
            <View>
              <ScrollView
                bounces={false}
                style={{ height: 900 }}
                nestedScrollEnabled={true}
                stickyHeaderIndices={!!stickyHeader ? [0] : []}
                ref={ref => (this.fixedColumnRef = ref)}
                onScroll={ev =>
                  this.isFixedColumnScrolling &&
                  this.columnRef &&
                  this.columnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false })
                }
                onScrollBeginDrag={ev => {
                  this.isFixedColumnScrolling = true;
                  this.columnRef && this.columnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                }}
                onScrollEndDrag={ev => {
                  this.columnRef && this.columnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                }}
                onMomentumScrollBegin={ev => {
                  this.columnRef && this.columnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                }}
                onMomentumScrollEnd={ev => {
                  this.columnRef && this.columnRef.scrollTo({ y: ev.nativeEvent.contentOffset.y, animated: false });
                }}
                showsVerticalScrollIndicator={false}
                scrollEventThrottle={16}
              >
                <TableHead.Head
                  ascending={ascending}
                  headers={[headers[0]]}
                  selectedField={field}
                  sort={this.sortTableStateBy}
                  {...props.headerProps}
                />
                {/*
                  <ScrollView
                    horizontal
                    bounces={false}
                    showsHorizontalScrollIndicator={false}
                    scrollEventThrottle={10}
                  >
                    <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                      <TableWrapper style={{ flexDirection: 'row', backgroundColor: '#FFF1C1' }}>
                        <Cell
                          data={this.state.tableHead0 + (this.state.asc0 ? '^' : 'V')}
                          width={this.state.widthArr0}
                          style={styles.header}
                          onPress={() => {
                            let t0 = new Date().getTime();
                            this.setState({ asc0: !this.state.asc0 }, () => {
                              let t1 = new Date().getTime();
                              console.log('pressing', t1 - t0);
                            });
                          }}
                        />
                      </TableWrapper>
                    </Table>
                  </ScrollView>*/}

                <ScrollView horizontal bounces={false} showsHorizontalScrollIndicator={false} scrollEventThrottle={10}>
                  <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                    <TableBody.Body
                      data={this.stickyColumn && [sortedData ? sortedData[0] : data[0]]}
                      TableRow={row => {
                        //this.rowWithStickyColumn.push(this.props.tableRow(row[0]));
                        //this.rowWithStickyColumn

                        return this.props.tableRow([row[0]]);
                      }}
                      overflow={overflow}
                      clickFunc={clickFunc}
                    />
                    {/* tableData0.map((rowData, index) => (
                          <Row
                            key={index}
                            data={rowData}
                            widthArr={[this.state.widthArr0]}
                            style={[styles.row, index % 2 && { backgroundColor: '#F7F6E7' }]}
                            textStyle={styles.text}
                          />
                        )) */}
                  </Table>
                </ScrollView>
              </ScrollView>
            </View>
          )}

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
              <TableHead.Head
                ascending={ascending}
                headers={headers.slice(stickyColumn ? 1 : 0)}
                selectedField={field}
                sort={this.sortTableStateBy}
                rowRef={this.rowRef}
                setHeaderRef={this.setHeaderRef}
                isheaderScrolling={this.isheaderScrolling}
                {...props.headerProps}
              />
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
                <Table borderStyle={{ borderWidth: 1, borderColor: '#C1C0B9' }}>
                  <TableBody.Body
                    data={(sortedData ? sortedData : data).slice(stickyColumn ? 1 : 0)}
                    TableRow={row => {
                      //this.rowWithStickyColumn.push(this.props.tableRow(row[0]));
                      //this.rowWithStickyColumn

                      return this.props.tableRow(row.slice(1));
                    }}
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
