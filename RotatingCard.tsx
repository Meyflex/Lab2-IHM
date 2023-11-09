import React, { useState, useRef, useEffect } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  ImageBackground,
  Image,
} from "react-native";
interface RotatingCardInterface {
  cardNumber: string;
  cardName: string;
  expiryMonth: string;
  expiryYear: string;
  cvv: string;
  HasToRotate: boolean;
  setHasToRotate: any;
  cardType: number;
}

const RotatingCard: React.FC<RotatingCardInterface> = ({
  cardNumber,
  cardName,
  expiryMonth,
  expiryYear,
  cvv,
  HasToRotate,
  setHasToRotate,
  cardType,
}) => {
  const [isRotated, setIsRotated] = useState(true);
  const rotationValue = useRef(new Animated.Value(0)).current;
  const cardTypeVisa = require("./assets/visa.png");
  const cardTypeMaster = require("./assets/mastercard.png");
  const cardTypeDiscovery = require("./assets/discover.png");
  const cardTypeAmex = require("./assets/amex.png");
  const cardTypeOther = require("./assets/dinersclub.png");
  const cardTypeValues = [
    cardTypeVisa,
    cardTypeMaster,
    cardTypeDiscovery,
    cardTypeAmex,
    cardTypeOther,
  ];

  useEffect(() => {
    if (HasToRotate === isRotated) {
      handlePress();
    }
  }, [HasToRotate]);

  const handlePress = () => {
    Animated.timing(rotationValue, {
      toValue: isRotated ? 0 : 1, // 0 degrees or 1 (representing 180 degrees)
      duration: 500, // Animation duration in milliseconds
      useNativeDriver: true, // Required for Android
    }).start();

    setTimeout(function () {
      setIsRotated(!isRotated);
      setHasToRotate(isRotated);
    }, 250);
  };
  let formattedCardNumber;
  let completeCardNumber = cardNumber.replaceAll(" ", "");
  for (let i = completeCardNumber.length; i < (cardType == 3 ? 15 : 16); i++)
    completeCardNumber += "#";
  if (cardType == 3) {
    formattedCardNumber =
      completeCardNumber[0] +
      completeCardNumber[1] +
      completeCardNumber[2] +
      completeCardNumber[3] +
      "   " +
      completeCardNumber[4] +
      completeCardNumber[5] +
      completeCardNumber[6] +
      completeCardNumber[7] +
      completeCardNumber[8] +
      completeCardNumber[9] +
      "   " +
      completeCardNumber[10] +
      completeCardNumber[11] +
      completeCardNumber[12] +
      completeCardNumber[13] +
      completeCardNumber[14];
  } else {
    formattedCardNumber =
      completeCardNumber[0] +
      completeCardNumber[1] +
      completeCardNumber[2] +
      completeCardNumber[3] +
      "   " +
      completeCardNumber[4] +
      completeCardNumber[5] +
      completeCardNumber[6] +
      completeCardNumber[7] +
      "   " +
      completeCardNumber[8] +
      completeCardNumber[9] +
      completeCardNumber[10] +
      completeCardNumber[11] +
      "   " +
      completeCardNumber[12] +
      completeCardNumber[13] +
      completeCardNumber[14] +
      completeCardNumber[15];
  }

  // Interpolate the rotation value
  const rotate = rotationValue.interpolate({
    inputRange: [0, 0.5, 0.5, 1],
    outputRange: ["0deg", "90deg", "-90deg", "0deg"],
  });

  return (
    <TouchableOpacity style={styles.cardContainer} onPress={handlePress}>
      <Animated.View
        style={[styles.card, { transform: [{ rotateY: rotate }] }]}
      >
        <ImageBackground
          source={require("./assets/6.jpeg")}
          style={styles.card}
        >
          {isRotated ? (
            <View style={styles.carteFront}>
              <View style={styles.spaceBetween}>
                <Image
                  source={require("./assets/chip.png")}
                  style={styles.Chip}
                />
                <Image
                  source={cardTypeValues[cardType]}
                  style={styles.bankType}
                />
              </View>
              <Text style={styles.CardNumber}>{formattedCardNumber}</Text>
              <View style={styles.spaceBetween}>
                <View style={styles.CardName}>
                  <Text style={styles.grayText}>Card Holder </Text>
                  <Text style={styles.WhiteText}>{cardName.toUpperCase()}</Text>
                </View>
                <View style={styles.dateExpiration}>
                  <Text style={styles.grayText}>Expires</Text>
                  <Text style={styles.WhiteText}>
                    {expiryMonth}/{expiryYear}
                  </Text>
                </View>
              </View>
            </View>
          ) : (
            <View style={styles.carteBack}>
              <View style={styles.BorneNoir}></View>
              <Text style={styles.CVVText}>CVV</Text>
              <Text style={styles.BorneBlanche}>{cvv}</Text>
              <Image
                source={cardTypeValues[cardType]}
                style={styles.bankTypeBack}
              />
            </View>
          )}
        </ImageBackground>
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardContainer: {
    alignItems: "center",
    justifyContent: "center",
    marginBottom: 20,
    color: "#FFF",
  },
  card: {
    width: 1.61 * 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,

    overflow: "hidden",
  },
  cardText: {
    color: "white",
  },

  carteFront: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    padding: 20,
    backgroundColor: "rgba(0,0,0, 0.40)",
  },
  carteBack: {
    width: "100%",
    justifyContent: "flex-start",
    alignItems: "flex-end",
    height: "100%",
    backgroundColor: "rgba(0,0,0, 0.40)",
  },
  spaceBetween: {
    justifyContent: "space-between",
    flexDirection: "row",
    width: "100%",

    alignItems: "flex-start",
  },
  CardName: {
    maxWidth: "80%",
  },
  dateExpiration: {},
  Chip: {
    height: 50,
    width: 60,
  },
  bankType: {
    maxWidth: 80,
    maxHeight: 60,
    objectFit: "contain",
  },
  CardNumber: {
    fontSize: 24,
    fontWeight: "600",
    color: "#FFF",
    marginVertical: 20,
  },
  grayText: {
    color: "#aaa",
  },
  WhiteText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "500",
  },
  BorneBlanche: {
    width: "95%",
    alignSelf: "center",
    backgroundColor: "white",
    borderRadius: 5,
    overflow: "hidden",
    textAlign: "right",
    padding: 10,
    height: "17%",
  },
  BorneNoir: {
    marginTop: "7%",
    backgroundColor: "black",
    height: "22%",
    width: "100%",
  },
  CVVText: {
    marginRight: 15,
    color: "white",
    fontSize: 13,
    marginBottom: 2,
    marginTop: 8,
  },
  bankTypeBack: {
    maxWidth: 80,
    maxHeight: 60,
    objectFit: "contain",
    margin: 7,
  },
});

export default RotatingCard;
