import React, {useEffect, useState} from 'react';
import {
  TextInput,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Switch,
} from 'react-native';
import axios from 'axios';

import {DetailsProps} from '../types';

interface Item {
  title: string;
  isOnSale: string;
  normalPrice: number;
  salePrice: number;
  dealID: string;
}

interface DealItem {
  item: Item;
  navigation: any;
}

const Item = ({item, navigation}: DealItem) => (
  <View style={styles.item}>
    <View>
      <Text style={styles.title}>{item.title}</Text>
    </View>
    <View style={styles.priceContainer}>
      <Text
        style={[
          styles.normalPrice,
          item.isOnSale === '1' ? styles.onSale : null,
        ]}>
        ${item.normalPrice}{' '}
      </Text>
      {item.isOnSale && (
        <Text style={styles.specialPrice}>${item.salePrice}</Text>
      )}
    </View>
    <TouchableOpacity
      onPress={() => navigation.navigate('Details', {dealID: item.dealID})}>
      <Text style={styles.button}>View More</Text>
    </TouchableOpacity>
  </View>
);

function AllDeals({navigation}: DetailsProps) {
  const [deals, setDeals] = React.useState([]);
  const [search, setSearch] = useState<string>('');
  const [onSale, setOnSale] = useState('1');

  const getDeals = async () => {
    const response = await axios.get(
      'https://www.cheapshark.com/api/1.0/deals',
    );
    const data = await response.data;
    setDeals(data);
  };

  useEffect(() => {
    getDeals();
  }, []);

  const handleSearchInput = (evt: string) => {
    setSearch(evt);
  };
  if (deals.length) {
    return (
      <>
        <View style={styles.filterContainer}>
          <TextInput
            value={search}
            onChangeText={handleSearchInput}
            style={styles.search}
            placeholder="Search deals by name..."
          />
          <View style={styles.switchContainer}>
            <Text>On Sale </Text>
            <Switch
              onValueChange={() => setOnSale(onSale === '1' ? '0' : '1')}
              value={onSale === '1'}
            />
          </View>
        </View>
        <FlatList<Item>
          data={deals.filter((deal: Item) => {
            if (search !== '' && search !== undefined) {
              return deal.isOnSale === onSale && deal.title.includes(search);
            }
            return deal.isOnSale === onSale;
          })}
          renderItem={(item) => (
            <Item item={item.item} navigation={navigation} />
          )}
          keyExtractor={(item) => item.dealID}
        />
      </>
    );
  }
  return <Text>Loading...</Text>;
}

const styles = StyleSheet.create({
  filterContainer: {
    backgroundColor: '#FBFBFB',
    margin: 10,
    padding: 10,
  },
  switchContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },
  search: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#DBE2EA',
  },
  item: {
    backgroundColor: '#FBFBFB',
    padding: 20,
    margin: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: '700',
    marginBottom: 15,
  },
  priceContainer: {
    marginBottom: 40,
    flexDirection: 'row',
  },
  onSale: {
    textDecorationLine: 'line-through',
    textDecorationStyle: 'solid',
  },
  normalPrice: {},
  specialPrice: {
    color: '#50A892',
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderColor: '#2C2738',
    borderWidth: 1,
    borderRadius: 6,
    width: 160,
    justifyContent: 'center',
  },
});

export default AllDeals;
