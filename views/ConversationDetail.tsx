import React, { useEffect, useRef, useState } from "react";
import {
  View,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Image,
  KeyboardAvoidingView,
  Platform,
  TextInput,
  Keyboard,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  subscribeMessages,
  sendMessage,
  markAllSeen,
} from "../controllers/MessageController";
import { getConversationPeer } from "../controllers/ConversationController";

export default function ConversationDetail() {
  const route = useRoute<any>();
  const navigation = useNavigation<any>();
  const { conversationId } = route.params;
  const currentUserId = "user1"; // TODO: từ auth
  const [messages, setMessages] = useState<any[]>([]);
  const [peer, setPeer] = useState<any>(null);
  const [text, setText] = useState("");
  const listRef = useRef<FlatList>(null);

  useEffect(() => {
    getConversationPeer(conversationId, currentUserId).then((user) =>
      setPeer(user)
    );
    const unsub = subscribeMessages(conversationId, setMessages);
    markAllSeen(conversationId, currentUserId);
    return () => unsub();
  }, [conversationId]);

  // Scroll xuống cuối khi có tin nhắn mới
  useEffect(() => {
    if (messages.length > 0) {
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 50);
    }
  }, [messages]);

  // Scroll xuống cuối khi bàn phím bật
  useEffect(() => {
    const keyboardShow = Keyboard.addListener("keyboardDidShow", () => {
      setTimeout(() => {
        listRef.current?.scrollToEnd({ animated: true });
      }, 50);
    });
    return () => {
      keyboardShow.remove();
    };
  }, []);

  const handleSend = () => {
    if (text.trim()) {
      sendMessage(conversationId, currentUserId, text.trim());
      setText("");
    }
  };

  const renderMessage = ({ item }: { item: any }) => {
    const isCurrentUser = item.senderId === currentUserId;

    return (
      <View
        style={[
          styles.messageRow,
          { justifyContent: isCurrentUser ? "flex-end" : "flex-start" },
        ]}
      >
        {!isCurrentUser && (
          <Image
            source={{ uri: peer?.avatarUrl || "https://i.pravatar.cc/100" }}
            style={styles.messageAvatar}
          />
        )}
        <View
          style={[
            styles.messageBubble,
            {
              backgroundColor: isCurrentUser ? "#1877F2" : "#f0f0f0",
              marginLeft: isCurrentUser ? 0 : 6,
              marginRight: isCurrentUser ? 6 : 0,
            },
          ]}
        >
          <Text
            style={{
              color: isCurrentUser ? "white" : "black",
            }}
          >
            {item.content}
          </Text>
        </View>
      </View>
    );
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      keyboardVerticalOffset={Platform.OS === "ios" ? 0 : 0}
    >
      {/* Header chat */}
      <View style={styles.chatHeader}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image
            source={require("../images/icon_back.png")}
            style={styles.backIcon}
          />
        </TouchableOpacity>

        {peer && (
          <View style={styles.peerInfo}>
            <Image
              source={{
                uri: peer.avatarUrl || "https://i.pravatar.cc/100",
              }}
              style={styles.peerAvatar}
            />
            <View>
              <Text style={styles.peerName}>{peer.username}</Text>
              <Text style={styles.peerStatus}>Active now</Text>
            </View>
          </View>
        )}

        <View style={styles.headerActions}>
          <TouchableOpacity>
            <Image
              source={require("../images/icon_videoCall.png")}
              style={styles.headerIcon}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Danh sách tin nhắn */}
      <FlatList
        ref={listRef}
        data={messages}
        keyExtractor={(item) => item.messageId}
        renderItem={renderMessage}
        contentContainerStyle={{ padding: 10 }}
      />

      {/* Thanh nhập tin nhắn */}
      <View style={styles.inputContainer}>
        <TouchableOpacity>
          <Image
            source={require("../images/icon_file.png")}
            style={styles.inputIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../images/icon_emoji.png")}
            style={styles.inputIcon}
          />
        </TouchableOpacity>
        <TouchableOpacity>
          <Image
            source={require("../images/icon_image.png")}
            style={styles.inputIcon}
          />
        </TouchableOpacity>
        <TextInput
          style={styles.textInput}
          placeholder="Aa"
          value={text}
          onChangeText={setText}
        />
        <TouchableOpacity onPress={handleSend}>
          <Image
            source={require("../images/icon_send.png")}
            style={styles.inputIcon}
          />
        </TouchableOpacity>
      </View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "white" },

  // Header
  chatHeader: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
    backgroundColor: "#fff",
    marginTop: 50,
  },
  backIcon: { width: 28, height: 28, tintColor: "#1877F2" },
  peerInfo: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 10,
    flex: 1,
  },
  peerAvatar: { width: 40, height: 40, borderRadius: 20, marginRight: 10 },
  peerName: { fontSize: 16, fontWeight: "bold", color: "black" },
  peerStatus: { fontSize: 12, color: "#666" },
  headerActions: { flexDirection: "row", gap: 10 },
  headerIcon: {
    width: 28,
    height: 28,
    marginHorizontal: 6,
    tintColor: "#1877F2",
  },

  // Message
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 2,
  },
  messageAvatar: {
    width: 32,
    height: 32,
    borderRadius: 16,
  },
  messageBubble: {
    padding: 10,
    borderRadius: 16,
    maxWidth: "75%",
  },

  // Input
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 6,
    backgroundColor: "#fff",
    marginBottom: 20
  },
  inputIcon: {
    width: 28,
    height: 28,
    marginHorizontal: 6,
    tintColor: "#1877F2",
  },
  textInput: {
    flex: 1,
    height: 40,
    backgroundColor: "#f0f0f0",
    borderRadius: 20,
    paddingHorizontal: 12,
  },
});
