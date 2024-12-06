import { useEffect, useRef } from "react";
import { useStore } from "@/store/useStore"; // Fixed import path

export function useWebSocket() {
  const ws = useRef<WebSocket | null>(null);
  const updatePlayerPosition = useStore((state) => state.updatePlayerPosition);
  const removePlayer = useStore((state) => state.removePlayer);

  const connect = () => {
    if (ws.current?.readyState === WebSocket.OPEN) return;

    ws.current = new WebSocket("ws://your-backend-url/ws");

    ws.current.onmessage = (event) => {
      const data = JSON.parse(event.data);
      
      switch (data.type) {
        case "movement":
          updatePlayerPosition(data.userId, data.position);
          break;
        case "user-left":
          removePlayer(data.userId);
          break;
        case "space-joined":
          // Handle when a user joins the space
          break;
        case "join":
          // Handle initial join confirmation
          break;
        case "movement-rejected":
          // Handle when movement is rejected by server
          break;
      }
    };

    ws.current.onclose = () => {
      setTimeout(connect, 1000); // Reconnect after 1 second
    };

    ws.current.onerror = (error) => {
      console.error("WebSocket error:", error);
    };
  };

  useEffect(() => {
    return () => {
      ws.current?.close();
    };
  }, []);

  const sendMessage = (type: string, data: any) => {
    if (ws.current?.readyState === WebSocket.OPEN) {
      ws.current.send(JSON.stringify({ type, ...data }));
    }
  };

  return { connect, sendMessage };
}