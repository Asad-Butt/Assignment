import React from 'react';
import { Platform, Text, View } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import { DETAILS_VIEW_SCREEN, MAIN_DISCOVERY_SCREEN, FAVORITE_SCREEN } from '../constants/constant';
import { DetailsViewScreen, MainDiscoveryScreen, FavoriteScreen } from '../screens/home';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MainStackNavigator from './MainStackNavigator';
import SearchScreen from '../screens/home/Search/SearchScreen';

const MainStack = createStackNavigator();
const Tab = createBottomTabNavigator();


const HomeScreen = () => (
  <View><Text>Home</Text></View>
)

const Favourites = () => (
  <View><Text>Settings Screen</Text></View>
)

const Profile = () => (
  <View><Text>Profile Screen</Text></View>
)



const MainNavigator = () => (

  <Tab.Navigator screenOptions={{ headerShown: false }}>
    <Tab.Screen name="Home" component={MainStackNavigator} options={{
    }} />
    <Tab.Screen name="Favourites" component={Favourites} />
    <Tab.Screen name="Search" component={SearchScreen} />

    <Tab.Screen name="Profile" component={Profile} />
  </Tab.Navigator>
);

export default MainNavigator;
