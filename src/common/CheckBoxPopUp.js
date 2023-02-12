import React, { useState } from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  SafeAreaView,
  Image,
} from "react-native";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import globalStyles from "../../style/styles";

const CheckBoxPopUp = ({ showModal, proceed }) => {
  const [checkbox1, setCheckbox1] = useState(true);
  const [checkbox2, setCheckbox2] = useState(true);
  const { t, i18n } = useTranslation();

  if (showModal) {
    return (
      <TouchableOpacity style={styles.modalOverlay}>
        <View style={styles.centeredView}>
          <Modal animationType="slide" transparent={true} visible={showModal}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={styles.modalText}>{t("useAdress")}</Text>

                <SafeAreaView style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#F2F4F9",
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                    }}
                    onPress={() => setCheckbox1(!checkbox1)}
                  >
                    {checkbox1 ? (
                      <Image
                        style={styles.tinyLogo}
                        source={require("../../assets/checkbox.png")}
                      />
                    ) : null}
                  </TouchableOpacity>
                  <Text style={styles.label}>{t("adressOfConnection")}</Text>
                </SafeAreaView>

                <SafeAreaView style={styles.checkboxContainer}>
                  <TouchableOpacity
                    style={{
                      backgroundColor: "#F2F4F9",
                      width: 20,
                      height: 20,
                      borderRadius: 5,
                    }}
                    onPress={() => setCheckbox2(!checkbox2)}
                  >
                    {checkbox2 ? (
                      <Image
                        style={styles.tinyLogo}
                        source={require("../../assets/checkbox.png")}
                      />
                    ) : null}
                  </TouchableOpacity>
                  <Text style={styles.label}>{t("accountAdress")}</Text>
                </SafeAreaView>

                <Button
                  btnStyle={globalStyles.btnStyle}
                  onPressHandler={() => proceed(checkbox1, checkbox2)}
                  textStyle={globalStyles.btnText2}
                  buttonText={t("further")}
                />
              </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
    );
  } else return null;
};

const styles = StyleSheet.create({
  tinyLogo: {
    width: 17,
    height: 17,
  },
  checkboxContainer: {
    flexDirection: "row",
    marginBottom: 10,
  },
  label: {
    margin: 5,
    marginTop: 0,
    marginLeft: 20,
  },
  checkbox: {
    alignSelf: "center",
  },
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

  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    fontSize: 21,
    marginBottom: 15,
    textAlign: "center",
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

export default CheckBoxPopUp;
