// components/Layout.tsx
import React from "react";
import { View, StyleSheet } from "react-native";
import Header from "./Header";
import NavBar from "./Navbar";
import { useRoute } from "@react-navigation/native";

type Props = {
    children: React.ReactNode;
    avatarUrl: string;
};

export default function Layout({ children, avatarUrl }: Props) {
    const route = useRoute();

    const hideHeader = route.name === "ConversationDetail";

    return (
        <View style={styles.container}>
            {!hideHeader && <Header userAvatarUri={avatarUrl} />}
            <View style={styles.content}>{children}</View>
            {!hideHeader && <NavBar />}
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, backgroundColor: "#fff" },
    content: { flex: 1, paddingBottom: 70 },
});
