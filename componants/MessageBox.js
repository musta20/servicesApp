

import fetcher from '../model/fetcher';
import { AuthContext } from "./context/AuthContext";

import { useEffect, useState , Image , useContext} from 'react';
import useSWR from 'swr';
import { Button ,TextInput,  Text, View, SafeAreaView, FlatList} from 'react-native';
import { useNavigation } from "@react-navigation/native";

export default function MessageBox({ route }) {
    const { id } = route.params.params

    const [FormFiles, setFormFiles] = useState([]);

    const [allmessage, setmessage] = useState([]);
    const [currentmessage, setmessagecurrent] = useState("");

    const authContext = useContext(AuthContext);



    const { message } = getMessages({ id: id, Jwt: authContext.authState.accessToken })


    const ShowImge = ({item}) => {

        if (!item.m_type) return <Text >{item.Messages}</Text> 

        const { data, error } = useSWR({ url: '/api/showImge', method: 'SHOW', data: { id: item.Messages } }, fetcher)

        if (!data) return <View>ttt</View>;

        return <Image  source={{
            uri:data}} width={200} height={170}></Image>;
      

    }

    useEffect(() => {

        setmessage(message)
        //chatBox.current.scrollTop = chatBox.current.scrollHeight

    }, [message])

    const uploadFile = async (event, inputid) => {

        const photoFormData = new FormData();

        photoFormData.append("file", event.target.files[0]);

        //srcf()

        const config = {
            onUploadProgress: function (progressEvent) {
                setpross(Math.round((progressEvent.loaded * 100) / progressEvent.total));
            }
        }

        await fetcher({
            url: '/api/FileUpload', method: "POST_FILE", data: {
                body: photoFormData,
                Jwt: cookies.Jwt
                // ,config:config
            }

        }).then(ret => {

            files.push(ret.file)
            const updatFile = FormFiles.findIndex(item => item.input == inputid)

            const newupdateForm = [...FormFiles]

            newupdateForm[updatFile].value = ret.file.id

            setFormFiles(newupdateForm)


        });

    }


    const SendMessages = () => {
        // console.log(' orid orid orid orid orid ')
        // console.log(OrderId)
        let letCurrentmessage = currentmessage
        setmessagecurrent("")
        fetcher({
            url: '/api/Messages', method: 'POST', data: {
                req_id: OrderId,
                Jwt: cookies.Jwt,
                Messages: letCurrentmessage,

            }
        })
            .then(mesg => {
                const laamesge = [...allmessage]
                laamesge.push(mesg)
                setmessage(laamesge)


            })

    }

    return (
        <>


                <FlatList
                data={allmessage}
                keyExtractor={item=>item.id}
                renderItem={ShowImge}
                
                
                ></FlatList>

                


            <View >

                <Button 
               title="send"
                    onPress={() => SendMessages()}>
                   
                </Button>
                <TextInput
                    value={currentmessage}
                    onChangeText={()=>setmessagecurrent()}
             >
                </TextInput>

            </View>

          







        </>
    )
}


function RequirementUploader(props) {

    const { data, error } = useSWR({ url: '/api/RequirmenUploader', method: 'SHOW', data: props }, fetcher);


    return {
        data: data,
        isLoding: !data && !error,
        errors: error
    }
}

const getMessages = (props) => {
    console.log('getMessages')
    const { data, error } = useSWR({ url: '/api/Messages', method: 'SHOW', data: props }, fetcher);
    console.log(data)
    useSWR({
        url: '/api/isViewed',
        method: 'PUT',
        data: props
    }, fetcher)



    return {
        message: data,
        isLoding: !data && !error,
        errors: error
    }
}
