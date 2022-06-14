import { React , useContext } from "react";
import {BACKE_END_URL} from "@env"
import { stylesList } from "./Style/Global.Style";
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

