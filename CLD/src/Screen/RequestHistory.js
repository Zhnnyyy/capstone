import { ScrollView, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect } from "react";
import { Fetch } from "../Model/bridge";
import AsyncStorage from "@react-native-async-storage/async-storage";
import config from "../config/config.development";
import RequestHistoryList from "../Model/RequestHistoryList";
export default function RequestHistory() {
  const [mockdata, setmockdata] = useState([]);
  const [getID, setID] = useState();
  let arr = [];

  for (let i = 0; i < mockdata.length; i++) {
    const data = mockdata[i];
    arr.push(
      <RequestHistoryList
        key={i}
        status={data.status}
        date={data.Date}
        type={data.Name}
      />
    );
  }

  useEffect(() => {
    loadData();
  }, []);

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

  const data = {
    id: getID,
  };
  Fetch(
    config.showReqHistory,
    "POST",
    (result) => {
      if (!result.loading) {
        setmockdata(JSON.parse(result.data));
      }
    },
    data
  );

  return (
    <ScrollView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={styles.container}>{arr}</View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 16,
  },
});
