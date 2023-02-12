import React from "react";
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ActivityIndicator,
} from "react-native";
import Button from "./Button";
import globalStyles from "../../style/styles";
const AlertPopup = ({ onPressProps, showAlert, msg, bold, btnText, isLoading }) => {
  return (
    <>
      <TouchableOpacity style={styles.modalOverlay}>
        <View style={styles.centeredView}>
          <Modal animationType="slide" transparent={true} visible={showAlert}>
            <View style={styles.centeredView}>
              <View style={styles.modalView}>
                <Text style={[styles.modalText, bold?{fontWeight:'bold'}:null]}>
                  {msg}
                </Text>

                <Button
                  isDisabled={isLoading}
                  btnStyle={globalStyles.btnStyle}
                  onPressHandler={onPressProps}
                  textStyle={globalStyles.btnText2}
                  buttonText={btnText}
                />
              </View>
            </View>
          </Modal>
        </View>
      </TouchableOpacity>
      {isLoading ? (
        <View style={globalStyles.loading}>
          <ActivityIndicator size="large" />
        </View>
      ) : null}
    </>
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
    textAlign: 'center',
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    paddingLeft: 20,
    paddingRight: 20,
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
    marginBottom: 35
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

export default AlertPopup;
