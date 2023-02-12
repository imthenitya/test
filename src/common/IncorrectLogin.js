import React from "react";
import { Modal, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Button from "./Button";
import { useTranslation } from "react-i18next";
import globalStyles from "../../style/styles";
const IncorrectLogin = ({ setShowError, showAlert, errorTitle, errorMsg }) => {
  const { t, i18n } = useTranslation();

  if (showAlert) {
    return (
      <TouchableOpacity style={styles.modalOverlay}>
        <View style={styles.centeredView}>
          <Modal animationType="slide" transparent={true} visible={showAlert}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text
                  style={[
                    styles.modalHeading,
                    { marginBottom: 15, fontWeight: "bold" },
                  ]}
                >
                  {errorTitle}
                </Text>
                <Text style={[styles.modalText, { marginBottom: 35 }]}>
                  {errorMsg}
                </Text>

                <Button
                  btnStyle={globalStyles.btnStyle}
                  onPressHandler={() => setShowError(false)}
                  textStyle={globalStyles.btnText2}
                  buttonText={t("back")}
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
    padding: 20,
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
  modalHeading: {
    fontSize: 21,
    marginBottom: 15,
    textAlign: "center",
  },
  modalText: {
    fontSize: 17,
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

export default IncorrectLogin;
