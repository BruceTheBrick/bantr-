export default class ChatMessage {
  message: string;
  author: string;
  isCurrentUserAuthor: boolean;
  id: string;

  constructor() {
    this.message = "";
    this.author = "";
    this.isCurrentUserAuthor = false;

    this.id = crypto.randomUUID();
  }
}
