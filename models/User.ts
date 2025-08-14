export enum UserRole {
  Mentor = "Mentor",
  Mentee = "Mentee",
}

export class User {
  userId: string;
  username: string;
  email: string;
  password: string;
  avatarUrl: string;
  role: UserRole;
  lastLogin?: number;
  bio?: string;

  constructor(
    userId: string,
    username: string,
    email: string,
    password: string,
    avatarUrl: string,
    role: UserRole,
    lastLogin?: number,
    bio?: string
  ) {
    this.userId = userId;
    this.username = username;
    this.email = email;
    this.password = password;
    this.avatarUrl = avatarUrl;
    this.role = role;
    this.lastLogin = lastLogin;
    this.bio = bio;
  }
}


export class Mentor extends User {
  expertise: string[]; 
  rating: number; // 0-5

  constructor(
    userId: string,
    username: string,
    email: string,
    password: string,
    avatarUrl: string,
    expertise: string[],
    rating: number = 0,
    lastLogin?: number,
    bio?: string
  ) {
    super(
      userId,
      username,
      email,
      password,
      avatarUrl,
      UserRole.Mentor,
      lastLogin,
      bio
    );
    this.expertise = expertise;
    this.rating = rating;
  }
}


export class Mentee extends User {
  joinedCourses: string[]; // Danh sách ID khoá học đã tham gia

  constructor(
    userId: string,
    username: string,
    email: string,
    password: string,
    avatarUrl: string,
    joinedCourses: string[] = [],
    lastLogin?: number,
    bio?: string
  ) {
    super(
      userId,
      username,
      email,
      password,
      avatarUrl,
      UserRole.Mentee,
      lastLogin,
      bio
    );
    this.joinedCourses = joinedCourses;
  }
}
