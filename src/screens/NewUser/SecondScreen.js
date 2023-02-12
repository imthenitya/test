import React, { useState , useEffect } from "react";
import { Text, View, ActivityIndicator, TextInput,BackHandler } from "react-native";
import styles from "../../../style/styles";
import { connect } from "react-redux";
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
} from "../../../redux/settings";
import uuid from "react-native-uuid";
import Button from "../../common/Button";
import { useTranslation } from "react-i18next";
import { sendUserAddress } from "../../constants/api";
import { addressList } from "../../constants/HardcodedTexts";
import { useIsFocused } from "@react-navigation/native";

const SecondScreen = ({
  customer_id,
  customerId,
  setExistingUser,
  setAvailablityAddress,
  displayInnerScreen,
  setPrefilledAddress,
  cartContent,
  setDetailsData,
  setOfferId,
  primaryOfferResponse,
  navigation
}) => {
  const [val, setVal] = useState({
    input1: "",
    input2: "",
    input3: "",
    input4: "",
    input5: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const isFocused = useIsFocused();

  useEffect(() => {
    // Handling physical device Back button
    
    const backAction = () => {
      if(isFocused){
        return true
    }
  }
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [isFocused]);

  const changeScreenAndTitle = () => {
    const id = uuid.v4().slice(-10);
    const customerData = {
      age: Number(val.input5),
      type: "NEW",
      dateOfBirth: "2007-12-03",
      billingAccountId: 1,
      serviceAccountId: 1,
      customerAccountId: 1,
      address: {
        buildingId: val.input2 + val.input4,
        streetNumber: Number(val.input4),
        streetName: val.input3,
        postCode: val.input2,
        locality: val.input1,
        city: "Zagreb",
        stateOrProvince: "Zagreb",
        country: "Croatia",
      },
      valMarketingSegment: 1,
    };
    setAvailablityAddress({});
    setExistingUser(false)
    displayInnerScreen(false);
    setPrefilledAddress({});
    cartContent({});
    setDetailsData({});
    setOfferId("");
    primaryOfferResponse([]);
    setAvailablityAddress(val);
    setIsLoading(true);
    sendUserAddress(customerData)
      .then((res) => {
        setAvailablityAddress(val);
        customerId(res.data.customerUserId);
        setIsLoading(false);
        navigation.navigate("thirdScreen");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const ChangeTextHandler = (inputName, text) => {
    const lowerCaseText = text.toLowerCase();
    if (inputName == "input1") {
      const newVal = { ...val };
      newVal.input1 = text;
      if (lowerCaseText == addressList[0].locality.toLowerCase()) {
        newVal.input2 = addressList[0].postCode;
        newVal.input3 = addressList[0].streetName;
        newVal.input4 = addressList[0].streetNumber.toString();
      } else if (lowerCaseText == addressList[1].locality.toLowerCase()) {
        newVal.input2 = addressList[1].postCode;
        newVal.input3 = addressList[1].streetName;
        newVal.input4 = addressList[1].streetNumber.toString();
      } else if (lowerCaseText == addressList[2].locality.toLowerCase()) {
        newVal.input2 = addressList[2].postCode;
        newVal.input3 = addressList[2].streetName;
        newVal.input4 = addressList[2].streetNumber.toString();
      }
      setVal(newVal);
    }
  };

  return (
    <View style={styles.secondScreenContainer}>
      <Text style={styles.heading}>{t("adressScreenTitle")}</Text>
      <View style={styles.collections}>
        <Text style={styles.left}>{t("adressScreenDescription")}</Text>
        <TextInput
          placeholderTextColor="grey"
          value={val.input1}
          onChangeText={(text) => ChangeTextHandler("input1", text)}
          style={[styles.input, { borderColor: "#F2F4F9", outline: "none" }]}
          placeholder={t("place")}
          editable
        />
        <TextInput
          placeholderTextColor="grey"
          onChangeText={(text) => setVal({ ...val, input2: text })}
          style={[styles.input, { borderColor: "#F2F4F9", outline: "none" }]}
          placeholder={t("zip")}
          value={val.input2}
          editable
        />
        <TextInput
          placeholderTextColor="grey"
          onChangeText={(text) => setVal({ ...val, input3: text })}
          style={[styles.input, { borderColor: "#F2F4F9", outline: "none" }]}
          placeholder={t("street")}
          value={val.input3}
          editable
        />
        <TextInput
          placeholderTextColor="grey"
          onChangeText={(text) => setVal({ ...val, input4: text })}
          style={[styles.input, { borderColor: "#F2F4F9", outline: "none" }]}
          placeholder={t("houseNo")}
          value={val.input4}
          editable
        />

        <TextInput
          placeholderTextColor="grey"
          onChangeText={(text) => setVal({ ...val, input5: text })}
          style={[styles.input, { borderColor: "#F2F4F9", outline: "none" }]}
          placeholder={t("age")}
          editable
          maxLength={20}
        />
        <Button
          isDisabled={
            val.input1 && val.input2 && val.input3 && val.input4 && val.input5
              ? false
              : true
          }
          btnStyle={styles.btnStyle}
          onPressHandler={changeScreenAndTitle}
          textStyle={{ color: "#fff", fontWeight: "bold", textAlign: "center" }}
          buttonText={t("search")}
        />
      </View>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
    </View>
  );
};

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

export default connect(mapStateToProps, mapDispatchToProps)(SecondScreen);
