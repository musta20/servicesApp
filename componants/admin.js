import { React , useContext } from "react";
import {BACKE_END_URL} from "@env"

import {
  StyleSheet,
  Platform,
  Dimensions,
  Text,
  Button,
  View,
  TouchableOpacity,
  Image
} from 'react-native';


export default function Admin({ route , navigation}) {


  const { item } = route.params.params
//console.log(`${BACKE_END_URL}/api/showPublicImge/${item.img_id}`)
  
  
  return (
    <View style={stylesList.itemTwoContent}>
      <Image style={stylesList.itemTwoImage} source={{ uri: `${BACKE_END_URL}/api/showPublicImge/${item.img_id}` }} />
      <TouchableOpacity
        key={item.id}
        style={stylesList.userName}
      >
        <Text style={stylesList.itemTwoTitle}>@{item.user.username}</Text>
      </TouchableOpacity>
      <View style={stylesList.itemThreeContent} />



      <Text style={stylesList.itemTwoTitle}>{item.Title}</Text>
      <Text style={stylesList.itemTwoSubTitle}>{item.Description}</Text>
      <Text style={stylesList.itemTwoSubTitle}>{item.Requirement}</Text>
      <Text style={stylesList.itemTwoPrice}>{"55 SAR"}</Text>
      <View style={stylesList.itemThreeMetaContainer}>
          
      <Button
          title="طلب الخدمة"

          style={[stylesList.demoButton, {flexBasis: '47%'}]}
          secondary
          bordered
          color={"#198754"}
          rounded
          onPress={() => navigation.navigate('Order' ,{params: { item }})}
          />

                </View>
            
    </View>

  );
}






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
    //   backgroundColor:"#fff"
    //  height: 300,
  },
  itemTwoTitle: {
    color: '#4a4946',
    //fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: '#4a4946',
    //fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: '#4a4946',
    //fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },
  itemTwoImage: {
    position: 'absolute',
    height: 300,
    // width:300,
    resizeMode: 'stretch',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    //  position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    color: "#4a4946"
    //  backgroundColor: '#6271da',
    //opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderBottomColor: "#f1f1f1"
  },
  itemThreeSubContainer: {
    margin: 3,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    //   flex: 1,
    marginTop: 310,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
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
    backgroundColor: '#5f5f5f',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});
