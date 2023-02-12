import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator,
  BackHandler,
} from "react-native";
import { connect } from "react-redux";
import PlanDetails from "./subComponents/PlanDetails";
import DetailScreen from "./subComponents/DetailScreen";
import styles from "../../../style/styles";
import {
  displayInnerScreen,
  cartContent,
  setDetailsData,
  primaryOfferResponse,
  setOfferId,
} from "../../../redux/settings";
import DeleteOffer from "../../common/DeleteOffer";
import { useTranslation } from "react-i18next";
import {
  getPlanDetailsCall,
  addOfferToCartCall,
  viewCartContentCall,
  removeItemCall,
  getSuplementryOfferCall
} from "../../constants/api";

const ThirdScreen = ({
  show_screen,
  cartContent,
  setDetailsData,
  displayInnerScreen,
  customer_id,
  primaryOfferResponse,
  primary_offer_response,
  setOfferId,
  navigation,
  offer_id,
  route
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [addNextOffer, setAddNextOffer] = useState("");

  const { t, i18n } = useTranslation();

  useEffect(() => {
    // Handling physical device Back button
    const backAction = () => {
      if (show_screen) {
        displayInnerScreen(false);
        return true;
      }
    };
    const backHandler = BackHandler.addEventListener(
      "hardwareBackPress",
      backAction
    );
    return () => backHandler.remove();
  }, [show_screen]);

  useEffect(() => {
    if (Object.keys(primary_offer_response).length === 0) {
      setIsLoading(true);
      getPlanDetailsCall(customer_id)
        .then((res) => {
          setIsLoading(false);
          primaryOfferResponse(res.data);
        })
        .catch((err) => {
          console.log("error");
        });
    }
  }, []);

  const showDetails = (data) => {
    setDetailsData(data);
    displayInnerScreen(true);
  };

  const addOfferToCart = (data) => {
    let selectedOffer = JSON.parse(JSON.stringify(data));

    // Changing characteristicValues to make it compatable with API
    selectedOffer.characteristics.forEach((item) => {
      item.characteristicValue = item.characteristicValues[0];
      delete item.characteristicValues;
    });

    const addOffer = {
      userId: customer_id,
      offer: selectedOffer,
    };
    addOfferToCartCall(addOffer).then((res) => {
      setOfferId(data.offerId);
      viewCartContentCall(customer_id)
        .then((res) => {
          cartContent(res.data);
          setAddNextOffer("");
          setShowDelete(false);
          getSuplementryOfferCall(customer_id).then(res=>{
            displayInnerScreen(false);
            setIsLoading(false);
            if(res.data.length>0){
              navigation.navigate("additionalPackage");
            }
            else{
              navigation.navigate("EmptyAdditionalOffer");
            }
          }).catch((err) => {
            if(err.response.status==404){
              displayInnerScreen(false);
              setIsLoading(false);
              navigation.navigate("EmptyAdditionalOffer");
            }
          });
          
        })
        .catch((err) => {
          console.log(err);
        });
    });
  };

  const buyHandler = (data) => {
    setIsLoading(true);

    if (!offer_id) {
      removeItemCall(customer_id).then(res=>{
        addOfferToCart(data);
      }).catch(err=>{
        addOfferToCart(data);
      })
     
    } else if (offer_id == data.offerId) {
      removeItemCall(customer_id)
        .then((res) => {
          setAddNextOffer("");
          setOfferId("");
          setShowDelete(false);
          setIsLoading(false);
        })
        .catch((err) => {
          console.log(err);
        });
    } else {
      removeItemCall(customer_id)
        .then((res) => {
          addOfferToCart(data);
          setShowDelete(false);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };
  const deleteAllCart = () => {
    buyHandler(addNextOffer); // After confirming Yes on Delete button
  };

  const setTempDeleteData = (data) => {
    setShowDelete(true);
    setAddNextOffer(data);
  };
  const closeDeletePopUp = () => {
    setAddNextOffer("");
    setShowDelete(false);
  };
  return (
    <View style={localStyles.container}>
      {!show_screen ? (
        <ScrollView>
          {primary_offer_response.length > 0 ? (
            primary_offer_response.map((item, index) => {
              return (
                <React.Fragment key={index}>
                  <PlanDetails
                    navigation={navigation}
                    data={item}
                    showDetails={showDetails}
                    tempData={setTempDeleteData}
                    buy={buyHandler}
                  />
                </React.Fragment>
              );
            })
          ) : !isLoading ? (
            <Text style={styles.emptyScreen}>
              {t("addressNotExist")}
            </Text>
          ) : null}
        </ScrollView>
      ) : (
        <DetailScreen tempData={setTempDeleteData} buy={buyHandler} />
      )}
      {isLoading ? (
        <View style={styles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
      {showDelete ? (
        <DeleteOffer
          isLoading={isLoading}
          msgArr={[t("addPackageRemove"), t("stillWantToRemove")]}
          btnTexts={[t("removeIt"), t("giveItUp")]}
          onPressHandlerEvent={deleteAllCart}
          close={closeDeletePopUp}
        />
      ) : null}
    </View>
  );
};

const localStyles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 10,
    backgroundColor: "#F2F4F9",
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    show_screen: state.screenSettings.show_screen,
    customer_id: state.screenSettings.customer_id,
    primary_offer_response: state.screenSettings.primary_offer_response,
    offer_id: state.screenSettings.offer_id,
  };
};

const mapDispatchToProps = {
  displayInnerScreen,
  cartContent,
  setDetailsData,
  primaryOfferResponse,
  setOfferId,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(React.memo(ThirdScreen));
