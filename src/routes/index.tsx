import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {DetailsStackParamList} from './types';
import DealsScreen from './deals/all';
import DetailScreen from './deals/details';
import StoresScreen from './stores';

const Tab = createBottomTabNavigator();
const Stack = createStackNavigator<DetailsStackParamList>();

const DetailsStackNavigator = () => (
  <Stack.Navigator>
    <Stack.Screen
      name="Deals"
      component={DealsScreen}
      options={{title: 'The Best Deals'}}
    />
    <Stack.Screen
      name="Details"
      component={DetailScreen}
      initialParams={{dealID: '1'}}
    />
  </Stack.Navigator>
);

function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Deals" component={DetailsStackNavigator} />
        <Tab.Screen name="Stores" component={StoresScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Router;
