import { useLocation, useNavigate } from "react-router-dom";
import { useMemo } from "react";

const projectData = {
  "AI / ML Engineer": [
    {
      title: "AI Career Recommendation System",
      description:
        "Build an AI system that recommends suitable career paths based on a student's skills, interests, education, and goals.",
      skills: ["Python", "Machine Learning", "Data Processing"],
      difficulty: "Intermediate",
      duration: "4-6 Weeks",
    },
    {
      title: "Student Performance Prediction",
      description:
        "Create a machine learning model that predicts student performance using academic and behavioral data.",
      skills: ["Python", "Pandas", "Scikit-learn", "Machine Learning"],
      difficulty: "Intermediate",
      duration: "3-4 Weeks",
    },
    {
      title: "AI Image Classification System",
      description:
        "Develop a deep learning model that classifies images into different categories.",
      skills: ["Python", "TensorFlow", "CNN", "Deep Learning"],
      difficulty: "Advanced",
      duration: "5-8 Weeks",
    },
  ],

  "Data Scientist": [
    {
      title: "Student Performance Analytics",
      description:
        "Analyze student data and create an interactive dashboard to discover academic performance patterns.",
      skills: ["Python", "Pandas", "SQL", "Data Visualization"],
      difficulty: "Intermediate",
      duration: "3-4 Weeks",
    },
    {
      title: "Customer Churn Prediction",
      description:
        "Build a machine learning system that predicts which customers are likely to leave a service.",
      skills: ["Python", "Pandas", "Machine Learning"],
      difficulty: "Intermediate",
      duration: "4-5 Weeks",
    },
    {
      title: "Sales Prediction Dashboard",
      description:
        "Analyze historical sales data and predict future sales trends.",
      skills: ["Python", "SQL", "Pandas", "Data Visualization"],
      difficulty: "Intermediate",
      duration: "3-4 Weeks",
    },
  ],

  "Software Developer": [
    {
      title: "Student Management System",
      description:
        "Build a complete application to manage student records, attendance, marks, and profiles.",
      skills: ["Programming", "Database", "CRUD", "Problem Solving"],
      difficulty: "Beginner",
      duration: "2-4 Weeks",
    },
    {
      title: "E-Commerce Application",
      description:
        "Create an online shopping application with products, cart, authentication, and checkout.",
      skills: ["JavaScript", "React", "Database", "APIs"],
      difficulty: "Intermediate",
      duration: "5-8 Weeks",
    },
    {
      title: "College Management Portal",
      description:
        "Develop a web platform for managing students, faculty, courses, and academic activities.",
      skills: ["React", "Node.js", "Database", "REST APIs"],
      difficulty: "Advanced",
      duration: "6-10 Weeks",
    },
  ],

  "Web Developer": [
    {
      title: "Personal Portfolio Website",
      description:
        "Create a professional portfolio website to showcase your skills, projects, and achievements.",
      skills: ["HTML", "CSS", "JavaScript", "React"],
      difficulty: "Beginner",
      duration: "1-2 Weeks",
    },
    {
      title: "E-Commerce Website",
      description:
        "Build a responsive shopping website with product listings, cart, and user authentication.",
      skills: ["React", "JavaScript", "APIs", "Database"],
      difficulty: "Intermediate",
      duration: "4-6 Weeks",
    },
    {
      title: "College Management Portal",
      description:
        "Build a responsive portal for students and faculty to manage academic information.",
      skills: ["React", "Node.js", "Database"],
      difficulty: "Advanced",
      duration: "6-8 Weeks",
    },
  ],

  "Cloud Engineer": [
    {
      title: "Cloud File Storage System",
      description:
        "Build a secure cloud-based file storage and sharing application.",
      skills: ["Cloud Computing", "AWS", "Storage", "Security"],
      difficulty: "Intermediate",
      duration: "4-6 Weeks",
    },
    {
      title: "Serverless Web Application",
      description:
        "Deploy a scalable web application using serverless cloud technologies.",
      skills: ["AWS", "Serverless", "APIs", "Cloud"],
      difficulty: "Advanced",
      duration: "5-8 Weeks",
    },
  ],

  "Cybersecurity Analyst": [
    {
      title: "Security Log Analyzer",
      description:
        "Build a system that analyzes security logs and identifies suspicious activity.",
      skills: ["Python", "Cybersecurity", "Log Analysis"],
      difficulty: "Intermediate",
      duration: "3-5 Weeks",
    },
    {
      title: "Network Monitoring System",
      description:
        "Create a system that monitors network activity and detects unusual patterns.",
      skills: ["Networking", "Python", "Cybersecurity"],
      difficulty: "Advanced",
      duration: "5-7 Weeks",
    },
  ],
};

function Projects() {
  const location = useLocation();
  const navigate = useNavigate();

  const career =
    location.state?.career || "AI / ML Engineer";

  const projects = useMemo(() => {
    return projectData[career] || projectData["AI / ML Engineer"];
  }, [career]);

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
            Build Projects for Your Career
          </h1>

          <p className="text-gray-400 mt-3">
            Recommended projects based on your career path
          </p>

          <h2 className="text-2xl font-bold text-purple-400 mt-3">
            🎯 {career}
          </h2>

        </div>

        {/* Project Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">

          {projects.map((project, index) => (

            <div
              key={project.title}
              className="
                bg-slate-900
                border
                border-white/10
                rounded-2xl
                p-6
                hover:border-green-500/50
                hover:-translate-y-1
                transition
              "
            >

              <div className="flex justify-between items-start">

                <div className="text-4xl">
                  🚀
                </div>

                <span className="text-sm bg-green-500/10 text-green-400 px-3 py-1 rounded-full">
                  Project {index + 1}
                </span>

              </div>

              <h2 className="text-xl font-bold mt-5">
                {project.title}
              </h2>

              <p className="text-gray-400 mt-3">
                {project.description}
              </p>

              {/* Difficulty */}
              <div className="flex justify-between mt-5 text-sm">

                <span className="text-gray-400">
                  Difficulty
                </span>

                <span className="text-purple-400 font-semibold">
                  {project.difficulty}
                </span>

              </div>

              {/* Duration */}
              <div className="flex justify-between mt-2 text-sm">

                <span className="text-gray-400">
                  Duration
                </span>

                <span className="text-blue-400">
                  {project.duration}
                </span>

              </div>

              {/* Skills */}
              <div className="mt-5">

                <h3 className="text-sm font-semibold text-gray-300">
                  Skills Required
                </h3>

                <div className="flex flex-wrap gap-2 mt-3">

                  {project.skills.map((skill) => (

                    <span
                      key={skill}
                      className="
                        bg-purple-600/20
                        text-purple-300
                        px-3
                        py-1
                        rounded-full
                        text-xs
                      "
                    >
                      {skill}
                    </span>

                  ))}

                </div>

              </div>

              <button
                onClick={() => {
                  alert(
                    `Great choice! 🚀 Start building: ${project.title}`
                  );
                }}
                className="
                  w-full
                  mt-6
                  bg-green-600
                  hover:bg-green-700
                  py-3
                  rounded-lg
                  font-bold
                  transition
                "
              >
                🚀 Start Project
              </button>

            </div>

          ))}

        </div>

        {/* Back */}
        <div className="text-center mt-10">

          <button
            onClick={() => navigate("/dashboard")}
            className="bg-slate-800 hover:bg-slate-700 px-7 py-3 rounded-lg font-semibold"
          >
            ← Back to Dashboard
          </button>

        </div>

      </main>

    </div>
  );
}

export default Projects;