
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Login from "./pages/Login";
import Signup from "./pages/Signup";
import SelectLevel from "./pages/SelectLevel";
import ClassSelection from "./pages/ClassSelection";
import SkillSelection from "./pages/SkillSelection";
import InterestSelection from "./pages/InterestSelection";
import Dashboard from "./pages/Dashboard";
import CareerRecommendation from "./pages/CareerRecommendation";
import Learning from "./pages/Learning";
import ProjectSuggestions from "./pages/ProjectSuggestions";

import ProtectedRoute from "./components/ProtectedRoute";
import FloatingAIChat from "./components/Floatingaichat";

function LandingPage() {
  return (
    <div className="min-h-screen bg-slate-950 text-white">

      <nav className="flex items-center justify-between px-8 py-5 border-b border-white/10">
        <div>
          <h1 className="text-2xl font-bold text-purple-400">
            🤖 CareerGenie AI
          </h1>

          <p className="text-xs text-gray-400">
            Discover. Learn. Grow. Achieve.
          </p>
        </div>

        <div className="hidden md:flex gap-8 text-sm text-gray-300">
          <a href="/" className="hover:text-purple-400 transition">
            Home
          </a>

          <a href="#features" className="hover:text-purple-400 transition">
            Roadmaps
          </a>

          <a href="#features" className="hover:text-purple-400 transition">
            Courses
          </a>

          <a href="/login" className="hover:text-purple-400 transition">
            AI Chat
          </a>

          <a href="#about" className="hover:text-purple-400 transition">
            About Us
          </a>
        </div>

        <a
          href="/login"
          className="bg-purple-600 hover:bg-purple-700 px-5 py-2 rounded-lg transition"
        >
          Login
        </a>
      </nav>

      <section className="px-8 py-20 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">

          <div>
            <p className="text-purple-400 font-semibold mb-4">
              ✨ AI-POWERED CAREER COMPANION
            </p>

            <h2 className="text-5xl md:text-6xl font-bold leading-tight">
              Discover Your
              <span className="text-purple-400"> Potential.</span>
              <br />
              Build Your Future.
            </h2>

            <p className="text-gray-400 text-lg mt-6 max-w-xl">
              CareerGenie AI helps students discover their strengths,
              develop skills, explore career paths, and build personalized
              roadmaps from school to their dream career.
            </p>

            <div className="border-l-4 border-purple-500 pl-5 mt-8">
              <p className="text-xl italic text-gray-200">
                "You don't tell CareerGenie who you should become.
                CareerGenie discovers your potential as you grow."
              </p>
            </div>

            <div className="flex gap-4 mt-8">
              <a
                href="/login"
                className="bg-purple-600 hover:bg-purple-700 px-7 py-3 rounded-lg font-semibold transition"
              >
                🚀 Get Started
              </a>

              <a
                href="#features"
                className="border border-gray-600 hover:border-purple-500 px-7 py-3 rounded-lg transition"
              >
                Explore More
              </a>
            </div>
          </div>

          <div className="relative">
            <div className="bg-gradient-to-br from-purple-900/40 to-blue-900/30 border border-purple-500/20 rounded-3xl p-10">

              <div className="text-center">
                <div className="text-8xl mb-6">
                  🤖
                </div>

                <h3 className="text-3xl font-bold">
                  Your AI Career Companion
                </h3>

                <p className="text-gray-400 mt-4">
                  Your journey from learning to achieving your dream career.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-8">

                <div className="bg-white/5 p-4 rounded-xl">
                  <div className="text-2xl">🧬</div>
                  <h4 className="font-semibold mt-2">
                    Career DNA
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Discover your hidden potential.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <div className="text-2xl">🗺️</div>
                  <h4 className="font-semibold mt-2">
                    AI Roadmaps
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Personalized paths for your goals.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <div className="text-2xl">🎥</div>
                  <h4 className="font-semibold mt-2">
                    Learn & Practice
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Videos and assignments.
                  </p>
                </div>

                <div className="bg-white/5 p-4 rounded-xl">
                  <div className="text-2xl">📊</div>
                  <h4 className="font-semibold mt-2">
                    Track Progress
                  </h4>
                  <p className="text-xs text-gray-400 mt-1">
                    Improve your skills continuously.
                  </p>
                </div>

              </div>
            </div>
          </div>

        </div>
      </section>

      <section
        id="features"
        className="px-8 py-16 bg-slate-900"
      >
        <div className="max-w-7xl mx-auto">

          <div className="text-center mb-12">
            <p className="text-purple-400 font-semibold">
              EVERYTHING YOU NEED
            </p>

            <h2 className="text-4xl font-bold mt-3">
              Your Complete Career Journey
            </h2>

            <p className="text-gray-400 mt-4">
              CareerGenie AI grows with you and adapts to your journey.
            </p>
          </div>

          <div className="grid md:grid-cols-4 gap-6">

            <Feature
              icon="🧠"
              title="Discover Your Potential"
              text="AI analyzes your skills, interests, and learning behavior."
            />

            <Feature
              icon="🗺️"
              title="Personalized Roadmap"
              text="Get a personalized roadmap based on your unique goals."
            />

            <Feature
              icon="🎓"
              title="Learn & Grow"
              text="Learn through videos, assignments, and practical activities."
            />

            <Feature
              icon="🏆"
              title="Track Your Progress"
              text="Monitor your skills, achievements, and career journey."
            />

          </div>
        </div>
      </section>

      <section className="px-8 py-20">
        <div className="max-w-6xl mx-auto text-center">

          <p className="text-purple-400 font-semibold">
            YOUR JOURNEY
          </p>

          <h2 className="text-4xl font-bold mt-3">
            From Class 5 to Your Dream Career
          </h2>

          <div className="grid md:grid-cols-6 gap-4 mt-12">

            {[
              ["📚", "Class 5–10"],
              ["🎯", "Discover"],
              ["🎓", "Higher Studies"],
              ["💻", "Build Skills"],
              ["🗺️", "Career Roadmap"],
              ["🚀", "Achieve Goals"],
            ].map(([icon, title]) => (
              <div
                key={title}
                className="bg-white/5 border border-white/10 rounded-xl p-5"
              >
                <div className="text-3xl">
                  {icon}
                </div>

                <p className="mt-3 font-semibold">
                  {title}
                </p>
              </div>
            ))}

          </div>
        </div>
      </section>

      <footer
        id="about"
        className="border-t border-white/10 px-8 py-8"
      >
        <div className="max-w-7xl mx-auto">

          <h3 className="text-xl font-bold text-purple-400">
            🤖 CareerGenie AI
          </h3>

          <p className="text-gray-500 text-sm mt-2">
            Discover. Learn. Grow. Achieve.
          </p>

          <p className="text-center text-gray-600 text-xs mt-8">
            © 2026 CareerGenie AI by GenAI Titans. All rights reserved.
          </p>

        </div>
      </footer>

    </div>
  );
}

