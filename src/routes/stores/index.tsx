import React, {useCallback, useEffect, useState} from 'react';
import {
  TextInput,
  Text,
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Image,
} from 'react-native';
import {DetailsProps} from '../types';

interface DealItem {
  item: any;
  navigation: any;
}

const Item = ({item, navigation}: DealItem) => {
  const [deals, setDeals] = useState();

  const fetchData = useCallback(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=${item.storeID}`)
      .then((response) => response.json())
      .then((json) => {
        console.log(json.length)
        setDeals(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [item.storeID]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <View style={styles.item}>
      <Image
        style={styles.banner}
        resizeMode="center"
        source={{uri: `https://www.cheapshark.com${item.images.logo}`}}
      />
      <View>
        <Text style={styles.title}>{item.storeName}</Text>
      </View>
      <View style={styles.priceContainer}>
        <Text>55 Deals</Text>
      </View>
      <TouchableOpacity>
        <Text style={styles.button}>View More</Text>
      </TouchableOpacity>
    </View>
  );
};

function Stores({navigation}: DetailsProps) {
  const [stores, setStores] = useState();
  const [search, setSearch] = useState();
  const fetchData = useCallback(() => {
    fetch('https://www.cheapshark.com/api/1.0/stores')
      .then((response) => response.json())
      .then((json) => {
        setStores(json);
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

  const handleSearchInput = (evt) => {
    setSearch(evt);
  };
  if (stores) {
    return (
      <>
        <View style={styles.filterContainer}>
          <TextInput
            value={search}
            onChangeText={handleSearchInput}
            style={styles.search}
            placeholder="Search stores by name..."
          />
        </View>
        <FlatList
          data={stores.filter((store) => {
            if (search !== '' && search !== undefined) {
              return store.name.includes(search);
            }
            return stores;
          })}
          renderItem={renderItem}
          keyExtractor={(item) => item.storeID}
        />
      </>
    );
  }
  return <Text>Loading...</Text>;
}

const styles = StyleSheet.create({
  banner: {
    height: 150,
    // justifyContent: 'center',
  },
  filterContainer: {
    backgroundColor: '#FBFBFB',
    margin: 10,
    padding: 10,
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
    borderRadius: 10,
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

export default Stores;
