import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Profile from "./componants/Profile";
import Home from "./componants/Home";
import Orders from "./componants/Orders";
import Files from "./componants/Files";
import Like from "./componants/Like";

import Icon from 'react-native-vector-icons/FontAwesome';
import { StyleSheet } from "react-native";

//StyleSheet
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'الرئيسية':
              iconName = focused
                ?'md-home-sharp' 
                :'home-outline';
              break;
            case 'بياناتي':
              iconName = focused
                ? 'user-circle'
                : 'user-circle-o';
               return <Icon name={iconName}  size={size} color={color}  />;

              break;
            case 'الطلبات':
              iconName = focused
                ? 'clipboard'
                : 'clipboard-outline';
              break;
            case 'الملفات':
              iconName = focused
                ? 'documents'
                : 'documents-outline';
              break;

            case 'المكاتب المفضلة':
              iconName = focused
                ? 'heart'
                : 'heart-outline';
              break;

            default:
              break;
          }


          // You can return any component that you like here!

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: '#198754',
        tabBarInactiveTintColor: 'gray',
      })}
    >

      <Tab.Screen name="الرئيسية" component={Home} />
      <Tab.Screen name="الطلبات" component={Orders} />
      <Tab.Screen name="الملفات" component={Files} />
      <Tab.Screen name="المكاتب المفضلة" component={Like} />
      <Tab.Screen name="بياناتي" component={Profile} />


    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer style={styles.container.backgroundColor} >

      <MyTabs  />
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
 
    backgroundColor: '#664d03',

  },
  item: {
    backgroundColor: "#f1f1f1",
    padding: 20,
    marginVertical: 8
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});