function Feature({ icon, title, text }) {
  return (
    <div className="bg-slate-950 border border-white/10 rounded-2xl p-6 hover:border-purple-500 transition">

      <div className="text-4xl">
        {icon}
      </div>

      <h3 className="text-xl font-semibold mt-4">
        {title}
      </h3>

      <p className="text-gray-400 mt-3 text-sm">
        {text}
      </p>

    </div>
  );
}

function App() {
  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<LandingPage />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/signup"
          element={<Signup />}
        />

        <Route
          path="/select-level"
          element={
            <ProtectedRoute>
              <SelectLevel />
            </ProtectedRoute>
          }
        />

        <Route
          path="/class-selection"
          element={
            <ProtectedRoute>
              <ClassSelection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/skills"
          element={
            <ProtectedRoute>
              <SkillSelection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/interest"
          element={
            <ProtectedRoute>
              <InterestSelection />
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/career-recommendation"
          element={
            <ProtectedRoute>
              <CareerRecommendation />
            </ProtectedRoute>
          }
        />

        <Route
          path="/learning"
          element={
            <ProtectedRoute>
              <Learning />
            </ProtectedRoute>
          }
        />

        <Route
          path="/project-suggestions"
          element={
            <ProtectedRoute>
              <ProjectSuggestions />
            </ProtectedRoute>
          }
        />

        <Route
          path="*"
          element={<LandingPage />}
        />

      </Routes>

      <FloatingAIChat />

    </BrowserRouter>
  );
}

export default App;
