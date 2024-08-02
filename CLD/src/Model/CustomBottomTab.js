import {
  StyleSheet,
  Text,
  View,
  Image,
  Button,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useEffect, useState } from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useNavigation } from "@react-navigation/native";
import Attendance from "../Screen/AttendanceScreen";
import QR from "../Screen/QRCodeScreen";
import Request from "../Screen/RequestScreen";
import AsyncStorage from "@react-native-async-storage/async-storage";
import PayrollScreen from "../Screen/PayrollScreen";
import RequestHistory from "../Screen/RequestHistory";
import { Fetch } from "./bridge";
import config from "../config/config.development";
const Tab = createBottomTabNavigator();
const CustomBottomTab = ({}) => {
  const [getValue, setValue] = useState();
  const goNavigate = useNavigation();

  useEffect(() => {
    const loadData = async () => {
      const UID = await AsyncStorage.getItem("UID");
      setValue(UID);
    };
    loadData();
  }, []);
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
          } else if (route.name === "Payroll") {
            iconName = focused
              ? require("../icons/payroll-focused.png")
              : require("../icons/payroll.png");
          } else if (route.name === "Request") {
            iconName = focused
              ? require("../icons/request-focused.png")
              : require("../icons/request.png");
          } else if (route.name === "Request History") {
            iconName = focused
              ? require("../icons/request-history-focused.png")
              : require("../icons/request-history.png");
          }
          return <Image source={iconName}></Image>;
        },
        tabBarShowLabel: false,
        tabBarStyle: {
          position: "absolute",
          bottom: 25,
          left: 30,
          right: 30,
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
      <Tab.Screen name="Payroll" component={PayrollScreen} />
      <Tab.Screen
        name="QR Code"
        component={QR}
        options={({ navigation }) => ({
          headerRight: () => (
            <TouchableOpacity
              onPress={() => {
                Alert.alert(
                  "Confirm",
                  "You want to logout?",
                  [
                    {
                      text: "NO",
                      onPress: () => {
                        return null;
                      },
                      style: "cancel",
                    },
                    {
                      text: "YES",
                      onPress: async () => {
                        Fetch(
                          config.logout,
                          "POST",
                          async (result) => {
                            if (!result.loading) {
                              const data = JSON.parse(result.data);
                              if (data.Error) {
                                alert(data.msg);
                                return;
                              }
                              await AsyncStorage.setItem(
                                "isLoggedIn",
                                JSON.stringify(false)
                              );
                              navigation.replace("Login");
                            }
                          },
                          {
                            ID: getValue,
                          }
                        );
                      },
                    },
                  ],
                  { cancelable: false }
                );
              }}
            >
              <Image
                source={require("../icons/signout.png")}
                style={{ marginRight: 10 }}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <Tab.Screen name="Request History" component={RequestHistory} />
      <Tab.Screen name="Request" component={Request} />
    </Tab.Navigator>
  );
};

export default CustomBottomTab;

const styles = StyleSheet.create({});
