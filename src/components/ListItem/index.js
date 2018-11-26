/**
 * @format
 * @flow
 */

import React from 'react';
import {
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';
import styles from './styles';

type _t_ptops = {
  onPress: Function,
  owner: {
    avatar_url: string,
  },
  name: string,
  stargazers_count: number,
  selectable: boolean,
  checkAction: Function,
  checked: boolean
}


const ListItem = (props: _t_ptops) => {
  const {
    onPress, owner, name, stargazers_count, selectable, checkAction, checked
  } = props;
  const Container = onPress ? TouchableOpacity : View;
  return (
    <Container
      onPress={() => onPress}
      style={styles.item}
    >
      <Image
        style={styles.userAvatar}
        source={{ uri: owner.avatar_url }}
      />
      <View style={styles.detail}>
        <Text
          numberOfLines={2}
        >
          {name}
        </Text>
      </View>
      <View style={styles.rightPart}>
        <View
          style={styles.starBlock}
        >
          <Text
            style={!!stargazers_count && styles.starText}
          >
            &#x2605;
          </Text>
        </View>
        <Text>{stargazers_count}</Text>
      </View>

      {
        selectable &&
        (
          <TouchableOpacity
            style={styles.checkboxBlock}
            onPress={checkAction}
          >
            <View>
              { checked ? <Text>&#9745;</Text> : <Text>&#9744;</Text> }
            </View>
          </TouchableOpacity>
        )
      }
    </Container>
  );
};

export default ListItem;
