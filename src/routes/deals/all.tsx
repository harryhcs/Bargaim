import React, {useCallback, useEffect, useState} from 'react';
import {
  TextInput,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import {DetailsProps} from '../types';

interface DealItem {
  item: any;
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
  const [deals, setDeals] = useState();
  const fetchData = useCallback(() => {
    fetch('https://www.cheapshark.com/api/1.0/deals')
      .then((response) => response.json())
      .then((json) => {
        setDeals(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const renderItem = ({item}: DealItem) => (
    <Item item={item} navigation={navigation} />
  );

  return (
    <>
      <View>
        <TextInput autoFocus placeholder="Search..." />
      </View>
      <FlatList
        data={deals}
        renderItem={renderItem}
        keyExtractor={(item) => item.dealID}
      />
    </>
  );
}

const styles = StyleSheet.create({
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
