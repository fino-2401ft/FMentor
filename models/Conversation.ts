export enum ConversationType {
  Private = "Private",
  Group = "Group",
  CourseChat = "CourseChat",
}

export class Conversation {
  conversationId: string;
  type: ConversationType;
  participants: string[];
  lastMessageId?: string;
  lastUpdate: number;

  constructor(
    conversationId: string,
    type: ConversationType,
    participants: string[],
    lastUpdate: number,
    lastMessageId?: string
  ) {
    this.conversationId = conversationId;
    this.type = type;
    this.participants = participants;
    this.lastMessageId = lastMessageId;
    this.lastUpdate = lastUpdate;
  }
}