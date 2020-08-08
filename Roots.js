import "react-native-gesture-handler";
import React, { useState } from "react";
import { Platform, Button } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
  createDrawerNavigator,
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from "@react-navigation/drawer";
import { HeaderButtons, Item } from "react-navigation-header-buttons";

import { connect } from "react-redux";

import * as actions from "./store/actions";

import DrawerPhoto from "./screens/UserProfile/drawerPhoto";
import Bills from "./screens/bills/bills";
import AddSubscription from "./screens/bills/addSubscription";
import Settings from "./screens/UserProfile/settings";
import Login from "./screens/auth/login";
import Register from "./screens/auth/register";
import editProfile from "./screens/UserProfile/editProfile";
import UserProfile from "./screens/UserProfile/userProfile";
import Home from "./screens/home";
import Splash from "./screens/auth/main";
import CustomHeaderButton from "./components/UI/HeaderButton";

import { Ionicons } from "@expo/vector-icons";

import Colors from "./constants/Colors";

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

function Roots(props) {
  const StackScreenOptions = (Color) => {
    return {
      headerTitleStyle: {
        color: Color,
        fontFamily: "open-sans-bold",
        textAlign: "center",
      },
      BackTitleStyle: {
        fontFamily: "open-sans",
      },
      headerStyle: {
        backgroundColor: Platform.OS === "android" ? Colors.navy : "",
      },
      headerTintColor: Platform.OS === "android" ? "white" : Colors.primary,
    };
  };

  // =======================================================================================================
  // stack navigators.....

  const HomeStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={StackScreenOptions("white")}
      >
        <Stack.Screen
          name="Home"
          component={Home}
          options={({ navigation, route }) => ({
            headerTitle: "Home",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
      </Stack.Navigator>
    );
  };

  const ProfileStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName=" User profile"
        screenOptions={StackScreenOptions("white")}
      >
        <Stack.Screen
          name="UserProfile"
          component={UserProfile}
          options={({ navigation, route }) => ({
            headerTitle: "User profile",

            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={
                    Platform.OS === "android" ? "md-create" : "ios-create"
                  }
                  onPress={() => {
                    props.loadUsers(props.currentUser, props.userToken);
                    navigation.navigate("editProfile");
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
        <Stack.Screen
          name="editProfile"
          component={editProfile}
          options={() => ({
            headerTitle: "Edit profile",
          })}
        />
      </Stack.Navigator>
    );
  };

  const BillsStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Bills"
        screenOptions={StackScreenOptions("white")}
      >
        <Stack.Screen
          name="Bills"
          component={Bills}
          options={({ navigation, route }) => ({
            headerTitle: "Payment Methods",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
            headerRight: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={
                    Platform.OS === "android" ? "md-create" : "ios-create"
                  }
                  onPress={() => {
                    navigation.navigate("editBilss");
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
      </Stack.Navigator>
    );
  };

  const SettingsStackNavigator = () => {
    return (
      <Stack.Navigator
        initialRouteName="Settings"
        screenOptions={StackScreenOptions("white")}
      >
        <Stack.Screen
          name="Settings"
          component={Settings}
          options={({ navigation, route }) => ({
            headerTitle: "Settings",
            headerLeft: () => (
              <HeaderButtons HeaderButtonComponent={CustomHeaderButton}>
                <Item
                  title="Menu"
                  iconName={Platform.OS === "android" ? "md-menu" : "ios-menu"}
                  onPress={() => {
                    navigation.toggleDrawer();
                  }}
                />
              </HeaderButtons>
            ),
          })}
        />
      </Stack.Navigator>
    );
  };

  const handleLogout = () => {
    props.logout();
  };

  const CustomDrawerContent = (props) => {
    return (
      <DrawerContentScrollView {...props}>
        <DrawerPhoto />
        <DrawerItemList {...props} />
        <DrawerItem
          onPress={handleLogout}
          label="Logout"
          icon={() => (
            <Ionicons
              name={Platform.OS === "android" ? "md-lock" : "ios-lock"}
              size={23}
              color={"black"}
            />
          )}
        />
      </DrawerContentScrollView>
    );
  };

  return (
    <NavigationContainer>
      {props.isSignout ? (
        <>
          <Stack.Navigator
            initialRouteName="Home"
            screenOptions={StackScreenOptions("white")}
          >
            <Stack.Screen name="Home" component={Splash} />
            <Stack.Screen name="Login" component={Login} />
            <Stack.Screen name="Register" component={Register} />
          </Stack.Navigator>
        </>
      ) : (
        <>
          <Drawer.Navigator
            drawerType="slide"
            initialRouteName="Home"
            drawerContentOptions={{ activeTintColor: Colors.primary }}
            drawerContent={(props) => <CustomDrawerContent {...props} />}
          >
            <Drawer.Screen
              name="Home"
              component={HomeStackNavigator}
              options={{
                drawerIcon: (drawerConfig) => (
                  <Ionicons
                    name={Platform.OS === "android" ? "md-home" : "ios-home"}
                    size={23}
                    color={drawerConfig.tintColor}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="My account"
              component={ProfileStackNavigator}
              options={{
                drawerIcon: (drawerConfig) => (
                  <Ionicons
                    name={
                      Platform.OS === "android" ? "md-contact" : "ios-contact"
                    }
                    size={23}
                    color={drawerConfig.tintColor}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Bills info"
              component={BillsStackNavigator}
              options={{
                drawerIcon: (drawerConfig) => (
                  <Ionicons
                    name={Platform.OS === "android" ? "md-cash" : "ios-cash"}
                    size={23}
                    color={drawerConfig.tintColor}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="History"
              component={BillsStackNavigator}
              options={{
                drawerIcon: (drawerConfig) => (
                  <Ionicons
                    name={Platform.OS === "android" ? "md-cash" : "ios-cash"}
                    size={23}
                    color={drawerConfig.tintColor}
                  />
                ),
              }}
            />
            <Drawer.Screen
              name="Settings"
              component={SettingsStackNavigator}
              options={{
                drawerIcon: (drawerConfig) => (
                  <Ionicons
                    name={
                      Platform.OS === "android" ? "md-settings" : "ios-settings"
                    }
                    size={23}
                    color={drawerConfig.tintColor}
                  />
                ),
              }}
            />
          </Drawer.Navigator>
        </>
      )}
    </NavigationContainer>
  );
}

const mapStateToProps = (state) => {
  const { userToken, isSignout, currentUser } = state.auth;

  return {
    userToken,
    isSignout,
    currentUser,
  };
};

export default connect(mapStateToProps, actions)(Roots);
