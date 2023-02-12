import React from "react";
import { useState } from "react";
import {
  View,
  ImageBackground,
  Dimensions,
} from "react-native";
import TouchableButton from "../common/TouchableButton";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../../style/styles";
import { useTranslation } from "react-i18next";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const LandingScreen = ({ navigation, route, ...props }) => {
  const [currentLanguage, setLanguage] = useState("cr");

  const { t, i18n } = useTranslation();

  const changeScreenAndTitle = () => {
    navigation.navigate("secondScreen");
  };
  const verifyByMobile = () => {
    navigation.navigate("VerifyUsingMobile");
  };
  const verifyByEmail = () => {
    navigation.navigate("VerifyUsingEmail");
  };
  const verifyByTelekomId = () => {
    navigation.navigate("VerifyUsingId");
  };

  const changeLanguage = (value) => {
    i18n
      .changeLanguage(value)
      .then(() => setLanguage(value))
      .catch((err) => console.log(err));
  };

  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../assets/homepage.png")}
        resizeMode="stretch"
        style={[styles.img, { height: screenHeight, width: screenWidth }]}
      >
        {/* Code for Translator Event Starts*/}
        {/* {route.name?
      <>
      <Pressable
          onPress={() => changeLanguage('en')}
          style={{
            backgroundColor:
              currentLanguage === 'en' ? '#33A850' : '#d3d3d3'
          }}>
          <Text>Select English</Text>
        </Pressable>
        <Pressable
          onPress={() => changeLanguage('cr')}
          style={{
            backgroundColor:
              currentLanguage === 'cr' ? '#33A850' : '#d3d3d3'
          }}>
          <Text>Select Cortian</Text>
        </Pressable>
        </>:null} */}
        {/* Code for Translator Event Ends*/}

        <View style={styles.firstScreenCollection}>
          <TouchableButton
            isDisable={true}
            iconName="phone-portrait-outline"
            text={t("loginByMobile")}
            onPressHandler={verifyByMobile}
          />
          <TouchableButton
            isDisable={true}
            iconName="mail-outline"
            text={t("loginByEmail")}
            onPressHandler={verifyByEmail}
          />
          <TouchableButton
            iconName="person-outline"
            text={t("loginByTelkom")}
            onPressHandler={verifyByTelekomId}
          />
          <TouchableButton
            isLast={true}
            iconName="person-add-outline"
            text={t("newUser")}
            onPressHandler={changeScreenAndTitle}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

export default LandingScreen;
