import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { useWebSocket } from "@/hooks/use-websocket";
import { useStore } from "@/store/useStore"; 

interface AuthFormProps {
  type: "signin" | "signup";
}

export function AuthForm({ type }: AuthFormProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { connect } = useWebSocket();
  const setCurrentUser = useStore((state) => state.setCurrentUser);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch(`/api/user/${type}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) throw new Error("Authentication failed");

      const user = await response.json();
      setCurrentUser(user);
      connect();
      navigate("/spaces");
    } catch (error) {
      console.error("Auth error:", error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-lg">
        <h2 className="text-2xl font-bold text-center text-foreground">
          {type === "signin" ? "Sign In" : "Sign Up"}
        </h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-foreground">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-foreground">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 block w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2"
              required
            />
          </div>
          <Button type="submit" className="w-full">
            {type === "signin" ? "Sign In" : "Sign Up"}
          </Button>
        </form>
        <p className="text-sm text-center text-muted-foreground">
          {type === "signin" ? (
            <>
              Don't have an account?{" "}
              <a href="/signup" className="text-primary hover:underline">
                Sign Up
              </a>
            </>
          ) : (
            <>
              Already have an account?{" "}
              <a href="/signin" className="text-primary hover:underline">
                Sign In
              </a>
            </>
          )}
        </p>
      </div>
    </div>
  );
}