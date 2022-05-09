import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ContextProvider from './context/ContextProvider';
import 'react-native-get-random-values';

import TodoList from './screens/TodoList';
import DetailScreen from './screens/DetailScreen';
import AddScreen from './screens/AddScreen';

const Stack = createNativeStackNavigator();

function App() {
  return (
    <ContextProvider>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Group>
            <Stack.Screen name="Todo List" component={TodoList} />
            <Stack.Screen name="Detail" component={DetailScreen} />
          </Stack.Group>
          <Stack.Group screenOptions={{presentation: 'modal'}}>
            <Stack.Screen name="Add Item" component={AddScreen} />
          </Stack.Group>
        </Stack.Navigator>
      </NavigationContainer>
    </ContextProvider>
  );
}

export default App;
