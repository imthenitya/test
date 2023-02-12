import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import { useTranslation } from "react-i18next";
import Button from "../../../../common/Button";
import styles from "../../../../../style/styles";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const VerifyUsingMobile = ({
  navigation
}) => {
  const [mobileNo, setMobileNo] = useState("");
  const { t, i18n } = useTranslation();

  const navigateEnterOtpScreen = () => {
    navigation.navigate("EnterOtp", {
      mobile: mobileNo,
    });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../../assets/login_phone_number.png")}
        resizeMode="stretch"
        style={localStyles.img}
      >
        <View style={styles.firstScreenCollection}>
          <Text style={styles.heading}>{t("enterMobile")}</Text>
          <Text style={styles.texts}>{t("enterNoUseToLogin")}</Text>
          <TextInput
            onChangeText={(text) => setMobileNo(text)}
            placeholderTextColor="grey"
            style={styles.input}
            placeholder={t("mobile")}
            editable
          />
          <Text style={styles.texts}>{t("youWillRecieveSms")}</Text>

          <Button
            isDisabled={mobileNo.length !== 10}
            btnStyle={[styles.btnStyle, { marginBottom: 10, width: 200 }]}
            onPressHandler={navigateEnterOtpScreen}
            textStyle={styles.btnText2}
            buttonText={t("sendCode")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const localStyles = StyleSheet.create({
  btnStyle: {
    padding: 10,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#E20074",
  },
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default React.memo(VerifyUsingMobile);
