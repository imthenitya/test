import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { ProductDescriptions } from "../../../../constants/HardcodedTexts";
import { showDetailsData, screenTitles,changePriceFormat } from "../../../../constants/helper";
import globalStyles from "../../../../../style/styles";
import Button from "../../../../common/Button";
import DeleteOffer from "../../../../common/DeleteOffer";
import { useTranslation } from "react-i18next";
import { DeleteInventory } from "../../../../constants/api";
import { connect } from "react-redux";

const PrimaryOfferDetail = ({ navigation, route, customer_id }) => {
  const [showDetails, setShowDetails] = useState(false);
  const [deletePopup, setDeletePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showContract, setShowContract] = useState(false);
  const deleteMsg = [
    "Jeste li sigurni da želite otkazati ovu uslugu?",
    "Otkazivanjem ove usluge bit će otkazane i sve dodatne usluge.",
  ];
  const { t, i18n } = useTranslation();

  useEffect(() => {
    route.params.details.characteristics.map((item) => {
      if (
        item.name == "Contract prolongation" ||
        item.name == "contract prolongation"
      ) {
        setShowContract(item.characteristicValues[0].value);
      }
    });
  }, []);

  const deleteOffer = () => {
    setIsLoading(true);
    DeleteInventory(customer_id, route.params.details.assetId)
      .then((res) => {
        setIsLoading(false);
        setDeletePopup(false);
        navigation.navigate("InventoryScreen");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: "#F2F4F9" }}>
        <View style={styles.box}>
          <Text style={styles.content}>
            {t("includedService")}:{" "}
            <Text style={styles.blackBold}>{route.params.details.name}</Text>
          </Text>
          {showContract ? (
            <Text style={styles.content}>
              {t("contractualObligation")}:{" "}
              <Text style={styles.blackBold}>{showContract} mj</Text>
            </Text>
          ) : null}
          <Text style={styles.content}>
            {t("price")}:{" "}
            <Text style={styles.blackBold}>
              {changePriceFormat(route.params.details.prices[0].taxIncludedAmount)} EUR
            </Text>
          </Text>

          <TouchableOpacity
            style={{ flexDirection: "row" }}
            onPress={() => setShowDetails(!showDetails)}
          >
            <Text style={styles.detail}>{t("detail")}</Text>
            {showDetails ? (
              <Icon
                style={{ top: 7, color: "#007FAF", fontSize: 20 }}
                name="chevron-up-outline"
              ></Icon>
            ) : (
              <Icon
                style={{ top: 7, color: "#007FAF", fontSize: 20 }}
                name="chevron-down-outline"
              ></Icon>
            )}
          </TouchableOpacity>

          {showDetails ? (
            <View style={{ marginBottom: 10, padding: 8 }}>
              {showDetailsData(
                ProductDescriptions[screenTitles.PrimaryOfferDetail]
                  .longDescription
              )}
            </View>
          ) : null}

          <Button
            isDisabled={isLoading}
            btnStyle={[globalStyles.btnStyle, { width: 120 }]}
            onPressHandler={() => setDeletePopup(!deletePopup)}
            textStyle={globalStyles.btnText2}
            buttonText={t("cancelService")}
          />
        </View>
      </ScrollView>
      {deletePopup ? (
        <DeleteOffer
          heading={true}
          msgArr={deleteMsg}
          btnTexts={[t("cancelit"), t("giveItUp")]}
          onPressHandlerEvent={() => deleteOffer()}
          isLoading={isLoading}
          close={setDeletePopup}
        />
      ) : null}
    </>
  );
};

const styles = StyleSheet.create({
  box: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 14,
    margin: 12,
  },
  content: {
    fontWeight: "bold",
    fontSize: 14,
    color: "grey",
    padding: 8,
  },
  detail: {
    fontWeight: "bold",
    fontSize: 14,
    color: "#007FAF",
    padding: 8,
  },
  blackBold: { fontWeight: "bold", color: "black" },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    customer_id: state.screenSettings.customer_id,
  };
};

export default connect(mapStateToProps)(PrimaryOfferDetail);
