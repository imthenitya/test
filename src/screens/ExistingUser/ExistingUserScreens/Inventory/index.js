import React, { useEffect, useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ActivityIndicator,
  ScrollView
} from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { screenTitles } from "../../../../constants/helper";
import { connect } from "react-redux";
import { sortingArrary } from "../../../../constants/helper";
import globalStyles from "../../../../../style/styles";
const InventoryScreen = ({ navigation, customer_id, route }) => {
  const [offerList, setOfferList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const arr= route.params.data.sort(function(a, b){
      var offerA = a.offerType.toLowerCase(), offerB = b.offerType.toLowerCase();
      if (offerA < offerB)
       return -1;
     })
    setOfferList(arr);
  }, []);
  const openOfferScreen = (offer, offerType) => {
    if (offerType == "primary") {
      screenTitles.PrimaryOfferDetail = offer.name; //Changing Title dynamically
      navigation.navigate("PrimaryOfferDetail", {
        details: offer,
      });
    } else {
      screenTitles.SecondaryOfferDetail = offer.name; //Changing Title dynamically
      navigation.navigate("SecondaryOfferDetail", {
        details: offer,
      });
    }
  };
  return (
    <>
      <ScrollView style={{ backgroundColor: "#F2F4F9" }}>
        {offerList.length > 0
          ? offerList.map((item, index) => {
              if (item.offerType == "PRIMARY") {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[
                      styles.container,
                      { marginTop: 15, flexDirection: "row" },
                    ]}
                    onPress={() => openOfferScreen(item, "primary")}
                  >
                    <Text style={{ fontWeight: "bold", fontSize: 18 }}>
                      {item.name}
                    </Text>
                    <Icon
                      style={{
                        position: "absolute",
                        top: 20,
                        right: 15,
                        fontSize: 18,
                      }}
                      name="chevron-forward-outline"
                    ></Icon>
                  </TouchableOpacity>
                );
              } else {
                return (
                  <TouchableOpacity
                    key={index}
                    style={[styles.container, { flexDirection: "row" }]}
                    onPress={() => openOfferScreen(item, "secondary")}
                  >
                    <Text
                      style={{
                        fontWeight: "bold",
                        fontSize: 16,
                        marginLeft: 10,
                      }}
                    >
                      {item.name}
                    </Text>
                    <Icon
                      style={{
                        position: "absolute",
                        top: 20,
                        right: 15,
                        fontSize: 18,
                      }}
                      name="chevron-forward-outline"
                    ></Icon>
                  </TouchableOpacity>
                );
              }
            })
          : null}
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
    padding: 18,
    margin: 5,
    marginLeft: 20,
    marginRight: 20,
  },
});

const mapStateToProps = (state, myOwnProps) => {
  return {
    customer_id: state.screenSettings.customer_id,
  };
};

export default connect(mapStateToProps)(InventoryScreen);
