import React, { useEffect } from "react";
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

import { connect } from "react-redux";
import * as actions from "../../store/actions";

const ProfileHeader = (props) => {
  useEffect(() => {
    props.loadUsers(props.currentUser, props.userToken);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <Image
            style={styles.avatar}
            source={{
              uri: props.userPhoto,
            }}
          />

          <Text style={styles.name}>
            {props.firstName + " " + props.lastName}
          </Text>

          <Text style={styles.userInfo}> {props.userType} </Text>
          <Text style={styles.userInfo}>...... </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#DCDCDC",
  },
  headerContent: {
    padding: 10,
    alignItems: "center",
  },
  avatar: {
    width: 80,
    height: 80,
    borderRadius: 63,
    borderWidth: 4,
    borderColor: "white",
    marginBottom: 10,
  },
  name: {
    fontSize: 22,
    color: "#000000",
    fontWeight: "600",
  },
  userInfo: {
    fontSize: 16,
    color: "#778899",
    fontWeight: "600",
  },
  body: {
    backgroundColor: "#778899",
    height: 500,
    alignItems: "center",
  },
  item: {
    flexDirection: "row",
  },
  infoContent: {
    flex: 1,
    alignItems: "flex-start",
    paddingLeft: 5,
  },
  iconContent: {
    flex: 1,
    alignItems: "flex-end",
    paddingRight: 5,
  },
  icon: {
    width: 30,
    height: 30,
    marginTop: 20,
  },
  info: {
    fontSize: 18,
    marginTop: 20,
    color: "#FFFFFF",
  },
  editLine: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

const mapStateToProps = (state) => {
  const {
    currentUser,
    userToken,
    firstName,
    lastName,
    userType,
    userPhoto,
  } = state.auth;
  return {
    currentUser,
    userToken,
    firstName,
    lastName,
    userType,
    userPhoto,
  };
};

export default connect(mapStateToProps, actions)(ProfileHeader);
