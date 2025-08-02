import React, { useEffect } from "react";
import { View, Text } from "react-native";
import { db } from "./src/config/firebase";

export default function App() {
  useEffect(() => {
    const testFirebase = async () => {
      const querySnapshot = await getDocs(collection(db, "test"));
      querySnapshot.forEach((doc) => {
        console.log(`${doc.id} => `, doc.data());
      });
    };

    testFirebase();
  }, []);

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Firebase Connected!</Text>
    </View>
  );
}
