import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from '@react-navigation/stack';
import { DETAILS_VIEW_SCREEN, MAIN_DISCOVERY_SCREEN } from '../constants/constant';
import { DetailsViewScreen, MainDiscoveryScreen } from '../screens/home';


const MainStack = createStackNavigator();

const MainNavigator = () => (
  <MainStack.Navigator
    initialRouteName={MAIN_DISCOVERY_SCREEN}
    screenOptions={{
      animationEnabled: Platform.OS === 'ios',
      headerShown: false,
    }}>
    <MainStack.Screen name={MAIN_DISCOVERY_SCREEN} component={MainDiscoveryScreen} />
    <MainStack.Screen name={DETAILS_VIEW_SCREEN} component={DetailsViewScreen} />
  </MainStack.Navigator>
);

export default MainNavigator;
