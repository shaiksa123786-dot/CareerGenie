import { useState } from "react";
import { useNavigate } from "react-router-dom";

function FloatingAIChat() {
const [isOpen, setIsOpen] = useState(false);
const navigate = useNavigate();

return (
<>
{isOpen && ( <div className="fixed bottom-24 right-6 z-[9999] w-80 max-w-[calc(100vw-2rem)] bg-slate-900 border border-purple-500/30 rounded-2xl shadow-2xl shadow-purple-900/30 overflow-hidden"> <div className="bg-gradient-to-r from-purple-700 to-blue-700 p-4 flex items-center justify-between"> <div> <h3 className="font-bold text-white">
🤖 CareerGenie AI </h3> <p className="text-xs text-purple-100">
Your AI career companion </p> </div>

        <button
          onClick={() => setIsOpen(false)}
          className="text-white text-xl hover:scale-110 transition"
        >
          ×
        </button>
      </div>

      <div className="p-5">
        <div className="bg-slate-800 rounded-xl p-4">
          <p className="text-gray-200 text-sm">
            Hi! 👋 I'm CareerGenie AI.
          </p>

          <p className="text-gray-400 text-sm mt-2">
            I can help you with career recommendations,
            skills, learning paths, projects, and career guidance.
          </p>
        </div>

        <button
          onClick={() => navigate("/chatbot")}
          className="w-full mt-4 bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-xl font-semibold transition"
        >
          💬 Start AI Chat
        </button>
      </div>
    </div>
  )}

  <button
    onClick={() => setIsOpen(!isOpen)}
    aria-label="Open CareerGenie AI Chat"
    className="fixed bottom-6 right-6 z-[9999] w-16 h-16 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 text-white shadow-xl shadow-purple-900/40 flex items-center justify-center text-3xl border-4 border-slate-950 hover:scale-110 transition-all duration-300 animate-bounce"
  >
    🤖
  </button>
</>

);
}

export default FloatingAIChat;
