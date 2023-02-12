import React from "react";
import { Text, View } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";

export const screenTitles = {
  secondScreen: "Pretraga po adresi",
  addressScreen: "Osobni podaci",
  // thirdScreenWithDetails: "Detalji usluge",
  thirdScreen: "Dostupne usluge",
  // additionalPackageWithDetails:'Detalji paketa',
  additionalPackage: "Dodatni paketi",
  HomeScreen: "Naslovnica",
  VerifyUsingMobile: "Prijava",
  VerifyUsingEmail: "Prijava",
  VerifyUsingId: "Prijava",
  VerifyEmailAuth: "Prijava",
  EnterOtp: "Prijava",
  ExistingUserScreens: "Naslovnica",
  OrderHistory: "Provjera statusa zahtjeva",
  OrderDetailAndCancel: "Detalji narudžbe",
  InventoryScreen: "Moje usluge",
  EmptyAdditionalOffer: "Košarica",
  PrimaryOfferDetail: "",
  SecondaryOfferDetail: "",
};

export const showDetailsData = (obj) => {
  const data = Object.keys(obj).map((item, index) => {
    return (
      <View key={index + "main"}>
        <Icon
          style={
            index == 0 ? { fontSize: 25 } : { fontSize: 25, marginTop: 20 }
          }
          name={
            item == "TV"
              ? "desktop-outline"
              : item == "Internet"
              ? "globe-outline"
              : "call-outline"
          }
        ></Icon>
        {obj[item].map((subItem, subIndex) => {
          return (
            <Text key={subIndex + "subItem"} style={{ marginBottom: 5 }}>
              {subItem}
            </Text>
          );
        })}
      </View>
    );
  });
  return data;
};

export const setDataFormat = (date) => {
  return date.split("T")[0].split('-').reverse().join('.');
};
export const mapOrderStatus = (status) => {
  if (status == "PROCESSING") {
    return "Realizacija pokrenuta";
  } else if (status == "PROVISIONING") {
    return "Provizioniranje u tijeku";
  } else if (status == "BILLING") {
    return "Naplata u tijeku";
  } else if (status == "COMPLETING") {
    return "Završavanje narudžbe";
  } else if (status == "COMPLETED") {
    return "Narudžba realizirana";
  } else if (status == "CANCELLED") {
    return "Narudžba otkazana";
  } else {
    return status;
  }
};

export const sortingArrary=(arr)=>{
  return arr.sort(function(a, b){
    var offerA = a.offerType.toLowerCase(), offerB = b.offerType.toLowerCase();
    if (offerA < offerB)
     return -1
   });
}

export const changePriceFormat=(initPrice)=>{

  let price = Number(initPrice).toFixed(2)
  const arr= price.split('.')
  if(arr.length>1 && arr[arr.length-1].length==1){
    price= price.replace(".", ",")
    return price
  }
  else{
    price= price.replace(".", ",")
    return price
  }
}
