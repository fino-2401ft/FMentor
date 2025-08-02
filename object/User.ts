// objects/User.ts
export class User {
  id: string;
  name: string;
  gmail: string;
  avatarUrl?: string;
  online: boolean;
  joinedCourses: string[];
  role?: string;

  constructor({
    id,
    name,
    gmail,
    avatarUrl,
    online = false,
    joinedCourses = [],
    role = "mentee",
  }: Partial<User> & { id: string; name: string; gmail: string }) {
    this.id = id;
    this.name = name;
    this.gmail = gmail;
    this.avatarUrl = avatarUrl;
    this.online = online;
    this.joinedCourses = joinedCourses;
    this.role = role;
  }

  // 🔹 Convert class to JSON to push Firebase
  toJSON() {
    return {
      name: this.name,
      gmail: this.gmail,
      avatarUrl: this.avatarUrl ?? null,
      online: this.online,
      joinedCourses: this.joinedCourses,
      role: this.role,
      updatedAt: Date.now(),
    };
  }
}
