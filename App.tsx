import React, { useEffect, useState } from "react";
import { View, Text, Button } from "react-native";
import { realtimeDB } from "./config/Firebase";
import { ref, set, onValue } from "firebase/database";

export default function App() {
  const [value, setValue] = useState<string>("Chưa có dữ liệu");

  // 🔹 Lắng nghe dữ liệu từ nhánh test
  useEffect(() => {
    const testRef = ref(realtimeDB, "test/value");
    const unsubscribe = onValue(testRef, (snapshot) => {
      const data = snapshot.val();
      setValue(data ?? "Chưa có dữ liệu");
    });

    return () => unsubscribe();
  }, []);

  // 🔹 Ghi dữ liệu test
  const writeData = () => {
    const testRef = ref(realtimeDB, "test/value");
    set(testRef, "Xin chào từ Expo + Firebase " + Date.now());
  };

  return (
    <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
      <Text style={{ fontSize: 18, marginBottom: 20 }}>
        Giá trị từ Firebase: {value}
      </Text>
      <Button title="Ghi dữ liệu test" onPress={writeData} />
    </View>
  );
}
