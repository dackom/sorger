/* eslint-disable react-native/no-inline-styles */
import React, {useContext, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import AppContext from '../context';

export default function DetailScreen({route, navigation}) {
  const {list, findKey, updateTask, toggleCompleted} = useContext(AppContext);
  const item = list[findKey(route.params.item.id)];
  const [content, setContent] = useState(item.content || '');
  const [priority, setPriority] = useState(item.priority || 1);
  const [saving, setSaving] = useState(false);

  const save = async () => {
    setSaving(true);
    await updateTask(item.id, content, priority);
    setSaving(false);
    navigation.goBack();
  };

  return (
    <View style={{margin: 10}}>
      <Text>Content:</Text>
      <TextInput
        value={content}
        style={{
          borderColor: '#CCC',
          borderWidth: 1,
          padding: 10,
          borderRadius: 4,
        }}
        onChangeText={e => setContent(e)}
      />
      <Text style={{marginTop: 10}}>Priority:</Text>
      <TextInput
        value={String(priority)}
        style={{
          borderColor: '#CCC',
          borderWidth: 1,
          padding: 10,
          borderRadius: 4,
        }}
        onChangeText={e => setPriority(e)}
      />
      <Text style={{marginTop: 10}}>Due date:</Text>
      <TextInput
        value={String(item.due?.date ?? '')}
        style={{
          borderColor: '#CCC',
          borderWidth: 1,
          padding: 10,
          borderRadius: 4,
          color: '#AAA',
        }}
        editable={false}
      />
      <TouchableHighlight
        style={[
          styles.button,
          {
            opacity:
              (content === item.content && priority === item.priority) || saving
                ? 0.5
                : 1,
          },
        ]}
        disabled={
          (content === item.content && priority === item.priority) || saving
        }
        onPress={() => save()}>
        {saving ? (
          <ActivityIndicator color={'#FFF'} />
        ) : (
          <Text style={{color: '#FFF', textAlign: 'center'}}>Save changes</Text>
        )}
      </TouchableHighlight>

      <TouchableHighlight
        style={[
          styles.button,
          {backgroundColor: item.completed ? 'red' : 'green'},
        ]}
        onPress={() => toggleCompleted(item.id)}>
        <Text style={{color: '#FFF', textAlign: 'center'}}>
          {item.completed ? 'Reopen task' : 'Close task'}
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF6666',
    padding: 10,
    marginTop: 20,
    borderRadius: 4,
  },
});
