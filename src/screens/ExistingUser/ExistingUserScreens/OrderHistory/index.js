import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  ActivityIndicator
} from "react-native";
import globalStyles from "../../../../../style/styles";
import Button from "../../../../common/Button";
import { useTranslation } from "react-i18next";
import { mapOrderStatus, setDataFormat, changePriceFormat } from "../../../../constants/helper";
import { connect } from "react-redux";
import {
  fetchOrderDetails,
} from "../../../../constants/api";
import { useIsFocused } from "@react-navigation/native";

const OrderHistory = ({ navigation, customer_id, route }) => {
  const [orderDetials, setOrderDetails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const { t, i18n } = useTranslation();
  const isFocused = useIsFocused();

  useEffect(() => {
    if (isFocused) {
      setIsLoading(true);
      fetchOrderDetails(customer_id)
        .then((res) => {
          setIsLoading(false);
          setOrderDetails(res.data);
        })
        .catch((err) => {
          setIsLoading(false);
        });
    }
  }, [isFocused]);

  const OpenDetail = (orderId) => {
    navigation.navigate("OrderDetailAndCancel", {
      customer_id: customer_id,
      orderId: orderId,
    });
  };

  return (
    <>
      <ScrollView style={{ backgroundColor: "#F2F4F9" }}>
        {orderDetials.map((item) => {
          return (
            <View
              key={item.orderId}
              style={[styles.container, { marginTop: 10 }]}
            >
              <Text style={styles.content}>
                {t("orderCreationDate")}:{" "}
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  {setDataFormat(item.creationDate)}
                </Text>
              </Text>
              <Text style={styles.content}>
                {t("totalPrice")}:{" "}
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  {changePriceFormat(item.totalAmount)} EUR
                </Text>
              </Text>
              <Text style={styles.content}>
                {t("Status")}:{" "}
                <Text style={{ fontWeight: "bold", color: "black" }}>
                  {mapOrderStatus(item.status)}
                </Text>
              </Text>
              <Button
                isDisabled={isLoading}
                btnStyle={globalStyles.btnStyle}
                onPressHandler={() => OpenDetail(item.orderId)}
                textStyle={globalStyles.btnText2}
                buttonText={t("detail")}
              />
            </View>
          );
        })}
      </ScrollView>
      {isLoading ? (
        <View style={globalStyles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
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
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    customer_id: state.screenSettings.customer_id,
  };
};

export default connect(mapStateToProps)(React.memo(OrderHistory));
