import { ref, onValue, get } from "firebase/database";
import { realtimeDB } from "../config/Firebase";
import { Conversation, ConversationType } from "../models/Conversation";

export function getConversationsRealtime(
  currentUserId: string,
  callback: (conversations: Conversation[]) => void
) {
  const convRef = ref(realtimeDB, "conversations");

  return onValue(convRef, async (snapshot) => {
    const data = snapshot.val() || {};
    const result: Conversation[] = [];

    for (const convId in data) {
      const convData = data[convId];

      // Lọc cuộc trò chuyện mà user này tham gia
      if (convData.participants?.includes(currentUserId)) {
        // Khởi tạo instance Conversation
        const convInstance = new Conversation(
          convId,
          convData.type as ConversationType,
          convData.participants,
          convData.lastUpdate || 0,
          convData.lastMessageId
        );

        // (Tùy chọn) Lấy lastMessage để gắn vào convInstance
        if (convData.lastMessageId) {
          const msgSnap = await get(
            ref(realtimeDB, `messages/${convId}/${convData.lastMessageId}`)
          );
          if (msgSnap.exists()) {
            (convInstance as any).lastMessage = msgSnap.val();
          }
        }

        result.push(convInstance);
      }
    }

    // Sắp xếp theo lastUpdate mới nhất
    result.sort((a, b) => b.lastUpdate - a.lastUpdate);

    callback(result);
  });
}

// Lấy thông tin người chat cùng trong private conversation
export async function getConversationPeer(
  conversationId: string,
  currentUserId: string
) {
  const convSnap = await get(ref(realtimeDB, `conversations/${conversationId}`));
  if (convSnap.exists()) {
    const convData = convSnap.val();
    const peerId = convData.participants.find((id: string) => id !== currentUserId);
    if (peerId) {
      const peerSnap = await get(ref(realtimeDB, `users/${peerId}`));
      if (peerSnap.exists()) {
        return peerSnap.val();
      }
    }
  }
  return null;
}
