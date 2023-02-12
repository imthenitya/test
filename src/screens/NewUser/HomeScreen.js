import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  BackHandler
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../../../style/styles";
import Button from "../../common/Button";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import {
  setAvailablityAddress,
  displayInnerScreen,
  setPrefilledAddress,
  cartContent,
  setDetailsData,
  setOfferId,
  primaryOfferResponse } from "../../../redux/settings";
import { useIsFocused } from "@react-navigation/native";

const HomeScreen = ({navigation}) => {
  const hardcodedData = [
    {
      title: "Magenta 1 pogodnosti",
      description:
        "U MAX Biram paketima svaki mjesec birajte između četiri TV paketa: MAX Arena, HBO Premium, Prošireni paket, Sport Mix paket, a dostupno vam je i dodatnih 20 sati Snimalice.",
      btnText: "Zanima me",
    },
    {
      title: "Dobre pogodnosti naših partnera",
      description:
        "U suradnji s našim partnerima redovito pripremamo posebne pogodnosti i popuste.",
      btnText: "Detalji",
    },
    {
      title: "Ekskluzivno na MAXSport-u",
      description:
        "Ne propustite utakmice SuperSport HNL-a i baš sve druge utakmice hrvatskog nogometa na MAXSport kanalima. Prebacite na 12. program MAXtv-a i uživajte u utakmicama.",
      btnText: "Detalji",
    },
  ];
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

  const openOrderHistory = () => {
    setAvailablityAddress({});
    displayInnerScreen(false);
    setPrefilledAddress({});
    cartContent({});
    setDetailsData({});
    setOfferId("");
    primaryOfferResponse([]);
    navigation.navigate("OrderHistory");
  };

  return (
    <>
     <TouchableOpacity
          style={[
            localStyles.container,
            { marginTop: 10, flexDirection: "row" },
          ]}
          onPress={openOrderHistory}
        >
          <Text style={{ fontWeight: "bold" }}>{t("requestStatus")}</Text>
          <Icon
            style={{ position: "absolute", top: 15, right: 15, fontSize: 18 }}
            name="chevron-forward-outline"
          ></Icon>
      </TouchableOpacity>

      {/* <View
        style={[localStyles.container, { marginTop: 15, flexDirection: "row" }]}
      >
        <Text style={{ fontWeight: "bold" }}>{t("requestStatus")}</Text>
        <Icon
          style={{ position: "absolute", top: 10, right: 15, fontSize: 18 }}
          name="chevron-forward-outline"
        ></Icon>
      </View> */}

      {hardcodedData.map((item, index) => {
        return (
          <View style={localStyles.container} key={index}>
            <Text style={{ fontWeight: "bold" }}>{item.title}</Text>

            <View style={{ marginTop: 10, marginBottom: 10 }}>
              <Text>{item.description}</Text>
            </View>
            <Button
              btnStyle={styles.btnStyle}
              textStyle={styles.btnText2}
              buttonText={item.btnText}
            />
          </View>
        );
      })}
    </>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    margin: 8,
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    customer_id: state.screenSettings.customer_id,
  };
};

const mapDispatchToProps = {
  setAvailablityAddress,
  displayInnerScreen,
  setPrefilledAddress,
  cartContent,
  setDetailsData,
  setOfferId,
  primaryOfferResponse,
};

export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);

