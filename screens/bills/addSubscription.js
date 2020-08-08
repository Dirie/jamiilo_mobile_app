import React, { useState } from "react";
// import AddSubscriptionView from "../components/AddSubscriptionView";
import AddSubscriptionView from "../../components/UI/AddSubscriptionView";
const STRIPE_ERROR = "Payment service error. Try again later.";
const SERVER_ERROR = "Server error. Try again later.";
const STRIPE_PUBLISHABLE_KEY = "pk_test_7E1BFaKbNKUN2rDwsq459JU800gcaYNNNi";
/**
 * The method sends HTTP requests to the Stripe API.
 * It's necessary to manually send the payment data
 * to Stripe because using Stripe Elements in React
 * Native apps isn't possible.
 *
 * @param creditCardData the credit card data
 * @return Promise with the Stripe data
 */

/**
 * The method imitates a request to our server.
 *
 * @param creditCardToken
 * @return {Promise<Response>}
 */
const subscribeUser = (creditCardToken) => {
  return new Promise((resolve) => {
    console.log("Credit card token\n", creditCardToken);
    setTimeout(() => {
      resolve({ status: true });
    }, 1000);
  });
};
/**
 * The main class that submits the credit card data and
 * handles the response from Stripe.
 */
function AddSubscription(props) {
  const [submitState, setSubmitState] = useState(false);
  const [errorState, setErrorState] = useState(null);

  const getCreditCardToken = (creditCardData) => {
    const card = {
      "card[number]": creditCardData.values.number.replace(/ /g, ""),
      "card[exp_month]": creditCardData.values.expiry.split("/")[0],
      "card[exp_year]": creditCardData.values.expiry.split("/")[1],
      "card[cvc]": creditCardData.values.cvc,
    };
    return fetch("https://api.stripe.com/v1/tokens", {
      headers: {
        // Use the correct MIME type for your server
        Accept: "application/json",
        // Use the correct Content Type to send data to Stripe
        "Content-Type": "application/x-www-form-urlencoded",
        // Use the Stripe publishable key as Bearer
        Authorization: `Bearer ${STRIPE_PUBLISHABLE_KEY}`,
      },
      // Use a proper HTTP method
      method: "post",
      // Format the credit card data to a string of key-value pairs
      // divided by &
      body: Object.keys(card)
        .map((key) => key + "=" + card[key])
        .join("&"),
    }).then((response) => response.json());
  };

  // Handles submitting the payment request
  const onSubmit = async (creditCardInput) => {
    const { navigation } = props;
    // Disable the Submit button after the request is sent
    setSubmitState(true);
    let creditCardToken;
    try {
      // Create a credit card token
      creditCardToken = await getCreditCardToken(creditCardInput);
      if (creditCardToken.error) {
        setSubmitState(false);
        setErrorState(STRIPE_ERROR);
        return;
      }
    } catch (e) {
      setSubmitState(false);
      setErrorState(STRIPE_ERROR);
      return;
    }
    // Send a request to your server with the received credit card token
    const { error } = await subscribeUser(creditCardToken);
    // Handle any errors from your server
    if (error) {
      setSubmitState(false);
      setErrorState(SERVER_ERROR);
    } else {
      setSubmitState(false);
      setErrorState(null);
      navigation.navigate("Home");
    }
  };

  return (
    <AddSubscriptionView
      error={errorState}
      submitted={submitState}
      onSubmit={onSubmit}
    />
  );
}

export default AddSubscription;
