import React, { useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
} from "react-native";
import { connect } from "react-redux";
import { setOfferId, displayInnerScreen } from "../../../../redux/settings";
import styles from "../../../../style/styles";
import { ProductDescriptions } from "../../../constants/HardcodedTexts";
import { showDetailsData } from "../../../constants/helper";
import Button from "../../../common/Button";
import { useTranslation } from "react-i18next";
import { changePriceFormat } from "../../../constants/helper";
const DetailScreen = ({ details_data, offer_id, buy, tempData }) => {
  const { t, i18n } = useTranslation();
  const buyHander = () => {
    if (!offer_id) {
      buy(details_data);
    } else {
      tempData(details_data);
    }
  };

  const concatPlan = () => {
    const name = [];
    details_data.productSpecifications.map((item) => {
      return name.push(item.name);
    });
    return name.join(" + ");
  };
  return (
    <ScrollView style={localStyles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
        {details_data.name}
      </Text>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{concatPlan()}</Text>

      <View style={{ marginTop: 10, marginBottom: 10 }}>
        {showDetailsData(
          ProductDescriptions[details_data.name].longDescription
        )}
      </View>
      <Text style={{ color: "grey", fontSize: 16 }}>Cijena</Text>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginTop:5 }}>{changePriceFormat(details_data.productOfferingPrices[0].price.taxIncludedAmount)} EUR</Text>
      {offer_id && offer_id == details_data.offerId ? (
        <Button
          btnStyle={styles.whiteBtnStyle}
          onPressHandler={buyHander}
          textStyle={styles.btnText1}
          buttonText={t("inTheBasket")}
        />
      ) : (
        <Button
          btnStyle={styles.btnStyle}
          onPressHandler={buyHander}
          textStyle={styles.btnText2}
          buttonText={t("buy")}
        />
      )}
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
});
const mapStateToProps = (state, myOwnProps) => {
  return {
    details_data: state.screenSettings.details_data,
    customer_id: state.screenSettings.customer_id,
    primary_offer_response: state.screenSettings.primary_offer_response,
    offer_id: state.screenSettings.offer_id,
  };
};
const mapDispatchToProps = {
  setOfferId,
  displayInnerScreen,
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(DetailScreen));
