import { Text, View ,SafeAreaView , FlatList, Button} from 'react-native';
import  {React, useContext} from 'react';
import { AuthContext } from "./context/AuthContext";

import {styles , stylesList} from "./Style/Global.Style"
import { useNavigation } from '@react-navigation/native';


  import useSWR from "swr";
import fetcher from "../model/fetcher";
export default function Like() {
  const authContext = useContext(AuthContext);

  const navigation = useNavigation();

  const { follows } = getFollows(authContext.authState.accessToken);


  const RenderItem = ({item}) =>{
   return <View>
      <Text>{item.username}</Text>
      <Text>{item.name}</Text>
      <Text>{item.des}</Text>


          
      <Button
          title={item.username}

          style={[stylesList.demoButton, {flexBasis: '47%'}]}
          secondary
          bordered
          color={"#198754"}
          rounded
          onPress={() => navigation.navigate('Combanypage' ,{params: { item }})}
          />
     
    </View>
  }

  
  return <SafeAreaView style={styles.container} ><View>
{!follows ? <Text>no likes</Text>:

<FlatList
data={follows}
renderItem={RenderItem}
keyExtractor={item => item.id}
></FlatList>
}
  
      

</View>
</SafeAreaView>
  
}

const getFollows = (Jwt) => {
  const { data, error } = useSWR({ url: '/api/Follow', method: "GET", data: { Jwt: Jwt } }, fetcher);
  console.log(data)
  console.log(Jwt)
  return { 
    follows: data ,
    isLoading: !data && !error,
    error:error
  };

}

