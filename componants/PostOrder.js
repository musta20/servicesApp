import {
  Text,
  Button,
  View,
  FlatList,
  SafeAreaView,
  Image,
  Modal,
  Pressable,
  TextInput
} from "react-native";
import { stylesList, styles } from "./Style/Global.Style";
import * as DocumentPicker from "expo-document-picker";
import { useNavigation } from '@react-navigation/native';

import { React, useState, useEffect, useContext } from "react";
import useSWR from "swr";
import fetcher from "../model/fetcher";
import FilesManger from "./FilesManger";
import { AuthContext } from "./context/AuthContext";

export default function Order({ route }) {
  const [Files, setFile] = useState({});
  const [FormFiles, setFormFiles] = useState([]);
  const [currentFile, setcurrentFile] = useState(0);
  const [RequestDes, setRequestDes] = useState("");
  const [modalVisible, setModalVisible] = useState(false);
  const [theSelectedImge, SetTheCureentImge] = useState(0);
  const [AlertMesssage, setAlertMesssage] = useState([null, ""])


  const navigation = useNavigation();


  const authContext = useContext(AuthContext);

  const { files } = getFiles(authContext.authState.accessToken);

  const { item } = route.params.params;
  const { data } = RequirementUploader(item.id);

  const FileInputs = ({ item }) => {
    return (
      <View>
        <View style={stylesList.buttonGroup}>
          {item.is_required ? <Text> * الزامي</Text> : null}
        </View>
        <Text> {item.Title_upload}</Text>
        <View style={stylesList.buttonGroup}>
          <InputType
            inputid={item.id}
            FormFiles={
              FormFiles[FormFiles.findIndex((ef) => ef.input == item.id)]
            }
            uploadFile={uploadFile}
            allimges={files}
            removeImge={removeImge}
          ></InputType>
          <Button
            style={stylesList.buttonGroup}
            title="إضافة ملف محفوظ"
            onPress={() =>{
              setcurrentFile(item.id)
              setModalVisible(true)}}
          ></Button>
        </View>
      </View>
    );
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

  const uploadFile = async (inputid) => {
    const file = await DocumentPicker.getDocumentAsync();

    const photoFormData = new FormData();
    let objfile = {
      name: file.name,
      type: file.mimeType,
      size: file.size,

      uri: Platform.OS === "ios" ? file.uri.replace("file://", "") : file.uri,
    };

    photoFormData.append("file", objfile);

    await fetcher({
      url: "/api/storeFromApp",
      method: "POST_FILE",
      data: {
        body: photoFormData,
        Jwt: authContext.authState.accessToken,
      },
    })
      .then((ret) => {
        files.push(ret.file);

        const updatFile = FormFiles.findIndex((item) => item.input == inputid);

        const newupdateForm = [...FormFiles];

        newupdateForm[updatFile].value = ret.file.id;

        setFormFiles(newupdateForm);
      })
      .catch((e) => {
        console.log(e);
      });
  };


  

  const removeImge = (indexFilw) => {
    const updatFile = FormFiles.indexOf(indexFilw);

    const newupdateForm = [...FormFiles];

    newupdateForm[updatFile].value = 0;

    setFormFiles(newupdateForm);
  };



const closeMdeol = (imgid) => {

  const updatFile = FormFiles.findIndex(item => item.input == currentFile)

  const newupdateForm = [...FormFiles]

  newupdateForm[updatFile].value = imgid

  setFormFiles(newupdateForm)

}

  const handelimgeselection = (id) => {
    // console.log(id)
 
     if (currentFile !== 0 && id !== 0) {
 
 
       
       setFile({ input: currentFile, value: id })
 
     }
   }



   const PostRequest = () => {

    if (!RequestDes && !item.is_des_req) {

      setAlertMesssage([false, `الرجاء تعبئة وصف الطلب`])
      return
    }


    try {

      FormFiles.forEach(item => {
        if (!item.value && item.is_required) {
          setAlertMesssage([false, `الرجاء ارفاق ${item.name}`])

          throw 'upliad err'
        }

      })
    }

    catch (e) {

      return
    }

    fetcher({
      url: '/api/Request', method: 'POST', data: {
        combany_id: item.user.username,
        Request_des: RequestDes,
        Jwt:authContext.authState.accessToken,
        Service_id: item.id,
        FormFiles: FormFiles,

      }
    }).then(e => {

      setAlertMesssage([true, `تم إضاف اليانات`])
      setTimeout(() => {
        navigation.navigate('MyTabs',{screen:'بياناتي'})
      
      }, 1000);


    }).catch(err => {
      setAlertMesssage([false, `حدث خطاء الرجاء المحاولة لاخقا`])

    });

  }




  return (
    <View style={stylesList.itemTwoContent}>
             {AlertMesssage[0] == null ? null :
          <View >
            <Text >
              {AlertMesssage[1]}

            </Text>

            <Button
              onPress={() => setAlertMesssage([null, ''])}
              title="close"></Button>
          </View>}
      <View style={stylesList.itemThreeContent} />
      <View>
        <Text style={stylesList.itemTwoTitle}>{item.Title}</Text>
      </View>
      <View>
        <Text style={stylesList.itemTwoSubTitle}>{item.Requirement}</Text>
      </View>
      <View>
          
        <TextInput
        style={styles.input}
        onChangeText={(text)=>setRequestDes(text)}
        value={RequestDes} />
      </View>
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
      <Button
          title="تقديم الطلب"

          style={[stylesList.demoButton, {flexBasis: '47%'}]}
          secondary
          bordered
          color={"#198754"}
          rounded
          onPress={() => PostRequest()}
          />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
   
      >
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <FilesManger
            selection={true}
            closeMdeol={closeMdeol}
            setModalVisible={setModalVisible}
            />
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={() => setModalVisible(!modalVisible)}
            >
              <Text style={styles.textStyle}>
              close
              </Text>
            </Pressable>
          </View>
        </View>
      </Modal>
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
        <View style={stylesList.buttonGroup}>
          <Image source={{ uri: imge }} style={stylesList.itemThreeImage} />
          <Button
            style={stylesList.buttonGroup}
            onPress={() => removeImge(FormFiles)}
            title="حذف الصورة"
          />
        </View>
      );
    }
  }

  return <Button onPress={() => uploadFile(inputid)} title="اختر الملف" />;
};
