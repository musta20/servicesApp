import fetcher from '../model/fetcher';
import { StyleSheet } from "react-native";

import * as React from 'react';
import useSWR from 'swr';
import ServiceCard from './ServiceCard';
import { DashboardContext } from './context'

export default function HomeScreen({navigation}) {

  const { services , isLoding } =  getServices();
  console.log(`hi IAM THE HOOOOOMEEEEE`)
    return (
<DashboardContext.Provider value={{ navigation }} >
<ServiceCard  navigation={navigation} data={services}></ServiceCard>

        </DashboardContext.Provider>
            
 
        );
    
  }
  


  const styles = StyleSheet.create({
    container: {
      backgroundColor: '#664d03',
  
    },
    item: {
      backgroundColor: "#f1f1f1",
      padding: 20,
      marginVertical: 8
    },
    header: {
      fontSize: 32,
      backgroundColor: "#fff"
    },
    title: {
      fontSize: 24
    }
  });
  
const getServices = ()=> {
  const { data, error } = useSWR({ url: '/api/services', method: 'GET', data: {} }, fetcher);
 
  const page = !data || !{ data } ? [] : data.data
  return {
    services: page,
    isLoding: !page && !error,
    isErorr: error
  }

}

 