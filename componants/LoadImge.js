
import React from 'react';
import { View, Image } from 'react-native';


const LoadImge = ({src , styles}) => {
  return (
    <View >
      <Image
        style={styles.stretch}
        source={{
          uri:src}}
      />
    </View>
  );
}

export default LoadImge;