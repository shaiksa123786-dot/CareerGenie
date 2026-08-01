import { useState } from "react";
import { useNavigate } from "react-router-dom";

function SelectLevel() {
  const navigate = useNavigate();

  const [selectedClass, setSelectedClass] = useState("");

  // ==========================================
  // EDUCATION / CAREER PREPARATION OPTIONS
  // ==========================================

  const educationOptions = [
    {
      title: "Class 5–7",
      description:
        "Explore your interests, discover your strengths, and build basic skills.",
      icon: "📚",
    },

    {
      title: "Class 8–10",
      description:
        "Build important skills and explore different future career options.",
      icon: "🎓",
    },

    {
      title: "Intermediate / 11–12",
      description:
        "Explore your interests and prepare for higher education and career paths.",
      icon: "📖",
    },

    {
      title: "Diploma",
      description:
        "Develop technical and practical skills for industry-focused careers.",
      icon: "🛠️",
    },

    {
      title: "B.Tech / Engineering",
      description:
        "Explore engineering, technology, software, AI, data, and other technical careers.",
      icon: "💻",
    },

    {
      title: "MBBS / Medical",
      description:
        "Explore medicine, healthcare, medical research, and healthcare-related careers.",
      icon: "🩺",
    },

    {
      title: "Degree / Undergraduate",
      description:
        "Discover career opportunities based on your degree, skills, and interests.",
      icon: "🎓",
    },

    {
      title: "Law / LLB",
      description:
        "Explore legal careers, law practice, judiciary, and other law-related opportunities.",
      icon: "⚖️",
    },

    {
      title: "UPSC / Civil Services Preparation",
      description:
        "Prepare for IAS, IPS, IFS, and other central and state civil service careers.",
      icon: "🏛️",
    },

    {
      title: "Police / Defence",
      description:
        "Explore police, defence, armed forces, and other uniformed service careers.",
      icon: "🛡️",
    },

    {
      title: "Other",
      description:
        "Choose this option if your education or career preparation path is not listed.",
      icon: "✨",
    },
  ];

  // ==========================================
  // CONTINUE TO SKILLS
  // ==========================================

  const handleContinue = () => {
    if (!selectedClass) {
      alert("Please select your education level.");
      return;
    }

    navigate("/skills", {
      state: {
        selectedClass: selectedClass,
      },
    });
  };

  // ==========================================
  // UI
  // ==========================================

  return (
    <div className="min-h-screen bg-slate-950 text-white">

      {/* ======================================
          NAVBAR
      ====================================== */}

      <nav className="border-b border-white/10 px-6 py-5">

        <div className="max-w-6xl mx-auto">

          <h1 className="text-2xl font-bold text-purple-400">
            🤖 CareerGenie AI
          </h1>

          <p className="text-xs text-gray-400 mt-1">
            Discover your potential. Build your future.
          </p>

        </div>

      </nav>


      {/* ======================================
          MAIN CONTENT
      ====================================== */}

      <main className="max-w-6xl mx-auto px-6 py-10">

        {/* ====================================
            HEADER
        ==================================== */}

        <div className="text-center mb-10">

          <p className="text-purple-400 font-semibold tracking-wide">
            STEP 1 OF 3
          </p>

          <h1 className="
            text-3xl
            md:text-5xl
            font-bold
            mt-3
          ">
            What is your current education level?
          </h1>

          <p className="
            text-gray-400
            mt-4
            max-w-2xl
            mx-auto
            leading-relaxed
          ">
            Select the option that best describes your current education
            or career preparation path. CareerGenie AI will use this
            information to suggest relevant skills, interests, and career
            opportunities.
          </p>

        </div>


        {/* ====================================
            EDUCATION OPTIONS
        ==================================== */}

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-5
        ">

          {educationOptions.map((option) => {

            const isSelected =
              selectedClass === option.title;

            return (

              <button
                key={option.title}
                type="button"
                onClick={() =>
                  setSelectedClass(option.title)
                }
                className={`
                  text-left
                  p-6
                  rounded-2xl
                  border
                  transition-all
                  duration-300
                  hover:-translate-y-1
                  focus:outline-none
                  ${
                    isSelected
                      ? "bg-purple-600/20 border-purple-500 shadow-lg shadow-purple-500/10"
                      : "bg-slate-900 border-white/10 hover:border-purple-500/50"
                  }
                `}
              >

                {/* Icon + Selected Check */}

                <div className="
                  flex
                  items-center
                  justify-between
                ">

                  <div className="text-4xl">
                    {option.icon}
                  </div>

                  {isSelected && (

                    <div className="
                      w-8
                      h-8
                      rounded-full
                      bg-purple-600
                      flex
                      items-center
                      justify-center
                      text-white
                      font-bold
                    ">
                      ✓
                    </div>

                  )}

                </div>


                {/* Title */}

                <h2 className="
                  text-xl
                  font-bold
                  mt-5
                ">
                  {option.title}
                </h2>


                {/* Description */}

                <p className="
                  text-gray-400
                  text-sm
                  mt-2
                  leading-relaxed
                ">
                  {option.description}
                </p>


                {/* Selection Status */}

                {isSelected && (

                  <div className="
                    mt-5
                    text-sm
                    text-purple-300
                    font-semibold
                  ">
                    ✓ Selected
                  </div>

                )}

              </button>

            );

          })}

        </div>


        {/* ====================================
            SELECTED EDUCATION DISPLAY
        ==================================== */}

        {selectedClass && (

          <div className="
            mt-8
            bg-purple-600/10
            border
            border-purple-500/30
            rounded-2xl
            p-5
            text-center
          ">

            <p className="
              text-gray-400
              text-sm
            ">
              Your selected education level
            </p>

            <p className="
              text-purple-300
              font-bold
              text-xl
              mt-2
            ">
              {selectedClass}
            </p>

          </div>

        )}


        {/* ====================================
            NAVIGATION BUTTONS
        ==================================== */}

        <div className="
          flex
          flex-col-reverse
          sm:flex-row
          justify-between
          gap-4
          mt-10
        ">

          {/* BACK BUTTON */}

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            className="
              bg-slate-800
              hover:bg-slate-700
              border
              border-white/10
              px-6
              py-3
              rounded-lg
              font-semibold
              transition
            "
          >
            ← Back
          </button>


          {/* CONTINUE BUTTON */}

          <button
            type="button"
            onClick={handleContinue}
            disabled={!selectedClass}
            className="
              bg-purple-600
              hover:bg-purple-700
              disabled:opacity-40
              disabled:cursor-not-allowed
              px-8
              py-3
              rounded-lg
              font-bold
              transition
            "
          >
            Continue to Skills →
          </button>

        </div>

      </main>


      {/* ======================================
          FOOTER
      ====================================== */}

      <footer className="
        text-center
        py-8
        text-gray-500
        text-sm
      ">

        <p>
          ✨ CareerGenie AI — Your Personalized Career Companion
        </p>

      </footer>

    </div>
  );
}

export default SelectLevel;