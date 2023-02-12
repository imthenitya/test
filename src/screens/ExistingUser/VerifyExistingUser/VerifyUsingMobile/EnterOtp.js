import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import React, { useState } from "react";
import IncorrectLogin from "../../../../common/IncorrectLogin";
import Button from "../../../../common/Button";
import styles from "../../../../../style/styles";
import { useTranslation } from "react-i18next";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const EnterOtp = ({ route, navigation }) => {
  const [otp, setOtp] = useState("");
  const [showError, setShowError] = useState(false);

  // useEffect(()=>{
  //   if (Platform.OS == 'android') {
  //   RNOtpVerify.getHash()
  //  .then(console.log)
  //  .catch(console.log);
  //    RNOtpVerify.getOtp()
  //    .then(p => RNOtpVerify.addListener(otpHandler))
  //    .catch(p => console.log(p));
  //   }
  // },[])
  // const otpHandler = (message) => {
  //   const otp = /(\d{6})/g.exec(message)[1];
  //   setOtp(otp)
  //   RNOtpVerify.removeListener();
  //   Keyboard.dismiss();
  // }

  const OpenHomeScreen = () => {
    const x = "111111";
    if (otp == x) {
      navigation.navigate("ExistingUserScreens");
    } else {
      setShowError(true);
    }
  };
  const { t, i18n } = useTranslation();

  return (
    <View style={styles.container}>
      <IncorrectLogin
        showAlert={showError}
        setShowError={setShowError}
        errorTitle={t("MobileOrEmailErrorTitle")}
        errorMsg={t("MobileOrEmailErrorMsg")}
      />
      <ImageBackground
        source={require("../../../../../assets/login_enter_code.png")}
        resizeMode="stretch"
        style={localStyles.img}
      >
        <View style={localStyles.collections}>
          <Text style={styles.heading}>{t("EnterAuthCode")}</Text>
          <Text style={styles.texts}>
            {t("OtpSent")}{" "}
            <Text style={{ fontWeight: "bold" }}>
              {" "}
              +385 {route.params.mobile}
            </Text>
          </Text>
          <TextInput
            placeholderTextColor="grey"
            textContentType="oneTimeCode"
            secureTextEntry={true}
            value={otp}
            onChangeText={(text) => setOtp(text)}
            style={[styles.input, { borderColor: "#F2F4F9", outline: "none" }]}
            placeholder={t("authCode")}
            editable
          />

          <View style={[styles.buttonStyleContainer, { marginBottom: 10 }]}>
            <Button
              isDisabled={true}
              btnStyle={[styles.whiteBtnStyle, { width: 150 }]}
              textStyle={styles.btnText1}
              buttonText={t("sendAgain")}
            />

            <Button
              isDisabled={otp.length !== 6}
              btnStyle={styles.btnStyle}
              onPressHandler={OpenHomeScreen}
              textStyle={styles.btnText2}
              buttonText={t("continue")}
            />
          </View>
        </View>
      </ImageBackground>
    </View>
  );
};

export default EnterOtp;

const localStyles = StyleSheet.create({
  collections: {
    backgroundColor: "#fff",
    width: "90%",
    borderRadius: 10,
    top: 100,
  },
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});
