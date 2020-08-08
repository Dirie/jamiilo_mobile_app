import React, { useState } from "react";
import { StyleSheet, Text, View, Button } from "react-native";
import { CreditCardInput } from "react-native-credit-card-input";
import { FontAwesome } from "@expo/vector-icons";
/**
 * Renders the payment form and handles the credit card data
 * using the CreditCardInput component.
 */
function PaymentFormView(props) {
  const [cardDataState, setCardDataState] = useState({ valid: false });
  const { onSubmit, submitted, error } = props;

  return (
    <View>
      <View>
        <CreditCardInput
          requiresName
          onChange={(cardDataState) => setCardDataState(cardDataState)}
        />
      </View>
      <View style={styles.buttonWrapper}>
        <Button title="Subscribe" onPress={() => onSubmit(cardDataState)} />
        {/* Show errors */}
        {error && (
          <View style={styles.alertWrapper}>
            <View style={styles.alertIconWrapper}>
              <FontAwesome
                name="exclamation-circle"
                size={20}
                style={{ color: "#c22" }}
              />
            </View>
            <View style={styles.alertTextWrapper}>
              <Text style={styles.alertText}>{error}</Text>
            </View>
          </View>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  buttonWrapper: {
    padding: 10,
    zIndex: 100,
  },
  alertTextWrapper: {
    flex: 20,
    justifyContent: "center",
    alignItems: "center",
  },
  alertIconWrapper: {
    padding: 5,
    flex: 4,
    justifyContent: "center",
    alignItems: "center",
  },
  alertText: {
    color: "#c22",
    fontSize: 16,
    fontWeight: "400",
  },
  alertWrapper: {
    backgroundColor: "#ecb7b7",
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 5,
    paddingVertical: 5,
    marginTop: 10,
  },
});

export default PaymentFormView;
