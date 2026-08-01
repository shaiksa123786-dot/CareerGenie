import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

function Dashboard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  useEffect(() => {
    fetchProfile();
  }, []);

 const fetchProfile = async () => {
  try {
    const {
      data: { user: currentUser },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !currentUser) {
      console.error("User Error:", userError);
      navigate("/login");
      return;
    }

    // Save logged-in user
    setUser(currentUser);

    // Get CareerGenie profile using Supabase Auth user ID
    const {
      data: profileData,
      error: profileError,
    } = await supabase
      .from("student_profiles")
      .select("*")
      .eq("user_id", currentUser.id)
      .maybeSingle();

    if (profileError) {
      console.error("Profile Error:", profileError);
      return;
    }

    console.log("Logged-in User ID:", currentUser.id);
    console.log("CareerGenie Profile:", profileData);

    // Save profile to state
    setProfile(profileData);

  } catch (error) {
    console.error("Unexpected Error:", error);
  } finally {
    setLoading(false);
  }
};

  const getArray = (value) => {
    if (Array.isArray(value)) {
      return value;
    }

    if (!value) {
      return [];
    }

    if (typeof value === "string") {
      try {
        const parsed = JSON.parse(value);

        if (Array.isArray(parsed)) {
          return parsed;
        }
      } catch {
        return value
          .split(",")
          .map((item) => item.trim())
          .filter(Boolean);
      }
    }

    return [];
  };

  const getStudentName = () => {
    if (profile?.full_name) {
      return profile.full_name;
    }

    if (profile?.name) {
      return profile.name;
    }

    if (user?.user_metadata?.full_name) {
      return user.user_metadata.full_name;
    }

    if (user?.user_metadata?.name) {
      return user.user_metadata.name;
    }

    if (user?.email) {
      return user.email.split("@")[0];
    }

    return "Student";
  };

  const studentName = getStudentName();

  const getInitials = () => {
    const name = studentName.trim();

    if (!name) {
      return "S";
    }

    const words = name.split(" ");

    if (words.length >= 2) {
      return `${words[0][0]}${words[1][0]}`.toUpperCase();
    }

    return name.substring(0, 2).toUpperCase();
  };

  const openCareerRecommendation = () => {
    if (!profile) {
      alert("Profile information is not available.");
      return;
    }

    const skills = getArray(profile.skills);
    const interests = getArray(profile.interests);

    if (skills.length === 0) {
      alert("Please select your skills first.");
      navigate("/skills");
      return;
    }

    if (interests.length === 0) {
      alert("Please select your interests first.");
      navigate("/interest");
      return;
    }

    navigate("/career-recommendation", {
      state: {
        profileId: profile.id,
        selectedClass: profile.education || "",
        selectedSkills: skills,
        selectedInterests: interests,
      },
    });
  };
