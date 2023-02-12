import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView
} from "react-native";
import { supplementryDescriptions } from "../../../../constants/HardcodedTexts";
import { screenTitles,changePriceFormat } from "../../../../constants/helper";
import globalStyles from "../../../../../style/styles";
import Button from "../../../../common/Button";
import DeleteOffer from "../../../../common/DeleteOffer";
import { useTranslation } from "react-i18next";
import { DeleteInventory } from "../../../../constants/api";
import { connect } from "react-redux";

const SecondaryOfferDetail = ({ navigation, route, customer_id }) => {
  const [deletePopup, setDeletePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const { t, i18n } = useTranslation();

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

  const deleteMsg = [
    "Jeste li sigurni da želite otkazati ovu uslugu?",
    'Ako ponovo želite koristiti ovu uslugu, istu možete dodati preko opcije "Dodaj uslugu" na početnom ekranu.',
  ];
  return (
    <>
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

      <ScrollView style={{ backgroundColor: "#F2F4F9" }}>
        <View style={[styles.container, { marginTop: 10 }]}>
          <Text style={styles.content}>
            {t("price")}:{" "}
            <Text style={{ fontWeight: "bold", color: "black" }}>
              {changePriceFormat(route.params.details.prices[0].taxIncludedAmount)} EUR
            </Text>
          </Text>

          <Text style={[styles.content, { marginTop: 25 }]}>
            {t("serviceDetail")}:{" "}
          </Text>
          {supplementryDescriptions[
            screenTitles.SecondaryOfferDetail
          ].longDescription.map((item, i) => {
            return (
              <Text
                style={{ marginBottom: 5, padding: 8, fontSize: 14 }}
                key={i}
              >
                {item}
              </Text>
            );
          })}
          <Button
            isDisabled={isLoading}
            btnStyle={[globalStyles.btnStyle, { width: 120 }]}
            onPressHandler={() => setDeletePopup(!deletePopup)}
            textStyle={globalStyles.btnText2}
            buttonText={t("cancelService")}
          />
        </View>
      </ScrollView>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
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
    paddingBottom: 0,
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    customer_id: state.screenSettings.customer_id,
  };
};

export default connect(mapStateToProps)(SecondaryOfferDetail);
