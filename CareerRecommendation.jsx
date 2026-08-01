import { useLocation, useNavigate } from "react-router-dom";
import { useMemo, useState, useEffect } from "react";
import { generateCareerRecommendations } from "../utils/careerEngine";

function CareerRecommendation() {
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state || {};

  const {
    profileId = "",
    selectedClass = "",
    selectedSkills = [],
    selectedInterests = [],
  } = locationState;

  const recommendation = useMemo(() => {
    try {
      if (
        selectedSkills?.length > 0 ||
        selectedInterests?.length > 0
      ) {
        return generateCareerRecommendations(
          selectedSkills,
          selectedInterests,
          selectedClass
        );
      }

      const savedRecommendation = sessionStorage.getItem(
        "careerRecommendation"
      );

      if (savedRecommendation) {
        return JSON.parse(savedRecommendation);
      }

      return null;
    } catch (error) {
      console.error("Career Recommendation Error:", error);
      return null;
    }
  }, [selectedClass, selectedSkills, selectedInterests]);

  useEffect(() => {
    if (recommendation) {
      sessionStorage.setItem(
        "careerRecommendation",
        JSON.stringify(recommendation)
      );
    }
  }, [recommendation]);

  const topCareers =
    recommendation?.topCareers?.length > 0
      ? recommendation.topCareers
      : recommendation?.topCareer
      ? [recommendation.topCareer]
      : [];

  const [selectedCareerIndex, setSelectedCareerIndex] = useState(() => {
    const savedIndex = sessionStorage.getItem("selectedCareerIndex");
    return savedIndex ? Number(savedIndex) : 0;
  });

  const career =
    topCareers[selectedCareerIndex] ||
    topCareers[0] ||
    null;

  useEffect(() => {
    if (career) {
      sessionStorage.setItem(
        "selectedCareer",
        JSON.stringify(career)
      );

      sessionStorage.setItem(
        "selectedCareerIndex",
        String(selectedCareerIndex)
      );
    }
  }, [career, selectedCareerIndex]);

  const selectCareer = (index) => {
    setSelectedCareerIndex(index);

    const selected = topCareers[index];

    if (selected) {
      sessionStorage.setItem(
        "selectedCareer",
        JSON.stringify(selected)
      );

      sessionStorage.setItem(
        "selectedCareerIndex",
        String(index)
      );
    }

    setTimeout(() => {
      document
        .getElementById("career-details")
        ?.scrollIntoView({
          behavior: "smooth",
        });
    }, 100);
  };

  const openRecommendedLearning = () => {
    if (!career) {
      alert("Please select a career recommendation first.");
      return;
    }

    sessionStorage.setItem(
      "selectedCareer",
      JSON.stringify(career)
    );

    sessionStorage.setItem(
      "careerRecommendation",
      JSON.stringify(recommendation)
    );

    navigate("/learning", {
      state: {
        profileId,
        selectedClass,
        selectedSkills,
        selectedInterests,
        career,
        recommendation,
      },
    });
  };

  if (!recommendation && !career) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="text-6xl mb-5">🤖</div>

          <h1 className="text-3xl font-bold text-red-400">
            Profile Information Missing
          </h1>

          <p className="text-gray-400 mt-3">
            Please select your skills and interests first
            to generate your personalized career recommendations.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold transition"
          >
            ← Go to Dashboard
          </button>
        </div>
      </div>
    );
  }

  if (!career) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center max-w-lg">
          <div className="text-6xl mb-5">😕</div>

          <h1 className="text-3xl font-bold text-orange-400">
            No Career Recommendation Found
          </h1>

          <p className="text-gray-400 mt-3">
            We couldn't find a matching career based on
            your current skills and interests.
          </p>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
          >
            ← Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white px-6 py-10">
      <div className="max-w-7xl mx-auto">

        <div className="text-center mb-10">
          <p className="text-purple-400 font-semibold">
            🤖 CAREERGENIE AI
          </p>

          <h1 className="text-4xl md:text-5xl font-bold mt-3">
            Your Personalized Career Recommendations 🚀
          </h1>

          <p className="text-gray-400 mt-4">
            Based on your education, skills, and interests,
            CareerGenie has discovered the best career paths for you.
          </p>

          {selectedClass && (
            <div className="mt-5 inline-block bg-purple-600/20 border border-purple-500/30 px-5 py-2 rounded-full text-purple-300">
              🎓 {selectedClass}
            </div>
          )}
        </div>

        <section className="mb-10">
          <div className="text-center mb-6">
            <p className="text-purple-400 font-semibold">
              🎯 YOUR TOP CAREER MATCHES
            </p>

            <h2 className="text-3xl font-bold mt-2">
              Best Careers For You
            </h2>

            <p className="text-gray-400 mt-2">
              Select a career to explore your roadmap,
              skill gaps, projects, and learning path.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {topCareers.map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                onClick={() => selectCareer(index)}
                className={`text-left bg-slate-900 border rounded-2xl p-6 transition transform hover:-translate-y-1 ${
                  selectedCareerIndex === index
                    ? "border-purple-500 shadow-lg shadow-purple-500/10"
                    : "border-white/10 hover:border-purple-500/40"
                }`}
              >
                <div className="flex justify-between items-center">
                  <div className="text-4xl">
                    {index === 0
                      ? "🥇"
                      : index === 1
                      ? "🥈"
                      : "🥉"}
                  </div>

                  <span className="text-sm bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full">
                    #{index + 1} Match
                  </span>
                </div>

                <h3 className="text-xl font-bold mt-5">
                  {item.title}
                </h3>

                <div className="mt-5">
                  <div className="flex justify-between">
                    <span className="text-gray-400 text-sm">
                      Match Score
                    </span>

                    <span className="text-purple-400 font-bold">
                      {item.matchScore || 0}%
                    </span>
                  </div>

                  <div className="w-full bg-slate-800 rounded-full h-3 mt-2">
                    <div
                      className="bg-purple-500 h-3 rounded-full transition-all"
                      style={{
                        width: `${Math.min(
                          item.matchScore || 0,
                          100
                        )}%`,
                      }}
                    />
                  </div>
                </div>

                <div className="mt-5">
                  <p className="text-sm text-gray-400">
                    💡 Matching Skills
                  </p>

                  <div className="flex flex-wrap gap-2 mt-2">
                    {item.matchedSkills?.length > 0 ? (
                      item.matchedSkills
                        .slice(0, 3)
                        .map((skill) => (
                          <span
                            key={skill}
                            className="text-xs bg-green-600/20 text-green-300 px-2 py-1 rounded-full"
                          >
                            ✓ {skill}
                          </span>
                        ))
                    ) : (
                      <span className="text-xs text-gray-500">
                        No direct skill matches
                      </span>
                    )}
                  </div>
                </div>

                <div className="mt-5 text-purple-400 text-sm font-semibold">
                  Explore Career →
                </div>
              </button>
            ))}
          </div>
        </section>

        <div id="career-details">

          <section className="bg-gradient-to-r from-purple-900/50 to-blue-900/40 border border-purple-500/30 rounded-2xl p-8">
            <p className="text-purple-300 font-semibold">
              🎯 YOUR BEST CAREER MATCH
            </p>

            <h2 className="text-4xl md:text-5xl font-bold mt-3">
              {career.title}
            </h2>

            <div className="mt-8">
              <div className="flex justify-between">
                <p className="text-gray-400">
                  Career Match Score
                </p>

                <p className="text-purple-400 font-bold">
                  {career.matchScore || 0}%
                </p>
              </div>

              <div className="w-full bg-slate-800 rounded-full h-4 mt-3">
                <div
                  className="bg-purple-500 h-4 rounded-full transition-all duration-1000"
                  style={{
                    width: `${Math.min(
                      career.matchScore || 0,
                      100
                    )}%`,
                  }}
                />
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-xl font-semibold">
                💡 Why this career?
              </h3>

              <p className="text-gray-300 mt-3 leading-relaxed">
                Based on your selected skills and interests,
                CareerGenie identified this career as one of
                your strongest matches. You already have relevant
                skills, and the recommended roadmap will help
                you develop the remaining skills.
              </p>
            </div>

            <button
              onClick={() =>
                document
                  .getElementById("career-roadmap")
                  ?.scrollIntoView({
                    behavior: "smooth",
                  })
              }
              className="mt-8 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-bold transition"
            >
              🗺️ View My Career Roadmap
            </button>
          </section>

          <div className="grid md:grid-cols-2 gap-6 mt-8">

            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold">
                💡 Your Matching Skills
              </h2>

              <p className="text-gray-400 text-sm mt-2">
                Skills you already have that match this career.
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {career.matchedSkills?.length > 0 ? (
                  career.matchedSkills.map((skill) => (
                    <span
                      key={skill}
                      className="bg-green-600/20 text-green-300 px-3 py-2 rounded-full"
                    >
                      ✓ {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-gray-500">
                    No matching skills found.
                  </p>
                )}
              </div>
            </div>

            <div className="bg-slate-900 border border-white/10 rounded-2xl p-6">
              <h2 className="text-xl font-bold">
                📚 Skills You Need to Learn
              </h2>

              <p className="text-gray-400 text-sm mt-2">
                Skills you can learn to improve your career readiness.
              </p>

              <div className="flex flex-wrap gap-2 mt-5">
                {career.skillGaps?.length > 0 ? (
                  career.skillGaps.map((skill) => (
                    <span
                      key={skill}
                      className="bg-orange-600/20 text-orange-300 px-3 py-2 rounded-full"
                    >
                      + {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-green-400">
                    🎉 You already have the key skills!
                  </p>
                )}
              </div>
            </div>
          </div>

          <section
            id="career-roadmap"
            className="mt-8 bg-slate-900 border border-purple-500/20 rounded-2xl p-8"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <p className="text-purple-400 font-semibold">
                  🗺️ PERSONALIZED ROADMAP
                </p>

                <h2 className="text-2xl md:text-3xl font-bold mt-2">
                  Roadmap for {career.title}
                </h2>

                <p className="text-gray-400 mt-2">
                  Follow these steps to move toward your career goal.
                </p>
              </div>

              <div className="bg-purple-600/20 px-4 py-2 rounded-lg text-purple-300">
                🎯 {career.title}
              </div>
            </div>

            <div className="mt-8 space-y-5">
              {career.roadmap?.length > 0 ? (
                career.roadmap.map((step, index) => (
                  <div
                    key={index}
                    className="flex gap-4 items-start"
                  >
                    <div className="w-11 h-11 rounded-full bg-purple-600 flex items-center justify-center font-bold flex-shrink-0">
                      {index + 1}
                    </div>

                    <div className="bg-slate-800 border border-white/5 rounded-xl p-5 flex-1 hover:border-purple-500/30 transition">
                      <p className="font-semibold text-lg">
                        {step}
                      </p>

                      <p className="text-gray-500 text-sm mt-2">
                        Complete this step to progress toward your career goal.
                      </p>
                    </div>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No roadmap available for this career.
                </p>
              )}
            </div>
          </section>

          <section className="mt-10">
            <p className="text-purple-400 font-semibold">
              🚀 BUILD YOUR PORTFOLIO
            </p>

            <h2 className="text-2xl font-bold mt-2">
              Recommended Projects
            </h2>

            <div className="grid md:grid-cols-3 gap-5 mt-5">
              {career.projects?.length > 0 ? (
                career.projects.map((project) => (
                  <div
                    key={project}
                    className="bg-slate-900 border border-white/10 rounded-xl p-5 hover:border-purple-500/40 transition"
                  >
                    <div className="text-3xl">💻</div>

                    <h3 className="font-semibold text-purple-300 mt-3">
                      {project}
                    </h3>

                    <p className="text-gray-400 text-sm mt-3">
                      Build this project to strengthen your
                      portfolio and gain practical experience.
                    </p>
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No project suggestions available.
                </p>
              )}
            </div>
          </section>

          <section className="mt-10 bg-slate-900 border border-white/10 rounded-2xl p-8">
            <p className="text-purple-400 font-semibold">
              💼 CAREER OPPORTUNITIES
            </p>

            <h2 className="text-2xl font-bold mt-2">
              Possible Job Roles
            </h2>

            <div className="grid md:grid-cols-2 gap-3 mt-5">
              {career.jobRoles?.length > 0 ? (
                career.jobRoles.map((role) => (
                  <div
                    key={role}
                    className="bg-slate-800 p-4 rounded-lg hover:bg-slate-700 transition"
                  >
                    💼 {role}
                  </div>
                ))
              ) : (
                <p className="text-gray-500">
                  No job roles available.
                </p>
              )}
            </div>
          </section>

          <section className="mt-10">
            <div className="bg-gradient-to-r from-purple-900/40 to-blue-900/30 border border-purple-500/30 rounded-2xl p-8 text-center">
              <div className="text-5xl mb-4">🎓</div>

              <h2 className="text-2xl font-bold">
                Ready to Start Learning?
              </h2>

              <p className="text-gray-400 mt-3 max-w-2xl mx-auto">
                Explore recommended courses and learning resources
                specifically selected for your career path.
              </p>

              <button
                onClick={openRecommendedLearning}
                className="mt-6 bg-purple-600 hover:bg-purple-700 px-8 py-4 rounded-xl font-bold transition shadow-lg shadow-purple-500/20"
              >
                🎓 View Recommended Learning
              </button>
            </div>
          </section>
        </div>

        <div className="flex flex-col md:flex-row gap-4 mt-10">
          <button
            onClick={() =>
              document
                .getElementById("career-roadmap")
                ?.scrollIntoView({
                  behavior: "smooth",
                })
            }
            className="flex-1 bg-purple-600 hover:bg-purple-700 px-8 py-3 rounded-lg font-bold transition"
          >
            🗺️ View Roadmap
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="flex-1 bg-slate-800 hover:bg-slate-700 border border-white/10 px-8 py-3 rounded-lg font-bold transition"
          >
            ← Back to Dashboard
          </button>
        </div>

        <div className="text-center mt-10 pb-5">
          <p className="text-gray-500 text-sm">
            ✨ CareerGenie AI — Your Personalized Career Companion
          </p>
        </div>

      </div>
    </div>
  );
}

export default CareerRecommendation;