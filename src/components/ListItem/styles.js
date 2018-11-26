import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  item: {
    flexDirection: 'row',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc'
  },
  userAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 20
  },
  detail: {
    flex: 1,
    justifyContent: 'center'
  },
  rightPart: {
    width: 50,
    justifyContent: 'center',
    alignItems: 'center'
  },
  starBlock: {
    width: 19,
    paddingLeft: 1,
    height: 20,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'orange',
    marginBottom: 5
  },
  starText: {
    color: 'white'
  },

  checkboxBlock: {
    width: 30,
    justifyContent: 'center',
    alignItems: 'center',
  }
});
