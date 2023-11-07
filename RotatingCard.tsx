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
  const cardTypeValues = [cardTypeVisa, cardTypeMaster];

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

  let completeCardNumber = cardNumber;
  for (var i = cardNumber.length; i < 16; i++) completeCardNumber += '#';
  const formattedCardNumber = completeCardNumber[0] +completeCardNumber[1] +completeCardNumber[2] +completeCardNumber[3] + '   ' + completeCardNumber[4] +completeCardNumber[5] +completeCardNumber[6] +completeCardNumber[7] + '   ' + completeCardNumber[8] +completeCardNumber[9] +completeCardNumber[10] +completeCardNumber[11] + '   ' + completeCardNumber[12] +completeCardNumber[13] +completeCardNumber[14] +completeCardNumber[15] 

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
                <Image source={require("./assets/chip.png")} style={styles.Chip} />
                <Image source={cardTypeValues[cardType]} style={styles.bankType} />
              </View>
              <Text style={styles.CardNumber}>{formattedCardNumber}</Text>
              <View style={styles.CardName}>
                <Text> Card Holder </Text>
                <Text>{cardName.toUpperCase()}</Text>
              </View>
              <View style={styles.dateExpiration}>
                <Text> Expires</Text>
                <Text>
                  {expiryMonth}/{expiryYear}
                </Text>
              </View>
            </View>
          ) : (
            <View style={styles.carteBack}>
              <Text>{cvv}</Text>
              <Image source={cardTypeValue} />
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
    color: "#FFF"
  },
  card: {
    width: 1.61 * 220,
    height: 220,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 10,
    borderWidth: 1,
    padding:20,
    overflow: "hidden",
    
  },
  cardText: {
    color: "white",
  },

  carteFront: {
    width:"100%",
    height:"100%",
    justifyContent: "flex-start",
    
    
  },
  carteBack: {},
  spaceBetween: {
    justifyContent: "space-between",
    flexDirection: "row",
    
    width:"100%",
   
    alignItems:"flex-start"
  },
  CardName: {
    color: "#FFF"
  },
  dateExpiration: {},
  Chip: {
    height: 50,
    width:60
  },
  bankType:{
    maxWidth: 80,
    maxHeight:60,
    objectFit: "contain",
  },
  CardNumber : {
    fontSize:24,
    fontWeight:"500",
    color: "#FFF",
    marginVertical: 20,

  }
});

export default RotatingCard;
