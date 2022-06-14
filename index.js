import React, { useCallback, useContext, useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Ionicons from "react-native-vector-icons/Ionicons";
import Profile from "./componants/Profile";
import Home from "./componants/Home";
import Orders from "./componants/Orders";
import Files from "./componants/Files";
import Like from "./componants/Like";
import Admin from "./componants/admin";
import Combanypage from "./componants/combanypage";
//import * as Keychain from 'react-native-keychain';
import * as SecureStore from 'expo-secure-store';

import { createStackNavigator } from "@react-navigation/stack";

import { AuthContext } from "./componants/context/AuthContext";

import Icon from "react-native-vector-icons/FontAwesome";
import { StyleSheet, View, Text } from "react-native";
import Order from "./componants/PostOrder";
import Login from "./componants/login";

//StyleSheet
const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case "الرئيسية":
              iconName = focused ? "md-home-sharp" : "home-outline";
              break;
            case "بياناتي":
              iconName = focused ? "user-circle" : "user-circle-o";
              return <Icon name={iconName} size={size} color={color} />;

              break;
            case "الطلبات":
              iconName = focused ? "clipboard" : "clipboard-outline";
              break;
            case "الملفات":
              iconName = focused ? "documents" : "documents-outline";
              break;

            case "المكاتب المفضلة":
              iconName = focused ? "heart" : "heart-outline";
              break;

            default:
              break;
          }

          // You can return any component that you like here!

          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: "#198754",
        tabBarInactiveTintColor: "gray",
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
const Stack = createStackNavigator();

export default function Index() {
  const authContext = useContext(AuthContext);
  const [status, setStatus] = useState("loading");

  const loadJWT = useCallback(async () => {
    try {
      const value = await SecureStore.getItemAsync('token');
      const jwt = JSON.parse(value);


console.log(value)
      authContext.setAuthState({
        accessToken: jwt.accessToken || null,
        refreshToken: jwt.refreshToken || null,
        authenticated: jwt.accessToken !== null,
      });

      setStatus("success");
    } catch (error) {
      setStatus("error");
      console.log(`Keychain Error: ${error.message}`);
      authContext.setAuthState({
        accessToken: null,
        refreshToken: null,
        authenticated: false,
      });
    }
  }, []);

  useEffect(() => {
    loadJWT();
  }, [loadJWT]);


  return <NavigationContainer style={styles.container.backgroundColor}>
      <Stack.Navigator>

        {authContext?.authState?.authenticated === false ? (<Stack.Screen name="Login" component={Login} />
):
        
      (
        <>
        <Stack.Screen
          options={{ headerShown: false }}
          name="MyTabs"
          component={MyTabs}

        />

        <Stack.Screen name="Admin" component={Admin} />
        <Stack.Screen name="Order" component={Order} />
        <Stack.Screen name="Combanypage" component={Combanypage} />
        </>
        )
      }


      </Stack.Navigator>
    </NavigationContainer>
 // } else{

 //   return <Login />
  
 //   } 
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#664d03",
  },
  item: {
    backgroundColor: "#f1f1f1",
    padding: 20,
    marginVertical: 8,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff",
  },
  title: {
    fontSize: 24,
  },
});


//#php artisan serve --host=192.168.43.222 --port=8000