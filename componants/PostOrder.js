import {
  StyleSheet,
  Platform,
  Dimensions,
  Text,
  Button,
  View,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Image
} from 'react-native';


import { React, useState, useEffect } from "react";
import useSWR from 'swr';
import fetcher from '../model/fetcher';


//const { navigation } = useContext(DashboardContext);


export default function Order({ route }) {
  const [Files, setFile] = useState({});
  const [FormFiles, setFormFiles] = useState([]);
  const [currentFile, setcurrentFile] = useState(0);
  const [RequestDes, setRequestDes] = useState('');

  const { item } = route.params.params
  const URL = 'http://127.0.0.1:8000';
  ///const URL ='http://10.0.2.2:8000';
//const {files} = getFiles()
  const { data } = RequirementUploader(item.id);

  const FileInputs = ({ item }) => {

    return <View style={stylesList.itemThreeContent} >

      <Text style={stylesList.itemTwoTitle} >
        {item.Title_upload}
      </Text>
    </View>
  }

  const FileInputss = ({ item }) => {

    <View >
      <View> {item.is_required ? <Text //style={{ backgroundColor: "#eb4034" }}
      > * الزامي </Text> : ''}</View>
      <Text > {item.Title_upload}</Text>
      <View >
        <InputType
          inputid={item.id}
          FormFiles={FormFiles[FormFiles.findIndex(ef => ef.input == item.id)]}
        //  uploadFile={uploadFile}
          allimges={files}
          removeImge={removeImge}
          i={i} >
        </InputType>
        <Button
        //  id={item.id}
          //onClick={(e) => handelOpenModel(e)}
  title="إضافة ملف محفوظ"
        //  data-bs-toggle="modal"
        //  data-bs-target="#exampleModalCenteredScrollable"
         // className="mt-2 btn  btn-outline-success"
          ></Button>
      </View>
  
  
    </View>
  
  
  }
  
  const RenderItem = ({ item }) => {

    return <FileInputss item={item} />
  }

  useEffect(() => {

    const updateForm = []
    data == undefined ? null : data.forEach((item, i) => {
      updateForm[i] = { input: item.id, value: 0, name: item.Title_upload, is_required: item.is_required }
    });

    setFormFiles(updateForm)

  }, [data])
  const ShowUll = () => {

    return
  }

  return (
    <View style={stylesList.itemTwoContent}>


      <View style={stylesList.itemThreeContent} />

      <Text style={stylesList.itemTwoTitle}>{item.Title}</Text>
      <Text style={stylesList.itemTwoSubTitle}>{item.Requirement}</Text>
      <Text style={stylesList.itemTwoPrice}>{"55 SAR"}</Text>
      <View style={stylesList.itemThreeMetaContainer}>
        <View >

          <SafeAreaView  >
            <FlatList
              data={data}
              renderItem={RenderItem}
              keyExtractor={item => item.id}
            />
          </SafeAreaView>




        </View>


        <Button
          title="طلب الخدمة"

          style={[stylesList.demoButton, { flexBasis: '47%' }]}
          secondary
          bordered
          color={"#198754"}
          rounded
        />

      </View>

    </View>

  );
}



function RequirementUploader(id) {

  const { data, error } = useSWR({ url: '/api/RequirmenUploader', method: 'SHOW', data: { id } }, fetcher);


  return {
    data: data,
    isLoding: !data && !error,
    errors: error
  }
}

function getServices(id) {

  const { data, error } = useSWR({ url: '/api/services', method: 'SHOW', data: { id } }, fetcher);

  console.log(data)
  return {
    serv: data,
    isLoding: !data && !error,
    errors: error
  }
}

const getFiles = (jwt) => {
  const { data, error } = useSWR({ url: '/api/FileUpload', method: 'GET', data: { Jwt: jwt } }, fetcher);
  //console.log(data)
  return {
    files: data,
    isLoding: !data && !error,
    isErorr: error
  }

}

