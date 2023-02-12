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
import styles from "../../../../../style/styles";
import Button from "../../../../common/Button";
import { useTranslation } from "react-i18next";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const VerifyEmailAuth = ({ route, navigation }) => {
  const [otp, setOtp] = useState("");
  const [showError, setShowError] = useState(false);
  const { t, i18n } = useTranslation();

  const OpenHomeScreen = () => {
    const x = "111111";
    if (otp == x) {
      navigation.navigate("ExistingUserScreens");
    } else {
      setShowError(true);
    }
  };

  return (
    <View style={styles.container}>
      <IncorrectLogin
        showAlert={showError}
        setShowError={setShowError}
        errorTitle={t("MobileOrEmailErrorTitle")}
        errorMsg={t("MobileOrEmailErrorMsg")}
      />
      <ImageBackground
        source={require("../../../../../assets/email_auth.png")}
        resizeMode="stretch"
        style={localStyles.img}
      >
        <View style={styles.firstScreenCollection}>
          <Text style={styles.heading}>{t("EnterAuthCode")}</Text>
          <Text style={styles.texts}>
            {t("emailSent")}{" "}
            <Text style={{ fontWeight: "bold" }}> {route.params.email}</Text>
          </Text>
          <TextInput
            secureTextEntry={true}
            onChangeText={(text) => setOtp(text)}
            style={[styles.input, { borderColor: "#F2F4F9", outline: "none" }]}
            placeholder={t("authCode")}
            placeholderTextColor="grey"
            editable
          />

          <View style={[styles.buttonStyleContainer, { marginBottom: 10 }]}>
            <Button
              btnStyle={[styles.whiteBtnStyle, , { width: 120 }]}
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

export default VerifyEmailAuth;

const localStyles = StyleSheet.create({
  btnStyle: {
    padding: 10,
    paddingLeft: 25,
    paddingRight: 25,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#E20074",
  },
  addedBtn: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    borderColor: "#E20074",
    borderWidth: 1,
  },
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});
