import { WebSocketServer } from "ws";
import { User } from "./User";

const wss = new WebSocketServer({
  port: (process.env.PORT as unknown as number) || 3001,
});

wss.on("connection", function connection(ws) {
  console.log("yser connected");
  let user = new User(ws);
  ws.on("error", console.error);

  ws.on("close", () => {
    user?.destroy();
  });
});