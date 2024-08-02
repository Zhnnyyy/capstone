import { StyleSheet, Text, View, SafeAreaView, StatusBar } from "react-native";
import React from "react";

import { NavigationContainer } from "@react-navigation/native";
import CustomBottomTab from "../Model/CustomBottomTab";
const DashboardScreen = () => {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={"black"} />
      <CustomBottomTab />
    </SafeAreaView>
  );
};

export default DashboardScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
