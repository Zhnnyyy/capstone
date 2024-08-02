import { StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import QRCode from "react-native-qrcode-svg";
import base64 from "react-native-base64";
export default function QrcodeScreen() {
  const [getValue, setValue] = useState();
  const [installationID, setInstallationID] = useState();
  useEffect(() => {
    loadData();
  }, []);
  const loadData = async () => {
    try {
      const storedData = await AsyncStorage.getItem("UID");
      const UUID = await AsyncStorage.getItem("ID");
      if (storedData !== null && UUID !== null) {
        setValue(base64.encode(storedData + ":" + UUID));
      }
    } catch (error) {
      console.error("Error loading data:", error);
    }
  };
  return (
    <View style={styles.container}>
      <View style={styles.qrcodeBox}>
        <QRCode
          value={getValue}
          size={250}
          logo={require("../img/logo.png")}
          logoSize={50}
          logoBorderRadius={10}
          logoBackgroundColor="#fff"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
  },
  qrcodeBox: {
    marginTop: "30%",
    borderWidth: 2,
    borderColor: "#eaaa00",
    borderRadius: 10,
    padding: 20,
  },
});
