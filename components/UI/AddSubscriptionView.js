import React from "react";
import { StyleSheet, Text, View, ScrollView } from "react-native";
import KeyboardSpacer from "react-native-keyboard-spacer";
import PaymentFormView from "./paymentFormView";
/**
 * The class renders a view with PaymentFormView
 */
function AddSubscriptionView(props) {
  return (
    <View style={styles.container}>
      <ScrollView style={styles.container}>
        <View style={styles.textWrapper}>
          <Text style={styles.infoText}>
            Try out full Stripe payment functionality in a React Native app
          </Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.infoText}>
            Subscribe to see the magic number!
          </Text>
        </View>
        <View style={styles.textWrapper}>
          <Text style={styles.infoText}>Subscription Plan: $10/month</Text>
        </View>
        <View style={styles.cardFormWrapper}>
          <PaymentFormView {...props} />
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textWrapper: {
    margin: 10,
  },
  infoText: {
    fontSize: 18,
    textAlign: "center",
  },
  cardFormWrapper: {
    padding: 10,
    margin: 10,
  },
});

export default AddSubscriptionView;
