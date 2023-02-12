import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  Dimensions,
} from "react-native";
import IncorrectLogin from "../../../../common/IncorrectLogin";
import styles from "../../../../../style/styles";
import DropdownComponent from "../../../../common/Dropdown";
import { connect } from "react-redux";
const screenHeight = Dimensions.get("window").height;
const screenWidth = Dimensions.get("window").width;
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
  customerId,
  setAvailablityAddress,
  displayInnerScreen,
  setPrefilledAddress,
  cartContent,
  setDetailsData,
  setOfferId,
  primaryOfferResponse,
  setExistingUser
} from "../../../../../redux/settings";
import Button from "../../../../common/Button";
import { useTranslation } from "react-i18next";

const VerifyUsingId = ({
  show_screen,
  navigation,
  customerId,
  setAvailablityAddress,
  displayInnerScreen,
  setPrefilledAddress,
  cartContent,
  setDetailsData,
  setOfferId,
  primaryOfferResponse,
  setExistingUser
}) => {
  const [customerIdVal, setCustomerId] = useState("Select Customer Id");
  const [password, setPassword] = useState("");
  const [showError, setShowError] = useState(false);
  const [dropDownArr, setDropDownArr] = useState([]);
  useEffect(() => {
    setAvailablityAddress({});
    displayInnerScreen(false);
    setPrefilledAddress({});
    cartContent({});
    setDetailsData({});
    setOfferId("");
    primaryOfferResponse([]);
    retriveData("customerId");
  }, []);

  const { t, i18n } = useTranslation();

  const retriveData = async (key) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value !== null && value.length > 0) {
        const arr = JSON.parse(value);
        setDropDownArr(arr);
      }
    } catch (error) {
      console.log(error);
    }
  };
  const customerIdHandler = (val) => {
    setCustomerId(val);
    customerId(val);
  };
  const navigateToHomeScreen = () => {
    const savedPassword = "test";
    setExistingUser(true)
    if (password == savedPassword) {
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
        errorTitle={t("telekomIdErrorTitle")}
        errorMsg={t("telekomIdErrormsg")}
      />
      <ImageBackground
        source={require("../../../../../assets/login_email.png")}
        resizeMode="stretch"
        style={localStyles.img}
      >
        <View style={styles.firstScreenCollection}>
          <Text style={styles.heading}>{t("enterTelekomId")}</Text>
          <Text style={styles.texts}>{t("enterInformation")}</Text>
          <DropdownComponent
            dropdownValues={dropDownArr}
            placeholder="Select Customer Id"
            setSelected={customerIdHandler}
            selected={customerIdVal}
          />
          <TextInput
            secureTextEntry={true}
            onChangeText={(text) => setPassword(text)}
            placeholderTextColor="grey"
            style={styles.input}
            placeholder={t("password")}
            editable
          />
          <TouchableOpacity>
            <Text style={localStyles.forgotPassword}>{t("forgotLogin")}</Text>
          </TouchableOpacity>

          <Button
            isDisabled={customerIdVal == "Select Customer Id" || password == ""}
            btnStyle={[styles.btnStyle, { marginBottom: 10 }]}
            onPressHandler={navigateToHomeScreen}
            textStyle={styles.btnText2}
            buttonText={t("application")}
          />
        </View>
      </ImageBackground>
    </View>
  );
};

const localStyles = StyleSheet.create({
  forgotPassword: {
    textAlign: "left",
    padding: 5,
    fontWeight: "bold",
    color: "#007FAF",
    paddingLeft: 10,
    fontSize: 12,
  },
  img: {
    height: screenHeight,
    width: screenWidth,
    justifyContent: "center",
    alignItems: "center",
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    customer_id: state.screenSettings.customer_id,
  };
};

const mapDispatchToProps = {
  customerId,
  setAvailablityAddress,
  displayInnerScreen,
  setPrefilledAddress,
  cartContent,
  setDetailsData,
  setOfferId,
  primaryOfferResponse,
  setExistingUser
};

export default connect(mapStateToProps, mapDispatchToProps)(VerifyUsingId);
