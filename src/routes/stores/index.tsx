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

interface StoreImage {
  logo: string;
}

interface Item {
  storeName: string;
  storeID: string;
  isActive: number;
  images: StoreImage;
}

interface DealItem {
  item: Item;
  navigation: any;
}

const Item = ({item, navigation}: DealItem) => {
  const [deals, setDeals] = useState([]);

  const fetchData = useCallback(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?storeID=${item.storeID}`)
      .then((response) => response.json())
      .then((json) => {
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
        <Text>{deals.length === 60 ? '60+' : deals.length} Deals</Text>
      </View>
      <TouchableOpacity
        onPress={() =>
          navigation.navigate('StoreDeals', {storeID: item.storeID})
        }>
        <Text style={styles.button}>View More</Text>
      </TouchableOpacity>
    </View>
  );
};

function Stores({navigation}: DetailsProps) {
  const [stores, setStores] = useState([]);
  const [search, setSearch] = useState<string>('');
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

  const handleSearchInput = (evt: string) => {
    setSearch(evt);
  };
  if (stores.length) {
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
        <FlatList<Item>
          data={stores.filter((store: Item) => {
            if (search !== '' && search !== undefined) {
              return store.isActive === 1 && store.storeName.includes(search);
            }
            return store.isActive === 1;
          })}
          renderItem={(item) => (
            <Item item={item.item} navigation={navigation} />
          )}
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
