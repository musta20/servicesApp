
import fetcher from "../model/fetcher";
import { useState, useEffect , useContext} from "react";
import useSWR from "swr";
import Axios from 'axios'
//import FileDownload from 'js-file-download';
import { AuthContext } from "./context/AuthContext";

import {
  Text,
  View,
  Pressable,
  SafeAreaView,
  Image,
} from "react-native";
import { FlatGrid } from 'react-native-super-grid';

import { stylesList, styles } from "./Style/Global.Style";


export default function FilesManger({ selection, closeMdeol , setModalVisible}) {

  //const [cookies] = useCookies(['Jwt']);
  const authContext = useContext(AuthContext);

  const [select, setSelected] = useState(0);

  const [AlertMesssage, setAlertMesssage] = useState([null, ""])

  const [allimges, setallimgesFile] = useState([])

  const { files, isLoding } = getFiles(authContext.authState.accessToken)
  const [currentFile, setcurrentFile] = useState(0);


  //useEffect(() => {

   // setallimgesFile(files)

 // }, [files])


  const displayClass = (id) => {


    if (selection) return 'col select'

    if (id == select) return 'col selected'

    return 'col select'

  }

  const deleteimge = (id) => {

    fetcher({
      url: '/api/UploadedFile',
      method: 'DELETE',
      data: { id: id, Jwt: cookies.Jwt }
    })
      .then(e => {


        let arry = [...allimges]
        let newarry = arry.filter(i => i.id !== id)

        setallimgesFile(newarry)
        setAlertMesssage([true, e])
        document.documentElement.scrollTop = 0;


      })
      .catch(e => {
      //  console.log(e)
        setAlertMesssage([false, e.response.data])
        document.documentElement.scrollTop = 0;
      })

  }



  const Download = (id, name) => {
    Axios({
      url: `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/downloadImge/${id}`,
      method: 'GET',
      responseType: 'blob', // Important
      headers: { "Authorization": "Bearer " + cookies.Jwt },


    }).then((response) => {

      FileDownload(response.data, name);

      setAlertMesssage([true, 'جاري تحميل الملف'])
      document.documentElement.scrollTop = 0;

    }).catch(err => {
     // console.log(err)
      setAlertMesssage([false, 'حدث خطاء الرجاء المحاولة لاحقا'])
      document.documentElement.scrollTop = 0;
    });

  }


 

  const UploadFile = async (event) => {

    const photoFormData = new FormData();

    photoFormData.append("file", event.target.files[0]);



    await fetcher({
      url: '/api/FileUpload', method: "POST_FILE", data: {
        body: photoFormData,
        Jwt: cookies.Jwt
      }

    }).then(ret => {
      setAlertMesssage([true, 'نم تحميل الملف'])
      document.documentElement.scrollTop = 0;


    }).catch(err => {
    //  console.log(err.response)
      try {
        setAlertMesssage([false, Object.values(err.response.data.errors).flat()])

      }
      catch (e) {
        setAlertMesssage([false, "حدث خطاء الرجاء المحاولة لاحقا"])

      }

      document.documentElement.scrollTop = 0;

    })
  }

  const FileInputs = ({ item }) => {
    return (
      <View style={stylesList.smallImge}>
        <Pressable
        onPress={() =>{setModalVisible(false);
          closeMdeol(item.id) }}

        >
        <Image source={{ uri: item.imge }} style={stylesList.itemThreeImage} />


        </Pressable>

      </View>
    );
  };



  if (isLoding) {
    return <View>
<Text>Loding</Text>
    </View>
     
  }


  const RenderItem = ({ item }) => {
    return <FileInputs item={item} />;
  };




  return (
    <View>
          <SafeAreaView>

            {files ? 
           
           <FlatGrid
           itemDimension={60}
           data={files}
           renderItem={RenderItem}
         />
       /*     
           <FlatList
              data={files}
              renderItem={RenderItem}
              keyExtractor={(item) => item.id}
            /> */
            :null

            }
          </SafeAreaView>
  
       </View>
)
}

const getFiles = (jwt) => {
  const { data, error } = useSWR({ url: '/api/FileUpload', method: 'GET', data: { Jwt: jwt } }, fetcher);
  //console.log(data)
  return {
    files: data,
    // isLoding:true,
    isLoding: !data && !error,
    isErorr: error
  }

}

