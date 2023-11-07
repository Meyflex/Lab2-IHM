import React, { useState } from "react";
import { View, TextInput, Button, StyleSheet } from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import RotatingCard from "./RotatingCard";
type DataStructureDropdown = {
  label: string;
  value: string;
};
const App = () => {
  const [cardNumber, setCardNumber] = useState<string>("");
  const [cardName, setCardName] = useState<string>("");
  const [expiryMonth, setExpiryMonth] = useState<string>("01");
  const [expiryYear, setExpiryYear] = useState<string>("23");
  const [cvv, setCvv] = useState<string>("");
  const [openMonth, setOpeMonth] = useState(false);
  const [openYear, setOpenYear] = useState<boolean>(false);
  const [hasToRotate, setHasToRotate] = useState<boolean>(false);

  const months: DataStructureDropdown[] = [
    { label: "January", value: "01" },
    { label: "February", value: "02" },
    { label: "March", value: "03" },
    { label: "April", value: "04" },
    { label: "May", value: "05" },
    { label: "June", value: "06" },
    { label: "July", value: "07" },
    { label: "August", value: "08" },
    { label: "September", value: "09" },
    { label: "October", value: "10" },
    { label: "November", value: "11" },
    { label: "December", value: "12" },
  ];

  const years: DataStructureDropdown[] = [
    { label: "2023", value: "23" },
    { label: "2024", value: "24" },
    { label: "2025", value: "25" },
    { label: "2026", value: "26" },
    { label: "2027", value: "27" },
    { label: "2028", value: "28" },
    { label: "2029", value: "29" },
    { label: "2030", value: "30" },
  ];

  function isCreditCardValid(cardNumber: string) {
    // Use a regular expression to check if cardNumber is exactly 16 digits
    const cardNumberPattern =
      /^\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?$/;
    const valeur = cardNumberPattern.test(cardNumber);
    setHasToRotate(false);
    if (valeur) {
      setCardNumber(cardNumber);
    }
  }
  function isCreditCvvValid(cvvNumber: string) {
    // Use a regular expression to check if cardNumber is exactly 16 digits
    setHasToRotate(true);
    const cardNumberPattern = /^\d*$/;
    const valeur = cardNumberPattern.test(cvvNumber);

    if (valeur) {
      setCvv(cvvNumber);
    }
  }

  const onSubmit = () => {
    console.log({
      cardNumber,
      cardName,
      expiryMonth,
      expiryYear,
      cvv,
    });
  };

  return (
    <View style={styles.container}>
      <RotatingCard
        cardName={cardName}
        cardNumber={cardNumber}
        cvv={cvv}
        expiryMonth={expiryMonth}
        expiryYear={expiryYear}
        HasToRotate={hasToRotate}
        setHasToRotate={setHasToRotate}
        cardType={0}
      />

      <View style={styles.box}>
        <TextInput
          placeholder="Card Name"
          value={cardName}
          onChangeText={(val) => {
            setCardName(val);
            setHasToRotate(false);
          }}
          style={styles.input}
        />
        <TextInput
          placeholder="Card Number"
          value={cardNumber}
          onChangeText={isCreditCardValid}
          style={styles.input}
        />

        <View style={styles.row}>
          <DropDownPicker
            items={months}
            value={expiryMonth}
            open={openMonth}
            placeholder="Month"
            containerStyle={[styles.pickerContainer, styles.smallInput]}
            style={styles.picker}
            setOpen={setOpeMonth}
            setValue={(val) => {
              setExpiryMonth(val);
              setHasToRotate(false);
            }}
          />
          <DropDownPicker
            items={years}
            value={expiryYear}
            open={openYear}
            placeholder="Year"
            containerStyle={[styles.pickerContainer, styles.smallInput]}
            style={styles.picker}
            setOpen={setOpenYear}
            setValue={(val) => {
              setExpiryYear(val);
              setHasToRotate(false);
            }}
          />

          <TextInput
            placeholder="CVV"
            value={cvv}
            onChangeText={isCreditCvvValid}
            style={[styles.input, styles.smallInput22]}
          />
        </View>
        <Button title="Submit" onPress={onSubmit} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    justifyContent: "center",
    alignItems: "center",
    height: "100%",
  },
  box: {
    justifyContent: "center",
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },

  smallInput22: {
    marginRight: 10,
    width: "20%",
  },
  pickerContainer: {
    height: 40,
    width: 120,
  },
  picker: {
    backgroundColor: "white",
  },
  pickerItem: {
    justifyContent: "flex-start",
  },
  dropDown: {
    backgroundColor: "white",
    zIndex: 1000,
  },
  smallInput: {
    marginLeft: 10,
    marginRight: 10,
    borderRadius: 5,
  },
});

export default App;
