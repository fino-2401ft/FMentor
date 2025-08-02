// objects/Course.ts
export class Course {
  courseId: string;
  adminId: string;
  courseName: string;
  description?: string;
  coverImage?: string;
  chatCourseId?: string;
  members: string[];

  constructor({
    courseId,
    adminId,
    courseName,
    description,
    coverImage,
    chatCourseId,
    members = [],
  }: {
    courseId: string;
    adminId: string;
    courseName: string;
    description?: string;
    coverImage?: string;
    chatCourseId?: string;
    members?: string[];
  }) {
    this.courseId = courseId;
    this.adminId = adminId;
    this.courseName = courseName;
    this.description = description;
    this.coverImage = coverImage;
    this.chatCourseId = chatCourseId;
    this.members = members;
  }

  // 🔹 Convert sang JSON để lưu Firebase
  toJSON() {
    return {
      adminId: this.adminId,
      courseName: this.courseName,
      description: this.description ?? null,
      coverImage: this.coverImage ?? null,
      chatCourseId: this.chatCourseId ?? null,
      members: this.members,
    };
  }

  // 🔹 Thêm thành viên
  addMember(userId: string) {
    if (!this.members.includes(userId)) {
      this.members.push(userId);
    }
  }

  // 🔹 Xoá thành viên
  removeMember(userId: string) {
    this.members = this.members.filter((id) => id !== userId);
  }

  // 🔹 Kiểm tra user đã tham gia chưa
  hasMember(userId: string): boolean {
    return this.members.includes(userId);
  }

  // 🔹 Tạo Course từ Firebase
  static fromFirebase(courseId: string, data: any): Course {
    return new Course({ courseId, ...data });
  }
}
