/* eslint-disable react-native/no-inline-styles */
import React, {useContext} from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableHighlight,
  ActivityIndicator,
} from 'react-native';
import AppContext from '../context';
import {SwipeListView} from 'react-native-swipe-list-view';

export default function TodoList({navigation}) {
  const {list, toggleCompleted, loading} = useContext(AppContext);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <TouchableHighlight onPress={() => navigation.navigate('Add Item')}>
          <Text style={{color: 'blue'}}>Add</Text>
        </TouchableHighlight>
      ),
    });
  }, [navigation]);

  if (loading) {
    return <ActivityIndicator style={{marginTop: 20}} />;
  }
  return (
    <SwipeListView
      data={list}
      renderItem={(data, rowMap) => (
        <TouchableHighlight
          onPress={() =>
            navigation.navigate('Detail', {
              item: data.item,
            })
          }>
          <View style={styles.rowFront}>
            <Text style={{color: data.item.completed ? 'green' : 'red'}}>
              {data.item.content}
            </Text>
          </View>
        </TouchableHighlight>
      )}
      renderHiddenItem={(data, rowMap) => (
        <TouchableHighlight
          style={[
            styles.rowBack,
            {backgroundColor: data.item.completed ? 'red' : 'green'},
          ]}
          onPress={() => {
            rowMap[data.item.id].closeRow();
            toggleCompleted(data.item.id);
          }}>
          <Text style={{color: '#FFF', textAlign: 'center', width: 75}}>
            {data.item.completed ? 'UnDone' : 'Done'}
          </Text>
        </TouchableHighlight>
      )}
      rightOpenValue={-75}
      disableRightSwipe
      keyExtractor={item => item.id}
    />
  );
}

const styles = StyleSheet.create({
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
  rowFront: {
    backgroundColor: '#F0F0F0',
    borderBottomColor: '#CCC',
    borderBottomWidth: 1,
    justifyContent: 'center',
    height: 50,
    paddingLeft: 20,
  },
  rowBack: {
    alignItems: 'center',
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  backRightBtn: {
    alignItems: 'center',
    bottom: 0,
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    width: 75,
  },
  backRightBtnRight: {
    backgroundColor: 'red',
    right: 0,
  },
});
