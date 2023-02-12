import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from "react-native";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import globalStyles from "../../style/styles";
const DiscountPopUp = ({ msg, close }) => {
  const { t, i18n } = useTranslation();

  return (
    <TouchableOpacity style={styles.modalOverlay}>
      <View style={styles.centeredView}>
        <Modal animationType="slide" transparent={true} visible={true}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              {msg.map((item, index) => {
                return (
                  <Text style={{ margin: 10 }} key={index}>
                    {item}
                  </Text>
                );
              })}
              <Button
                btnStyle={globalStyles.btnStyle}
                onPressHandler={() => close(false)}
                textStyle={globalStyles.btnText2}
                buttonText={t("close")}
              />
            </View>
          </View>
        </Modal>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
    // backgroundColor: 'rgba(0, 0, 0, 0.5)',
    // top: -20
  },
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 45,
    paddingTop: 20,
    paddingBottom: 25,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalOverlay: {
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: "rgba(0,0,0,0.5)",
    zIndex: 10,
  },
});

export default DiscountPopUp;
