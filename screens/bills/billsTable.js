import React from "react";
import { Ionicons } from "@expo/vector-icons";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";

export default function Bills(props) {
  const { type, NameOnCard } = props;
  return (
    <View style={styles.MainContainer}>
      <Text style={{ marginLeft: 10 }}>{type}</Text>
      <Text style={{ marginLeft: 10 }}>{NameOnCard}</Text>
      <Text style={{ marginLeft: 10 }}>......5554</Text>
      <View
        style={{
          marginHorizontal: 30,
        }}
      >
        <TouchableOpacity
          style={{ right: 10, alignItems: "center" }}
          onPress={props.onRemove}
        >
          <Ionicons
            name={Platform.OS === "android" ? "md-trash" : "ios-trash"}
            size={24}
            color="black"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    flexDirection: "row",
    paddingTop: 10,
    marginTop: 10,
  },
});
