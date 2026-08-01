import { createClient } from "@supabase/supabase-js";

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

export const supabase = createClient(
  supabaseUrl,
  supabaseAnonKey
);
const handleContinue = async () => {

  if (selectedSkills.length === 0) {
    alert("Please select at least one skill");
    return;
  }

 const { data, error } = await supabase
  .from("student_profiles")
  .update({
    interests: selectedInterests
  })
  .eq("id", profileId)
  .select();


  if (error) {
    console.log("SUPABASE ERROR:", error);
    alert(error.message);
  } 
  else {
    console.log("SUCCESS:", data);
    alert("Skills saved successfully!");
    navigate("/interest");
  }

};