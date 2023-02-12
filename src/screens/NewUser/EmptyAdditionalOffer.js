import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View
} from "react-native";
import { useTranslation } from "react-i18next";
import { connect } from "react-redux";
import Icon from "react-native-vector-icons/Ionicons";
import { changePriceFormat } from "../../constants/helper";
import Button from "../../common/Button";
import CheckBoxPopUp from "../../common/CheckBoxPopUp";
import { removeItemCall , submitOrderCall } from "../../constants/api";
import {
  setPrefilledAddress,
  cartContent,
  setOfferId,
  setDetailsData,
  primaryOfferResponse,
  isExistingUser
} from "../../../redux/settings";
import AlertPopup from "../../common/AlertPopup";
import DeleteOffer from "../../common/DeleteOffer";
import styles from "../../../style/styles";

const EmptyAdditionalOffer = ({
  cart_content,
  setPrefilledAddress,
  navigation,
  cartContent,
  setOfferId,
  customer_id,
  route,
  setDetailsData,
  primaryOfferResponse
}) => {
  const [showModal, setShowModal] = useState(false);
  const [deletepopup, setDeletePopup] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { t, i18n } = useTranslation();

  const showPopup = () => {
    setShowModal(!showModal);
  };

  const proceedToAddress = (input1, input2) => {
    setPrefilledAddress({ section1: input1, section2: input2 });
    showPopup();
    navigation.navigate("addressScreen");
  };

  const DeleteCart = () => {
    setIsLoading(true);
    removeItemCall(customer_id)
      .then((res) => {
        setIsLoading(false);
        cartContent({});
        setOfferId("");
        navigation.navigate("thirdScreen");
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const ShowDeletePopUp = () => {
    setDeletePopup(true);
  };

  const submitExistingUser = () => {
    setIsLoading(true);
    submitOrderCall(customer_id)
      .then((res) => {
       cartContent({});
       setDetailsData({});
       setOfferId("");
       primaryOfferResponse([]);

        setIsLoading(false);
        setShowAlert(false);
        navigation.navigate("ExistingUserScreens");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      {JSON.stringify(cart_content) !== "{}" ? (
        <View style={localStyles.container}>
          <Text style={[localStyles.yourChoice]}>{t("yourchoice")}</Text>

          <View style={localStyles.primaryOffer}>
            <View style={{ flex: 1 }}>
              <Text style={localStyles.textStyle1}>
                {cart_content.items[0].productOffer.name}
              </Text>
            </View>
            <Text style={[localStyles.textStyle1, { fontWeight: "bold" }]}>
              {changePriceFormat(
                cart_content.items[0].productOffer.productOfferingPrices[0]
                  .price.taxIncludedAmount
              )}{" "}
              EUR
              <Icon
                onPress={ShowDeletePopUp}
                style={{ fontSize: 16 }}
                name="close-outline"
              />
            </Text>
          </View>

          <View style={{ flexDirection: "row" }}>
            <View style={{ flex: 1 }}>
              <Text style={localStyles.textStyle2}>{t("total")}</Text>
            </View>
            <Text style={localStyles.textStyle2}>
              {changePriceFormat(
                cart_content.items[0].productOffer.productOfferingPrices[0]
                  .price.taxIncludedAmount
              )}{" "}
              EUR
            </Text>
          </View>

          {!isExistingUser?<Button
            btnStyle={[styles.btnStyle, { marginBottom: 10 }]}
            onPressHandler={showPopup}
            textStyle={styles.btnText2}
            buttonText={t("further")}
          />
        :
                <Button
                  isDisabled={cart_content.items.length==0}
                  onPressHandler={() => setShowAlert(true)}
                  btnStyle={[styles.btnStyle, { width: 150, marginBottom: 10 }]}
                  textStyle={styles.btnText2}
                  buttonText={t("completeTheOrder")}
                />
          }
          <CheckBoxPopUp
            showModal={showModal}
            closeModal={showPopup}
            proceed={proceedToAddress}
          />
        
        {showAlert ? (
            <AlertPopup
              bold={true}
              onPressProps={submitExistingUser}
              showAlert={showAlert}
              msg={t("orderSent")}
              isLoading={isLoading}
              btnText={t("ok")}
            />
          ) : null}

          {deletepopup ? (
            <DeleteOffer
              isLoading={isLoading}
              msgArr={[t("addPackageRemove"), t("stillWantToRemove")]}
              btnTexts={[t("removeIt"), t("giveItUp")]}
              onPressHandlerEvent={DeleteCart}
              close={setDeletePopup}
            />
          ) : null}
        </View>
      ) : null}
    </>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#FFF",
  },
  yourChoice: {
    textAlign: "left",
    fontSize: 18,
    borderBottomColor: "black",
    padding: 15,
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  primaryOffer: {
    flexDirection: "row",
    borderBottomColor: "#ccc",
    borderBottomWidth: 1,
  },
  textStyle1: { margin: 10, fontSize: 15 },
  textStyle2: { margin: 10, fontSize: 18, fontWeight: "bold" },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    cart_content: state.screenSettings.cart_content,
    customer_id: state.screenSettings.customer_id,
    isExistingUser: state.screenSettings.isExistingUser
  };
};
const mapDispatchToProps = {
  setPrefilledAddress,
  cartContent,
  setOfferId,
  setDetailsData,
  primaryOfferResponse
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(EmptyAdditionalOffer));
