import { Text, View, TextInput, StyleSheet , Button} from "react-native";
import { React, useState, useContext } from "react";

import { AuthContext } from "../componants/context/AuthContext";
//import * as Keychain from "react-native-keychain";
import { AxiosContext } from "../componants/context/AxiosContext";
import * as SecureStore from 'expo-secure-store';


export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setpassword] = useState('');
  const authContext = useContext(AuthContext);
  const { publicAxios } = useContext(AxiosContext);

  const onLogin = async () => {
    try {
      
      const response = await publicAxios.post("/LoginApp", {
        username,
        password,
      });
      console.log("THE ERRORR FIRED");

      console.log(response.data);

      const { accessToken, refreshToken } = response.data;

      authContext.setAuthState({
        accessToken,
        refreshToken,
        authenticated: true,
      });

      await SecureStore.setItemAsync(
        "token",
        JSON.stringify({
          accessToken,
          refreshToken,
        })
      );
    } catch (error) {
        console.error(error)
    }
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <View>
        <Text>تسجيل الدخول!</Text>
        <TextInput
        style={styles.input}
        placeholder="اسم المستخدم"
        onChangeText={newText => setUsername(newText)}
        defaultValue={username}
      />
          <TextInput
                  style={styles.input}

        placeholder="كلمة المرور"
        onChangeText={newText => setpassword(newText)}
        defaultValue={password}
      />
      </View>
      <Button
          title="تسجيل الدخول"

          secondary
          bordered
          color={"#198754"}
          rounded
          onPress={() => onLogin()}
          />



    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
