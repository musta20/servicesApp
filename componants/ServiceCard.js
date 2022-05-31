import {React , useContext} from "react";
import {DashboardContext} from "./context"
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {BACKE_END_URL} from "@env"

import {
  StyleSheet,
  Platform,
  Dimensions,
  Text,
  View,
  SafeAreaView,
  FlatList,
  TouchableOpacity,
  Image
} from "react-native";
//import LoadImge from "./LoadImge";
console.log(Platform.OS)

//const URL = Platform.OS === 'web' ? 'http://127.0.0.1:8000': 'http://10.0.2.2:8000';
//const URL ='http://10.0.2.2:8000';
 //'http://127.0.0.1:8000';

const ServiceCard = ({ data }) => {
  const Stack = createNativeStackNavigator();


  const { navigation } = useContext(DashboardContext);




  const RenderRowThree = ({ item }) => {
//console.log(`${BACKE_END_URL}/api/showPublicImge/${item.img_id}`)
    return <TouchableOpacity
      key={item.id}
      style={stylesList.itemThreeContainer}
      onPress={() => openArticle(item)}
    >
      <View style={stylesList.itemThreeSubContainer}>
        <Image source={{ uri: `${BACKE_END_URL}/api/showPublicImge/${item.img_id}` }} style={stylesList.itemThreeImage} />
        <View style={stylesList.itemThreeContent}>
          <Text style={stylesList.itemThreeBrand}>{item.user.username}</Text>
          <View>
            <Text style={stylesList.itemThreeTitle}>{item.Title}</Text>
            <Text style={stylesList.itemThreeSubtitle} numberOfLines={1}>
              {item.Description}
            </Text>
          </View>
          <View style={stylesList.itemThreeMetaContainer}>
            {false && (
              <View
                style={[
                  stylesList.badge,
                  item.badge === 'NEW' && { backgroundColor: colors.green },
                ]}
              >
                <Text
                  style={{ fontSize: 10, color: '#e3e3e3' }}
                  styleName="bright"
                >
                  {item.badge}
                </Text>
              </View>
            )}
            <Text style={stylesList.itemThreePrice}>54 sar</Text>
          </View>
        </View>
      </View>
      <View style={stylesList.itemThreeHr} />
    </TouchableOpacity>;
  };
  
  
  
  const renderItem = ({ item }) => (
    <RenderRowThree       
    item={item} />
  );
  
  const openArticle = (item) => {
  
    console.log("open article")
  
    navigation.navigate('Admin' ,{
      params: { item },
    });
//navigation.navigate('App', { screen: 'admin' });

  
  };
  

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
    //paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    backgroundColor: "#ffffff"

  },
  stretch: {
    width: 150,
    height: 200,
    resizeMode: 'stretch',
  },
  item: {
    flex: 0.5,
    backgroundColor: "#f1f1f1",
    borderColor: "#c9c9c9",
    borderWidth: 1,
  },
  header: {
    fontSize: 32
  },
  title: {
    fontSize: 24
  }
});



const stylesList = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
  },
  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneTitle: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneSubTitle: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    height: 150,
  },
  itemTwoTitle: {
    color: '#e3e3e3',
    //fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: '#e3e3e3',
    //fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: '#e3e3e3',
    //fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoImage: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    backgroundColor: '#6271da',
    opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
    borderBottomWidth:3,
    borderBottomColor:"#f1f1f1"
  },
  itemThreeSubContainer: {
    margin:3,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    flex: 1,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },
  itemThreeTitle: {
    //fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor:'#5f5f5f',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});


export default ServiceCard;