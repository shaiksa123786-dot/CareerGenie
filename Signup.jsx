import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Signup() {
  const navigate = useNavigate();

  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const handleSignup = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Account created successfully! Please check your email if email confirmation is enabled.");
  navigate("/login");
};

  return (

    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="bg-slate-900 p-10 rounded-2xl shadow-xl w-full max-w-md">

        <h1 className="text-4xl text-center font-bold text-purple-400">
          Create Account
        </h1>

        <form onSubmit={handleSignup} className="mt-8">

          <input
            type="text"
            placeholder="Full Name"
            className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4"
            value={name}
            onChange={(e)=>setName(e.target.value)}
            required
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-3 rounded-lg bg-slate-800 text-white mb-4"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <input
            type="password"
            placeholder="Password"
            className="w-full p-3 rounded-lg bg-slate-800 text-white"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button
            className="w-full mt-6 bg-purple-600 py-3 rounded-lg font-bold"
          >
            Create Account
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">

          Already have an account?

          <Link
            to="/login"
            className="text-purple-400 ml-2"
          >
            Login
          </Link>

        </p>

      </div>

    </div>

  );
}

export default Signup;