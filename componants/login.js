import { Text, View, TextInput, StyleSheet } from 'react-native';
import { React, useState } from 'react';
import { Button } from 'react-native-web';
import fetcher from '../model/fetcher';
import { useAuth } from "../model/hooks/auth";

import {AuthContext} from '../componants/context/AuthContext'
import * as Keychain from 'react-native-keychain';
import {AxiosContext} from '../componants/context/AxiosContext';

import axios from 'axios';

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setpassword] = useState('')
    const [isLoding, setIsLoding] = useState(false);
    const [errors, setErros] = useState(null);

    const [loadPageData, setloadPageData] = useState(true);

    //const [cookies] = useCookies(['Jwt']);

    //const { setSession, reRoute } = useAuth({ onlyAdmin: null, setloadPageData: setloadPageData })


    const authContext = useContext(AuthContext);
    const {publicAxios} = useContext(AxiosContext);

    const onLogin = async () => {
        try {
          const response = await publicAxios.post('/LoginApp', {
            username,
            password,
          });
    
          const {accessToken, refreshToken} = response.data;
          authContext.setAuthState({
            accessToken,
            refreshToken,
            authenticated: true,
          });


          await Keychain.setGenericPassword(
            'token',
            JSON.stringify({
              accessToken,
              refreshToken,
            }),
          );
        } catch (error) {
          Alert.alert('Login Failed', error.response.data.message);
        }
      };
    












    const LoginUser = async () => {
        //   event.preventDefault();

        if (!username || !password) return setErros('الرجاء تعبئة  البيانات')
        srcf();
        setIsLoding(true)
        await fetcher(
            {
                url: '/api/Login',
                method: 'POST',
                data: { username, password }
            })
            .then(async ({ data }) => {

                setIsLoding(false)
                await setSession(data)
                // setCookie('Jwt', data.Jwt, { path: '/' });
                // setCookie('UserData', data.UserData, { path: '/' });
                //  if()
                reRoute(data.UserData)
                //  router.push('/profile')
            })
            .catch(err => {
                setIsLoding(false)
                console.log(err)
                setErros(err.response.data)
                // setErros(Object.values(err.response.data).flat())

            })


    }

    return (
        <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>تسجيل الدخول!</Text>
            {errors ? <Text style={{ color: "#eb4034" }}>{errors}</Text> : ""}


            <TextInput
                style={styles.input}
                onChangeText={setUsername}
                value={username}
                placeholder="اسم المستخدم"

            />
            <TextInput
                style={styles.input}
                onChangeText={setpassword}
                value={password}
                placeholder="كلمة المرور"
            //  keyboardType="numeric"
            />
            <Button title="دخول"
                onPress={() => LoginUser()}

            ></Button>
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
var srcf = async () => await axios.get('http://127.0.0.1:8000/sanctum/csrf-cookie');
