import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View, SafeAreaView } from "react-native";

import LoginScreen from "./src/Screen/LoginScreen";
import DashboardScreen from "./src/Screen/DashboardScreen";
import EmailVerificationScreen from "./src/Screen/EmailVerificationScreen ";
import Forgotpassword from "./src/Screen/Forgotpassword";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationContainer } from "@react-navigation/native";
import Payslip from "./src/Screen/Payslip";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useState, useEffect } from "react";
const Stack = createNativeStackNavigator();
export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <NavigationContainer>
        <Stack.Navigator initialRouteName="Login">
          <Stack.Screen
            name="Dashboard"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OTP"
            component={EmailVerificationScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="forgot"
            component={Forgotpassword}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Payslip"
            component={Payslip}
            options={({ route }) => ({
              headerShown: true,
              headerTitle: "Payslip Details",
              cutoff: route.params.cutoff,
              date: route.params.date,
              id: route.params.id,
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});
