import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import FloatingChatbot from "./FloatingChatbot";

function ProtectedRoute({ children }) {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    async function checkUser() {
      const {
        data: { user },
        error,
      } = await supabase.auth.getUser();

      if (error) {
        console.log("Authentication Error:", error);
        setUser(null);
      } else {
        setUser(user);
      }

      setLoading(false);
    }

    checkUser();
  }, []);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl mb-4">
            🤖
          </div>

          <h2 className="text-2xl font-bold text-purple-400">
            Loading CareerGenie...
          </h2>

          <p className="text-gray-400 mt-2">
            Checking your account...
          </p>
        </div>
      </div>
    );
  }

  // User not logged in
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // User logged in
  return (
    <>
      {children}

      {/* Floating AI Career Chat */}
      <FloatingChatbot />
    </>
  );
}

export default ProtectedRoute;