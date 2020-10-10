import { Actor } from "@actors.dev/runtime";

export class Chatroom extends Actor {
  sendMessage(msg) {
    for (const p in this.state.participants) {
      p.onChatMessage({
        room: this,
        content: msg.content,
        sender: msg.sender,
      });
    }
  }

  joinRoom(msg) {
    this.state.participants.push(msg.participant);
  }

  leaveRoom(msg) {
    const index = this.state.participants.indexOf(msg.participant);
    if (index != -1) {
      delete this.state.participants[index];
    }
  }
}
