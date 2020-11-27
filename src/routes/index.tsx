import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

import {DealsStackParamList, StoreStackParamList} from './types';
import DealsScreen from './deals/all';
import DetailScreen from './deals/details';
import StoresScreen from './stores';
import StoreDealsScreen from './stores/deals';

const Tab = createBottomTabNavigator();
const DealsStack = createStackNavigator<DealsStackParamList>();
const StoreStack = createStackNavigator<StoreStackParamList>();

const DetailsStackNavigator = () => (
  <DealsStack.Navigator>
    <DealsStack.Screen
      name="Deals"
      component={DealsScreen}
      options={{title: 'Deals'}}
    />
    <DealsStack.Screen name="Details" component={DetailScreen} />
  </DealsStack.Navigator>
);

const StoreStackNavigator = () => (
  <StoreStack.Navigator>
    <StoreStack.Screen
      name="Stores"
      component={StoresScreen}
      options={{title: 'Stores'}}
    />
    <StoreStack.Screen
      name="StoreDeals"
      options={{title: 'Store Deals'}}
      component={StoreDealsScreen}
    />
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
