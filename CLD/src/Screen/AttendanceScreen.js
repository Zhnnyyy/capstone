import {
  StyleSheet,
  Text,
  View,
  ScrollView,
  RefreshControl,
} from "react-native";
import { React, useState, StatusBar, useEffect } from "react";
import CustomAttendanceList from "../Model/CustomAttendanceList";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fetch } from "../Model/bridge";
import config from "../config/config.development";

export default function AttendanceScreen() {
  const [mockData, setMockData] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [getID, setID] = useState();
  const AttendanceList = [];
  for (let i = 0; i < mockData.length; i++) {
    const item = mockData[i];
    AttendanceList.push(
      <CustomAttendanceList
        key={i}
        timeIn={item.TimeIn == null ? "---" : item.TimeIn}
        timeOut={item.TimeOut == null ? "---" : item.TimeOut}
        date={item.Date}
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
    uid: getID,
  };
  Fetch(
    config.attendance,
    "POST",
    (result) => {
      if (!result.loading) {
        const res = JSON.parse(result.data);
        setMockData(res);
      }
    },
    data
  );
  const onRefresh = () => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  };
  return (
    <View style={styles.Screencontainer}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#695cfe"]}
          />
        }
      >
        {AttendanceList}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  Screencontainer: {
    flex: 1,
    padding: 10,
    backgroundColor: "#fff",
  },
});
