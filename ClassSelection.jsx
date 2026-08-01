import { useNavigate } from "react-router-dom";

function ClassSelection() {
  const navigate = useNavigate();

  const levels = [
    { icon: "📚", title: "Class 5", subtitle: "Explore your interests" },
    { icon: "📚", title: "Class 6", subtitle: "Discover your strengths" },
    { icon: "📚", title: "Class 7", subtitle: "Build your skills" },
    { icon: "📚", title: "Class 8", subtitle: "Explore career possibilities" },
    { icon: "📚", title: "Class 9", subtitle: "Start planning your future" },
    { icon: "📚", title: "Class 10", subtitle: "Choose your next path" },
    { icon: "🎓", title: "Intermediate", subtitle: "Build your academic journey" },
    { icon: "🛠️", title: "Diploma", subtitle: "Build technical skills" },
    { icon: "💻", title: "B.Tech / Degree", subtitle: "Prepare for your career" },
    { icon: "🏛️", title: "Government Exam Preparation", subtitle: "Prepare for your goal" },
  ];

  const handleSelect = (level) => {
  navigate("/skills", {
    state: {
      selectedClass: selectedClass,
    },
  });
};

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Header */}
      <nav className="px-8 py-5 border-b border-white/10">
        <h1 className="text-2xl font-bold text-purple-400">
          🤖 CareerGenie AI
        </h1>
      </nav>

      {/* Main Content */}
      <main className="max-w-6xl mx-auto px-6 py-16">

        <div className="text-center">

          <p className="text-purple-400 font-semibold">
            LET'S GET STARTED
          </p>

          <h2 className="text-4xl md:text-5xl font-bold mt-3">
            Where Are You in Your Journey?
          </h2>

          <p className="text-gray-400 mt-5 max-w-2xl mx-auto">
            Select your current class or education level.
            CareerGenie AI will personalize your journey based on where you are.
          </p>

        </div>

        {/* Level Cards */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">

          {levels.map((level) => (

            <button
              key={level.title}
              onClick={() => handleSelect(level.title)}
              className="text-left bg-white/5 border border-white/10 rounded-2xl p-6
              hover:border-purple-500 hover:bg-purple-500/10
              transition duration-300 group"
            >

              <div className="text-4xl group-hover:scale-110 transition">
                {level.icon}
              </div>

              <h3 className="text-xl font-semibold mt-4">
                {level.title}
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                {level.subtitle}
              </p>

              <div className="text-purple-400 mt-4 text-sm">
                Select →
              </div>

            </button>

          ))}

        </div>

      </main>

    </div>
  );
}

export default ClassSelection;