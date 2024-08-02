import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import PayrollCutoffList from "../Model/PayrollCutoffList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import Myloader from "../Model/Myloader";
import { Fetch } from "../Model/bridge";
import config from "../config/config.development";
export default function PayrollScreen() {
  const [loading, setloading] = useState(false);
  const [getID, setID] = useState();
  const [mockData, setMockData] = useState([]);
  const goNavigate = useNavigation();
  const pressme = (cutoff, date) => {
    goNavigate.navigate("Payslip", { cutoff: cutoff, date: date, id: getID });
  };
  let CutOffList = [];
  for (let i = 0; i < mockData.length; i++) {
    const item = mockData[i];
    CutOffList.push(
      <PayrollCutoffList
        key={i}
        cutoff={item.Cutoff}
        date={item.Created}
        onPress={() => pressme(item.Cutoff, item.Created)}
      />
    );
  }
  useEffect(() => {
    loadData();
  }, []);

  const data = {
    id: getID,
  };
  Fetch(
    config.payrollCutoff,
    "POST",
    (result) => {
      if (result.loading) {
      }
      if (!result.loading) {
        setMockData(JSON.parse(result.data));
      }
    },
    data
  );
  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("UID");
      if (storedData !== null) {
        setID(storedData);
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };

  return (
    <View style={styles.container}>
      <ScrollView>{CutOffList}</ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: "#fff",
  },
});
