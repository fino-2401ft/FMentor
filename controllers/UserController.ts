// controllers/UserController.ts
import { ref, get } from "firebase/database";
import { realtimeDB } from "../config/Firebase";
import { User } from "../models/User";

export async function getUserById(userId: string): Promise<User | undefined> {
  const snapshot = await get(ref(realtimeDB, `users/${userId}`));
  if (!snapshot.exists()) return undefined;
  return { userId, ...snapshot.val() } as User;
}
