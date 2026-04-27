"use client";

import "@/app/components/main.css";
import Link from "next/link";

export default function Signup() {
  return (
    <div className="signup">
      <form className="signup-form">
        {/* ✅ Title inside the card */}
        <h1 className="signup-title">Sign Up</h1>

        <input
          type="text"
          placeholder="Username"
          className="signup-input"
        />

        <input
          type="email"
          placeholder="Email"
          className="signup-input"
        />

        <input
          type="password"
          placeholder="Password"
          className="signup-input"
        />

        <button type="submit" className="signup-button">
          Create Account
        </button>

        <Link href="/login">
          Already have an account? Login
        </Link>
      </form>
    </div>
  );
}