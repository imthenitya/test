import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ScrollView
} from "react-native";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "../../style/styles";
import Button from "./Button";
import { changePriceFormat } from "../constants/helper";
import { useTranslation } from "react-i18next";
const Cart = ({
  ShowDeletePopUp,
  cart_content,
  informationBtnClick,
  isExistingUser,
  showPopup,
  removeAdditionalOffer,
  setShowAlert,
  isPrimaryAlreadyAdded
}) => {
  const [showExpandedCart, setShowExpandedCart] = useState(false);
  const { t, i18n } = useTranslation();
console.log(isPrimaryAlreadyAdded)
  return (
    <>
      {!showExpandedCart ? ( // when the Cart is closed
        <View style={localStyles.cartBox}>
          <TouchableOpacity
            style={localStyles.iconContainer}
            onPress={() => setShowExpandedCart(!showExpandedCart)}
          >
            <Icon style={localStyles.cartIcon} name="cart-outline"></Icon>
          </TouchableOpacity>
          <View style={localStyles.cartContent}>
            <Text style={localStyles.cartTextLeft}>{t("total")}</Text>
            <Text style={localStyles.cartTextRight}>
              {cart_content.total
                ? changePriceFormat(cart_content.total.amountBeforeDiscount +
                  cart_content.total.discount) +
                  " EUR"
                : ""}
            </Text>
          </View>
        </View>
      ) : (
        // when the Cart is open
        <View style={[localStyles.cartBox, { height: "auto" }]}>
          <TouchableOpacity
            style={localStyles.iconContainer}
            onPress={() => setShowExpandedCart(!showExpandedCart)}
          >
            <Icon
              style={localStyles.cartIcon}
              name="chevron-down-outline"
            ></Icon>
          </TouchableOpacity>

          <ScrollView>
            <View style={[localStyles.cartContent, { marginBottom: 50 }]}>
              <Text style={localStyles.cartTextLeft}>{t("yourchoice")}</Text>
              <View
                style={{ flex: 1, height: 1, backgroundColor: "grey", top: 50 }}
              />
            </View>

            {cart_content.items
              ? cart_content.items.map((item, index) => {
                  let price =
                    item.productOffer.productOfferingPrices[0].price
                      .taxIncludedAmount 

                  if (item.productOffer.productOfferingPrices[1]) {
                    price =
                      item.productOffer.productOfferingPrices[0].price
                        .taxIncludedAmount +
                      item.productOffer.productOfferingPrices[1].price
                        .taxIncludedAmount
                  }
                  return (
                    <View
                      key={index}
                      style={{
                        flexDirection: "row",
                        borderColor: "grey",
                        borderBottomWidth: 1,
                      }}
                    >
                      <View style={{ flex: 1 }}>
                        <Text style={localStyles.textStyle1}>
                          {item.productOffer.name}
                        </Text>
                      </View>
                      <Text
                        style={
                          index == 0 && !isExistingUser
                            ? [localStyles.textStyle1, { fontWeight: "bold" }]
                            : 
                            index == 0 && isExistingUser && !isPrimaryAlreadyAdded
                            ? [localStyles.textStyle1, { fontWeight: "bold" }]
                            :
                            localStyles.textStyle1
                        }
                      >
                        {changePriceFormat(price)} EUR
                        <Icon
                          onPress={
                            index == 0 && !isExistingUser
                            ? ShowDeletePopUp
                            :
                            index == 0 && isExistingUser && !isPrimaryAlreadyAdded
                            ? ShowDeletePopUp
                            : () =>
                                  removeAdditionalOffer(
                                    item.productOffer.offerId
                                  )
                          }
                          style={{ fontSize: 16 }}
                          name="close-outline"
                        ></Icon>
                      </Text>
                    </View>
                  );
                })
              : null}

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={localStyles.textStyle1}>{t("total")}</Text>
              </View>
              <Text style={[localStyles.textStyle1, { marginRight: 20 }]}>
                {changePriceFormat(cart_content.total.amountBeforeDiscount) + " EUR"}
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={[localStyles.textStyle1, { marginTop: 0 }]}>
                  {t("discount")}
                </Text>
              </View>
              <Text
                style={{
                  margin: 10,
                  marginTop: 0,
                  marginRight: 10,
                  fontSize: 15,
                }}
              >
                {changePriceFormat(Math.abs(cart_content.total.discount)) +' EUR'}
                <TouchableOpacity
                  disabled={cart_content.total.discount == 0}
                  onPress={informationBtnClick}
                >
                  <Icon
                    style={localStyles.informationBtn}
                    name="information-circle-outline"
                  />
                </TouchableOpacity>
              </Text>
            </View>

            <View style={{ flexDirection: "row" }}>
              <View style={{ flex: 1 }}>
                <Text style={localStyles.totalTextStyle}>{t("total")}</Text>
              </View>
              <Text style={localStyles.totalTextStyle}>
                {changePriceFormat(cart_content.total.amountBeforeDiscount +
                  cart_content.total.discount) +
                  " EUR "}
              </Text>
            </View>

            <View style={[styles.buttonStyleContainer, { margin: 15 }]}>
              {isExistingUser ? (
                <Button
                  isDisabled={cart_content.items.length==0}
                  onPressHandler={() => setShowAlert(true)}
                  btnStyle={[styles.btnStyle, { width: 150, marginBottom: 10 }]}
                  textStyle={styles.btnText2}
                  buttonText={t("completeTheOrder")}
                />
              ) : (
                <Button
                  btnStyle={[styles.btnStyle, { marginBottom: 10 }]}
                  onPressHandler={showPopup}
                  textStyle={styles.btnText2}
                  buttonText={t("further")}
                />
              )}
            </View>
          </ScrollView>
        </View>
      )}
    </>
  );
};

const localStyles = StyleSheet.create({
  cartBox: {
    height: 50,
    backgroundColor: "#fff",
    position: "absolute",
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 10,
    display: "flex",
  },
  cartIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: "hidden",
    backgroundColor: "#E20074",
    fontSize: 50,
    top: -25,
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    color: "#fff",
  },
  iconContainer: {
    display: "flex",
    alignItems: "center",
  },
  cartContent: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginHorizontal: 1,
    marginTop: 5,
  },
  informationBtn: {
    position: "relative",
    top: 4,
    fontSize: 18,
    color: "#E20074",
    left: 5,
  },
  cartTextLeft: {
    position: "absolute",
    left: 10,
    top: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  cartTextRight: {
    position: "absolute",
    right: 20,
    top: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
  textStyle1: { margin: 10, fontSize: 15 },
  totalTextStyle: {
    margin: 10,
    fontWeight: "bold",
    fontSize: 18,
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    customer_id: state.screenSettings.customer_id,
    cart_content: state.screenSettings.cart_content,
    addition_offer_detail: state.screenSettings.addition_offer_detail,
  };
};

export default connect(mapStateToProps)(React.memo(Cart));
