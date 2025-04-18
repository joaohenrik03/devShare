import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import { Home } from "../pages/Home";
import { Profile } from "../pages/Profile";
import { NewPost } from "../pages/NewPost";
import { PostsUser } from "../pages/PostsUser";
import { Search } from "../pages/Search";

import Feather from 'react-native-vector-icons/Feather';

const BottomTab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function AppRoutesStack() {
  return (
    <Stack.Navigator>
      <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{
          headerShown: false
        }}
      />
      <Stack.Screen 
        name="NewPost" 
        component={NewPost} 
        options={{
          title: 'Novo post',
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#36393f'
          }
        }}
      />
      <Stack.Screen
        name="PostsUser"
        component={PostsUser}
        options={{
          headerTintColor: '#FFF',
          headerStyle: {
            backgroundColor: '#36393f'
          }
        }}
      />
    </Stack.Navigator>
  )
}

export function AppRoutes() {
  return (
    <BottomTab.Navigator screenOptions={{
      headerShown: false,
      tabBarShowLabel: false,
      tabBarHideOnKeyboard: true,
      tabBarActiveTintColor: '#00B37E',
      tabBarStyle: {
        borderTopWidth: 0,
        backgroundColor: '#323238'
      },
    }}>
      <BottomTab.Screen 
        name="HomeTab" 
        component={AppRoutesStack} 
        options={{
          tabBarIcon: ({color, size}) => <Feather color={color} name="home" size={size} />
        }}
      />
      <BottomTab.Screen 
        name="Search" 
        component={Search} 
        options={{
          tabBarIcon: ({color, size}) => <Feather color={color} name="search" size={size} />
        }}
      />
      <BottomTab.Screen 
        name="Profile" 
        component={Profile} 
        options={{
          tabBarIcon: ({color, size}) => <Feather color={color} name="user" size={size} />
        }}
      />
    </BottomTab.Navigator>
  )
}
