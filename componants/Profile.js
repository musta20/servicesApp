import { useEffect, useState , useContext } from "react"
import { AuthContext } from "./context/AuthContext";
import useSWR from "swr"
import fetcher from "../model/fetcher";
import {
  Text,
  Button,
  View,
  TextInput
} from "react-native";
export default function Profile() {

  const [name, setname] = useState()
  const [username, setusername] = useState('')
  const [password, setpassword] = useState('')
  const [repassword, setrepassword] = useState('')

  const authContext = useContext(AuthContext);

  const [isLoding, setIsLoding] = useState(false)
  const [AlertMesssage, setAlertMesssage] = useState([null, ""])

  const [filederr, setFiledsErrors] = useState(
    {
      name: '',
      username: '',
      password: '',
    })


  const { user, isInfoLoding } = getMyInfo(authContext.authState.accessToken);




  const updateUserInfo = (e) => {
    e.preventDefault()
    setIsLoding(true)

    let cc = { ...filederr }

    for (const i in cc) {
      cc[i] = ""
    }

    if (!name) cc.name = "اسم المستخدم مطلوب"
    if (!username) cc.username = "رقم الجوال مطلوب "

    if (password && password !== repassword) cc.password = ' تاكيد كلمة المرور غير مطابق'

    setFiledsErrors(cc)

    if (!name || !username || (password && password !== repassword)) return

    fetcher({
      url: "/api/user", method: "PUT", data: {
        id: 1,
        name: name,
        Jwt: cookies.Jwt,

        username: username,
        password: password,
      }
    })
      .then(res => {

        setIsLoding(false)

        setAlertMesssage([true, 'تم تحديث البيانات'])
        document.documentElement.scrollTop = 0

      })
      .catch(err => {

        let thedataretrv = err.response.data
        for (const property in thedataretrv) {
          cc[property] = thedataretrv[property].toString();
        }

        setFiledsErrors({ ...cc });

        setIsLoding(false)

      })




  }


useEffect(()=>{
  if (user) {
    setusername(user.username);
    setname(user.name)
  }
},[user,AlertMesssage])


  return <View>
    <Text>
    البيانات الشخصية

      </Text>
  

    <View 
      >
      <View>


        <View>
        <Text>(اختياري)</Text>
        <Text>الاسم</Text>
          <TextInput
        onChangeText={setname}
        value={name}
      />

          <View >
            <Text>
            {filederr.name}

            </Text>
          </View>
        </View>

        <View>


<Text> رقم الجوال</Text>
          <TextInput
          
        onChangeText={setusername}
        value={username}
      />
         
         

          <View>
            <Text>
            {filederr.username}

            </Text>
          </View>
        </View>

        <View >
          <Text>كلمة المرور</Text>

          <TextInput
          
          onChangeText={setpassword}
          value={password}
        />
        
        </View>
        <View >
          <Text>كلمة المرور</Text>

          <TextInput
          
          onChangeText={setpassword}
          value={password}
        />
        
        </View>
      </View>

      <Button
            title="حفظ التعديلات"
            onPress={() =>{}}
          ></Button>
    </View>
  </View>

}

const getMyInfo = (jwt) => {
  const { data, error } = useSWR({ url: '/api/user', method: 'GET', data: { Jwt: jwt } }, fetcher);

  return {
    user: data,
    isInfoLoding: !data && !error,
    isErorr: error
  }

}