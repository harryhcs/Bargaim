import React, {useCallback, useEffect, useState} from 'react';
import {
  Text,
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {DetailsProps} from '../types';

interface CheaperStores {
  dealID: string;
  storeID: string;
  salePrice: number;
  name: string;
  retailPrice: number;
}

interface GameInfo {
  name: string;
  retailPrice: number;
  salePrice: number;
  thumb: string;
  storeID: string;
}

interface Store {
  storeID: string;
  storeName: string;
}

interface Deal {
  gameInfo: GameInfo;
  cheaperStores: CheaperStores[];
}

function Details({route, navigation}: DetailsProps) {
  const {dealID} = route.params;
  const [deal, setDeal] = useState<Deal>();
  const [stores, setStores] = useState([]);
  const fetchDeal = useCallback(() => {
    fetch(`https://www.cheapshark.com/api/1.0/deals?id=${dealID}`)
      .then((response) => response.json())
      .then((json) => {
        setDeal(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dealID]);

  const fetchStores = useCallback(() => {
    fetch('https://www.cheapshark.com/api/1.0/stores')
      .then((response) => response.json())
      .then((json) => {
        console.log(json);
        setStores(json);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  useEffect(() => {
    fetchStores();
    fetchDeal();
  }, [fetchDeal, fetchStores]);
  if (deal && stores.length) {
    const findStore: Store = stores.find(
      (store: Store) => store.storeID === deal.gameInfo.storeID,
    ) ?? {storeID: '0', storeName: 'null'};
    return (
      <ScrollView style={styles.root}>
        <Text style={styles.title}>{deal.gameInfo.name}</Text>
        <View style={styles.priceContainer}>
          <Text style={[styles.normalPrice, styles.onSale]}>
            ${deal.gameInfo.retailPrice}{' '}
          </Text>
          <Text style={styles.specialPrice}>${deal.gameInfo.salePrice}</Text>
        </View>
        <Text style={styles.saving}>
          You save $
          {(deal.gameInfo.retailPrice - deal.gameInfo.salePrice).toFixed(2)}
        </Text>
        {findStore.storeID !== '0' ? (
          <Text style={styles.blockTitle}>
            Available at {findStore.storeName}
          </Text>
        ) : null}
        <View>
          <Image
            style={styles.thumb}
            source={{uri: deal.gameInfo.thumb}}
            resizeMode="contain"
          />
        </View>
        <Text style={styles.blockTitle}>Other Deals For This Game</Text>
        {deal.cheaperStores.map((cheaper: CheaperStores) => {
          const findCheaperStore: Store = stores.find(
            (store: Store) => store.storeID === cheaper.storeID,
          ) ?? {storeID: '', storeName: ''};
          return (
            <View style={styles.cheaperContainer} key={cheaper.dealID}>
              <View>
                {findCheaperStore.storeID !== '' ? (
                  <Text style={styles.title}>{findCheaperStore.storeName}</Text>
                ) : null}
                <View style={styles.priceContainer}>
                  <Text style={[styles.normalPrice, styles.onSale]}>
                    ${cheaper.retailPrice}{' '}
                  </Text>
                  <Text style={styles.specialPrice}>${cheaper.salePrice}</Text>
                </View>
              </View>
              <View>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate('Details', {dealID: cheaper.dealID})
                  }>
                  <Text style={styles.button}>View</Text>
                </TouchableOpacity>
              </View>
            </View>
          );
        })}
      </ScrollView>
    );
  }
  return <Text>Loading...</Text>;
}

export default Details;
const styles = StyleSheet.create({
  root: {
    padding: 20,
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
  saving: {
    fontStyle: 'italic',
  },
  thumb: {
    marginVertical: 10,
    height: 200,
  },
  blockTitle: {
    marginVertical: 20,
    backgroundColor: '#F8F8F8',
    padding: 20,
    fontSize: 28,
    fontWeight: '500',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  cheaperContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 40,
  },
  button: {
    paddingTop: 20,
    paddingBottom: 20,
    paddingLeft: 40,
    paddingRight: 40,
    borderColor: '#2C2738',
    borderWidth: 1,
    borderRadius: 6,
    width: 120,
    justifyContent: 'center',
  },
});
