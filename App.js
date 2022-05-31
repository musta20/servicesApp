
import * as React from 'react';
import  { SWRConfig } from 'swr'

import { AuthProvider} from './componants/context/AuthContext';
import { AxiosProvider } from './componants/context/AxiosContext';
import Index from './index';

import { StyleSheet } from "react-native";

//StyleSheet


export default function App() {
  
  return (
    <SWRConfig
  value={{
    provider: () => new Map(),
    isOnline() {
      /* Customize the network state detector */
      return true
    },
    isVisible() {
      /* Customize the visibility state detector */
      return true
    },
    initFocus(callback) {
      /* Register the listener with your state provider */
    },
    initReconnect(callback) {
      /* Register the listener with your state provider */
    }
  }}
>
<AuthProvider>
      <AxiosProvider>
    <Index />
    </AxiosProvider>
    </AuthProvider>
    
    
    </SWRConfig>


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

