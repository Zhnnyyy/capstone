import { StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import Attendance from "../Screen/AttendanceScreen";
import QR from "../Screen/QRCodeScreen";
import Request from "../Screen/RequestScreen";

const Tab = createBottomTabNavigator();
const CustomBottomTab = () => {
  return (
    <Tab.Navigator
      initialRouteName="QR Code"
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Attendance") {
            iconName = focused
              ? require("../icons/attendance-focused.png")
              : require("../icons/attendance.png");
          } else if (route.name === "QR Code") {
            iconName = focused
              ? require("../icons/qrcode.png")
              : require("../icons/qrcode.png");
          } else if (route.name === "Request") {
            iconName = focused
              ? require("../icons/request-focused.png")
              : require("../icons/request.png");
          }
          return <Image source={iconName}></Image>;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 70,
          right: 70,
          height: 60,
          borderRadius: 15,
          backgroundColor: "#fff",
        },
        headerTitleAlign: "center",
        headerTitleStyle: {
          fontWeight: "bold",
          fontSize: 24,
          color: "#eaaa00",
        },
      })}
    >
      <Tab.Screen name="Attendance" component={Attendance} />
      <Tab.Screen name="QR Code" component={QR} />
      <Tab.Screen name="Request" component={Request} />
    </Tab.Navigator>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({});
