import React, { useEffect, useState,useCallback } from 'react';
import { StyleSheet, Image, View,Button,Text } from 'react-native';
import LandingScreen from './src/screens';
import SecondScreen from './src/screens/NewUser/SecondScreen';
import ThirdScreen from './src/screens/NewUser/ThirdScreen';
import AdditionalPackage from './src/screens/NewUser/AdditionalPackage';
import AddressScreen from './src/screens/NewUser/AddressScreen';
import HomeScreenComponent from './src/screens/NewUser/HomeScreen';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import EnterOtp from './src/screens/ExistingUser/VerifyExistingUser/VerifyUsingMobile/EnterOtp';
import VerifyUsingMobile from './src/screens/ExistingUser/VerifyExistingUser/VerifyUsingMobile';
import VerifyUsingEmail from './src/screens/ExistingUser/VerifyExistingUser/VerifyUsingEmail';
import VerifyEmailAuth from './src/screens/ExistingUser/VerifyExistingUser/VerifyUsingEmail/VerifyEmailAuth';
import VerifyUsingId from './src/screens/ExistingUser/VerifyExistingUser/VerifyUsingId';
import ExistingUserScreens from './src/screens/ExistingUser/ExistingUserScreens';
import OrderHistory from './src/screens/ExistingUser/ExistingUserScreens/OrderHistory';
import OrderDetailAndCancel from './src/screens/ExistingUser/ExistingUserScreens/OrderHistory/OrderDetailAndCancel';
import Icon from 'react-native-vector-icons/Ionicons';
import {connect} from 'react-redux';
import {displayInnerScreen, displayAdditionalOfferDetial} from './redux/settings'
import { screenTitles } from './src/constants/helper';
import InventoryScreen from './src/screens/ExistingUser/ExistingUserScreens/Inventory';
import PrimaryOfferDetail from './src/screens/ExistingUser/ExistingUserScreens/Inventory/PrimaryOfferDetail';
import SecondaryOfferDetail from './src/screens/ExistingUser/ExistingUserScreens/Inventory/SecondaryOfferDetail'
import EmptyAdditionalOffer from './src/screens/NewUser/EmptyAdditionalOffer';

function NativeApplication({show_screen,offer_id,displayInnerScreen,displayAdditionalOfferDetial,addition_offer_detail, isExistingUser }) {
const Stack = createNativeStackNavigator();

const setOptions=(route)=>{
    return{
    title: route.name=='thirdScreen' && show_screen||route.name=='additionalPackage'&& addition_offer_detail?
                        setTitle(route)
                       :screenTitles[route.name],
    headerStyle: {
      backgroundColor: '#E20074',
    },
    headerTitleAlign: 'center',
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
      marginTop:10
    }
  }
}
const setTitle=(route)=>{
  let title=''
   if(route.name=='thirdScreen' && show_screen){
     title='Detalji usluge'
  }
  else if(route.name=='additionalPackage' && addition_offer_detail){
     title='Detalji paketa'
  }
  return title
}

  const goBack=(navigation, route)=>{
    if(route.name=='thirdScreen' && show_screen){
      displayInnerScreen(false)
    }
    else if(route.name=='additionalPackage' && addition_offer_detail){
      displayAdditionalOfferDetial(false)
    }
   else{
      navigation.goBack()
    }
    return true
  }
  
  const goForward=(navigation,route)=>{
    if(route.name=='thirdScreen'){
      navigation.navigate('additionalPackage')
    }
  }

  return (
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={({ navigation, route }) => ({
          headerShown: route.name=='home'?false:true,
          headerTransparent: route.name=='VerifyUsingMobile' || route.name=='EnterOtp' ||route.name=='VerifyUsingEmail' || route.name=='VerifyEmailAuth' ||route.name=='VerifyUsingId'?true:false,
           headerLeft: (props) => {
            if(route.name!=='firstScreen' && route.name!=='secondScreen' && route.name!=='HomeScreen' && route.name!=='ExistingUserScreens'){
            return (
              <Icon style={{fontSize:25, color:'#fff',marginTop:10}} name="chevron-back-outline" onPress={()=>goBack(navigation,route)} />
            )
          }
          else{
            return <Text></Text> //adding null not working in android
          }
        },
          headerRight: (props) => {
            if(offer_id && !show_screen && route.name=='thirdScreen'){
            return (
              <Icon style={{fontSize:25,color:'#fff',marginTop:10}} name="chevron-forward-outline"  onPress={()=>{goForward(navigation,route)}}/>
            )
          }
          },
        })}>
        <Stack.Screen
        name={'home'}
        options={({ route }) => setOptions(route)}>
        {props => <LandingScreen {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='secondScreen'
        options={({ route }) => setOptions(route)}>
        {props => <SecondScreen {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='thirdScreen'
        options={({ route }) => setOptions(route)}>
        {props => <ThirdScreen {...props}/>}
        </Stack.Screen>
        
        <Stack.Screen
        name='EmptyAdditionalOffer'
        options={({ route }) => setOptions(route)}>
        {props => <EmptyAdditionalOffer {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='additionalPackage'
        options={({ route }) => setOptions(route)}>
        {props => <AdditionalPackage {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='addressScreen'
        options={({ route }) => setOptions(route)}>
        {props => <AddressScreen {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='HomeScreen'
        options={({ route }) => setOptions(route)}>
        {props => <HomeScreenComponent {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='VerifyUsingMobile'
        options={({ route }) => setOptions(route)}>
        {props => <VerifyUsingMobile {...props}/>}
        </Stack.Screen>
        
        <Stack.Screen
        name='EnterOtp'
        options={({ route }) => setOptions(route)}>
        {props => <EnterOtp {...props}/>}
        </Stack.Screen>
        
        <Stack.Screen
        name='VerifyUsingEmail'
        options={({ route }) => setOptions(route)}>
        {props => <VerifyUsingEmail {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='VerifyEmailAuth'
        options={({ route }) => setOptions(route)}>
        {props => <VerifyEmailAuth {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='VerifyUsingId'
        options={({ route }) => setOptions(route)}>
        {props => <VerifyUsingId {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='ExistingUserScreens'
        options={({ route }) => setOptions(route)}>
        {props => <ExistingUserScreens {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='OrderHistory'
        options={({ route }) => setOptions(route)}>
        {props => <OrderHistory {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='OrderDetailAndCancel'
        options={({ route }) => setOptions(route)}>
        {props => <OrderDetailAndCancel {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='InventoryScreen'
        options={({ route }) => setOptions(route)}>
        {props => <InventoryScreen {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='PrimaryOfferDetail'
        options={({ route }) => setOptions(route)}>
        {props => <PrimaryOfferDetail {...props}/>}
        </Stack.Screen>

        <Stack.Screen
        name='SecondaryOfferDetail'
        options={({ route }) => setOptions(route)}>
        {props => <SecondaryOfferDetail {...props}/>}
        </Stack.Screen>
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
});

const mapStateToProps = (state, myOwnProps) => {
  return {
      show_screen: state.screenSettings.show_screen,
      addition_offer_detail: state.screenSettings.addition_offer_detail,
      offer_id: state.screenSettings.offer_id,
      isExistingUser: state.screenSettings.isExistingUser
  }
}

const mapDispatchToProps = {
  displayInnerScreen,
  displayAdditionalOfferDetial
}
export default connect(mapStateToProps, mapDispatchToProps)(React.memo(NativeApplication))
