/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View, FlatList
} from 'react-native';

import { ListItem } from '../../components';

import styles from './styles';

export default class RepoListSelected extends Component {

  componentDidMount() {}

  renderItem = ({ item }) => (
    <ListItem
      {...item}
    />
  );

  render() {
    const { navigation } = this.props;
    const reposResult = navigation.getParam('ReposList');

    return (
      <View style={styles.container}>
        <FlatList
          keyExtractor={item => `${item.full_name}${item.id}`}
          styles={styles.container}
          contentContainerStyle={styles.flatList}
          data={reposResult}
          renderItem={this.renderItem}
        />
      </View>
    );
  }
}
