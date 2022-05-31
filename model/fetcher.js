
import Axios from 'axios'
import {BACKE_END_URL} from "@env"


const fetcher = async ({ url, method, data }) => {

    var headers = {
        'X-Requested-With': 'XMLHttpRequest',
    }

    if (data !== undefined) {

        if (data.Jwt !== undefined) {


            headers = {
                ...headers,
                "Authorization": "Bearer " + data.Jwt
            }

        }
        if (data.headers !== undefined) {

            headers = {
                ...headers,
              //  'Content-Type': 'multipart/form-data'
            }

        }

    }

    if (method == 'POST_FILE') {
        headers = {
            "Authorization": "Bearer " + data.Jwt,
           //"Content-Type":" multipart/form-data;boundary=----WebKitFormBoundaryyrV7KO0BoCBuDbTL"


          //  "Content-type":"multipart/form-data"// + Math.random().toString().substr(2)
          //'Accept': 'application/json',
          //'Content-Type': 'application/json',
         // 'enctype': 'multipart/form-data',
          //  "Content-Type": "multipart/form-data"
        }
    }

  //  const URL = Platform.OS === 'web' ? 'http://127.0.0.1:8000': 'http://10.0.2.2:8000';
  const URL =BACKE_END_URL
  //'http://127.0.0.1:8000';
  //const URL ='http://10.0.2.2:8000';


    const axios = Axios.create({
        headers,
        withCredentials: true,
    })
    console.log('URL FETCHR AXIOS URL FETCHR AXIOS URL FETCHR AXIOS ')
   // console.log(URL + url)
  //  console.log(axios)
    
    switch (method) {
        case 'GET':
            return axios.get(URL + url).then(res => res.data);
        case 'SHOW':
            return axios.get(URL + url + "/" + data.id).then(res => res.data);
        case 'POST':
            delete data.Jwt
            return axios.post(URL + url, data).then(res => res.data);
        case 'POST_FILE':
            return axios.post(URL + url, data.body, {headers: {
                'Content-Type': 'multipart/form-data',
              },
              transformRequest: (daata, headers) => {
                return data.body; // this is doing the trick
              },}).then(res => res.data);
        case 'PUT':
           const id = data.id
           delete data.Jwt
           delete data.id
            return axios.put(URL + url + "/" + id, data).then(res => res.data);
        case 'DELETE':
            return axios.delete(URL + url + "/" + data.id).then(res => res.data);
        default:
            break;
    }
}

export default fetcher;


//     
//      Loadin
//      
//      Error
//      
//      succss
//
//
//
//
