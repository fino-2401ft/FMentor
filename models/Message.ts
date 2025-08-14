// Enum loại tin nhắn
export enum MessageType {
  Text = "Text",
  Image = "Image",
  Video = "Video",
  File = "File",
}

// Class Message
export class Message {
  messageId: string;
  conversationId: string; 
  senderId: string;
  content: string; 
  type: MessageType; // Text, Image, Video, File
  mediaUrl?: string;
  timestamp: number; // Timestamp ms
  seen: boolean;

  constructor(
    messageId: string,
    conversationId: string,
    senderId: string,
    content: string,
    type: MessageType,
    timestamp: number,
    seen: boolean = false,
    mediaUrl?: string
  ) {
    this.messageId = messageId;
    this.conversationId = conversationId;
    this.senderId = senderId;
    this.content = content;
    this.type = type;
    this.timestamp = timestamp;
    this.seen = seen;
    this.mediaUrl = mediaUrl;
  }
}
