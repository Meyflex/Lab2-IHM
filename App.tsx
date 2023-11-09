import React, { useState } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  SafeAreaView,
} from "react-native";
import DropDownPicker from "react-native-dropdown-picker";
import RotatingCard from "./RotatingCard";
import {
  GestureHandlerRootView,
  ScrollView,
} from "react-native-gesture-handler";
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
  const [openMonth, setOpenMonth] = useState<boolean>(false);
  const [openYear, setOpenYear] = useState<boolean>(false);
  const [hasToRotate, setHasToRotate] = useState<boolean>(false);
  const [cardType, setCardType] = useState<number>(0);

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
    // except for 15
    cardNumber = cardNumber.replaceAll(" ", "");
    if (cardNumber.startsWith("34") || cardNumber.startsWith("37")) {
      setCardType(3);
      const cardNumberPattern =
        /^\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?$/;
      const valeur = cardNumberPattern.test(cardNumber);
      setHasToRotate(false);
      if (valeur) {
        let formattedCardNumber;
        if (cardType === 3) {
          // Note: Using optional chaining operator '?' to handle possibly undefined values
          formattedCardNumber = `${cardNumber.charAt(0)}${cardNumber.charAt(
            1
          )}${cardNumber.charAt(2)}${cardNumber.charAt(
            3
          )}   ${cardNumber.charAt(4)}${cardNumber.charAt(
            5
          )}${cardNumber.charAt(6)}${cardNumber.charAt(7)}${cardNumber.charAt(
            8
          )}${cardNumber.charAt(9)}   ${cardNumber.charAt(
            10
          )}${cardNumber.charAt(11)}${cardNumber.charAt(12)}${cardNumber.charAt(
            13
          )}${cardNumber.charAt(14)}`;
        } else {
          formattedCardNumber = `${cardNumber.charAt(0)}${cardNumber.charAt(
            1
          )}${cardNumber.charAt(2)}${cardNumber.charAt(
            3
          )}   ${cardNumber.charAt(4)}${cardNumber.charAt(
            5
          )}${cardNumber.charAt(6)}${cardNumber.charAt(
            7
          )}   ${cardNumber.charAt(8)}${cardNumber.charAt(
            9
          )}${cardNumber.charAt(10)}${cardNumber.charAt(
            11
          )}   ${cardNumber.charAt(12)}${cardNumber.charAt(
            13
          )}${cardNumber.charAt(14)}${cardNumber.charAt(15)}`;
        }

        setCardNumber(formattedCardNumber.trimEnd());
      }
      return;
    }
    if (cardNumber.startsWith("4")) {
      setCardType(0);
    }
    if (cardNumber.startsWith("5")) {
      setCardType(1);
    }
    if (cardNumber.startsWith("6")) {
      setCardType(2);
    }
    if (cardNumber.startsWith("38")) {
      setCardType(4);
    }
    if (cardNumber.startsWith("30")) {
      setCardType(4);
    }
    if (cardNumber.startsWith("36")) {
      setCardType(4);
    }
    const cardNumberPattern =
      /^\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?\d?$/;
    const valeur = cardNumberPattern.test(cardNumber);
    setHasToRotate(false);
    if (valeur) {
      let formattedCardNumber;
      if (cardType === 3) {
        // Note: Using optional chaining operator '?' to handle possibly undefined values
        formattedCardNumber = `${cardNumber.charAt(0)}${cardNumber.charAt(
          1
        )}${cardNumber.charAt(2)}${cardNumber.charAt(3)}   ${cardNumber.charAt(
          4
        )}${cardNumber.charAt(5)}${cardNumber.charAt(6)}${cardNumber.charAt(
          7
        )}${cardNumber.charAt(8)}${cardNumber.charAt(9)}   ${cardNumber.charAt(
          10
        )}${cardNumber.charAt(11)}${cardNumber.charAt(12)}${cardNumber.charAt(
          13
        )}${cardNumber.charAt(14)}`;
      } else {
        formattedCardNumber = `${cardNumber.charAt(0)}${cardNumber.charAt(
          1
        )}${cardNumber.charAt(2)}${cardNumber.charAt(3)}   ${cardNumber.charAt(
          4
        )}${cardNumber.charAt(5)}${cardNumber.charAt(6)}${cardNumber.charAt(
          7
        )}   ${cardNumber.charAt(8)}${cardNumber.charAt(9)}${cardNumber.charAt(
          10
        )}${cardNumber.charAt(11)}   ${cardNumber.charAt(
          12
        )}${cardNumber.charAt(13)}${cardNumber.charAt(14)}${cardNumber.charAt(
          15
        )}`;
      }

      setCardNumber(formattedCardNumber.trimEnd());
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
    <GestureHandlerRootView>
      <SafeAreaView>
        <ScrollView
          style={styles.container}
          contentContainerStyle={{
            justifyContent: "flex-start",
            marginTop: 100,
            alignItems: "center",
            height: "150%",
          }}
        >
          <RotatingCard
            cardName={cardName}
            cardNumber={cardNumber}
            cvv={cvv}
            expiryMonth={expiryMonth}
            expiryYear={expiryYear}
            HasToRotate={hasToRotate}
            setHasToRotate={setHasToRotate}
            cardType={cardType}
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
              keyboardType="numeric"
            />

            <View style={styles.row}>
              <DropDownPicker
                items={months}
                value={expiryMonth}
                open={openMonth}
                zIndex={1}
                placeholder="Month"
                containerStyle={[styles.pickerContainer, styles.smallInput]}
                dropDownContainerStyle={styles.pickerDropdownContainer}
                style={styles.input}
                setOpen={setOpenMonth}
                setValue={(val) => {
                  setExpiryMonth(val);
                  setHasToRotate(false);
                }}
              />
              <DropDownPicker
                items={years}
                value={expiryYear}
                zIndex={1}
                open={openYear}
                placeholder="Year"
                containerStyle={[styles.pickerContainer, styles.smallInput]}
                dropDownContainerStyle={styles.pickerDropdownContainer}
                style={styles.input}
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
                keyboardType="numeric"
              />
            </View>
            <View style={{ zIndex: -1 }}>
              <Button title="Submit" onPress={onSubmit} />
            </View>
          </View>
        </ScrollView>
      </SafeAreaView>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,

    height: "100%",
  },
  box: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 20,
    width: "100%",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 15,
    marginBottom: 20,
    borderRadius: 10,
  },

  smallInput22: {
    width: "20%",
  },
  pickerContainer: {
    height: 40,
    width: 120,
    borderColor: "#ccc",
  },

  pickerItem: {
    justifyContent: "flex-start",
  },

  smallInput: {
    marginRight: 10,
    borderRadius: 5,
    borderColor: "#ccc",
  },
  pickerDropdownContainer: {
    zIndex: 1000,
    borderColor: "#ccc",
  },
});

export default App;
