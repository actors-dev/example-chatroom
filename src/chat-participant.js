import { Actor } from "@actors.dev/runtime";

export class ChatParticipant extends Actor {
  __spawn__(name, room) {
    this.state.name = name;
    this.state.room = room;
  }

  onWebsocketConnect(ws) {
    this.state.ws = ws;
    this.state.room.joinRoom({ participant: this });
  }

  onChatMessage(msg) {
    this.state.ws.send(
      JSON.stringify({
        content: msg.content,
        sender: msg.sender,
      })
    );
  }

  onWebsocketMessage(msg) {
    const body = JSON.parse(msg.body);

    this.state.room.sendMessage({
      content: body.content,
      sender: this.state.name,
    });
  }

  onWebsocketClose() {
    this.state.room.leaveRoom({ participant: this });
  }
}
