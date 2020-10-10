import { Chatroom } from "./chatroom";
import { ChatParticipant } from "./chat-participant";

export { Chatroom, ChatParticipant };

export async function onHttpUpgrade(ctx) {
  const path = ctx.request.url.path;
  const name = ctx.request.url.query;

  const chatroom = await ctx
    .getRegistry(Chatroom)
    .findOrCreate(path, async () => Chatroom.spawn());

  await ctx.request.upgrade(ChatParticipant.spawn(name, chatroom));
}
