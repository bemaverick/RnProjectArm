import React, { Component } from 'react';
import {
  TextInput, View, Text
} from 'react-native';
import styles from './styles';


class CustomInput extends Component {
  state = {
    nonValid: false
  };

  onChangeText = (text) => {
    const { onChangeText } = this.props;
    if (text.toLowerCase() !== text) {
      this.setState({ nonValid: true });
    } else {
      this.setState({ nonValid: false });
    }
    onChangeText(text);
  };

  render() {
    const { nonValid } = this.state;
    const { aditionalInfo } = this.props;
    const mainStyle = { ...styles.main, ...nonValid ? styles.nonValid : {} };
    return (
      <View style={styles.container}>
        <TextInput
          {...this.props}
          onChangeText={this.onChangeText}
          style={mainStyle}
        />
        {
          !!aditionalInfo && (
            <View style={styles.aditionalBlock}>
              <Text
                style={styles.aditionalText}
              >
                {aditionalInfo}
              </Text>
            </View>
          )
        }
      </View>

    );
  }
}
export default CustomInput;
