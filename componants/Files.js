import { Text, View } from 'react-native';
import * as React from 'react';
import FilesManger from "./FilesManger";

export default function Files() {
    return (
      
          <FilesManger
            selection={true}
            closeMdeol={()=>{}}
            setModalVisible={()=>{}}
            ></FilesManger>      
    );
  }
  