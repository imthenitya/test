import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  BackHandler,
} from "react-native";
import { connect } from "react-redux";
import {
  setPrefilledAddress,
  cartContent,
  setOfferId,
  displayAdditionalOfferDetial,
  supplementryOffersDetails,
  customerId,
  setDetailsData,
  primaryOfferResponse
} from "../../../redux/settings";
import CheckBoxPopUp from "../../common/CheckBoxPopUp";
import AdditionalPackageDetails from "./subComponents/AdditionalPacakageDetails";
import { supplementryDescriptions } from "../../constants/HardcodedTexts";
import styles from "../../../style/styles";
import DiscountPopUp from "../../common/DiscountPopUp";
import AlertPopup from "../../common/AlertPopup";
import Button from "../../common/Button";
import DeleteOffer from "../../common/DeleteOffer";
import Cart from "../../common/Cart";
import { useTranslation } from "react-i18next";
import {
  getSuplementryOfferCall,
  addOfferToCartCall,
  viewCartContentCall,
  removeItemCall,
  submitOrderCall,
} from "../../constants/api";

const AdditionalPackage = ({
  displayAdditionalOfferDetial,
  customer_id,
  cart_content,
  cartContent,
  setPrefilledAddress,
  setOfferId,
  supplementryOffersDetails,
  setDetailsData,
  primaryOfferResponse,
  navigation,
  show_details,
  route,
  isExistingUser
}) => {
  const [offers, setOffers] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [deletepopup, setDeletePopup] = useState(false);
  const [discountPopUp, setDiscountPopup] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    fetchSupplementryOffers();
  }, []);

  useEffect(() => {
    const backAction = () => {
      if (!show_details) {
        displayAdditionalOfferDetial(false);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [show_details]);

  const fetchSupplementryOffers = () => {
    setIsLoading(true);
    getSuplementryOfferCall(customer_id)
      .then((res) => {
        setOffers(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.log("error");
      });
  };

  const additionalOfferHandler = (data) => {
    setIsLoading(true);
    let updatedResponse = JSON.parse(JSON.stringify(data));
    console.log(updatedResponse);
    if (updatedResponse.characteristics !== null) {
      updatedResponse.characteristics.forEach((item) => {
        item.characteristicValue = item.characteristicValues[0];
        delete item.characteristicValues;
      });
    }

    const addOffer = {
      userId: customer_id,
      offer: updatedResponse,
    };
    addOfferToCartCall(addOffer)
      .then((response) => {
        viewCartContentCall(customer_id)
          .then((res) => {
            cartContent(res.data);
            setIsLoading(false);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const removeAdditionalOffer = (offerId) => {

    setIsLoading(true);
    const itemId = cart_content.items.filter(
      (item) => item.productOffer.offerId == offerId
    )[0].itemId;

    removeItemCall(customer_id, itemId)
      .then((res) => {
        setIsLoading(false);
        cartContent(res.data);
      })
      .catch((err) => {
        console.log(err);
        setIsLoading(false);
      });
  };

  const showPopup = () => {
    setShowModal(!showModal);
  };
  const proceedToAddress = (input1, input2) => {
    setPrefilledAddress({ section1: input1, section2: input2 });
    showPopup();
    navigation.navigate("addressScreen");
  };
  const DeleteCart = () => {
    console.log("delete cart");
    removeItemCall(customer_id)
      .then((res) => {
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
  const showDetailsHandler = (data) => {
    supplementryOffersDetails(data);
    displayAdditionalOfferDetial(true);
  };
  const informationBtnClick = () => {
    setDiscountPopup(true);
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

  const discountArr = cart_content.rules
    ? cart_content.rules.map((item) => {
        return item.description;
      })
    : [];
  return (
    <>
      {show_details ? (
        <View style={styles.containerGrow}>
          <ScrollView>
            {offers.length > 0
              ? offers.map((item, index) => {
                  return (
                    <View
                      key={index}
                      style={
                        offers.length - 1 == index
                          ? {
                              backgroundColor: "#fff",
                              padding: 10,
                              margin: 10,
                              borderRadius: 10,
                              marginBottom: 60,
                            }
                          : {
                              backgroundColor: "#fff",
                              padding: 10,
                              margin: 10,
                              borderRadius: 10,
                            }
                      }
                    >
                      <Text
                        style={{
                          fontWeight: "bold",
                          fontSize: 16,
                          marginBottom: 10,
                        }}
                      >
                        {item.name}
                      </Text>
                      <Text style={{ fontSize: 14, marginBottom: 10 }}>
                        {supplementryDescriptions[item.name].shortDescription}
                      </Text>

                      <View style={styles.buttonStyleContainer}>
                        <Button
                          isDisabled={isLoading}
                          btnStyle={styles.whiteBtnStyle}
                          onPressHandler={() => showDetailsHandler(item)}
                          textStyle={styles.btnText1}
                          buttonText={t("detail")}
                        />

                        {cart_content.items ? (
                          cart_content.items.findIndex(
                            (x) => x.productOffer.offerId === item.offerId
                          ) == -1 ? (
                            <Button
                              isDisabled={isLoading}
                              btnStyle={styles.btnStyle}
                              onPressHandler={() =>
                                additionalOfferHandler(item)
                              }
                              textStyle={styles.btnText2}
                              buttonText={t("choose")}
                            />
                          ) : (
                            <Button
                              isDisabled={isLoading}
                              btnStyle={styles.whiteBtnStyle}
                              onPressHandler={() =>
                                removeAdditionalOffer(item.offerId)
                              }
                              textStyle={styles.btnText1}
                              buttonText={t("selected")}
                              iconName="checkmark-outline"
                            />
                          )
                        ) : null}
                      </View>
                    </View>
                  );
                })
              : 
              isExistingUser && !isLoading?
              <View style={styles.emptyContainer}>
                <Text style={styles.emptyScreen}>
                    {t("emptyScreen")}
               </Text>
               </View>
               :
               null
        }
          </ScrollView>

          {JSON.stringify(cart_content) !== "{}" && offers.length > 0 ? (
            <Cart
              customerId={customer_id}
              removeAdditionalOffer={removeAdditionalOffer}
              ShowDeletePopUp={ShowDeletePopUp}
              informationBtnClick={informationBtnClick}
              showPopup={showPopup}
              setShowAlert={setShowAlert}
              isExistingUser={isExistingUser}
              isPrimaryAlreadyAdded={
                route.params && route.params.primaryAdded ? true : false
              }
            />
          ) : null}

          {isLoading ? (
            <View style={styles.loading}>
              <ActivityIndicator size="large" />
            </View>
          ) : null}

          <CheckBoxPopUp
            showModal={showModal}
            closeModal={showPopup}
            proceed={proceedToAddress}
          />

          {discountPopUp ? (
            <DiscountPopUp msg={discountArr} close={setDiscountPopup} />
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
        </View>
      ) : (
        <AdditionalPackageDetails />
      )}
    </>
  );
};

const mapStateToProps = (state, myOwnProps) => {
  return {
    customer_id: state.screenSettings.customer_id,
    cart_content: state.screenSettings.cart_content,
    show_details: !state.screenSettings.addition_offer_detail,
    isExistingUser: state.screenSettings.isExistingUser
  };
};
const mapDispatchToProps = {
  setPrefilledAddress,
  cartContent,
  setOfferId,
  displayAdditionalOfferDetial,
  supplementryOffersDetails,

  customerId,
  setDetailsData,
  primaryOfferResponse
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(AdditionalPackage));
