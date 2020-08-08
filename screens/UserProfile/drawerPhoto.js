import React, { useEffect } from "react";
import { StyleSheet, Text, View, Image } from "react-native";
import { connect } from "react-redux";
import * as actions from "../../store/actions";

const DrawerPhoto = (props) => {
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
            {" "}
            {props.firstName + " " + props.lastName}{" "}
          </Text>
          <Text style={styles.userInfo}> Rank: Intermediate </Text>
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
});

const mapStateToProps = (state) => {
  const { currentUser, userToken, firstName, lastName, userPhoto } = state.auth;
  return {
    currentUser,
    userToken,
    firstName,
    lastName,
    userPhoto,
  };
};

export default connect(mapStateToProps, actions)(DrawerPhoto);
