import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  ActivityIndicator,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import AlertPopup from "../../common/AlertPopup";
import styles from "../../../style/styles";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Button from "../../common/Button";
import { useTranslation } from "react-i18next";
import { submitOrderCall } from "../../constants/api";

const AddressScreen = ({
  availablity_address,
  prefilled_address,
  navigation,
  customer_id
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();

  const [showAlert, setShowAlert] = useState(false);
  const [personalData, setPersonalData] = useState([
    { placeholder: t("name"), value: "" },
    { placeholder: t("surname"), value: "" },
    { placeholder: t("dob"), value: "20.12.1980" },
    { placeholder: t("OIB"), value: "25046635959" },
    { placeholder: t("noofId"), value: "115501830" },

    {
      placeholder: t("place"),
      value: prefilled_address.section1 ? availablity_address.input1 : "",
    },
    {
      placeholder: t("zip"),
      value: prefilled_address.section1 ? availablity_address.input2 : "",
    },
    {
      placeholder: t("street"),
      value: prefilled_address.section1 ? availablity_address.input3 : "",
    },
    {
      placeholder: t("houseNo"),
      value: prefilled_address.section1 ? availablity_address.input4 : "",
    },

    { placeholder: t("contactNo"), value: "0991234321" },
    { placeholder: t("contactEmail"), value: "new.user@t.ht.hr" },
  ]);
  const [billingAddress, setBillingAddress] = useState([
    {
      placeholder: t("place"),
      value: prefilled_address.section2 ? availablity_address.input1 : "",
    },
    {
      placeholder: t("zip"),
      value: prefilled_address.section2 ? availablity_address.input2 : "",
    },
    {
      placeholder: t("street"),
      value: prefilled_address.section2 ? availablity_address.input3 : "",
    },
    {
      placeholder: t("houseNo"),
      value: prefilled_address.section2 ? availablity_address.input4 : "",
    },
  ]);
  const [installationAddress, setInstallationAddress] = useState([
    { placeholder: t("place"), value: availablity_address.input1 },
    { placeholder: t("zip"), value: availablity_address.input2 },
    { placeholder: t("street"), value: availablity_address.input3 },
    { placeholder: t("houseNo"), value: availablity_address.input4 },
    { placeholder: t("floor"), value: "1" },
  ]);
  const personalDataHandler = (val, index) => {
    const data = [...personalData];
    data[index].value = val;
    setPersonalData(data);
  };

  const billingDataHandler = (val, index) => {
    const data = [...billingAddress];
    data[index].value = val;
    setBillingAddress(data);
  };
  const installationAddressHandler = (text, i) => {
    const data = [...installationAddress];
    data[i].value = text;
    setInstallationAddress(data);
  };
  const goTohomePage = () => {
    setIsLoading(true);
    submitOrderCall(customer_id)
      .then((res) => {
        retriveData("customerId", customer_id);
      })
      .catch((err) => {
        console.log(err);
      });
    setShowAlert(false);
  };
  const retriveData = async (key, data) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (value == null || value.length == 0) {
        saveData(key, [data]);
      } else {
        const arr = JSON.parse(value);
        arr.push(data);
        console.log(arr);
        saveData(key, arr);
      }
      setIsLoading(false);
      navigation.navigate("HomeScreen"); // Redirect to homeScreen when Customer ID is stored in device
    } catch (error) {
      console.log(error);
    }
  };
  const saveData = async (key, data) => {
    const str = JSON.stringify(data);
    try {
      await AsyncStorage.setItem(key, str);
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <View style={localStyles.container}>
      <ScrollView style={localStyles.collections}>
        <Text style={localStyles.title}>{t("dataOfthePerson")}</Text>
        {personalData.map((item, index) => {
          return (
            <TextInput
              placeholderTextColor="grey"
              key={index}
              value={item.value}
              onChangeText={(text) => personalDataHandler(text, index)}
              style={localStyles.input}
              placeholder={item.placeholder}
              editable
              maxLength={20}
            />
          );
        })}
        <Text style={localStyles.title}>{t("addressAccount")}</Text>
        {billingAddress.map((item, index) => {
          return (
            <TextInput
              placeholderTextColor="grey"
              key={index}
              value={item.value}
              onChangeText={(text) => billingDataHandler(text, index)}
              style={localStyles.input}
              placeholder={item.placeholder}
              editable
              maxLength={20}
            />
          );
        })}
        <Text style={localStyles.title}>{t("portAddress")}</Text>
        {installationAddress.map((item, index) => {
          if (index < installationAddress.length - 2) {
            return (
              <TextInput
                placeholderTextColor="grey"
                key={index}
                value={item.value}
                disabled={true}
                style={[localStyles.input, { backgroundColor: "#F7F3F3" }]}
                placeholder={item.placeholder}
                editable
                maxLength={20}
              />
            );
          }
        })}
        <View style={styles.buttonStyleContainer}>
          <TextInput
            disabled={true}
            placeholderTextColor="grey"
            style={[
              localStyles.input,
              { backgroundColor: "#F7F3F3", width: "40%" },
            ]}
            placeholder={installationAddress[3].placeholder}
            value={installationAddress[3].value}
            maxLength={20}
          />
          <TextInput
            placeholderTextColor="grey"
            style={[localStyles.input, { width: "40%" }]}
            onChangeText={(text) =>
              installationAddressHandler(text, installationAddress.length - 1)
            }
            placeholder={installationAddress[4].placeholder}
            value={installationAddress[4].value}
            maxLength={20}
          />
        </View>

        <Button
          isDisabled={isLoading}
          btnStyle={[styles.btnStyle, { width: 150, marginBottom: 50 }]}
          onPressHandler={() => setShowAlert(true)}
          textStyle={styles.btnText2}
          buttonText={t("sendOrder")}
        />
      </ScrollView>
      {showAlert ? (
        <AlertPopup
          bold={true}
          onPressProps={goTohomePage}
          showAlert={showAlert}
          msg={t("orderSent")}
          btnText={t("ok")}
        />
      ) : null}

      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
    </View>
  );
};
const localStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F2F4F9",
    alignItems: "center",
    justifyContent: "center",
  },
  collections: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    width: "90%",
    height: "95%",
  },
  title: {
    paddingLeft: 15,
    fontSize: 16,
    fontWeight: "bold",
  },
  input: {
    color: "black",
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 8,
  },
  btn: {
    padding: 20,
    paddingTop: 10,
    paddingBottom: 10,
    borderRadius: 8,
    marginBottom: 55,
    backgroundColor: "#E20074",
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    availablity_address: state.screenSettings.availablity_address,
    prefilled_address: state.screenSettings.prefilled_address,
    customer_id: state.screenSettings.customer_id,
  };
};

export default connect(mapStateToProps)(AddressScreen);
