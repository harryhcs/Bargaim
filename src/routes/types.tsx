import {RouteProp} from '@react-navigation/native';
import {StackNavigationProp} from '@react-navigation/stack';

export type DetailsStackParamList = {
  Deals: undefined;
  Details: {dealID: string};
};

export type ProfileScreenRouteProp = RouteProp<
  DetailsStackParamList,
  'Details'
>;

export type ProfileScreenNavigationProp = StackNavigationProp<
  DetailsStackParamList,
  'Deals'
>;

export type DetailsProps = {
  route: ProfileScreenRouteProp;
  navigation: ProfileScreenNavigationProp;
};