const handleLearning = () => {
  const selectedCareer = sessionStorage.getItem("selectedCareer");

  if (!selectedCareer) {
    alert("Please generate your career recommendation first.");
    openCareerRecommendation();
    return;
  }

  navigate("/learning", {
    state: {
      profileId: profile.id,
      selectedClass: profile.education,
      selectedSkills: getArray(profile.skills),
      selectedInterests: getArray(profile.interests),
     career: JSON.parse(selectedCareer || "{}"),
    },
  });
};
  const openProjects = () => {
    const selectedCareer =
      sessionStorage.getItem("selectedCareer");

    if (!selectedCareer && !profile?.recommended_career) {
      alert("Please generate your career recommendations first.");
      openCareerRecommendation();
      return;
    }

    navigate("/projects", {
      state: {
        career: profile?.recommended_career || null,
      },
    });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center">
          <div className="text-6xl animate-pulse">🤖</div>

          <h2 className="text-2xl font-bold text-purple-400 mt-5">
            Loading CareerGenie...
          </h2>

          <p className="text-gray-500 mt-2">
            Preparing your personalized dashboard
          </p>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="text-center bg-slate-900 border border-white/10 rounded-2xl p-10">
          <div className="text-6xl">😕</div>

          <h1 className="text-3xl font-bold mt-5">
            Profile Not Found
          </h1>

          <p className="text-gray-400 mt-3">
            Please complete your CareerGenie profile.
          </p>

          <button
            onClick={() => navigate("/skills")}
            className="mt-6 bg-purple-600 hover:bg-purple-700 px-7 py-3 rounded-xl font-semibold"
          >
            Complete Profile →
          </button>
        </div>
      </div>
    );
  }

  const skills = getArray(profile.skills);
  const interests = getArray(profile.interests);

  const hasRecommendation =
    Boolean(profile.recommended_career) ||
    Boolean(sessionStorage.getItem("selectedCareer"));

  return (
    <div
      className="min-h-screen bg-slate-950 text-white"
      onClick={() => {
        if (showProfileMenu) {
          setShowProfileMenu(false);
        }
      }}
    >
      <nav className="sticky top-0 z-50 bg-slate-950/90 backdrop-blur-xl border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-purple-600/20 border border-purple-500/30 flex items-center justify-center text-2xl">
              🤖
            </div>

            <div>
              <h1 className="text-xl font-bold text-purple-400">
                CareerGenie AI
              </h1>

              <p className="text-xs text-gray-500">
                Your Career Companion
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3">

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/skills");
              }}
              className="hidden md:block text-gray-400 hover:text-white px-4 py-2 transition"
            >
              Update Skills
            </button>

            <button
              onClick={(e) => {
                e.stopPropagation();
                navigate("/interest");
              }}
              className="hidden md:block text-gray-400 hover:text-white px-4 py-2 transition"
            >
              Update Interests
            </button>

            <div className="relative">
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  setShowProfileMenu(!showProfileMenu);
                }}
                className="flex items-center gap-3 bg-slate-900 hover:bg-slate-800 border border-white/10 rounded-full pl-2 pr-4 py-2 transition"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-white">
                  {getInitials()}
                </div>

                <div className="hidden sm:block text-left">
                  <p className="text-sm font-semibold text-white max-w-[140px] truncate">
                    {studentName}
                  </p>

                  <p className="text-xs text-gray-500">
                    Student
                  </p>
                </div>

                <span className="text-gray-400 text-xs">
                  ▼
                </span>
              </button>

              {showProfileMenu && (
                <div
                  onClick={(e) => e.stopPropagation()}
                  className="absolute right-0 mt-3 w-64 bg-slate-900 border border-white/10 rounded-2xl shadow-2xl overflow-hidden"
                >
                  <div className="p-5 border-b border-white/10">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-purple-500 to-blue-500 flex items-center justify-center font-bold text-lg">
                        {getInitials()}
                      </div>

                      <div className="min-w-0">
                        <p className="font-semibold truncate">
                          {studentName}
                        </p>

                        <p className="text-xs text-gray-500 truncate">
                          {user?.email || "Student Account"}
                        </p>
                      </div>
                    </div>
                  </div>

                  <div className="p-2">
                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        navigate("/dashboard");
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition flex items-center gap-3"
                    >
                      👤
                      <span>My Profile</span>
                    </button>

                    <button
                      onClick={() => {
                        setShowProfileMenu(false);
                        alert("Settings page coming soon.");
                      }}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-white/5 text-gray-300 hover:text-white transition flex items-center gap-3"
                    >
                      ⚙️
                      <span>Settings</span>
                    </button>

                    <div className="border-t border-white/10 my-2" />

                    <button
                      onClick={handleLogout}
                      className="w-full text-left px-4 py-3 rounded-xl hover:bg-red-500/10 text-red-400 transition flex items-center gap-3"
                    >
                      🚪
                      <span>Logout</span>
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      <main className="max-w-7xl mx-auto px-6 py-10">

        <section className="relative overflow-hidden rounded-3xl border border-purple-500/20 bg-gradient-to-br from-purple-900/40 via-slate-900 to-blue-900/30 p-8 md:p-12">
          <div className="absolute -top-20 -right-20 w-72 h-72 bg-purple-600/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-20 -left-20 w-72 h-72 bg-blue-600/10 rounded-full blur-3xl" />

          <div className="relative grid md:grid-cols-2 gap-10 items-center">
            <div>
              <p className="text-purple-400 font-semibold">
                ✨ YOUR PERSONALIZED CAREER JOURNEY
              </p>

              <h1 className="text-4xl md:text-5xl font-bold mt-4 leading-tight">
                Welcome,
                <span className="text-purple-400">
                  {" "}{studentName}
                </span>
                🚀
              </h1>

              <p className="text-gray-400 text-lg mt-5 max-w-xl">
                Discover your strengths, explore career possibilities,
                build valuable skills, and move confidently toward
                your dream career.
              </p>

              <button
                onClick={openCareerRecommendation}
                className="mt-7 bg-purple-600 hover:bg-purple-700 px-7 py-3 rounded-xl font-semibold transition shadow-lg shadow-purple-900/30"
              >
                🔮 Explore My Career Path
              </button>
            </div>

            <div className="hidden md:flex justify-center">
              <div className="relative">
                <div className="w-56 h-56 rounded-full bg-purple-600/10 border border-purple-500/20 flex items-center justify-center">
                  <div className="text-8xl">
                    🤖
                  </div>
                </div>

                <div className="absolute -top-4 -right-4 bg-slate-900 border border-white/10 rounded-xl px-4 py-3 shadow-xl">
                  <p className="text-xs text-gray-500">
                    Your Journey
                  </p>

                  <p className="font-bold text-purple-400">
                    Starts Here 🚀
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-10">
          <p className="text-purple-400 text-sm font-semibold">
            YOUR PROFILE
          </p>

          <h2 className="text-3xl font-bold mt-1">
            Know Yourself Better
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-6">

            <div className="group bg-slate-900 border border-white/10 hover:border-purple-500/40 rounded-2xl p-6 transition">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-2xl">
                  🎓
                </div>

                <span className="text-gray-600">
                  01
                </span>
              </div>

              <h3 className="text-xl font-bold mt-5">
                Education
              </h3>

              <p className="text-purple-400 mt-2">
                {profile.education || "Not specified"}
              </p>
            </div>

            <div className="group bg-slate-900 border border-white/10 hover:border-blue-500/40 rounded-2xl p-6 transition">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-blue-600/20 flex items-center justify-center text-2xl">
                  💡
                </div>

                <span className="text-gray-600">
                  {skills.length}
                </span>
              </div>

              <h3 className="text-xl font-bold mt-5">
                Your Skills
              </h3>

              <div className="flex flex-wrap gap-2 mt-4">
                {skills.length > 0 ? (
                  skills.slice(0, 5).map((skill, index) => (
                    <span
                      key={index}
                      className="bg-blue-600/10 border border-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-xs"
                    >
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No skills selected
                  </p>
                )}
              </div>

              {skills.length > 5 && (
                <p className="text-gray-500 text-xs mt-3">
                  +{skills.length - 5} more skills
                </p>
              )}
            </div>

            <div className="group bg-slate-900 border border-white/10 hover:border-pink-500/40 rounded-2xl p-6 transition">
              <div className="flex items-center justify-between">
                <div className="w-12 h-12 rounded-xl bg-pink-600/20 flex items-center justify-center text-2xl">
                  ❤️
                </div>

                <span className="text-gray-600">
                  {interests.length}
                </span>
              </div>

              <h3 className="text-xl font-bold mt-5">
                Your Interests
              </h3>

              <div className="flex flex-wrap gap-2 mt-4">
                {interests.length > 0 ? (
                  interests.slice(0, 5).map((interest, index) => (
                    <span
                      key={index}
                      className="bg-pink-600/10 border border-pink-500/20 text-pink-300 px-3 py-1 rounded-full text-xs"
                    >
                      {interest}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No interests selected
                  </p>
                )}
              </div>

              {interests.length > 5 && (
                <p className="text-gray-500 text-xs mt-3">
                  +{interests.length - 5} more interests
                </p>
              )}
            </div>
          </div>
        </section>

        <section className="mt-10">
          <div className="bg-slate-900 border border-purple-500/20 rounded-2xl p-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">

              <div className="flex items-center gap-5">
                <div className="w-16 h-16 rounded-2xl bg-purple-600/20 flex items-center justify-center text-4xl">
                  🔮
                </div>

                <div>
                  <p className="text-purple-400 text-sm font-semibold">
                    AI CAREER ANALYSIS
                  </p>

                  <h2 className="text-2xl font-bold mt-1">
                    Discover Your Best Career Paths
                  </h2>

                  <p className="text-gray-400 mt-2">
                    CareerGenie analyzes your education,
                    skills, and interests to recommend
                    career paths that match your potential.
                  </p>
                </div>
              </div>

              <button
                onClick={openCareerRecommendation}
                className="bg-purple-600 hover:bg-purple-700 whitespace-nowrap px-6 py-3 rounded-xl font-semibold transition"
              >
                {hasRecommendation
                  ? "View Recommendations →"
                  : "Generate Recommendations →"}
              </button>
            </div>
          </div>
        </section>

        <section className="mt-12">
          <p className="text-purple-400 text-sm font-semibold">
            YOUR CAREER TOOLS
          </p>

          <h2 className="text-3xl font-bold mt-1">
            Build Your Future
          </h2>

          <div className="grid md:grid-cols-3 gap-6 mt-6">

            <div className="group bg-slate-900 border border-white/10 hover:border-purple-500/50 rounded-2xl p-7 transition hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-purple-600/20 flex items-center justify-center text-3xl">
                🗺️
              </div>

              <h3 className="text-xl font-bold mt-5">
                AI Career Roadmap
              </h3>

              <p className="text-gray-400 mt-3">
                Follow a personalized step-by-step roadmap
                designed around your recommended career.
              </p>

              <button
                onClick={openCareerRecommendation}
                className="mt-6 text-purple-400 font-semibold hover:text-purple-300"
              >
                View My Roadmap →
              </button>
            </div>

            <div className="group bg-slate-900 border border-white/10 hover:border-blue-500/50 rounded-2xl p-7 transition hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-3xl">
                📚
              </div>

              <h3 className="text-xl font-bold mt-5">
                Recommended Learning
              </h3>

              <p className="text-gray-400 mt-3">
                Learn the skills you need through
                personalized courses and learning resources.
              </p>
<button
  onClick={handleLearning}
  className="mt-6 text-blue-400 font-semibold hover:text-blue-300"
>
  Start Learning →
</button>
            </div>

            <div className="group bg-slate-900 border border-white/10 hover:border-green-500/50 rounded-2xl p-7 transition hover:-translate-y-1">
              <div className="w-14 h-14 rounded-2xl bg-green-600/20 flex items-center justify-center text-3xl">
                🚀
              </div>

              <h3 className="text-xl font-bold mt-5">
                Project Suggestions
              </h3>

              <p className="text-gray-400 mt-3">
                Build real-world projects that strengthen
                your skills and improve career readiness.
              </p>

              <button
                onClick={openProjects}
                className="mt-6 text-green-400 font-semibold hover:text-green-300"
              >
                Explore Projects →
              </button>
            </div>

          </div>
        </section>

        {hasRecommendation && (
          <section className="mt-10">
            <div className="relative overflow-hidden bg-gradient-to-r from-green-900/30 to-emerald-900/20 border border-green-500/20 rounded-2xl p-7">
              <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-5">

                <div>
                  <p className="text-green-400 text-sm font-semibold">
                    🎯 YOUR CURRENT CAREER MATCH
                  </p>

                  <h2 className="text-3xl font-bold mt-2">
                    {profile.recommended_career ||
                      "Career Recommendation Available"}
                  </h2>

                  <p className="text-gray-400 mt-2">
                    Continue learning and building projects
                    to move closer to your career goal.
                  </p>
                </div>

                <button
                  onClick={openCareerRecommendation}
                  className="bg-green-600 hover:bg-green-700 px-6 py-3 rounded-xl font-semibold whitespace-nowrap"
                >
                  View Career Details →
                </button>
              </div>
            </div>
          </section>
        )}

        <section className="mt-10">
          <div className="bg-slate-900 border border-white/10 rounded-2xl p-7">

            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-2xl">
                📊
              </div>

              <div>
                <h2 className="text-xl font-bold">
                  Your CareerGenie Profile
                </h2>

                <p className="text-gray-500 text-sm">
                  Keep your profile updated for better recommendations.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

              <div className="bg-slate-800 rounded-xl p-5">
                <p className="text-gray-500 text-sm">
                  Education
                </p>

                <p className="text-purple-400 font-semibold mt-2">
                  {profile.education || "Not specified"}
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-5">
                <p className="text-gray-500 text-sm">
                  Skills
                </p>

                <p className="text-2xl font-bold text-blue-400 mt-2">
                  {skills.length}
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-5">
                <p className="text-gray-500 text-sm">
                  Interests
                </p>

                <p className="text-2xl font-bold text-pink-400 mt-2">
                  {interests.length}
                </p>
              </div>

              <div className="bg-slate-800 rounded-xl p-5">
                <p className="text-gray-500 text-sm">
                  Career Status
                </p>

                <p className="text-green-400 font-semibold mt-2">
                  {hasRecommendation
                    ? "Recommended"
                    : "Not Generated"}
                </p>
              </div>

            </div>
          </div>
        </section>

        <footer className="border-t border-white/10 mt-16 pt-8 pb-6 text-center">
          <h3 className="text-lg font-bold text-purple-400">
            🤖 CareerGenie AI
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Discover. Learn. Grow. Achieve.
          </p>

          <p className="text-gray-600 text-xs mt-5">
            © 2026 CareerGenie AI by GenAI Titans.
            All rights reserved.
          </p>
        </footer>

      </main>
    </div>
  );
}

export default Dashboard;