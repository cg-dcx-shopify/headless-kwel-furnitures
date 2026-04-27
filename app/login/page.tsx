"use client";

import "@/app/components/main.css";
import Link from "next/link";

export default function Login() {
  return (
    <div className="login">
      <form className="login-form">
       
        <h1 className="login-title">Login</h1>

        <input
          type="text"
          placeholder="Username"
          className="login-input"
          required
        />

        <input
          type="password"
          placeholder="Password"
          className="login-input"
          required
        />

        <button type="submit" className="login-button">
          Login
        </button>

        <Link href="/signup">
          Don't have an account? Sign Up
        </Link>
      </form>
    </div>
  );
}





                          