const InputType = ({ inputid, FormFiles, uploadFile, removeImge, allimges, i }) => {
  if (FormFiles !== undefined) {
    if (FormFiles.value !== 0) {
      const { imge } = allimges[allimges.findIndex(item => item.id == FormFiles.value)]

      return <View ><Image
        src={{ uri: imge }}
        id='cy-thecurrentimge'
        width={200}
        height={170}
      ></Image>

        <Button

          title='حذف الصورة'
        >حذف الصورة</Button>
      </View>
    }
  }

  return        <Button

  title='اختر الملف'
>حذف الصورة</Button>
  //<input
   // id="cy-upload-file"
   // disabled={false}
   // onChange={event => uploadFile(event, inputid)}
  //  type="file" className=" form-control w-75"
//
 // ></input>
}
















const styles = StyleSheet.create({
  container: {

    flex: 1,
    //paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
    backgroundColor: "#ffffff"

  },
  stretch: {
    width: 150,
    height: 200,
    resizeMode: 'stretch',
  },
  item: {
    flex: 0.5,
    backgroundColor: "#f1f1f1",
    borderColor: "#c9c9c9",
    borderWidth: 1,
  },
  header: {
    fontSize: 32
  },
  title: {
    fontSize: 24
  }
});




const stylesList = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#e3e3e3',
  },

  tabsContainer: {
    alignSelf: 'stretch',
    marginTop: 30,
  },
  itemOneContainer: {
    flex: 1,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneImageContainer: {
    borderRadius: 3,
    overflow: 'hidden',
  },
  itemOneImage: {
    height: 200,
    width: Dimensions.get('window').width / 2 - 40,
  },
  itemOneTitle: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneSubTitle: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 13,
    color: '#B2B2B2',
    marginVertical: 3,
  },
  itemOnePrice: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 15,
  },
  itemOneRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 10,
  },
  itemOneContent: {
    marginTop: 5,
    marginBottom: 10,
  },
  itemTwoContainer: {
    paddingBottom: 10,
    backgroundColor: 'white',
    marginVertical: 5,
  },
  itemTwoContent: {
    padding: 20,
    position: 'relative',
    marginHorizontal: Platform.OS === 'ios' ? -15 : 0,
    //   backgroundColor:"#fff"
    //  height: 300,
  },
  itemTwoTitle: {
    color: '#4a4946',
    //fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  itemTwoSubTitle: {
    color: '#4a4946',
    //fontFamily: fonts.primaryRegular,
    fontSize: 15,
    marginVertical: 5,
  },
  itemTwoPrice: {
    color: '#4a4946',
    //fontFamily: fonts.primaryBold,
    fontSize: 20,
  },
  demoButton: {
    marginTop: 8,
    marginBottom: 8,
  },
  itemTwoImage: {
    position: 'absolute',
    height: 300,
    // width:300,
    resizeMode: 'stretch',

    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  itemTwoOverlay: {
    //  position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    color: "#4a4946"
    //  backgroundColor: '#6271da',
    //opacity: 0.5,
  },
  itemThreeContainer: {
    backgroundColor: 'white',
    borderBottomWidth: 3,
    borderBottomColor: "#f1f1f1"
  },
  itemThreeSubContainer: {
    margin: 3,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  itemThreeImage: {
    height: 100,
    width: 100,
  },
  itemThreeContent: {
    //   flex: 1,
    // marginTop: 310,
    paddingLeft: 15,
    justifyContent: 'space-between',
  },
  itemThreeBrand: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 14,
    color: '#617ae1',
  },
  itemThreeTitle: {
    //fontFamily: fonts.primaryBold,
    fontSize: 16,
    color: '#5F5F5F',
  },
  itemThreeSubtitle: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 12,
    color: '#a4a4a4',
  },
  itemThreeMetaContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  itemThreePrice: {
    //fontFamily: fonts.primaryRegular,
    fontSize: 15,
    color: '#5f5f5f',
    textAlign: 'right',
  },
  itemThreeHr: {
    flex: 1,
    height: 1,
    backgroundColor: '#e3e3e3',
    marginRight: -15,
  },
  badge: {
    backgroundColor: '#5f5f5f',
    borderRadius: 10,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
});

