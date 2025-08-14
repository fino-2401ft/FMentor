// controllers/MessageController.ts
import { ref, onValue, push, update, get } from "firebase/database";
import { realtimeDB } from "../config/Firebase";
import { Message } from "../models/Message";

export function subscribeMessages(
  conversationId: string,
  callback: (messages: Message[]) => void
) {
  const msgsRef = ref(realtimeDB, `messages/${conversationId}`);
  return onValue(msgsRef, (snapshot) => {
    const data = snapshot.val() || {};
    const msgs: Message[] = Object.keys(data)
      .map((id) => ({ messageId: id, ...data[id] }))
      .sort((a, b) => a.timestamp - b.timestamp);
    callback(msgs);
  });
}

export async function getLastMessage(conversationId: string): Promise<Message | undefined> {
  const msgsRef = ref(realtimeDB, `messages/${conversationId}`);
  const snapshot = await get(msgsRef);
  if (!snapshot.exists()) return undefined;
  const msgs: Message[] = Object.keys(snapshot.val()).map((id) => ({
    messageId: id,
    ...snapshot.val()[id],
  }));
  return msgs.sort((a, b) => b.timestamp - a.timestamp)[0];
}

export async function countUnreadMessages(conversationId: string, currentUserId: string): Promise<number> {
  const msgsRef = ref(realtimeDB, `messages/${conversationId}`);
  const snapshot = await get(msgsRef);
  if (!snapshot.exists()) return 0;
  let count = 0;
  snapshot.forEach((child) => {
    const msg = child.val();
    if (msg.senderId !== currentUserId && !msg.seen) count++;
  });
  return count;
}

export async function sendMessage(conversationId: string, senderId: string, content: string) {
  const msgsRef = ref(realtimeDB, `messages/${conversationId}`);
  const newMsgRef = push(msgsRef);
  const timestamp = Date.now();
  await update(newMsgRef, {
    conversationId,
    senderId,
    content,
    type: "Text",
    timestamp,
    seen: false,
  });

  // update conversation
  await update(ref(realtimeDB, `conversations/${conversationId}`), {
    lastMessageId: newMsgRef.key,
    lastUpdate: timestamp,
  });
}

export async function markAllSeen(conversationId: string, currentUserId: string) {
  const msgsRef = ref(realtimeDB, `messages/${conversationId}`);
  const snapshot = await get(msgsRef);
  if (snapshot.exists()) {
    snapshot.forEach((msgSnap) => {
      const msg = msgSnap.val();
      if (msg.senderId !== currentUserId && !msg.seen) {
        update(ref(realtimeDB, `messages/${conversationId}/${msgSnap.key}`), { seen: true });
      }
    });
  }
}
