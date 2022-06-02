
import {
    StyleSheet,
    Platform,
    Dimensions
  } from "react-native";
  

  export const stylesList =StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#e3e3e3",
    },
    smallImge:{
      margin:3,
      borderRadius:3
    }
    ,
    tabsContainer: {
      alignSelf: "stretch",
      marginTop: 30,
    },
    itemOneContainer: {
      flex: 1,
      width: Dimensions.get("window").width / 2 - 40,
    },
    itemOneImageContainer: {
      borderRadius: 3,
      overflow: "hidden",
    },
    itemOneImage: {
      height: 200,
      width: Dimensions.get("window").width / 2 - 40,
    },
    itemOneTitle: {
      //fontFamily: fonts.primaryRegular,
      fontSize: 15,
    },
    itemOneSubTitle: {
      //fontFamily: fonts.primaryRegular,
      fontSize: 13,
      color: "#B2B2B2",
      marginVertical: 3,
    },
    itemOnePrice: {
      //fontFamily: fonts.primaryRegular,
      fontSize: 15,
    },
    itemOneRow: {
      flexDirection: "row",
      justifyContent: "space-around",
      marginTop: 10,
    },
    itemOneContent: {
      marginTop: 5,
      marginBottom: 10,
    },
    itemTwoContainer: {
      paddingBottom: 10,
      backgroundColor: "white",
      marginVertical: 5,
    },
    itemTwoContent: {
      padding: 20,
      position: "relative",
      marginHorizontal: Platform.OS === "ios" ? -15 : 0,
      //   backgroundColor:"#fff"
      //  height: 300,
    },
    itemTwoTitle: {
      color: "#4a4946",
      //fontFamily: fonts.primaryBold,
      fontSize: 20,
    },
    itemTwoSubTitle: {
      color: "#4a4946",
      //fontFamily: fonts.primaryRegular,
      fontSize: 15,
      marginVertical: 5,
    },
    itemTwoPrice: {
      color: "#4a4946",
      //fontFamily: fonts.primaryBold,
      fontSize: 20,
    },
    demoButton: {
      marginTop: 8,
      marginBottom: 8,
    },
    itemTwoImage: {
      position: "absolute",
      height: 300,
      // width:300,
      resizeMode: "stretch",
  
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
      color: "#4a4946",
      //  backgroundColor: '#6271da',
      //opacity: 0.5,
    },
    itemThreeContainer: {
      backgroundColor: "white",
      borderBottomWidth: 3,
      borderBottomColor: "#f1f1f1",
    },
    itemThreeSubContainer: {
      margin: 3,
      flexDirection: "row",
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
      justifyContent: "space-between",
    },
    itemThreeBrand: {
      //fontFamily: fonts.primaryRegular,
      fontSize: 14,
      color: "#617ae1",
    },
    itemThreeTitle: {
      //fontFamily: fonts.primaryBold,
      fontSize: 16,
      color: "#5F5F5F",
    },
    itemThreeSubtitle: {
      //fontFamily: fonts.primaryRegular,
      fontSize: 12,
      color: "#a4a4a4",
    },
    buttonGroup:{
      padding:5,
      marginTop:5
    }
    ,
    itemThreeMetaContainer: {
     // flexDirection: "row",
    //  width:"100%",
     // justifyContent: "space-between",
    //  alignItems: "center",
    height:450,
    marginBottom:5
    //padding:10
    },
    itemThreePrice: {
      //fontFamily: fonts.primaryRegular,
      fontSize: 15,
      color: "#5f5f5f",
      textAlign: "right",
    },
    itemThreeHr: {
      flex: 1,
      height: 1,
      backgroundColor: "#e3e3e3",
      marginRight: -15,
    },
    badge: {
      backgroundColor: "#5f5f5f",
      borderRadius: 10,
      paddingHorizontal: 10,
      paddingVertical: 5,
    }})

    
    
    export const  styles= StyleSheet.create({

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2
  },
  buttonOpen: {
    backgroundColor: "#F194FF",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center"
  }
,
    container: {
      flex: 1,
      //paddingTop: StatusBar.currentHeight,
      marginHorizontal: 16,
      backgroundColor: "#ffffff",
    },
    stretch: {
      width: 150,
      height: 200,
      resizeMode: "stretch",
    },
    item: {
      flex: 0.5,
      backgroundColor: "#f1f1f1",
      borderColor: "#c9c9c9",
      borderWidth: 1,
    },
    header: {
      fontSize: 32,
    },
    title: {
      fontSize: 24,
    },
  })
  
