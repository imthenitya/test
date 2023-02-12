import React, { useState, useRef, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  TouchableWithoutFeedback,
} from "react-native";
// import * as Clipboard from 'expo-clipboard';
import Icon from "react-native-vector-icons/Ionicons";
// import Clipboard from "@react-native-clipboard/clipboard";
import DeleteOffer from "../../../../common/DeleteOffer";
import Button from "../../../../common/Button";
import globalStyles from "../../../../../style/styles";
import { useTranslation } from "react-i18next";
import { mapOrderStatus, setDataFormat, changePriceFormat } from "../../../../constants/helper";
import {
  cancleOrder,
  fetchOngoingOrderDetail,
} from "../../../../constants/api";
const OrderDetailAndCancel = ({ route, navigation, ...props }) => {
  const [showDropDown, setShowDropDown] = useState(false);
  const [showDeletePopUp, setShowDeletePopUp] = useState(false);
  const [isLoading, setisLoading] = useState(false);
  const [data, setData] = useState([]);
  const copyText = () => {
    // Clipboard.setString(data.orderId);
  };

  const myRef = useRef(null);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    orderDetails();
  }, []);

  const orderDetails = () => {
    setisLoading(true);
    fetchOngoingOrderDetail(route.params.customer_id, route.params.orderId)
      .then((res) => {
        setData(res.data);
        setisLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const outsdieClickAction = () => {
    if (myRef !== null) {
      setShowDropDown(false);
    }
  };
  const closeDeletePopup = () => {
    setShowDeletePopUp(false);
  };
  const changeStatusHandler = () => {
    setisLoading(true);
    cancleOrder(data.orderId)
      .then((res) => {
        setisLoading(false);
        setShowDeletePopUp(false);
        navigation.navigate('OrderHistory')
      })
      .catch((err) => {
        console.log(err);
      });
  };
  let price = 0;
  if (data.items) {
    return (
      <>
        <ScrollView style={styles.container}>
          <TouchableWithoutFeedback
            style={{ flex: 1, height: "100%", width: "100%" }}
            onPress={() => outsdieClickAction()}
          >
            <View>
              <View style={[styles.subContainer, { flexDirection: "row" }]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "grey" }}>{t("code")}</Text>
                  <Text>{data.orderId}</Text>
                </View>
                <TouchableOpacity
                  onPress={() => setShowDropDown(!showDropDown)}
                >
                  <Icon
                    style={{ fontSize: 25, color: "red", marginTop: 10 }}
                    name="ellipsis-vertical-outline"
                  />
                </TouchableOpacity>
              </View>

              <View style={[styles.subContainer, { flexDirection: "row" }]}>
                <View style={{ flex: 1 }}>
                  <Text style={{ color: "grey" }}>
                    {t("orderCreationDate")}
                  </Text>
                  <Text>{setDataFormat(data.creationDate)}</Text>
                </View>

                {showDropDown ? (
                  <View style={styles.dropdown} ref={myRef}>
                    <TouchableOpacity
                      style={{ marginBottom: 10 }}
                      onPress={copyText}
                    >
                      <Text>{t("copyTheCode")}</Text>
                    </TouchableOpacity>
                    <Text>{t("shareTheCode")}</Text>
                  </View>
                ) : null}
              </View>

              <View style={styles.subContainer}>
                <Text style={{ color: "grey" }}>{t("dateOfLastChange")}</Text>
                <Text>{setDataFormat(data.statusChangeDate)}</Text>
              </View>

              <View style={styles.subContainer}>
                <Text style={{ color: "grey" }}>{t("Status")}</Text>
                <Text>{mapOrderStatus(data.status)}</Text>
              </View>

              <View
                style={{
                  flexDirection: "row",
                  borderColor: "grey",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ margin: 10, fontSize: 15 }}>
                    {t("service")}
                  </Text>
                </View>
                <Text style={{ margin: 10, fontSize: 15 }}>{t("price")}</Text>
              </View>

              {data.items.map((item, index) => {
                price = price + item.totalPrice;
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
                      <Text
                        style={{ margin: 10, fontSize: 15, fontWeight: "bold" }}
                      >
                        {item.offerName}
                      </Text>
                    </View>
                    <Text style={{ margin: 10, fontSize: 15 }}>
                      {changePriceFormat(item.totalPrice)} EUR
                    </Text>
                  </View>
                );
              })}
              <View
                style={{
                  flexDirection: "row",
                  borderColor: "grey",
                  borderBottomWidth: 1,
                }}
              >
                <View style={{ flex: 1 }}>
                  <Text style={{ margin: 10, fontSize: 15 }}>{t("total")}</Text>
                </View>
                <Text style={{ margin: 10, fontSize: 15 }}>{changePriceFormat(price)} EUR</Text>
              </View>
              <View style={globalStyles.buttonStyleContainer}>
                {mapOrderStatus(data.status) == "Realizacija pokrenuta" ||
                mapOrderStatus(data.status) == "Provizioniranje u tijeku" ? (
                  <Button
                    isDisabled={isLoading}
                    btnStyle={[globalStyles.btnStyle, { width: 150 }]}
                    onPressHandler={() => setShowDeletePopUp(true)}
                    textStyle={globalStyles.btnText2}
                    buttonText={t("cancelTheOrder")}
                  />
                ) : (
                  <Button
                    isDisabled={isLoading}
                    btnStyle={globalStyles.btnStyle}
                    onPressHandler={() => navigation.navigate("OrderHistory")}
                    textStyle={globalStyles.btnText2}
                    buttonText={t("close")}
                  />
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </ScrollView>
        {showDeletePopUp ? (
          <DeleteOffer
            heading={true}
            msgArr={[t("cancelConfirm"), t("cancelCantRevert")]}
            btnTexts={[t("cancelit"), t("giveItUp")]}
            onPressHandlerEvent={changeStatusHandler}
            isLoading={isLoading}
            close={closeDeletePopup}
          />
        ) : null}
        {isLoading ? (
          <View style={globalStyles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </>
    );
  } else {
    return (
      <>
        {isLoading ? (
          <View style={globalStyles.loading}>
            <ActivityIndicator size="large" />
          </View>
        ) : null}
      </>
    );
  }
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#F2F4F9",
    borderRadius: 10,
    padding: 14,
    margin: 12,
  },
  subContainer: {
    margin: 5,
  },
  dropdown: {
    position: "absolute",
    width: 110,
    top: -12,
    right: 5,
    padding: 14,
    borderRadius: 8,
    backgroundColor: "#fff",
    shadowColor: "#000000",
    shadowOffset: {
      height: 1,
      width: 1,
    },
    shadowOpacity: 0.22,
    shadowRadius: 15,
    elevation: 3,
  },
});

export default React.memo(OrderDetailAndCancel);
