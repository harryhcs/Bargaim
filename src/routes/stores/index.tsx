import React from 'react';
import {Text, View, StatusBar, StyleSheet} from 'react-native';

const Stores = () => {
  return (
    <View style={styles.root}>
      <Text>Stores</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  root: {
    marginTop: StatusBar.currentHeight || 0,
    flex: 1,
    justifyContent: 'center',
  },
});

export default Stores;
