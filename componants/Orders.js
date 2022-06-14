import { Text, View, SafeAreaView, FlatList, Button } from "react-native";
import { React, useContext } from "react";
import useSWR from "swr";
import fetcher from "../model/fetcher";
import { AuthContext } from "./context/AuthContext";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import { useEffect, useState } from "react";
import { stylesList, styles } from "./Style/Global.Style";

export default function Orders() {
  const authContext = useContext(AuthContext);
  const Tab = createMaterialTopTabNavigator();
  const [pre, setPre] = useState([]);
  const { ppre, error } = getRequest({
    Jwt: authContext.authState.accessToken,
  });

  useEffect(() => {
    setPre(ppre);
  }, [ppre]);

  return (
    <Tab.Navigator>
      <Tab.Screen name=" تحت المعالجة">
        {(props) => <RenderListOrder {...props} pre={pre} type={0} />}
      </Tab.Screen>
      <Tab.Screen name=" تمت معالجتها">
        {(props) => <RenderListOrder {...props} pre={pre} type={1} />}
      </Tab.Screen>
      <Tab.Screen name=" ملغية">
        {(props) => <RenderListOrder {...props} pre={pre} type={2} />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

const RenderListOrder = ({ pre, type }) => {
  const showOredersArr = showOreders(pre, type);
  if (!showOredersArr)
    return (
      <View>
        <Text>لا يوجد طلبات</Text>
      </View>
    );

  return (
    <View>
      <RequstCard order={showOredersArr.reverse()}></RequstCard>
    </View>
  );
};

function RequstCard({ order }) {
  return (
    <View>
      <SafeAreaView>
        <FlatList
          data={order}
          renderItem={RenderItem}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    </View>
  );
}

const RenderItem = ({ item }) => {
  return (
    <View>
      <Text>{item.id}#</Text>

      <Text>الخدمة: {item.service.Title}</Text>

      <Text>مقدم الخدمة :{item.combany.name}</Text>

      <Text>
        تاريخ الطلب :<ShowDate time={item.created_at}></ShowDate>
      </Text>

      <View>
        <View>
          <Text>تفاصيل إضافية : {item.Request_des}</Text>
          <View style={stylesList.demoButtonGG}>
            {!item.AlertMesssage ? (
              <View style={stylesList.demoButtonGGInsede}>
                <Button
                  secondary
                  bordered
                  color={"#198754"}
                  rounded
                  onPress={() => {}}
                  title="رسائل"
                ></Button>
              </View>
            ) : null}
            <View style={stylesList.demoButtonGGInsede}>
              <Button
                secondary
                bordered
                style={stylesList.demoButtonGGInsede}
                color={"#0850c4"}
                rounded
                onPress={() => {}}
                title="تعديل الطلب"
              ></Button>
            </View>
          </View>
        </View>
      </View>
    </View>
  );
};

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
