/**
 * @format
 * @flow
 */

import React, { Component } from 'react';
import {
  View, FlatList, ActivityIndicator, Text, TouchableOpacity, ScrollView, Button
} from 'react-native';
import { connect } from 'react-redux';
import debounce from 'lodash/debounce';

import { getRepositoriesByQuery } from '../../redux';
import { CustomInput, ListItem } from '../../components';

import styles from './styles';

class RepoList extends Component {

  constructor(props) {
    super(props);
    this.state = {
      searchedValue: '',
      reposResult: [],
      selectingEnabled: false,
      currentPage: 1,
      checkedItems: {}
    };
    this.fetchRepositoriesDebounce = debounce(this.fetchRepositoriesDebounce, 1000);
  }


  componentDidMount() {

  }

  fetchRepositoriesDebounce = (searchString) => {
    this.getRepositories(searchString);
  };

  getRepositories = (searchString, page = 1) => {
    // eslint-disable-next-line
    this.props.getRepositoriesByQuery(searchString, page)
      .then(() => {
        const { repos: reposResult } = this.props;
        this.setState({ reposResult, currentPage: page, checkedItems: {} });
      });
  };

  onChangeInput = (inputValue: string) => {
    this.setState({ searchedValue: inputValue });
    if (inputValue.length) {
      this.fetchRepositoriesDebounce(inputValue);
    }
  };

  enableSelecting = () => {
    this.setState(prevState => ({ selectingEnabled: !prevState.selectingEnabled }));
  };

  renderItem = ({ item }) => {
    const { checkedItems, selectingEnabled } = this.state;
    return (
      <ListItem
        {...item}
        checked={checkedItems[item.id]}
        selectable={selectingEnabled}
        checkAction={() => this.checkItem(item.id)}
      />
    );
  };

  checkItem = (itemId) => {
    const { checkedItems } = this.state;
    if (!checkedItems[itemId]) {
      checkedItems[itemId] = true;
    } else {
      delete checkedItems[itemId];
    }
    this.setState({ checkedItems });
  };

  removeAction = () => {
    const { checkedItems, reposResult } = this.state;
    const updatedRepos = reposResult.filter(el => !checkedItems[el.id]);
    this.setState({ reposResult: updatedRepos, checkedItems: {} });
  };

  goToSelectedItems = () => {
    const { reposResult, checkedItems, navigation } = this.state;
    const selectedRepos = reposResult.filter(el => checkedItems[el.id]);
    navigation.navigate('RepoListSelected', { ReposList: selectedRepos });
  };

  render() {
    const {
      searchedValue, reposResult, selectingEnabled, currentPage, checkedItems
    } = this.state;
    const { loadingRepos, totalCount } = this.props;
    const selectButtonText = selectingEnabled ? 'close Editing' : 'edit';

    const amountOfCheckedRepoStars = reposResult.length &&
      reposResult.reduce((sum, current) => {
        if (checkedItems[current.id]) {
          return sum + current.stargazers_count;
        }
        return sum;
      }, 0);

    return (
      <View style={styles.container}>
        <View>
          <TouchableOpacity
            style={styles.searchSettingPannel}
            onPress={() => null}
          >
            <Text>search Settings</Text>
          </TouchableOpacity>
          <CustomInput
            initialNumToRender={10}
            removeClippedSubviews
            onChangeText={this.onChangeInput}
            value={searchedValue}
            placeholder="Search..."
            aditionalInfo={totalCount}
            autoCapitalize="none"
          />
          <View style={styles.settingsPanel}>
            <TouchableOpacity onPress={this.enableSelecting}>
              <Text>
                {selectButtonText}
              </Text>
            </TouchableOpacity>
            {
              selectingEnabled && (
                <TouchableOpacity onPress={this.removeAction}>
                  <Text>
                    remove
                  </Text>
                </TouchableOpacity>
              )
            }
          </View>
          {loadingRepos && <View style={styles.indicatorBlock}><ActivityIndicator /></View>}
        </View>
        <FlatList
          keyExtractor={item => `${item.full_name}${item.id}`}
          styles={styles.container}
          contentContainerStyle={styles.flatList}
          data={reposResult}
          renderItem={this.renderItem}
          ListEmptyComponent={<Text>{loadingRepos ? '' : 'No Data'}</Text>}
        />
        {
          !selectingEnabled && !!totalCount && (totalCount > 30 && totalCount < 3000) && (
            <View style={styles.paginatorContainer}>
              <ScrollView
                horizontal
                contentContainerStyle={styles.scrollView}
              >
                {
                  new Array(Math.ceil(totalCount / 30)).fill(undefined).map((el, index) => (
                    <Text
                      key={index} // eslint-disable-line
                      onPress={() => this.getRepositories(searchedValue, index + 1)}
                      style={[styles.paginatorItemText, currentPage === index + 1 && styles.paginatorActiveItemText]}
                    >
                      {index + 1}
                    </Text>
                  ))
                }
              </ScrollView>
            </View>
          )
        }
        {
          selectingEnabled && (
            <View style={styles.navigationBlock}>
              <Text>
                &#x2605;
                {amountOfCheckedRepoStars}
              </Text>
              <Button
                title="Selected Items List"
                onPress={() => this.goToSelectedItems()}
              />
            </View>
          )
        }

      </View>
    );
  }
}
export default connect(
  state => ({
    loading: state.loading,
    repos: state.repos,
    loadingRepos: state.loadingRepos,
    totalCount: state.totalCount
  }),
  {
    getRepositoriesByQuery
  }
)(RepoList);
