import { useState } from "react";

function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState([
    {
      sender: "bot",
      text: "Hi! 👋 I'm CareerGenie AI. Ask me about careers, skills, learning, projects, jobs, or government exams.",
    },
  ]);

  const getResponse = (question) => {
    const text = question.toLowerCase();

    if (text.includes("career")) {
      return "🎯 CareerGenie can help you discover career paths based on your skills and interests. You can also visit Career Recommendations for your personalized results.";
    }

    if (
      text.includes("learn") ||
      text.includes("roadmap")
    ) {
      return "📚 Start with the fundamentals, learn the required skills, practice regularly, and build real-world projects. Check your Recommended Learning section for your personalized learning path.";
    }

    if (text.includes("project")) {
      return "🚀 You can find personalized project ideas in the Project Suggestions section of your Dashboard.";
    }

    if (
      text.includes("skill") ||
      text.includes("skills")
    ) {
      return "💡 Focus on technical skills related to your target career along with communication, problem-solving, teamwork, and project-building skills.";
    }

    if (
      text.includes("government") ||
      text.includes("govt") ||
      text.includes("exam")
    ) {
      return "🏛️ You can explore government career opportunities through exams such as UPSC, SSC, Banking, Railway, and State PSC. Your preparation should match the specific exam syllabus.";
    }

    if (
      text.includes("interview") ||
      text.includes("job")
    ) {
      return "💼 Prepare technical concepts, coding problems, aptitude, communication, behavioral questions, and be ready to explain your projects.";
    }

    if (
      text.includes("hello") ||
      text.includes("hi") ||
      text.includes("hey")
    ) {
      return "Hello! 👋 How can I help you with your career journey?";
    }

    return "🤖 I can help you with careers, skills, learning roadmaps, projects, government exams, jobs, and interviews. Ask me something!";
  };

  const sendMessage = () => {
    if (!input.trim()) return;

    const userText = input.trim();

    setMessages((previous) => [
      ...previous,
      {
        sender: "user",
        text: userText,
      },
      {
        sender: "bot",
        text: getResponse(userText),
      },
    ]);

    setInput("");
  };

  return (
    <>
      {/* Floating Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed
            bottom-6
            right-6
            z-50
            w-16
            h-16
            rounded-full
            bg-purple-600
            hover:bg-purple-700
            text-3xl
            shadow-2xl
            flex
            items-center
            justify-center
            transition
            hover:scale-110
          "
          title="Chat with CareerGenie AI"
        >
          🤖
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <div
          className="
            fixed
            bottom-6
            right-6
            z-50
            w-[350px]
            max-w-[calc(100vw-30px)]
            bg-slate-900
            border
            border-purple-500/30
            rounded-2xl
            shadow-2xl
            overflow-hidden
          "
        >

          {/* Header */}
          <div className="bg-purple-600 px-5 py-4 flex justify-between items-center">

            <div>
              <h2 className="font-bold">
                🤖 CareerGenie AI
              </h2>

              <p className="text-xs text-purple-100">
                Your AI Career Companion
              </p>
            </div>

            <button
              onClick={() => setIsOpen(false)}
              className="text-xl hover:text-gray-300"
            >
              ✕
            </button>

          </div>

          {/* Messages */}
          <div className="h-80 overflow-y-auto p-4 space-y-3">

            {messages.map((message, index) => (

              <div
                key={index}
                className={`flex ${
                  message.sender === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >

                <div
                  className={`max-w-[85%] px-4 py-3 rounded-xl text-sm ${
                    message.sender === "user"
                      ? "bg-purple-600"
                      : "bg-slate-800 text-gray-300"
                  }`}
                >
                  {message.text}
                </div>

              </div>

            ))}

          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-3">

            <div className="flex gap-2">

              <input
                value={input}
                onChange={(event) =>
                  setInput(event.target.value)
                }
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    sendMessage();
                  }
                }}
                placeholder="Ask CareerGenie..."
                className="
                  flex-1
                  bg-slate-800
                  border
                  border-white/10
                  rounded-lg
                  px-3
                  py-2
                  text-sm
                  text-white
                  outline-none
                  focus:border-purple-500
                "
              />

              <button
                onClick={sendMessage}
                className="
                  bg-purple-600
                  hover:bg-purple-700
                  px-4
                  rounded-lg
                  font-semibold
                "
              >
                ➤
              </button>

            </div>

          </div>

        </div>
      )}
    </>
  );
}

export default FloatingChatbot;