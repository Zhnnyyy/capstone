import { StyleSheet, Text, View, TextInput, Image } from "react-native";
import React from "react";

export default function CustomTextInput({
  placeholder,
  passwordChar,
  icon,
  onchangetxt,
}) {
  return (
    <View style={styles.txtInputContainer}>
      <Image source={icon} style={styles.icon} />
      <TextInput
        placeholder={placeholder}
        placeholderTextColor={"#BABFCE"}
        secureTextEntry={passwordChar}
        style={styles.input}
        onChangeText={onchangetxt}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  txtInputContainer: {
    margin: 5,
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 12,
    borderRadius: 15,
  },
  input: {
    width: "100%",
    height: "100%",
    color: "#eaaa00",
    fontSize: 16,
    paddingLeft: 10,
    borderLeftColor: "#eee",
    borderLeftWidth: 0,
  },
  icon: {
    margin: 5,
  },
});
