import React, { useContext, useState, Component } from 'react';
import { Button, StyleSheet, ScrollView, View, Text } from 'react-native';
import { vw, vh, vmin, vmax } from 'react-native-expo-viewport-units';
import Sheet from './Sheet';
import TableWithLib from './TableWithLib';
import Table_rowScroll from './Table_rowScroll';
import TableWithLibRaw from './TableWithLibRaw';
import { Table, TableRow as Row, TableCell } from './Table';

export default class PortfolioView extends React.Component {
  state = {
    count: 1,
    page: [],
  };

  headers = [
    { name: 'Name', value: 'name', sort: true },
    { name: 'Code1', value: 'symbol', sort: true },
    { name: 'Code2' },
    { name: 'Code3' },
    { name: 'Code4' },
    { name: 'Code5' },
    { name: 'Code6' },
  ];

  componentDidMount() {
    const page = [];
    for (let i = 0; i < 30; i++)
      page.push({
        name: 'google nm' + i,
        symbol: 'GOOG5' + (100 - i),
        exchange: 'NAS',
        symbol2: 'GOOG5' + i,
        exchange2: 'NAS',
        symbol3: 'GOOG5' + i,
        exchange3: 'NAS',
      });
    this.setState({ page });
  }

  toggleSort = (field, newDir) => {
    const page = [...this.state.page].sort((r1, r2) => {
      return (newDir ? 1 : -1) * r1[field].localeCompare(r2[field]);
    });

    this.setState({ page });
  };

  setCount = () => this.setState({ count: this.state.count + 1 });

  render() {
    return (
      <ScrollView bounces={false} style={{ marginTop: 0 }}>
        <Text>My Data {this.state.count}</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx this?</Text>
        <Button
          title="click me"
          onPress={() => {
            this.setCount(count + 1);
          }}
        ></Button>
        <Text>xxxyy</Text>
        <Table
          stickyHeader
          stickyColumn
          headers={this.headers}
          data={this.state.page}
          externalSort={(field, newDir) => this.toggleSort(field, newDir)}
          tableRow={row => {
            return (
              <Row>
                <TableCell width={100}>{row.name}</TableCell>
                <TableCell width={80}>{row.symbol}</TableCell>
                <TableCell width={100}>{row.exchange}</TableCell>
                <TableCell width={120}>{row.symbol2}</TableCell>
                <TableCell width={140}>{row.exchange2}</TableCell>
                <TableCell width={160}>{row.symbol3}</TableCell>
                <TableCell width={180}>{row.exchange3}</TableCell>
              </Row>
            );
          }}
        />
        <Text>yyy</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
        <Text>xxx</Text>
      </ScrollView>
    );
  }
}
