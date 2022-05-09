/* eslint-disable react-native/no-inline-styles */
import React, {useState, useContext} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  TextInput,
  ActivityIndicator,
} from 'react-native';
import AppContext from '../context';

export default function AddScreen({navigation}) {
  const [content, setContent] = useState('');
  const [dueString, setDueString] = useState('tomorrow at 12:00');
  const [priority, setPriority] = useState(1);
  const [saving, setSaving] = useState(false);
  const {addTask} = useContext(AppContext);

  const save = async () => {
    setSaving(true);
    await addTask({
      content,
      priority,
      dueString,
      dueLang: 'en',
    });
    setSaving(false);
    navigation.goBack();
  };

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <TouchableHighlight onPress={() => navigation.goBack()}>
          <Text style={{color: 'blue'}}>Cancel</Text>
        </TouchableHighlight>
      ),
    });
  }, [navigation]);

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
      <Text style={{marginTop: 10}}>Due String:</Text>
      <TextInput
        value={dueString}
        style={{
          borderColor: '#CCC',
          borderWidth: 1,
          padding: 10,
          borderRadius: 4,
        }}
        onChangeText={e => setDueString(e)}
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
      <TouchableHighlight
        style={{
          backgroundColor: '#FF6666',
          padding: 10,
          marginTop: 20,
          borderRadius: 4,
          opacity: !content ? 0.5 : 1,
        }}
        disabled={!content || saving}
        onPress={() => save()}>
        {saving ? (
          <ActivityIndicator color={'#FFF'} />
        ) : (
          <Text style={{color: '#FFF', textAlign: 'center'}}>Add item</Text>
        )}
      </TouchableHighlight>
    </View>
  );
}
