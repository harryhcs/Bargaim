import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {DetailsStackParamList} from './types';
import DealsScreen from './deals/all';
import DetailScreen from './deals/details';
import StoresScreen from './stores';

const Tab = createBottomTabNavigator();
const DealsStack = createStackNavigator<DealsStackParamList>();
const StoreStack = createStackNavigator<DealsStackParamList>();

const DetailsStackNavigator = () => (
  <DealsStack.Navigator>
    <DealsStack.Screen
      name="Deals"
      component={DealsScreen}
      options={{title: 'The Best Deals'}}
    />
    <DealsStack.Screen
      name="Details"
      component={DetailScreen}
      initialParams={{dealID: '1'}}
    />
  </DealsStack.Navigator>
);

const StoreStackNavigator = () => (
  <StoreStack.Navigator>
    <StoreStack.Screen
      name="Stores"
      component={StoresScreen}
      options={{title: 'Stores'}}
    />
    {/* <StoreStack.Screen
      name="Details"
      component={DetailScreen}
      initialParams={{dealID: '1'}}
    /> */}
  </StoreStack.Navigator>
);

function Router() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Deals" component={DetailsStackNavigator} />
        <Tab.Screen name="Stores" component={StoreStackNavigator} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}

export default Router;
