import { supabase } from "../lib/supabase";

// Sign Up
export const signUp = async (name, email, password) => {
  return await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        full_name: name,
      },
    },
  });
};

// Login
export const login = async (email, password) => {
  return await supabase.auth.signInWithPassword({
    email,
    password,
  });
};

// Logout
export const logout = async () => {
  return await supabase.auth.signOut();
};

// Current User
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};