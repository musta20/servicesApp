import { createStackNavigator } from '@react-navigation/stack';
import Admin from './componants/admin'
import Index from './App'

import { NavigationContainer } from '@react-navigation/native';

export default  function App() {
  const Stack = createStackNavigator();

  return (
    <NavigationContainer>

    <Stack.Navigator>
      <Stack.Screen name="App" component={Index} />
      <Stack.Screen name="Admin" component={Admin} />
    </Stack.Navigator>

    </NavigationContainer>

  );
}