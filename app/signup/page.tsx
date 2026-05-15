"use client";

import { useState } from "react";

import {
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {useRouter} from "next/navigation";
import { auth } from "@/lib/firebase";
import Link from "next/link";
export default function SignupPage() {

  const [name, setName] = useState("");
  const router = useRouter();
  const [email, setEmail] = useState("");

  const [password, setPassword] =
    useState("");

  async function handleSignup() {

    try {

      
      await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // SHOPIFY CUSTOMER
      await fetch(
        "/api/customer/create",
        {
          method: "POST",

          headers: {
            "Content-Type":
              "application/json",
          },

          body: JSON.stringify({
            firstName: name,
            email,
            password,
          }),
        }
      );

      alert("Signup successful");
      router.push("/");
    } catch (err) {

      console.error(err);
    }
  }

  return (

    <div className="signup">
      <div className="signup-form">
       
        <h1 className="signup-title">Sign Up</h1>

        <input
          type="text"
          placeholder="Username"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="signup-input"
        />

        <input
          type="email"
          placeholder="Email"
          className="signup-input"
          value={email}
          onChange={(e)=>setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e)=>setPassword(e.target.value)}
          className="signup-input"
        />
         

        <button type="submit" className="signup-button" onClick={handleSignup}>
          Create Account
        </button>

        <Link href="/login">
          Already have an account? Login
        </Link>
     </div>
    </div>
  );
}