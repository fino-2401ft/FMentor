enum DocumentType {
  PDF = "PDF",
  Image = "Image",
  Video = "Video",
  Code = "Code",
}

export class Document {
  documentId: string;
  courseId: string;
  lessonId?: string;
  uploaderId: string;
  fileName: string;
  fileUrl: string;
  fileType: DocumentType;
  uploadDate: number;
  description?: string;

  constructor(
    documentId: string,
    courseId: string,
    uploaderId: string,
    fileName: string,
    fileUrl: string,
    fileType: DocumentType,
    uploadDate: number,
    lessonId?: string,
    description?: string
  ) {
    this.documentId = documentId;
    this.courseId = courseId;
    this.lessonId = lessonId;
    this.uploaderId = uploaderId;
    this.fileName = fileName;
    this.fileUrl = fileUrl;
    this.fileType = fileType;
    this.uploadDate = uploadDate;
    this.description = description;
  }
}