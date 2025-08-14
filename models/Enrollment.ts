export class Enrollment {
  enrollmentId: string;
  courseId: string;
  menteeId: string;
  enrollmentDate: number;
  progress: number;

  constructor(
    enrollmentId: string,
    courseId: string,
    menteeId: string,
    enrollmentDate: number,
    progress: number = 0
  ) {
    this.enrollmentId = enrollmentId;
    this.courseId = courseId;
    this.menteeId = menteeId;
    this.enrollmentDate = enrollmentDate;
    this.progress = progress;
  }
}