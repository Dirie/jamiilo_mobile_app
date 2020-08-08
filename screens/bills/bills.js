//This is an example code for Navigation Drawer with Custom Side bar//
import React from "react";
//import react in our code.
import { StyleSheet, View, Text, FlatList, SafeAreaView } from "react-native";
import paymentMethods from "../../data/bills";
import BillsTable from "./billsTable";

export default function Bills() {
  const paymentMethods = [
    {
      key: "5ec6eb216541ae916dfaa218",
      country: "Somalia",
      organization: "Visa",
      type: "Visa/Debit/Credit",
      Phone: "+252615991372",
      NameOnCard: "Farah Salad",
      cardNumber: "052524252524224",
      expireMonth: "07",
      expireYear: "2024",
      created_date: "2020-05-21T20:57:05.600+00:00",
    },
    {
      key: "5ec6eb216541ae916dfaa220",
      country: "Somalia",
      organization: "MasterCard",
      type: "Visa/Debit/Credit",
      phone: "",
      NameOnCard: "Sacid Dahir",
      cardNumber: "25424242424",
      expireMonth: "04",
      expireYear: "2025",
      created_date: "2020-05-21T20:57:05.600+00:00",
    },
    {
      key: "5ec6eb216541ae916dfaa219",
      country: "Somalia",
      organization: "MPesa",
      type: "Mobile-payment",
      phone: "+252615991372",
      NameOnCard: "abdulrazak dirie",
      cardNumber: "",
      expireMonth: "",
      expireYear: "",
      created_date: "2020-05-21T20:57:05.600+00:00",
    },
  ];

  const onRemove = (id) => {
    console.log(id);
    alert("item was removed..");
  };

  return (
    <View style={styles.MainContainer}>
      <SafeAreaView style={styles.container}>
        {paymentMethods.map((p) => (
          <BillsTable
            key={p.key}
            type={p.type}
            NameOnCard={p.NameOnCard}
            onRemove={() => onRemove(p.key)}
          />
        ))}

        {/* <FlatList data={this.data} renderItem={({ item }) => <CardImage />} /> */}
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  MainContainer: {
    // flex: 1,
    // paddingTop: 20,
    // alignItems: "center",
    // marginTop: 50,
    // justifyContent: "center",
  },
});
