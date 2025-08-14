import React, { useEffect, useState } from "react";
import { View, Text, FlatList, TextInput, TouchableOpacity, Image, StyleSheet } from "react-native";
import { getConversationsRealtime } from "../controllers/ConversationController";
import dayjs from "dayjs";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../navigation/AppNavigator";

type NavProp = StackNavigationProp<RootStackParamList, "MessengerMain">;

export default function MessengerMainScreen() {
    const [search, setSearch] = useState("");
    const [convs, setConvs] = useState<any[]>([]);
    const navigation = useNavigation<NavProp>();
    const currentUserId = "user1"; // TODO: từ auth

    useEffect(() => {
        const unsub = getConversationsRealtime(currentUserId, setConvs);
        return () => unsub();
    }, []);

    const filtered = convs.filter((c) =>
        (c.peer?.username || "").toLowerCase().includes(search.toLowerCase())
    );

    return (
        <View style={{ flex: 1, backgroundColor: "white" }}>
            <View style={styles.searchContainer}>
                <Image
                    source={require("../images/icon_search.png")}
                    style={styles.searchIcon}
                />
                <TextInput
                    placeholder="Search..."
                    value={search}
                    onChangeText={setSearch}
                    style={styles.searchInput}
                />
            </View>
            <FlatList
                data={filtered}
                keyExtractor={(item) => item.conversationId}
                renderItem={({ item }) => (
                    <TouchableOpacity
                        style={styles.row}
                        onPress={() =>
                            navigation.navigate("ConversationDetail", {
                                conversationId: item.conversationId,
                                title: item.peer?.username || "Group Chat",
                            })
                        }
                    >
                        <Image
                            source={{ uri: item.peer?.avatarUrl || "https://i.pravatar.cc/100" }}
                            style={styles.avatar}
                        />
                        <View style={{ flex: 1 }}>
                            <Text style={styles.name}>{item.peer?.username || "Group Chat"}</Text>
                            <Text style={styles.lastMsg}>{item.lastMessage?.content || ""}</Text>
                        </View>
                        <View style={{ alignItems: "flex-end" }}>
                            <Text style={styles.time}>
                                {item.lastMessage?.timestamp ? dayjs(item.lastMessage.timestamp).format("HH:mm") : ""}
                            </Text>
                            {item.unreadCount > 0 && (
                                <View style={styles.badge}>
                                    <Text style={styles.badgeText}>{item.unreadCount}</Text>
                                </View>
                            )}
                        </View>
                    </TouchableOpacity>
                )}
                ItemSeparatorComponent={() => <View style={{ height: 1, backgroundColor: "#f0f0f0" }} />}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        paddingHorizontal: 16,
        backgroundColor: "#f0f0f0",
        borderRadius: 20,
        marginHorizontal: 15,
        marginVertical: 20,
    },
    searchIcon: {
        width: 20,
        height: 20,
        marginRight: 8,
        tintColor: "gray",
    },
    searchInput: { backgroundColor: "#f0f0f0", borderRadius: 20, paddingHorizontal: 15, height: 40 },
    row: { flexDirection: "row", alignItems: "center", padding: 10, gap: 10 },
    avatar: { width: 50, height: 50, borderRadius: 25 },
    name: { fontSize: 16, fontWeight: "bold", color: "black" },
    lastMsg: { fontSize: 14, color: "#666" },
    time: { fontSize: 12, color: "#888" },
    badge: { backgroundColor: "#1877F2", borderRadius: 12, paddingHorizontal: 6, paddingVertical: 2, marginTop: 4 },
    badgeText: { color: "#fff", fontSize: 12, fontWeight: "bold" },
});
