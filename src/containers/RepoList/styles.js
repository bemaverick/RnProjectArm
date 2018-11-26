import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  indicatorBlock: {
    padding: 10
  },
  flatList: {
    flexGrow: 1,
  },
  settingsPanel: {
    flexDirection: 'row',
    backgroundColor: '#eee',
    justifyContent: 'space-between',
    height: 20,
    alignItems: 'center',
    paddingHorizontal: 10
  },
  paginatorContainer: {
    height: 55,
    borderTopWidth: 1
  },
  navigationBlock: {
    height: 55,
    padding: 10,
    borderTopWidth: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  scrollView: {
    alignItems: 'center'
  },
  paginatorItemText: {
    padding: 8,
    fontSize: 16
  },
  paginatorActiveItemText: {
    color: 'red',
  },
  searchSettingPannel: {
    height: 25,
    justifyContent: 'center'
  }

});
export default styles;
