import { supabase } from "../lib/supabase";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
  e.preventDefault();

  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) {
    alert(error.message);
    return;
  }

  alert("Login Successful!");
  navigate("/select-level");
};

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-6">

      <div className="bg-slate-900 p-10 rounded-2xl shadow-xl w-full max-w-md">

        <div className="text-center">

          <h1 className="text-4xl font-bold text-purple-400">
            🤖 CareerGenie AI
          </h1>

          <p className="text-gray-400 mt-3">
            Welcome Back
          </p>

        </div>

        <form onSubmit={handleLogin} className="mt-8">

          <label className="text-white">
            Email
          </label>

          <input
            type="email"
            placeholder="Enter your email"
            className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            required
          />

          <label className="text-white mt-5 block">
            Password
          </label>

          <input
            type="password"
            placeholder="Enter your password"
            className="w-full mt-2 p-3 rounded-lg bg-slate-800 text-white"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            required
          />

          <button
            type="submit"
            className="w-full mt-8 bg-purple-600 hover:bg-purple-700 py-3 rounded-lg font-bold"
          >
            Login
          </button>

        </form>

        <p className="text-center text-gray-400 mt-6">

          Don't have an account?

          <Link
            to="/signup"
            className="text-purple-400 ml-2"
          >
            Sign Up
          </Link>

        </p>

      </div>

    </div>
  );
}

export default Login;