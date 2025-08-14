import { ref, get, child } from "firebase/database";
import { realtimeDB } from "./Firebase";

export interface Mentor {
  name: string;
  specialization: string;
  email: string;
  experience?: number; 
}

export async function getMentor(mentorId: string): Promise<Mentor | null> {
  try {
    const dbRef = ref(realtimeDB);
    const snapshot = await get(child(dbRef, `mentors/${mentorId}`));

    if (snapshot.exists()) {
      return snapshot.val() as Mentor;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Lỗi khi lấy dữ liệu mentor:", error);
    throw error;
  }
}
