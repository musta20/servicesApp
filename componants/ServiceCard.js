import React from "react";
import { StyleSheet, Text, View, SafeAreaView, FlatList, StatusBar } from "react-native";
import LoadImge from "./LoadImge";

const URL = 'http://127.0.0.1:8000';


const Item = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title}>{item.Title}</Text>
      <LoadImge 
            src={`http://127.0.0.1:8000/api/showPublicImge/${item.img_id}`}

      ></LoadImge>
    </View>
  );
  const renderItem = ({ item }) => (
    <Item item={item} />
  );

const ServiceCard = ({data}) => {

   return <SafeAreaView style={styles.container}>

      <FlatList
        data={data}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      />
    </SafeAreaView>

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    flex: 0.5,
    backgroundColor: "#f1f1f1",
    borderWidth: 1,
  },
  header: {
    fontSize: 32,
    backgroundColor: "#fff"
  },
  title: {
    fontSize: 24
  }
});

export default ServiceCard;