import {
  Text,
  Button,
  View,
  FlatList,
  SafeAreaView,
  Image,
} from "react-native";
import {stylesList , styles} from "./Style/Global.Style"
import * as DocumentPicker from 'expo-document-picker';
//import DocumentPicker from 'react-native-document-picker';

import { React, useState, useEffect , useContext } from "react";
import useSWR from "swr";
import fetcher from "../model/fetcher";

import { AuthContext } from "./context/AuthContext";

export default function Order({ route }) {
  //const [Files, setFile] = useState({});
  const [Files, setFile] = useState({});
  const [FormFiles, setFormFiles] = useState([]);
  const [currentFile, setcurrentFile] = useState(0);
  const [RequestDes, setRequestDes] = useState("");

  const authContext = useContext(AuthContext);

  const { files } = getFiles(authContext.authState.accessToken);

  const { item } = route.params.params;
  const { data } = RequirementUploader(item.id);


  const FileInputs = ({ item }) => {
  return  <View>
      <View>
        {item.is_required ? (
          <Text 
          > * الزامي
          </Text>
        ) : (
          null
        )}
      </View>
      <Text> {item.Title_upload}</Text>
      <View>
        <InputType
          inputid={item.id}
          FormFiles={
            FormFiles[FormFiles.findIndex((ef) => ef.input == item.id)]
          }
            uploadFile={uploadFile}
          allimges={files}
          removeImge={removeImge}
        ></InputType>
        <Button title="إضافة ملف محفوظ"></Button>
      </View>
    </View>;
  };

  const RenderItem = ({ item }) => {
    return <FileInputs item={item} />;
  };

  useEffect(() => {
    const updateForm = [];
    data == undefined
      ? null
      : data.forEach((item, i) => {
          updateForm[i] = {
            input: item.id,
            value: 0,
            name: item.Title_upload,
            is_required: item.is_required,
          };
        });

    setFormFiles(updateForm);
  }, [data]);



const uploadFile = async (inputid)=>{

  const file= await DocumentPicker.getDocumentAsync();

 

  const photoFormData = new FormData();
  
/* lastModified: 1647110165254
lastModifiedDate: Sat Mar 12 2022 21:36:05 GMT+0300 (Arabian Standard Time) {}
name: "944051dYJqNYyFL.__AC_SY300_SX300_QL70_ML2_ (2).jpg"
size: 6539
type: "image/jpeg"
webkitRelativePath: ""
[[Pro */

/* Object {
  "mimeType": "image/jpeg",
  "name": "IMG-20220529-WA0000.jpg",
  "size": 14677,
  "type": "success",
  "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FservicesApp-51d4f529-cd9c-45ec-b4d5-57a80c655ef8/DocumentPicker/ee265f47-b5ab-41bb-941c-75a548c824ef.jpg",
}
*/
let objfile = {
  name: file.name,
  type: file.mimeType,
  size: file.size,

  uri: Platform.OS === 'ios' ? 
       file.uri.replace('file://', '')
       : file.uri,
}

//console.log(' OBJECT FILE TO APPLOAD objfile')
//console.log(objfile)

     photoFormData.append('file',objfile );  

 // photoFormData.append('file', file.file );
 //console.log('photoFormData')
 //console.log(photoFormData)

  await fetcher({
    url: '/api/storeFromApp', method: "POST_FILE", data: {
      body: photoFormData,
      Jwt: authContext.authState.accessToken
    }

  }).then(ret => {
    console.log('THIS IS THE RESOPONE >>>>>>>>>>>>>>>>>>>>>>>>>>')
//console.log(ret)
//return
    files.push(ret.file)

    const updatFile = FormFiles.findIndex(item => item.input == inputid)

    const newupdateForm = [...FormFiles]

    newupdateForm[updatFile].value = ret.file.id

    setFormFiles(newupdateForm)


  }).catch(e=>{
    console.log(e)
  });



}


const removeImge = (indexFilw) => {
  const updatFile = FormFiles.indexOf(indexFilw)

  const newupdateForm = [...FormFiles]

  newupdateForm[updatFile].value = 0

  setFormFiles(newupdateForm)
}



  return (
    <View style={stylesList.itemTwoContent}>
      <View style={stylesList.itemThreeContent} />
      <View><Text style={stylesList.itemTwoTitle}>{item.Title}</Text></View>   
      <View><Text style={stylesList.itemTwoSubTitle}>{item.Requirement}</Text></View> 
      <View><Text style={stylesList.itemTwoPrice}>{"55 SAR"}</Text></View> 
      <View style={stylesList.itemThreeMetaContainer}>
        <View>
          <SafeAreaView>
            <FlatList
              data={data}
              renderItem={RenderItem}
              keyExtractor={(item) => item.id}
            />
          </SafeAreaView>
        </View> 
        </View>
    </View>
  );
}

function RequirementUploader(id) {
  const { data, error } = useSWR(
    { url: "/api/RequirmenUploader", method: "SHOW", data: { id } },
    fetcher
  );

  return {
    data: data,
    isLoding: !data && !error,
    errors: error,
  };
}

const getFiles = (jwt) => {
  const { data, error } = useSWR(
    { url: "/api/FileUpload", method: "GET", data: { Jwt: jwt } },
    fetcher
  );

  return {
    files: data,
    isLoding: !data && !error,
    isErorr: error,
  };
};

const InputType = ({
  inputid,
  FormFiles,
  uploadFile,
  removeImge,
  allimges,
  i,
}) => {
 
  if (FormFiles !== undefined) {

    
    if (FormFiles.value !== 0) {
      const { imge } =
        allimges[allimges.findIndex((item) => item.id == FormFiles.value)];
      
      return (
        <View>
          <Image
            source={{ uri: imge }}
            style={stylesList.itemThreeImage}
          />
          <Button onPress={()=>removeImge(FormFiles)} title="حذف الصورة" />
        </View>
      );
    }
  }

  return <Button 
  onPress={()=>uploadFile(inputid)} title="اختر الملف" />;
};






//mobile
/* Object {
  "mimeType": "image/jpeg",
  "name": "IMG-20220529-WA0000.jpg",
  "size": 14677,
  "type": "success",
  "uri": "file:///data/user/0/host.exp.exponent/cache/ExperienceData/%2540anonymous%252FservicesApp-51d4f529-cd9c-45ec-b4d5-57a80c655ef8/DocumentPicker/ee265f47-b5ab-41bb-941c-75a548c824ef.jpg",
}



pc

lastModified: 1647110165254
lastModifiedDate: Sat Mar 12 2022 21:36:05 GMT+0300 (Arabian Standard Time) {}
name: "944051dYJqNYyFL.__AC_SY300_SX300_QL70_ML2_ (2).jpg"
size: 6539
type: "image/jpeg"
webkitRelativePath: ""
[[Prototype]]: File

 */




/*   photoFormData.append('file', {
    name: file.file.name,
    type: file.type,
    uri: Platform.OS === 'ios' ? 
         file.uri.replace('file://', '')
         : file.uri,
  }); */


