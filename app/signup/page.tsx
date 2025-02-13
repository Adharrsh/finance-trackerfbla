"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Signup() {
  const router = useRouter();

  // Declare states for form fields
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Collect form data
    const formData = {
      username,
      email,
      password,
    };

    try {
      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        const errorMessage = await res.text();
        setErrorMessage(errorMessage); // Show the error message in the UI
        console.error("Signup failed:", errorMessage);
        throw new Error(errorMessage || "Something went wrong");
      }

      let data;
      try {
        data = await res.json();
      } catch (error) {
        console.error("Failed to parse JSON:", error);
        throw new Error("Failed to parse JSON response");
      }

      if (res.status === 200) {
        router.push("/login");
      } else {
        console.error("Signup failed:", data?.message || "Unknown error");
        setErrorMessage(data?.message || "Unknown error");
      }
    } catch (error) {
      // Type assertion to 'Error'
      const e = error as Error; // <-- Type assertion here
      console.error("An error occurred during the signup process:", e.message);
      setErrorMessage(e.message);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit">Sign Up</button>
      </form>
      {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}{" "}
      {/* Show error message if any */}
    </div>
  );
}
