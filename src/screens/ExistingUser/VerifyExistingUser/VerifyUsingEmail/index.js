import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ImageBackground,
  Dimensions,
} from "react-native";
import styles from "../../../../../style/styles";
import Button from "../../../../common/Button";
import { useTranslation } from "react-i18next";

const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;

const VerifyUsingEmail = ({
  navigation
}) => {
  const [email, setEmail] = useState("");
  const { t, i18n } = useTranslation();

  const navigateToEmailAuth = () => {
    navigation.navigate("VerifyEmailAuth", {
      email: email,
    });
  };
  return (
    <View style={styles.container}>
      <ImageBackground
        source={require("../../../../../assets/login_email.png")}
        resizeMode="stretch"
        style={localStyles.img}
      >
        <View style={styles.firstScreenCollection}>
          <Text style={styles.heading}>{t("enterEmail")}</Text>
          <Text style={styles.texts}>{t("youWillRecieveAuth")}</Text>
          <TextInput
            onChangeText={(text) => setEmail(text)}
            placeholderTextColor="grey"
            style={styles.input}
            placeholder={t("email")}
            editable
          />

          <Button
            isDisabled={email == ""}
            btnStyle={[styles.btnStyle, { width: 200, marginBottom: 10 }]}
            onPressHandler={navigateToEmailAuth}
            textStyle={styles.btnText2}
            buttonText={t("sendAuth")}
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



export default React.memo(VerifyUsingEmail);
