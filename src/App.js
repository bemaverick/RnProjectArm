/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { createStackNavigator, createAppContainer } from 'react-navigation';

import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import axios from 'axios';
import axiosMiddleware from 'redux-axios-middleware';
import RepoListSelected from './containers/RepoListSelected';
import RepoList from './containers/RepoList';

import reducer from './redux';


const Home = createStackNavigator({
  Home: {
    screen: RepoList,
    navigationOptions: () => ({
      title: 'Home',
      headerStyle: {
        backgroundColor: '#eee',
      },
    }),
  },
  RepoListSelected,
});


const AppNav = createAppContainer(Home);


const client = axios.create({
  baseURL: 'https://api.github.com',
  responseType: 'json'
});

const store = createStore(reducer, applyMiddleware(axiosMiddleware(client)));
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5FCFF',
  },
});


type Props = {};
export default class App extends Component<Props> {
  componentDidMount() {}

  render() {
    return (
      <Provider store={store}>
        <View style={styles.container}>
          <AppNav />
        </View>
      </Provider>
    );
  }
}
