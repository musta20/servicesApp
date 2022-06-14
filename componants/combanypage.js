import { React , useContext } from "react";
import { stylesList } from "./Style/Global.Style";
import {BACKE_END_URL} from "@env"


import {
  Text,
  Button,
  View,
  TouchableOpacity,
  Image,
  FlatList
} from 'react-native';
import useSWR from "swr";
import fetcher from "../model/fetcher";


export default function Combanypage({ route }) {


  const { item } = route.params.params
  const { services } = getServices(item.id);
  const RenderRowThree = ({ item }) => {
    //console.log(`${BACKE_END_URL}/api/showPublicImge/${item.img_id}`)
        return <TouchableOpacity
          key={item.id}
          style={stylesList.itemThreeContainer}
        //  onPress={() => openArticle(item)}
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
      
  
  return (
    <View style={stylesList.itemTwoContent}>
      <Image style={stylesList.itemTwoImage} source={{ uri: `${BACKE_END_URL}/api/showPublicImge/${item.img_id}` }} />
      <TouchableOpacity
        key={item.id}
        style={stylesList.userName}
      >
        <Text style={stylesList.itemTwoTitle}>@{item.username}</Text>
      </TouchableOpacity>
      <View style={stylesList.itemThreeContent} />



      <Text style={stylesList.itemTwoTitle}>{item.name}</Text>
      <Text style={stylesList.itemTwoSubTitle}>{item.des}</Text>
      <Text style={stylesList.itemTwoSubTitle}>{item.des}</Text>
      <Text style={stylesList.itemTwoPrice}>{"55 SAR"}</Text>
          
     <FlatList
     
     data={services}
     keyExtractor={item=>item.id}
     renderItem={RenderRowThree}
     ></FlatList>

            
    </View>

  );
}



function getServices(id) {
    const { data, error } = useSWR({ url: '/api/showServicesBycompany', method: 'SHOW', data: { id } }, fetcher);
    return {
      services: data,
      isLoding: !data && !error,
      isErorr: error
    }
  
  }
  