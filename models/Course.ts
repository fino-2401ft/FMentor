enum CourseStatus {
  Available = "Available",
  End  = "End"
}

export class Course {
  courseId: string;
  title: string;
  description: string;
  mentorId: string;
  startDate: number;
  endDate?: number;
  chatGroupId: string;
  status: CourseStatus;
  likeCount: number;
  coverImage: string; 

  constructor(
    courseId: string,
    title: string,
    description: string,
    mentorId: string,
    startDate: number,
    chatGroupId: string,
    coverImage: string,
    status: CourseStatus = CourseStatus.Available,
    likeCount: number = 0,
    endDate?: number
  ) {
    this.courseId = courseId;
    this.title = title;
    this.description = description;
    this.mentorId = mentorId;
    this.startDate = startDate;
    this.endDate = endDate;
    this.chatGroupId = chatGroupId;
    this.status = status;
    this.likeCount = likeCount;
    this.coverImage = coverImage;
  }
}