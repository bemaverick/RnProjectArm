import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
  },
  main: {
    flex: 1,
    height: 40,
    paddingHorizontal: 12,
  },
  nonValid: {
    borderColor: 'red'
  },
  aditionalBlock: {
    padding: 5
  },
  aditionalText: {
    fontSize: 10
  }
});
