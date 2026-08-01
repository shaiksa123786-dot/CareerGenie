import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function SkillSelection() {
  const navigate = useNavigate();
  const location = useLocation();

  // =====================================================
  // GET SELECTED CLASS FROM SELECT LEVEL PAGE
  // =====================================================

  const selectedClass =
    location.state?.selectedClass ||
    location.state?.education ||
    "";

  // =====================================================
  // SKILLS BASED ON EDUCATION / CLASS
  // =====================================================

  const skillsByClass = {
    "Class 5-7": [
      "Drawing",
      "Reading",
      "Basic Mathematics",
      "Creativity",
      "Communication",
      "Logical Thinking",
      "Storytelling",
      "General Knowledge",
      "Teamwork",
      "Observation",
    ],

    "Class 8-10": [
      "Coding",
      "Mathematics",
      "Science",
      "Communication",
      "Problem Solving",
      "Creativity",
      "Logical Thinking",
      "Public Speaking",
      "Leadership",
      "General Knowledge",
    ],

    "Intermediate": [
      "Python",
      "Mathematics",
      "Physics",
      "Chemistry",
      "Biology",
      "Communication",
      "Problem Solving",
      "Logical Thinking",
      "Public Speaking",
      "Research",
    ],

    "B.Tech / Engineering": [
      "Python",
      "Java",
      "C++",
      "Web Development",
      "AI / ML",
      "Data Science",
      "Cloud Computing",
      "Cybersecurity",
      "Problem Solving",
      "Database Management",
      "Communication",
      "Leadership",
    ],

    "MBBS / Medical": [
      "Biology",
      "Human Anatomy",
      "Medical Knowledge",
      "Clinical Skills",
      "Patient Care",
      "Communication",
      "Research",
      "Problem Solving",
      "Observation",
      "Teamwork",
    ],

    "Degree": [
      "Communication",
      "Problem Solving",
      "Leadership",
      "Computer Skills",
      "Data Analysis",
      "Teamwork",
      "Critical Thinking",
      "Presentation",
      "Research",
      "Time Management",
    ],

    "Police / Law Enforcement": [
      "Physical Fitness",
      "Discipline",
      "Leadership",
      "Communication",
      "Problem Solving",
      "Logical Thinking",
      "Decision Making",
      "General Knowledge",
      "Criminal Law",
      "Observation",
    ],

    "Lawyer / Legal": [
      "Legal Research",
      "Legal Writing",
      "Communication",
      "Public Speaking",
      "Critical Thinking",
      "Logical Reasoning",
      "Problem Solving",
      "Debate",
      "Negotiation",
      "Knowledge of Law",
    ],

    "UPSC / Civil Services": [
      "General Knowledge",
      "Current Affairs",
      "Indian Polity",
      "History",
      "Geography",
      "Economics",
      "Public Administration",
      "Communication",
      "Leadership",
      "Analytical Thinking",
    ],

    "Other": [
      "Communication",
      "Problem Solving",
      "Leadership",
      "Creativity",
      "Critical Thinking",
      "Teamwork",
      "Time Management",
      "Computer Skills",
      "Research",
      "Presentation",
    ],
  };

  // =====================================================
  // GET SKILLS FOR SELECTED CLASS
  // =====================================================

  const availableSkills =
    skillsByClass[selectedClass] ||
    skillsByClass["Other"];

  // =====================================================
  // STATES
  // =====================================================

  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkill, setCustomSkill] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // =====================================================
  // LOAD EXISTING SKILLS
  // =====================================================

  useEffect(() => {
    fetchExistingSkills();
  }, []);

  const fetchExistingSkills = async () => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {
        navigate("/login");
        return;
      }

      const { data, error } = await supabase
        .from("student_profiles")
        .select("skills, education")
        .eq("user_id", user.id)
        .maybeSingle();

      if (error) {
        console.error(
          "Error fetching existing skills:",
          error
        );
        return;
      }

      if (data?.skills) {
        let existingSkills = [];

        // If Supabase returns an array
        if (Array.isArray(data.skills)) {
          existingSkills = data.skills;
        }

        // If Supabase returns JSON string
        else if (typeof data.skills === "string") {
          try {
            const parsed = JSON.parse(data.skills);

            if (Array.isArray(parsed)) {
              existingSkills = parsed;
            } else {
              existingSkills = data.skills
                .split(",")
                .map((skill) => skill.trim())
                .filter(Boolean);
            }
          } catch {
            existingSkills = data.skills
              .split(",")
              .map((skill) => skill.trim())
              .filter(Boolean);
          }
        }

        setSelectedSkills(existingSkills);
      }
    } catch (error) {
      console.error(
        "Unexpected error loading skills:",
        error
      );
    } finally {
      setInitialLoading(false);
    }
  };

  // =====================================================
  // SELECT / UNSELECT SKILL
  // =====================================================

  const toggleSkill = (skill) => {
    setSelectedSkills((previousSkills) => {
      const alreadySelected =
        previousSkills.some(
          (item) =>
            item.toLowerCase() === skill.toLowerCase()
        );

      if (alreadySelected) {
        return previousSkills.filter(
          (item) =>
            item.toLowerCase() !== skill.toLowerCase()
        );
      }

      return [...previousSkills, skill];
    });
  };

  // =====================================================
  // ADD CUSTOM SKILL
  // =====================================================

  const addCustomSkill = () => {
    const newSkill = customSkill.trim();

    if (!newSkill) {
      alert("Please enter a skill.");
      return;
    }

    const alreadyExists = selectedSkills.some(
      (skill) =>
        skill.toLowerCase() === newSkill.toLowerCase()
    );

    if (alreadyExists) {
      alert("This skill is already selected.");
      return;
    }

    setSelectedSkills((previousSkills) => [
      ...previousSkills,
      newSkill,
    ]);

    setCustomSkill("");
  };

  // =====================================================
  // REMOVE SKILL
  // =====================================================

  const removeSkill = (skillToRemove) => {
    setSelectedSkills((previousSkills) =>
      previousSkills.filter(
        (skill) => skill !== skillToRemove
      )
    );
  };

  // =====================================================
  // SAVE SKILLS
  // =====================================================

  const saveSkills = async () => {
    if (selectedSkills.length === 0) {
      alert(
        "Please select at least one skill or add your own skill."
      );
      return;
    }

    setLoading(true);

    try {
      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        alert("Your session has expired. Please login again.");
        navigate("/login");
        return;
      }

      // =================================================
      // CHECK EXISTING PROFILE
      // =================================================

      const { data: existingProfile, error: profileError } =
        await supabase
          .from("student_profiles")
          .select("id")
          .eq("user_id", user.id)
          .maybeSingle();

      if (profileError) {
        console.error(
          "Profile check error:",
          profileError
        );
      }

      let saveError = null;

      // =================================================
      // UPDATE EXISTING PROFILE
      // =================================================

      if (existingProfile) {
        const { error } = await supabase
          .from("student_profiles")
          .update({
            skills: selectedSkills,
            ...(selectedClass
              ? { education: selectedClass }
              : {}),
          })
          .eq("user_id", user.id);

        saveError = error;
      }

      // =================================================
      // CREATE NEW PROFILE
      // =================================================

      else {
        const { error } = await supabase
          .from("student_profiles")
          .insert({
            user_id: user.id,
            skills: selectedSkills,
            education: selectedClass || null,
          });

        saveError = error;
      }

      // =================================================
      // HANDLE SAVE ERROR
      // =================================================

     const saveSkills = async () => {
  if (selectedSkills.length === 0) {
    alert("Please select at least one skill or add your own skill.");
    return;
  }

  setLoading(true);

  try {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      alert("Your session has expired. Please login again.");
      navigate("/login");
      return;
    }

    // Update the existing profile using user_id
    const { data, error } = await supabase
      .from("student_profiles")
      .update({
        skills: selectedSkills,
        education: selectedClass || null,
      })
      .eq("user_id", user.id)
      .select();

    if (error) {
      console.error("Save skills error:", error);
      alert("Unable to save skills: " + error.message);
      return;
    }

    // If no profile exists, create one
    if (!data || data.length === 0) {
      const { error: insertError } = await supabase
        .from("student_profiles")
        .insert({
          user_id: user.id,
          skills: selectedSkills,
          education: selectedClass || null,
        });

      if (insertError) {
        console.error("Insert profile error:", insertError);
        alert("Unable to create profile: " + insertError.message);
        return;
      }
    }

    alert("Skills saved successfully!");

    navigate("/interest", {
      state: {
        selectedClass: selectedClass,
        selectedSkills: selectedSkills,
      },
    });

  } catch (error) {
    console.error("Unexpected save error:", error);
    alert("Something went wrong while saving your skills.");
  } finally {
    setLoading(false);
  }
};

      // =================================================
      // GO TO INTEREST SELECTION
      // =================================================

      navigate("/interest", {
        state: {
          selectedClass: selectedClass,
          selectedSkills: selectedSkills,
        },
      });
    } catch (error) {
      console.error(
        "Unexpected save error:",
        error
      );

      alert(
        "Something went wrong while saving your skills."
      );
    } finally {
      setLoading(false);
    }
  };

  // =====================================================
  // LOADING SCREEN
  // =====================================================

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <div className="text-6xl mb-5">
            🤖
          </div>

          <h2 className="text-2xl font-bold text-purple-400">
            Loading Your Skills...
          </h2>

          <p className="text-gray-400 mt-2">
            Preparing personalized skill suggestions
          </p>
        </div>
      </div>
    );
  }

  // =====================================================
  // MAIN UI
  // =====================================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* =================================================
          NAVBAR
      ================================================= */}

      <nav className="border-b border-white/10 px-6 py-5">
        <div className="max-w-6xl mx-auto flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-purple-400">
              🤖 CareerGenie AI
            </h1>

            <p className="text-xs text-gray-400">
              Discover your potential
            </p>
          </div>

          <div className="hidden md:block text-right">
            <p className="text-sm text-gray-400">
              Selected Education
            </p>

            <p className="text-purple-300 font-semibold">
              {selectedClass || "Not Selected"}
            </p>
          </div>

        </div>
      </nav>

      {/* =================================================
          MAIN CONTENT
      ================================================= */}

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* HEADER */}

        <div className="text-center">

          <p className="text-purple-400 font-semibold">
            STEP 2 OF 3
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            What Skills Do You Have? 💡
          </h1>

          <p className="text-gray-400 mt-4 max-w-2xl mx-auto">
            Select the skills you currently have.
            You can also add new skills as you learn them.
          </p>

          {/* SELECTED CLASS */}

          <div className="inline-flex items-center gap-2 mt-6 bg-purple-600/20 border border-purple-500/30 px-5 py-2 rounded-full">
            🎓
            <span className="text-purple-300">
              {selectedClass || "Other"}
            </span>
          </div>

        </div>

        {/* =================================================
            SELECTED SKILLS
        ================================================= */}

        <section className="mt-10">

          <div className="bg-slate-900 border border-purple-500/20 rounded-2xl p-6">

            <div className="flex justify-between items-center flex-wrap gap-3">

              <div>
                <h2 className="text-xl font-bold">
                  💡 Your Current Skills
                </h2>

                <p className="text-gray-400 text-sm mt-1">
                  Your selected skills will be used to personalize your career recommendations.
                </p>
              </div>

              <span className="bg-purple-600/20 text-purple-300 px-4 py-2 rounded-full text-sm">
                {selectedSkills.length} Selected
              </span>

            </div>

            {selectedSkills.length > 0 ? (

              <div className="flex flex-wrap gap-3 mt-6">

                {selectedSkills.map((skill) => (

                  <div
                    key={skill}
                    className="flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full"
                  >

                    <span>
                      {skill}
                    </span>

                    <button
                      onClick={() =>
                        removeSkill(skill)
                      }
                      className="text-purple-300 hover:text-red-400 font-bold text-lg"
                      title="Remove skill"
                    >
                      ×
                    </button>

                  </div>

                ))}

              </div>

            ) : (

              <div className="mt-5 bg-slate-800/50 rounded-xl p-5 text-center">
                <p className="text-gray-500">
                  No skills selected yet.
                  Choose from the suggestions below.
                </p>
              </div>

            )}

          </div>

        </section>

        {/* =================================================
            ADD CUSTOM SKILL
        ================================================= */}

        <section className="mt-8">

          <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">

            <h2 className="text-xl font-bold">
              ➕ Add a New Skill
            </h2>

            <p className="text-gray-400 text-sm mt-2">
              Skills can change and grow over time.
              Add any skill you have learned.
            </p>

            <div className="flex flex-col md:flex-row gap-3 mt-5">

              <input
                type="text"
                value={customSkill}
                onChange={(event) =>
                  setCustomSkill(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    addCustomSkill();
                  }
                }}
                placeholder="Example: TensorFlow, Photography, Singing..."
                className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
              />

              <button
                onClick={addCustomSkill}
                className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
              >
                + Add Skill
              </button>

            </div>

          </div>

        </section>

        {/* =================================================
            SUGGESTED SKILLS
        ================================================= */}

        <section className="mt-8">

          <div className="mb-5">

            <h2 className="text-2xl font-bold">
              ✨ Suggested Skills
            </h2>

            <p className="text-gray-400 mt-2">
              These skills are suggested based on your selected education level.
            </p>

          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">

            {availableSkills.map((skill) => {

              const isSelected =
                selectedSkills.some(
                  (item) =>
                    item.toLowerCase() ===
                    skill.toLowerCase()
                );

              return (

                <button
                  key={skill}
                  onClick={() =>
                    toggleSkill(skill)
                  }
                  className={`p-5 rounded-xl border text-left transition duration-200 hover:-translate-y-1 ${
                    isSelected
                      ? "bg-purple-600/30 border-purple-500 text-purple-200 shadow-lg shadow-purple-500/10"
                      : "bg-slate-900 border-white/10 text-gray-300 hover:border-purple-500/50"
                  }`}
                >

                  <div className="flex items-center justify-between gap-2">

                    <span className="font-medium">
                      {skill}
                    </span>

                    {isSelected && (
                      <span className="text-green-400 text-xl">
                        ✓
                      </span>
                    )}

                  </div>

                </button>

              );
            })}

          </div>

        </section>

        {/* =================================================
            NAVIGATION BUTTONS
        ================================================= */}

        <div className="flex flex-col md:flex-row justify-between gap-4 mt-12">

          <button
            onClick={() =>
              navigate("/select-level")
            }
            className="bg-slate-800 hover:bg-slate-700 border border-white/10 px-7 py-3 rounded-xl font-semibold transition"
          >
            ← Back
          </button>

          <button
            onClick={saveSkills}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-8 py-3 rounded-xl font-bold transition"
          >
            {loading
              ? "Saving Skills..."
              : "Continue to Interests →"}
          </button>

        </div>

      </main>

    </div>
  );
}

export default SkillSelection;