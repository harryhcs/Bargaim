import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type DealsStackParamList = {
  Deals: undefined;
  Details: {dealID: string};
};

export type DealsScreenRouteProp = RouteProp<DealsStackParamList, 'Details'>;

export type DealsScreenNavigationProp = StackNavigationProp<
  DealsStackParamList,
  'Deals'
>;

export type StoreStackParamList = {
  Stores: undefined;
  StoreDeals: {storeID: string};
};

export type StoresScreenRouteProp = RouteProp<
  StoreStackParamList,
  'StoreDeals'
>;

export type StoresScreenNavigationProp = StackNavigationProp<
  StoreStackParamList,
  'StoreDeals'
>;

export type DetailsProps = {
  route: DealsScreenRouteProp;
  navigation: DealsScreenNavigationProp;
};

export type StoreProps = {
  route: StoresScreenRouteProp;
  navigation: StoresScreenNavigationProp;
};
