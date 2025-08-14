// navigation/AppNavigator.tsx
import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import HomeScreen from "../views/HomeScreen";
import MessengerMainScreen from "../views/MessengerMainScreen";
import ConversationDetail from "../views/ConversationDetail";
import Layout from "../components/Layout";
import { realtimeDB } from "../config/Firebase";
import { ref, get } from "firebase/database";

export type RootStackParamList = {
  Home: undefined;
  MessengerMain: undefined;
  ConversationDetail: { conversationId: string; title: string };
};

const Stack = createStackNavigator<RootStackParamList>();

export default function AppNavigator() {
  const [avatarUrl, setAvatarUrl] = useState("");

  useEffect(() => {
    // Lấy avatar từ Firebase
    const userRef = ref(realtimeDB, "users/user1/avatarUrl"); // TODO: lấy userId từ auth
    get(userRef).then((snapshot) => {
      if (snapshot.exists()) {
        setAvatarUrl(snapshot.val());
      }
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen
          name="Home"
          children={() => (
            <Layout avatarUrl={avatarUrl}>
              <HomeScreen />
            </Layout>
          )}
        />
        <Stack.Screen
          name="MessengerMain"
          children={() => (
            <Layout avatarUrl={avatarUrl}>
              <MessengerMainScreen />
            </Layout>
          )}
        />
        {/* Không bọc Layout => không có Header, Navbar */}
        <Stack.Screen
          name="ConversationDetail"
          component={ConversationDetail}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
