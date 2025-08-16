"use client";

import React, { useState } from "react";
import { theme } from "@/styles/theme";
import { ThemedInput } from "@/components/UI/ThemedInput";

interface AdminLoginProps {
  onLogin: (success: boolean) => void;
}

export default function AdminLogin({ onLogin }: AdminLoginProps) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simple authentication - in production, this should be handled by a backend
    // For demo purposes, using hardcoded credentials
    const validUsername = "admin";
    const validPassword = "admin123";

    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (username === validUsername && password === validPassword) {
      onLogin(true);
    } else {
      setError("Invalid username or password");
    }

    setIsLoading(false);
  };

  return (
    <div 
      className="min-h-screen flex items-center justify-center"
      style={{
        background: theme.gradients.primary,
        color: theme.colors.text.primary,
      }}
    >
      <div 
        className="w-full max-w-md p-8 rounded-xl"
        style={{
          backgroundColor: theme.colors.background.card,
          border: `1px solid ${theme.colors.border.primary}`,
        }}
      >
        <div className="text-center mb-8">
          <h1 
            className="text-3xl font-bold mb-2"
            style={{
              color: theme.colors.accent.gold,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
            }}
          >
            Admin Login
          </h1>
          <p 
            className="text-sm"
            style={{
              color: theme.colors.text.secondary,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
            }}
          >
            Enter your credentials to access the admin panel
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <label
              className="block text-sm font-medium"
              style={{
                color: theme.colors.text.secondary,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
            >
              Username
            </label>
            <ThemedInput
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <label
              className="block text-sm font-medium"
              style={{
                color: theme.colors.text.secondary,
                fontFamily: theme.typography.fontFamily.sans.join(", "),
              }}
            >
              Password
            </label>
            <ThemedInput
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && (
            <div 
              className="p-3 rounded-lg text-sm"
              style={{
                backgroundColor: theme.colors.status.error,
                color: theme.colors.text.primary,
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3 px-4 rounded-lg font-semibold transition-all duration-300 disabled:opacity-50"
            style={{
              backgroundColor: theme.colors.accent.gold,
              color: theme.colors.primary.black,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
            }}
            onMouseEnter={(e) => {
              if (!isLoading) {
                e.currentTarget.style.opacity = "0.8";
              }
            }}
            onMouseLeave={(e) => {
              if (!isLoading) {
                e.currentTarget.style.opacity = "1";
              }
            }}
          >
            {isLoading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p 
            className="text-xs"
            style={{
              color: theme.colors.text.muted,
              fontFamily: theme.typography.fontFamily.sans.join(", "),
            }}
          >
            Demo Credentials: admin / admin123
          </p>
        </div>
      </div>
    </div>
  );
} 