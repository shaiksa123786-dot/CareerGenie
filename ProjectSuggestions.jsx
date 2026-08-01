import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { projectData } from "../utils/projectData";

function ProjectSuggestions() {
  const location = useLocation();
  const navigate = useNavigate();

  const [completedProjects, setCompletedProjects] = useState([]);

  const selectedCareer =
    location.state?.career ||
    location.state?.selectedCareer ||
    "AI / ML Engineer";

  const projects = projectData[selectedCareer] || [];

  const toggleProject = (title) => {
    setCompletedProjects((previous) => {
      if (previous.includes(title)) {
        return previous.filter((item) => item !== title);
      }

      return [...previous, title];
    });
  };

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-white/10 px-6 py-5">

        <div className="max-w-7xl mx-auto flex justify-between items-center">

          <div>
            <h1 className="text-2xl font-bold text-purple-400">
              🤖 CareerGenie AI
            </h1>

            <p className="text-xs text-gray-400">
              Build. Practice. Achieve.
            </p>
          </div>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg"
          >
            ← Dashboard
          </button>

        </div>

      </nav>

      {/* Main */}
      <main className="max-w-7xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="text-center">

          <p className="text-green-400 font-semibold">
            🚀 PERSONALIZED PROJECT SUGGESTIONS
          </p>

          <h1 className="text-4xl font-bold mt-3">
            Build Real-World Projects
          </h1>

          <p className="text-gray-400 mt-3">
            Projects recommended for your career path
          </p>

          <h2 className="text-2xl font-bold text-purple-400 mt-3">
            {selectedCareer}
          </h2>

        </div>

        {/* Project Count */}
        <div className="mt-8 bg-slate-900 border border-white/10 rounded-2xl p-5 text-center">

          <p className="text-gray-400">
            Recommended Projects
          </p>

          <p className="text-3xl font-bold text-green-400 mt-2">
            {projects.length}
          </p>

          <p className="text-gray-500 text-sm mt-2">
            {completedProjects.length} project
            {completedProjects.length !== 1 ? "s" : ""} completed
          </p>

        </div>

        {/* Projects */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

          {projects.map((project, index) => {

            const isCompleted =
              completedProjects.includes(project.title);

            return (

              <div
                key={project.title}
                className={`bg-slate-900 border rounded-2xl p-6 transition ${
                  isCompleted
                    ? "border-green-500/50"
                    : "border-white/10 hover:border-purple-500/50"
                }`}
              >

                {/* Project Number */}
                <div className="flex justify-between items-center">

                  <div className="w-12 h-12 rounded-xl bg-purple-600/20 flex items-center justify-center text-xl font-bold text-purple-400">
                    {index + 1}
                  </div>

                  <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-sm">
                    {project.level}
                  </span>

                </div>

                {/* Title */}
                <h2 className="text-2xl font-bold mt-5">
                  {project.title}
                </h2>

                {/* Description */}
                <p className="text-gray-400 mt-3">
                  {project.description}
                </p>

                {/* Duration */}
                <div className="mt-4 text-gray-300">
                  ⏱️ Duration: {project.duration}
                </div>

                {/* Skills */}
                <div className="mt-6">

                  <h3 className="font-semibold text-purple-300">
                    💡 Skills You Will Practice
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {project.skills.map((skill) => (

                      <span
                        key={skill}
                        className="bg-slate-800 text-gray-300 px-3 py-1 rounded-full text-sm"
                      >
                        {skill}
                      </span>

                    ))}

                  </div>

                </div>

                {/* Technologies */}
                <div className="mt-6">

                  <h3 className="font-semibold text-blue-300">
                    🛠️ Technologies
                  </h3>

                  <div className="flex flex-wrap gap-2 mt-3">

                    {project.technologies.map((technology) => (

                      <span
                        key={technology}
                        className="bg-blue-600/10 text-blue-300 px-3 py-1 rounded-full text-sm"
                      >
                        {technology}
                      </span>

                    ))}

                  </div>

                </div>

                {/* Complete Project */}
                <button
                  onClick={() =>
                    toggleProject(project.title)
                  }
                  className={`w-full mt-6 py-3 rounded-lg font-bold transition ${
                    isCompleted
                      ? "bg-green-600 hover:bg-green-700"
                      : "bg-purple-600 hover:bg-purple-700"
                  }`}
                >
                  {isCompleted
                    ? "✅ Project Completed"
                    : "🚀 Mark as Completed"}
                </button>

              </div>

            );
          })}

        </div>

        {/* Empty State */}
        {projects.length === 0 && (

          <div className="mt-10 bg-slate-900 border border-red-500/20 rounded-2xl p-10 text-center">

            <div className="text-5xl">
              😕
            </div>

            <h2 className="text-2xl font-bold mt-4">
              Projects Not Available
            </h2>

            <p className="text-gray-400 mt-2">
              We don't have projects for this career yet.
            </p>

          </div>

        )}

        {/* Bottom Buttons */}
        <div className="flex justify-center gap-4 mt-10">

          <button
            onClick={() => navigate("/learning")}
            className="bg-slate-800 hover:bg-slate-700 px-6 py-3 rounded-lg font-semibold"
          >
            ← Recommended Learning
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
          >
            Go to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

export default ProjectSuggestions;