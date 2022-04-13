
import React from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
  stretch: {
    width: 150,
    height: 200,
    resizeMode: 'stretch',
  },
});

const LoadImge = ({src}) => {
  return (
    <View style={styles.container}>
      <Image
        style={styles.stretch}
        source={{
          uri:src}}
      />
    </View>
  );
}

export default LoadImge;