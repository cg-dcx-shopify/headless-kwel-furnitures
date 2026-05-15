"use client";

import { useState } from "react";

import {
  signInWithEmailAndPassword,
} from "firebase/auth";
import "@/app/components/main.css";
import {useRouter} from "next/navigation";
import { auth } from "@/lib/firebase";
import Link from "next/link";
export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");
    const [loading, setLoading] =
    useState("false");

  async function handleLogin() {
      if(loading) return;
    try {
      setLoading("true");

      await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      alert("Login successful");
      router.push("/");
    } catch (err) {
      

      console.error(err);
    } finally {
      setLoading("false");
    }
  }

  return (

     <div className="login">
      <div className="login-form">
       
        <h1 className="login-title">Login</h1>

        <input
          type="email"
          placeholder="Email"
          className="login-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
          
        <input
          type="password"
          placeholder="Password"
          className="login-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
         
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>

        <Link href="/signup">
          Don't have an account? Sign Up
        </Link>
      </div>
    </div>
  );
}