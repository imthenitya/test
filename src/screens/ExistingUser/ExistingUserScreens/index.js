import React from "react";
import VerifyUsingMobile from "../VerifyExistingUser/VerifyUsingMobile";
import ExistingUserHomeScreen from "./HomeScreen";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Icon from "react-native-vector-icons/Ionicons";

const ExistingUserScreens = () => {
  const Tab = createBottomTabNavigator();
  return (
    // <NavigationContainer independent={true}>
    <Tab.Navigator
      screenOptions={({ navigation, route }) => ({
        headerShown: false,
        tabBarInactiveTintColor: "#6C6C6C",
        tabBarActiveTintColor: "#E20074",
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name == "Naslovnica") {
            iconName = "home-outline";
          } else if (route.name == "Plaanja") {
            iconName = "wallet-outline";
          } else if (route.name == "Magenta") {
            iconName = "heart-outline";
          } else if (route.name == "Pomo") {
            iconName = "help-circle-outline";
          } else if (route.name == "Ostalo") {
            iconName = "options-outline";
          }
          return (
            <Icon
              name={iconName}
              style={
                focused
                  ? { color: "#E20074", fontSize: 25 }
                  : { color: "#6C6C6C", fontSize: 25 }
              }
            ></Icon>
          );
        },
      })}
    >
      <Tab.Screen name="Naslovnica" component={ExistingUserHomeScreen} />

      <Tab.Screen
        name="Plaanja"
        component={VerifyUsingMobile}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />

      <Tab.Screen
        name="Magenta"
        component={VerifyUsingMobile}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="Pomo"
        component={VerifyUsingMobile}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
      <Tab.Screen
        name="Ostalo"
        component={VerifyUsingMobile}
        listeners={{
          tabPress: (e) => {
            e.preventDefault();
          },
        }}
      />
    </Tab.Navigator>
    // </NavigationContainer>
  );
};

export default ExistingUserScreens;
