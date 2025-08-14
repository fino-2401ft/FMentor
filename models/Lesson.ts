export class Lesson {
  lessonId: string;
  courseId: string;
  title: string;
  content: string;
  order: number;
  videoUrl?: string;
  quizId?: string;

  constructor(
    lessonId: string,
    courseId: string,
    title: string,
    content: string,
    order: number,
    videoUrl?: string,
    quizId?: string
  ) {
    this.lessonId = lessonId;
    this.courseId = courseId;
    this.title = title;
    this.content = content;
    this.order = order;
    this.videoUrl = videoUrl;
    this.quizId = quizId;
  }
}