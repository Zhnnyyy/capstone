import { StyleSheet, Text, View, Image, SafeAreaView } from "react-native";
import React, { useState } from "react";
import CustomTextInput from "../Model/CustomTextInput";
import CustomButton from "../Model/CustomButton";
import { useNavigation } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Fetch } from "../Model/bridge";
import config from "../config/config.development";
const LoginScreen = () => {
  const [getUsername, setUsername] = useState();
  const [getPassword, setPassword] = useState();
  const goNavigate = useNavigation();

  const saveData = async () => {
    try {
      await AsyncStorage.setItem("UID", getUsername);
      setUsername("");
      setPassword("");
      goNavigate.replace("Dashboard");
    } catch (error) {
      // console.error("Error saving data:", error);
    }
  };

  const LoginPressed = () => {
    const data = {
      username: getUsername,
      password: getPassword,
    };

    Fetch(
      config.login,
      "POST",
      (result) => {
        const value = JSON.parse(result);
        if (value.Error == false) {
          saveData();
        } else {
          alert("Incorrect Credentials");
        }
      },
      data
    );
  };

  return (
    <View style={styles.container}>
      <Image source={require("../img/logo.png")} style={styles.img}></Image>
      <Text style={styles.text}>Login to continue</Text>
      <View style={{ width: "90%" }}>
        <CustomTextInput
          placeholder={"Username"}
          icon={require("../icons/username.png")}
          onchangetxt={setUsername}
        />
      </View>
      <View style={{ width: "90%" }}>
        <CustomTextInput
          placeholder={"Password"}
          passwordChar={true}
          icon={require("../icons/password.png")}
          onchangetxt={setPassword}
        />
      </View>

      <View style={{ width: "90%", marginTop: 30 }}>
        <CustomButton isPressed={LoginPressed} />
      </View>

      <View style={{ width: "90%" }}>
        <Text style={styles.forgotTxt}>Forgot Password?</Text>
      </View>
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 70,
    alignItems: "center",
    backgroundColor: "#fff",
  },
  img: {
    resizeMode: "contain",
    height: 350,
  },
  text: {
    fontSize: 16,
    color: "#BABFCE",
    fontWeight: "bold",
    marginBottom: 10,
    marginTop: 10,
  },
  forgotTxt: {
    color: "#eaaa00",
    fontWeight: "bold",
    fontSize: 16,
    marginTop: 10,
    alignSelf: "flex-end",
  },
});
