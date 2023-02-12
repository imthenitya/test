import React from "react";
import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { connect } from "react-redux";
import { displayAdditionalOfferDetial } from "../../../../redux/settings";
import styles from "../../../../style/styles";
import { supplementryDescriptions } from "../../../constants/HardcodedTexts";
import Button from "../../../common/Button";
import { useTranslation } from "react-i18next";

const AdditionalPackageDetails = ({
  displayAdditionalOfferDetial,
  supplementry_details,
}) => {
  const { t, i18n } = useTranslation();

  const goBack = () => {
    displayAdditionalOfferDetial(false);
  };
  const longDescriptions = () => {
    const data = supplementryDescriptions[supplementry_details.name]
      ? supplementryDescriptions[supplementry_details.name].longDescription.map(
          (item, i) => {
            return (
              <Text style={{ marginBottom: 5 }} key={i}>
                {item}
              </Text>
            );
          }
        )
      : null;
    return data;
  };
  return (
    <ScrollView style={localStyles.container}>
      <Text style={{ fontWeight: "bold", fontSize: 16, marginBottom: 10 }}>
        {supplementry_details.name}
      </Text>
      {longDescriptions()}
      <Button
        btnStyle={styles.btnStyle}
        onPressHandler={goBack}
        textStyle={styles.btnText2}
        buttonText={t("close")}
      />
    </ScrollView>
  );
};

const localStyles = StyleSheet.create({
  container: {
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 10,
    margin: 10,
  },
  icons: {
    justifyContent: "space-evenly",
    flexDirection: "row",
    marginHorizontal: 1,
    marginTop: 5,
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    supplementry_details: state.screenSettings.supplementry_details,
  };
};

const mapDispatchToProps = {
  displayAdditionalOfferDetial,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AdditionalPackageDetails);
