import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { supabase } from "../lib/supabase";

function InterestSelection() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get selected class from SelectLevel / SkillSelection
  const selectedClass =
    location.state?.selectedClass || "";

  // ==========================================
  // INTERESTS BASED ON CLASS
  // ==========================================

  const interestsByClass = {
    "Class 5-7": [
      "Drawing",
      "Storytelling",
      "Reading",
      "Science Experiments",
      "Nature",
      "Animals",
      "Space",
      "Sports",
      "Music",
      "Dance",
      "Gaming",
      "Building Things",
      "Technology",
      "Helping Others",
      "Puzzles",
    ],

    "Class 8-10": [
      "Coding",
      "Artificial Intelligence",
      "Robotics",
      "Science",
      "Mathematics",
      "Space",
      "Technology",
      "Gaming",
      "Web Development",
      "App Development",
      "Cybersecurity",
      "Sports",
      "Design",
      "Business",
      "Helping Others",
    ],

    "Intermediate": [
      "Engineering",
      "Medicine",
      "Computer Science",
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "Web Development",
      "App Development",
      "Cybersecurity",
      "Government Jobs",
      "UPSC",
      "Law",
      "Business",
      "Research",
      "Teaching",
    ],

    "B.Tech / Engineering": [
      "Artificial Intelligence",
      "Machine Learning",
      "Data Science",
      "Software Development",
      "Web Development",
      "App Development",
      "Cybersecurity",
      "Cloud Computing",
      "DevOps",
      "Robotics",
      "IoT",
      "Research",
      "UI/UX Design",
      "Entrepreneurship",
      "Product Development",
    ],

    "MBBS / Medical": [
      "Medicine",
      "Patient Care",
      "Surgery",
      "Clinical Research",
      "Medical Research",
      "Public Health",
      "Pharmacology",
      "Pathology",
      "Radiology",
      "Pediatrics",
      "Cardiology",
      "Neurology",
      "Dermatology",
      "Healthcare Technology",
      "Medical Education",
    ],

    "Degree": [
      "Computer Applications",
      "Data Analytics",
      "Business",
      "Finance",
      "Accounting",
      "Banking",
      "Digital Marketing",
      "Content Creation",
      "Teaching",
      "Research",
      "Government Jobs",
      "Entrepreneurship",
      "Human Resources",
      "Management",
      "Communication",
    ],

    "Law": [
      "Criminal Law",
      "Corporate Law",
      "Civil Law",
      "Constitutional Law",
      "Cyber Law",
      "Human Rights",
      "Legal Research",
      "Public Policy",
      "Judiciary",
      "Litigation",
      "Legal Consulting",
      "Corporate Legal Practice",
      "Government Jobs",
      "UPSC",
      "Public Service",
    ],

    "UPSC / Civil Services": [
      "Civil Services",
      "IAS",
      "IPS",
      "IFS",
      "Government Administration",
      "Public Policy",
      "Indian Polity",
      "Indian History",
      "Geography",
      "Economics",
      "Current Affairs",
      "International Relations",
      "Social Issues",
      "Public Service",
      "Leadership",
    ],

    "Police / Defence": [
      "Police Services",
      "IPS",
      "Law Enforcement",
      "Criminal Investigation",
      "Cyber Crime",
      "Forensics",
      "Defence",
      "Army",
      "Navy",
      "Air Force",
      "Public Safety",
      "Leadership",
      "Physical Fitness",
      "Government Jobs",
      "National Security",
    ],

    "Other": [
      "Technology",
      "Business",
      "Entrepreneurship",
      "Teaching",
      "Research",
      "Government Jobs",
      "Creative Arts",
      "Design",
      "Digital Marketing",
      "Content Creation",
      "Finance",
      "Healthcare",
      "Law",
      "Public Service",
      "Social Work",
    ],
  };

  // Get interests for selected class
  const interests =
    interestsByClass[selectedClass] || [
      "Technology",
      "Business",
      "Teaching",
      "Research",
      "Entrepreneurship",
      "Government Jobs",
      "Creative Arts",
      "Design",
      "Healthcare",
      "Law",
    ];

  // ==========================================
  // STATES
  // ==========================================

  const [selectedInterests, setSelectedInterests] = useState([]);
  const [customInterest, setCustomInterest] = useState("");
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);

  // ==========================================
  // LOAD EXISTING INTERESTS
  // ==========================================

  useEffect(() => {
    const loadExistingInterests = async () => {
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
          .select("interests, education")
          .eq("user_id", user.id)
          .maybeSingle();

        if (error) {
          console.error(
            "Load Interests Error:",
            error
          );
          return;
        }

        if (data?.interests) {
          let existingInterests = [];

          if (Array.isArray(data.interests)) {
            existingInterests = data.interests;
          } else if (
            typeof data.interests === "string"
          ) {
            try {
              const parsed = JSON.parse(
                data.interests
              );

              if (Array.isArray(parsed)) {
                existingInterests = parsed;
              } else {
                existingInterests = data.interests
                  .split(",")
                  .map((item) => item.trim())
                  .filter(Boolean);
              }
            } catch {
              existingInterests = data.interests
                .split(",")
                .map((item) => item.trim())
                .filter(Boolean);
            }
          }

          setSelectedInterests(existingInterests);
        }
      } catch (error) {
        console.error(
          "Unexpected Error:",
          error
        );
      } finally {
        setInitialLoading(false);
      }
    };

    loadExistingInterests();
  }, [navigate]);

  // ==========================================
  // TOGGLE INTEREST
  // ==========================================

  const toggleInterest = (interest) => {
    setSelectedInterests((previous) => {
      if (previous.includes(interest)) {
        return previous.filter(
          (item) => item !== interest
        );
      }

      return [...previous, interest];
    });
  };

  // ==========================================
  // ADD CUSTOM INTEREST
  // ==========================================

  const addCustomInterest = () => {
    const newInterest =
      customInterest.trim();

    if (!newInterest) {
      return;
    }

    const alreadyExists =
      selectedInterests.some(
        (interest) =>
          interest.toLowerCase() ===
          newInterest.toLowerCase()
      );

    if (alreadyExists) {
      alert(
        "This interest is already selected."
      );
      return;
    }

    setSelectedInterests((previous) => [
      ...previous,
      newInterest,
    ]);

    setCustomInterest("");
  };

  // ==========================================
  // REMOVE INTEREST
  // ==========================================

  const removeInterest = (interestToRemove) => {
    setSelectedInterests((previous) =>
      previous.filter(
        (interest) =>
          interest !== interestToRemove
      )
    );
  };

  // ==========================================
  // SAVE INTERESTS
  // ==========================================

  const saveInterests = async () => {
    if (selectedInterests.length === 0) {
      alert(
        "Please select at least one interest."
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
        alert("Please login again.");
        navigate("/login");
        return;
      }

      // Update student profile
      const { error } = await supabase
        .from("student_profiles")
        .update({
          interests: selectedInterests,
          education:
            selectedClass || undefined,
        })
        .eq("user_id", user.id);

      if (error) {
        console.error(
          "Save Interests Error:",
          error
        );

        alert(
          "Unable to save interests: " +
            error.message
        );

        return;
      }

      // Done button → Dashboard
      navigate("/dashboard");

    } catch (error) {
      console.error(
        "Unexpected Error:",
        error
      );

      alert(
        "Something went wrong. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // LOADING SCREEN
  // ==========================================

  if (initialLoading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-5xl">
            🤖
          </div>

          <h2 className="text-2xl font-bold text-purple-400 mt-4">
            Loading Your Interests...
          </h2>
        </div>
      </div>
    );
  }

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* NAVBAR */}
      <nav className="border-b border-white/10 px-6 py-5">
        <div className="max-w-5xl mx-auto flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-purple-400">
              🤖 CareerGenie AI
            </h1>

            <p className="text-xs text-gray-400">
              Discover your interests
            </p>
          </div>

          <button
            onClick={() =>
              navigate("/skills", {
                state: {
                  selectedClass,
                },
              })
            }
            className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg transition"
          >
            ← Back
          </button>

        </div>
      </nav>

      {/* MAIN */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* HEADER */}
        <div className="text-center">

          <p className="text-purple-400 font-semibold">
            STEP 3 OF 3
          </p>

          <h1 className="text-4xl font-bold mt-3">
            What Are You Interested In? ❤️
          </h1>

          <p className="text-gray-400 mt-3">
            Choose interests that match your
            goals and career aspirations.
          </p>

          {/* SELECTED CLASS */}
          {selectedClass && (
            <div className="inline-block mt-5 bg-purple-600/20 border border-purple-500/30 px-5 py-2 rounded-full text-purple-300">
              🎓 {selectedClass}
            </div>
          )}

        </div>

        {/* SELECTED INTERESTS */}
        <div className="mt-10">

          <h2 className="text-xl font-bold">
            ❤️ Your Selected Interests
          </h2>

          {selectedInterests.length > 0 ? (

            <div className="flex flex-wrap gap-3 mt-4">

              {selectedInterests.map(
                (interest) => (

                  <div
                    key={interest}
                    className="flex items-center gap-2 bg-purple-600/20 border border-purple-500/30 text-purple-300 px-4 py-2 rounded-full"
                  >

                    <span>
                      {interest}
                    </span>

                    <button
                      onClick={() =>
                        removeInterest(
                          interest
                        )
                      }
                      className="text-purple-300 hover:text-red-400 font-bold"
                    >
                      ×
                    </button>

                  </div>

                )
              )}

            </div>

          ) : (

            <p className="text-gray-500 mt-4">
              No interests selected yet.
            </p>

          )}

        </div>

        {/* ADD CUSTOM INTEREST */}
        <div className="mt-8 bg-slate-900 border border-white/10 rounded-2xl p-6">

          <h2 className="text-xl font-bold">
            ✨ Add Your Own Interest
          </h2>

          <p className="text-gray-400 text-sm mt-2">
            Your interests can change over
            time. Add a new interest whenever
            you discover something new.
          </p>

          <div className="flex flex-col md:flex-row gap-3 mt-5">

            <input
              type="text"
              value={customInterest}
              onChange={(event) =>
                setCustomInterest(
                  event.target.value
                )
              }
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  addCustomInterest();
                }
              }}
              placeholder="Example: Medical Research"
              className="flex-1 bg-slate-800 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
            />

            <button
              onClick={addCustomInterest}
              className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
            >
              + Add Interest
            </button>

          </div>

        </div>

        {/* CLASS-SPECIFIC INTERESTS */}
        <div className="mt-8">

          <h2 className="text-2xl font-bold">
            🎯 Choose Your Interests
          </h2>

          <p className="text-gray-400 mt-2">
            {selectedClass
              ? `Interests suggested for ${selectedClass}`
              : "Select the areas you are interested in."}
          </p>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

            {interests.map((interest) => {

              const isSelected =
                selectedInterests.includes(
                  interest
                );

              return (

                <button
                  key={interest}
                  onClick={() =>
                    toggleInterest(
                      interest
                    )
                  }
                  className={`
                    p-4
                    rounded-xl
                    border
                    text-left
                    transition
                    ${
                      isSelected
                        ? "bg-purple-600/30 border-purple-500 text-purple-300"
                        : "bg-slate-900 border-white/10 text-gray-300 hover:border-purple-500/50"
                    }
                  `}
                >

                  <div className="flex items-center justify-between gap-2">

                    <span className="font-medium">
                      {interest}
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

        </div>

        {/* DONE BUTTON */}
        <div className="mt-12 text-center">

          <p className="text-gray-500 text-sm mb-4">
            {selectedInterests.length} interest
            {selectedInterests.length !== 1
              ? "s"
              : ""}{" "}
            selected
          </p>

          <button
            onClick={saveInterests}
            disabled={loading}
            className="bg-purple-600 hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed px-12 py-4 rounded-xl font-bold text-lg transition"
          >
            {loading
              ? "Saving..."
              : "Done ✓"}
          </button>

        </div>

      </main>

    </div>
  );
}

export default InterestSelection;