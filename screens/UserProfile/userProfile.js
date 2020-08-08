import React, { Component } from "react";
import {
  StyleSheet,
  Text,
  View,
  Image,
  Platform,
  TouchableOpacity,
} from "react-native";
import { Input, Button } from "react-native-elements";
import { Feather } from "@expo/vector-icons";
import ProfileHeader from "./profileHeader";

const UserProfile = (props) => {
  return (
    <View>
      <ProfileHeader {...props} />
      <View style={styles.container}></View>
    </View>
  );
};
export default UserProfile;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#003443",
    height: "100%",
  },
});
