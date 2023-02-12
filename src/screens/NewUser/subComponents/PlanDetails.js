import React,{useEffect , useState} from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { connect } from "react-redux";
import { setOfferId } from "../../../../redux/settings";
import styles from "../../../../style/styles";
import { ProductDescriptions } from "../../../constants/HardcodedTexts";
import Button from "../../../common/Button";
import { useTranslation } from "react-i18next";
import { changePriceFormat } from "../../../constants/helper";
const PlanDetails = ({
  tempData,
  setOfferId,
  offer_id,
  customer_id,
  data,
  ...props
}) => {

  const [price, setPrice] = useState(0)

  useEffect(()=>{
  let initPrice = 0;
  data.productOfferingPrices.forEach((item) => {
    initPrice = initPrice + item.price.taxIncludedAmount;
  });
  setPrice(changePriceFormat(initPrice) + ' EUR')
  },[])

const { t, i18n } = useTranslation();

  const concatPlan = () => {
    const name = [];
    data.productSpecifications.map((item) => {
      return name.push(item.name);
    });
    return name.join(" + ");
  };

  const buybtnClick = () => {
    const offer = data.name;
    if (!offer_id) {
      props.buy(data);
    } else {
      tempData(data);
    }
  };

  return (
    <View style={localStyles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 16 }}>{data.name}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 18, marginTop: 10 }}>
        {concatPlan()}
      </Text>
      <Text style={{ color: "#262626", marginTop: 10 }}>{t("price")}</Text>
      <Text style={{ fontWeight: "bold", fontSize: 18 }}>
        {price ? price : ""}
      </Text>

      <View style={{ marginTop: 10, marginBottom: 10 }}>
        {ProductDescriptions[data.name].shortDescription.map((item, index) => {
          return <Text key={index}>{item}</Text>;
        })}
      </View>

      <View style={styles.buttonStyleContainer}>
        <Button
          btnStyle={styles.btnStyle}
          onPressHandler={() => props.showDetails(data)}
          textStyle={styles.btnText2}
          buttonText={t("detail")}
        />

        <Button
          btnStyle={
            offer_id == data.offerId ? styles.whiteBtnStyle : styles.btnStyle
          }
          onPressHandler={buybtnClick}
          textStyle={
            offer_id == data.offerId ? styles.btnText1 : styles.btnText2
          }
          buttonText={offer_id == data.offerId ? t("inTheBasket") : t("buy")}
        />
      </View>
    </View>
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
    price_val: state.screenSettings.price_val,
    offer_id: state.screenSettings.offer_id,
    customer_id: state.screenSettings.customer_id,
  };
};
const mapDispatchToProps = {
  setOfferId
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(PlanDetails));
