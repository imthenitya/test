import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
  BackHandler
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../../../../../style/styles";
import { connect } from "react-redux";
import { cartContent } from "../../../../../redux/settings";
import Button from "../../../../common/Button";
import { useTranslation } from "react-i18next";
import {
  viewCartContentCall,
  fetchInventoryDetails,
} from "../../../../constants/api";
import { useIsFocused } from "@react-navigation/native";

const ExistingUserHomeScreen = ({ navigation, customer_id, cartContent }) => {
  const [isLoading, setLoading] = useState(false);
  const [inventoryData, setInventoryData] = useState([]);
  const { t, i18n } = useTranslation();
  const isFocused = useIsFocused();

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

  useEffect(() => {
    if (isFocused) {
      getInventoryDetails();
    }
  }, [isFocused]);

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

  const getInventoryDetails = async () => {
    setLoading(true);
    await fetchInventoryDetails(customer_id)
      .then((res) => {
        setInventoryData(res.data.assets);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
        setInventoryData([]);
      });
  };
  const openOrderHistory = () => {
    navigation.navigate("OrderHistory");
  };
  const openInventory = async () => {
    await getInventoryDetails();
    navigation.navigate("InventoryScreen", {
      data: inventoryData,
    });
  };
  const addAService = () => {
    setLoading(true);
    const isPrimaryExisting = inventoryData.map((item) => {
      if (item.offerType == "PRIMARY") {
        return true;
      } else {
        return false;
      }
    })[0];
    if (isPrimaryExisting) {
      viewCartContentCall(customer_id)
        .then((res) => {
          const data = res.data;
          cartContent(data);
          setLoading(false);
          navigation.navigate("additionalPackage", {
            primaryAdded: true
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      setLoading(false);
      navigation.navigate("thirdScreen");
    }
  };
  return (
    <>
      <ScrollView style={{ backgroundColor: "#F2F4F9" }}>
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
        <TouchableOpacity
          style={[
            localStyles.container,
            { marginTop: 10, flexDirection: "row" },
          ]}
          onPress={addAService}
        >
          <Text style={{ fontWeight: "bold" }}>{t("addAService")}</Text>
          <Icon
            style={{ position: "absolute", top: 15, right: 15, fontSize: 18 }}
            name="chevron-forward-outline"
          ></Icon>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            localStyles.container,
            { marginTop: 10, flexDirection: "row" },
          ]}
          disabled={inventoryData.length == 0}
          onPress={openInventory}
        >
          <Text style={{ fontWeight: "bold" }}>{t("myServices")}</Text>
          <Icon
            style={{ position: "absolute", top: 15, right: 15, fontSize: 18 }}
            name="chevron-forward-outline"
          ></Icon>
        </TouchableOpacity>

        {hardcodedData.map((item, index) => {
          return (
            <View style={localStyles.container} key={index}>
              <Text style={{ fontWeight: "bold" }}>{item.title}</Text>

              <View style={{ marginTop: 10, marginBottom: 10 }}>
                <Text>{item.description}</Text>
              </View>
              <Button
                isDisabled={isLoading}
                btnStyle={styles.btnStyle}
                textStyle={styles.btnText2}
                buttonText={item.btnText}
              />
            </View>
          );
        })}
      </ScrollView>
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
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
  cartContent
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ExistingUserHomeScreen);
