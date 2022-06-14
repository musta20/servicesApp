import { Text, View, SafeAreaView, FlatList, Button } from "react-native";
import { React, useContext, useEffect, useState } from "react";
import useSWR from "swr";
import fetcher from "../model/fetcher";
import { AuthContext } from "./context/AuthContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { stylesList, styles } from "./Style/Global.Style";
import FileDownload from "js-file-download";
import Axios from "axios";
import { useNavigation } from "@react-navigation/native";

export default function Orders() {
  const authContext = useContext(AuthContext);
  const Tab = createMaterialTopTabNavigator();
  const [pre, setPre] = useState([]);
  const { ppre, error } = getRequest({
    Jwt: authContext.authState.accessToken,
  });

  const navigation = useNavigation();


  useEffect(() => {
    setPre(ppre);
  }, [ppre]);

  return (
    <Tab.Navigator>
      <Tab.Screen name=" تحت المعالجة">
        {(props) => <RenderListOrder navigation={navigation} {...props} pre={pre} type={0} />}
      </Tab.Screen>
      <Tab.Screen name=" تمت معالجتها">
        {(props) => <RenderListOrder navigation={navigation} Jwt={authContext.authState.accessToken} {...props} pre={pre} type={1} />}
      </Tab.Screen>
      <Tab.Screen name=" ملغية">
        {(props) => <RenderListOrder navigation={navigation} {...props} pre={pre} type={2} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const RenderListOrder = ({ pre, type , Jwt , navigation}) => {
  const showOredersArr = showOreders(pre, type);
  if (!showOredersArr)
    return (
      <View>
        <Text>لا يوجد طلبات</Text>
      </View>
    );

  return (
    <View>
      <RequstCard navigation={navigation} Jwt={Jwt} order={showOredersArr.reverse()}></RequstCard>
    </View>
  );
};

function RequstCard({ order , Jwt , navigation}) {
  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={order}
          renderItem={({item})=><View>
          <Text>{item.id}#</Text>
    
          <Text>الخدمة: {item.service.Title}</Text>
    
          <Text>مقدم الخدمة :{item.combany.name}</Text>
    
          <Text>
            تاريخ الطلب :<ShowDate time={item.created_at}></ShowDate>
          </Text>
    
          <View>
            <View>
              <Text>{item.isDone}</Text>
              <Text>تفاصيل إضافية : {item.Request_des}</Text>
              <View style={stylesList.demoButtonGG}>
                <View>
                  {!item.AlertMesssage ? (
                    <View style={stylesList.demoButtonGGInsede}>
                      <Button
                        secondary
                        bordered
                        color={"#198754"}
                        rounded
                        onPress={() => navigation.navigate("MessageBox", { params:item})}
                        title="الرسائل"
                      ></Button>
                    </View>
                  ) : null}
    
                  {item.done_msg ? (
                    <View>
                      <Button title="المرفقات"> </Button>
                      <View>
                        <View>
                          <Text>{item.done_msg}</Text>
                          {item.done_img ? (
                            <Button
                              onPress={() =>
                                Download(
                                  item.done_imge.id,
                                  item.done_imge.File_name,
                                  Jwt
                                )
                              }
                              title="تحميل"
                            ></Button>
                          ) : null}
                        </View>
                      </View>
                    </View>
                  ) : null}
                </View>
              </View>
            </View>
          </View>
        </View>}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}


const showOreders = (data, ordertype) => {
  if (!data) return false;
  let arr = data.filter((item) => item.isDone === ordertype);
  if (arr.length == 0) return false;
  return arr;
};

const getRequest = (props) => {
  useSWR(
    {
      url: "/api/isViewedRequests",
      method: "GET",
      data: props,
    },
    fetcher
  );

  const { data, error } = useSWR(
    { url: "/api/Request", method: "GET", data: props },
    fetcher
  );

  return {
    ppre: data,
    isLoding: !data && !error,
    isErorr: error,
  };
};

const ShowDate = ({ time }) => {
  const t = time.split(/[- T:]/);

  var final = new Date(Date.UTC(t[0], t[1], t[2], 0, 0, 0));
  var month = final.getUTCMonth(); //months from 1-12
  var day = final.getUTCDate();
  var year = final.getUTCFullYear();

  return <Text>{year + "/" + month + "/" + day}</Text>;
};
const Download = (id, name, Jwt) => {
  //console.log(id)
  //console.log(name)
  Axios({
    url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/downloadImge/${id}`,
    method: "GET",
    responseType: "blob", // Important
    headers: { Authorization: "Bearer " + Jwt },
  })
    .then((response) => {
      FileDownload(response.data, name);

      //    setAlertMesssage([true, 'جاري تحميل الملف'])
     // document.documentElement.scrollTop = 0;
    })
    .catch((err) => {
      //console.log(err)
      //  setAlertMesssage([false, 'حدث خطاء الرجاء المحاولة لاحقا'])
      //document.documentElement.scrollTop = 0;
    });
};
