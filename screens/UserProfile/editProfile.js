/**
 Login screen
 */

import React, { useState, useEffect } from "react";
import Joi from "joi-browser";
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Image,
  TouchableHighlight,
} from "react-native";

import { Input, Button } from "react-native-elements";
import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";

import { connect } from "react-redux";
import * as actions from "../../store/actions";

const EditProfile = (props) => {
  const [errorState, setErrorState] = useState({
    error: {},
  });

  useEffect(() => {
    getPermissionAsync;
  }, []);

  const {
    firstName,
    lastName,
    phone,
    email,
    password,
    userPhoto,
    userToken,
  } = props;

  const schema = {
    firstName: Joi.string().required().min(2).max(100).label("First Name"),
    lastName: Joi.string().required().min(2).max(100).label("Last Name"),
    phone: Joi.string().required().min(8).max(100).label("Phone"),
    email: Joi.string().required().email().min(5).max(100).label("Email"),
  };
  // validation property validates the input during onChange event.
  const validateProperty = ({ field, value }) => {
    const obj = { [field]: value };
    const Schema = { [field]: schema[field] };
    const { error } = Joi.validate(obj, Schema);
    return error ? error.details[0].message : null;
  };

  const handleChange = (field, value) => {
    const input = { field, value };
    const error = { ...errorState.error };
    const errorMessage = validateProperty(input);

    if (errorMessage) error[input.field] = errorMessage;
    else delete error[input.field];
    setErrorState({ error });
    props.formUpdate({ prop: field, value });
  };

  const validate = () => {
    const data = {
      firstName,
      lastName,
      phone,
      email,
    };

    const { error } = Joi.validate(data, schema, {
      abortEarly: false,
    });

    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;

    return errors;
  };

  const getPermissionAsync = async () => {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  const _pickImage = async () => {
    const error = { ...errorState.error };

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 1,
      });
      if (!result.cancelled) {
        const field = "userPhoto";
        const value = result.uri;
        props.formUpdate({ prop: field, value });
      }
    } catch (E) {
      const errorMessage = E;
      alert(errorMessage);
      console.log(errorMessage);
    }
  };

  const submitHandler = async (e) => {
    props.updateUser({
      firstName,
      lastName,
      phone,
      email,
      userToken,
      userPhoto,
    });
    props.navigation.navigate("UserProfile");
  };

  return (
    <>
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}
        >
          <View style={styles.headerContent}>
            <Image style={styles.avatar} source={{ uri: props.userPhoto }} />
            <Button title="Choose Photo" onPress={_pickImage} />
          </View>
          <View style={styles.fields}>
            <View style={styles.names}>
              <View style={styles.inputName}>
                <Input
                  id="firstName"
                  placeholder="First Name"
                  value={props.firstName}
                  onChangeText={(value) => handleChange("firstName", value)}
                  leftIcon={
                    <Ionicons
                      style={{ marginRight: 10 }}
                      name={
                        Platform.OS === "android" ? "md-person" : "ios-person"
                      }
                      size={24}
                      color="black"
                    />
                  }
                  errorStyle={{ color: "red" }}
                  errorMessage={errorState.error && errorState.error.firstName}
                />
              </View>

              <View style={styles.inputName}>
                <Input
                  placeholder="Last Name"
                  value={props.lastName}
                  onChangeText={(value) => handleChange("lastName", value)}
                  leftIcon={
                    <Ionicons
                      style={{ marginRight: 10 }}
                      name={
                        Platform.OS === "android" ? "md-person" : "ios-person"
                      }
                      size={24}
                      color="black"
                    />
                  }
                  errorStyle={{ color: "red" }}
                  errorMessage={errorState.error && errorState.error.lastName}
                />
              </View>
            </View>

            <View style={styles.input}>
              <Input
                placeholder="Phone Number"
                value={props.phone}
                onChangeText={(value) => handleChange("phone", value)}
                leftIcon={
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name={Platform.OS === "android" ? "md-call" : "ios-call"}
                    size={24}
                    color="black"
                  />
                }
                errorStyle={{ color: "red" }}
                errorMessage={errorState.error && errorState.error.phone}
              />
            </View>

            <View style={styles.input}>
              <Input
                disabled
                placeholder="Email Address"
                keyboardType={"email-address"}
                value={props.email}
                onChangeText={(value) => handleChange("email", value)}
                leftIcon={
                  <Ionicons
                    style={{ marginRight: 10 }}
                    name={Platform.OS === "android" ? "md-mail" : "ios-mail"}
                    size={24}
                    color="black"
                  />
                }
                errorStyle={{ color: "red" }}
                errorMessage={errorState.error && errorState.error.email}
              />
            </View>
          </View>
          <View style={styles.submit}>
            <Button
              disabled={validate() === null ? false : true}
              onPress={submitHandler}
              icon={
                <Ionicons
                  style={{ color: "white", marginRight: 10 }}
                  name={
                    Platform.OS === "android"
                      ? "md-person-add"
                      : "ios-person-add"
                  }
                  size={24}
                  color="black"
                />
              }
              title="Save"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: "white",
    width: "100%",
    height: "100%",
  },
  headerContent: {
    paddingTop: 10,
    alignItems: "center",
  },

  avatar: {
    width: 200,
    height: 200,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 10,
  },

  fields: {
    flex: 1,
    flexDirection: "column",
    justifyContent: "center",
    marginTop: 50,
  },
  names: {
    flex: 1,
    flexDirection: "row",

    marginTop: 50,
  },
  inputName: {
    marginLeft: 10,
    width: "40%",
  },
  input: {
    marginLeft: 10,
    width: "90%",
  },
  submit: {
    marginRight: 40,
    marginLeft: 40,
    marginTop: 10,
  },
});

const mapStateToProps = (state) => {
  const {
    firstName,
    lastName,
    phone,
    email,
    password,
    userPhoto,
    userToken,
  } = state.auth;
  return {
    firstName,
    lastName,
    phone,
    email,
    password,
    userPhoto,
    userToken,
  };
};

export default connect(mapStateToProps, actions)(EditProfile);
