
import { useEffect, useMemo, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const COURSE_DATA = {
  python: {
    title: "Python Programming",
    instructor: "Apna College",
    lessons: [
      {
        id: 1,
        title: "Python Full Course - Introduction",
        videoId: "gfDE2a7MKjA",
        transcript:
          "Welcome to Python programming. In this lesson, you will learn what Python is, why Python is popular, and how it is used in software development, artificial intelligence, machine learning, data science, and web development."
      },
      {
        id: 2,
        title: "Python Variables and Data Types",
        videoId: "gfDE2a7MKjA",
        transcript:
          "In this lesson, we will learn about variables and data types in Python. Variables are used to store information in a program. Python supports important data types such as integers, floating-point numbers, strings, lists, tuples, dictionaries, and sets."
      },
      {
        id: 3,
        title: "Python Conditional Statements",
        videoId: "gfDE2a7MKjA",
        transcript:
          "Conditional statements allow a Python program to make decisions. In this lesson, we will learn how to use if, elif, and else statements to execute different blocks of code based on conditions."
      },
      {
        id: 4,
        title: "Python Loops",
        videoId: "gfDE2a7MKjA",
        transcript:
          "Loops are used when we want to execute a block of code repeatedly. In this lesson, we will learn about for loops, while loops, and how loops can make programs more efficient."
      },
      {
        id: 5,
        title: "Python Functions",
        videoId: "gfDE2a7MKjA",
        transcript:
          "Functions are reusable blocks of code that perform a specific task. In this lesson, we will learn how to define functions, pass arguments, return values, and organize Python programs using functions."
      }
    ]
  },

  web: {
    title: "Web Development",
    instructor: "Apna College",
    lessons: [
      {
        id: 1,
        title: "HTML Basics",
        videoId: "HcOc7P5BMi4",
        transcript:
          "HTML stands for HyperText Markup Language. It is used to create the structure of web pages. In this lesson, we learn about HTML elements, headings, paragraphs, links, images, lists, forms, and basic page structure."
      },
      {
        id: 2,
        title: "CSS Basics",
        videoId: "ESnrn1kAD4E",
        transcript:
          "CSS stands for Cascading Style Sheets. CSS is used to style and design web pages. We will learn about selectors, colors, fonts, spacing, borders, layouts, and responsive design."
      },
      {
        id: 3,
        title: "JavaScript Basics",
        videoId: "ER9SspLe4Hg",
        transcript:
          "JavaScript is a programming language used to make web pages interactive. In this lesson, we introduce variables, functions, conditions, events, and basic JavaScript programming concepts."
      }
    ]
  },

  javascript: {
    title: "JavaScript",
    instructor: "Apna College",
    lessons: [
      {
        id: 1,
        title: "JavaScript Introduction",
        videoId: "ER9SspLe4Hg",
        transcript:
          "JavaScript is one of the most important technologies used in modern web development. It allows developers to create interactive and dynamic websites."
      },
      {
        id: 2,
        title: "JavaScript Variables",
        videoId: "ER9SspLe4Hg",
        transcript:
          "Variables are used to store data in JavaScript. In this lesson, we learn about var, let, and const, along with different data types and basic variable operations."
      },
      {
        id: 3,
        title: "JavaScript Functions",
        videoId: "ER9SspLe4Hg",
        transcript:
          "Functions allow us to create reusable blocks of JavaScript code. We will learn how to define functions, pass parameters, return values, and use functions in applications."
      }
    ]
  },

  dataScience: {
    title: "Data Science",
    instructor: "freeCodeCamp",
    lessons: [
      {
        id: 1,
        title: "Data Science Introduction",
        videoId: "ua-CiDNNj30",
        transcript:
          "Data Science combines programming, statistics, mathematics, and domain knowledge to extract useful insights from data. In this lesson, we explore the fundamentals of data science."
      },
      {
        id: 2,
        title: "Python for Data Science",
        videoId: "ua-CiDNNj30",
        transcript:
          "Python is widely used in data science because of its powerful libraries and simple syntax. We introduce tools such as NumPy, Pandas, Matplotlib, and other data science technologies."
      },
      {
        id: 3,
        title: "Data Analysis Basics",
        videoId: "ua-CiDNNj30",
        transcript:
          "Data analysis involves collecting, cleaning, exploring, and interpreting data. In this lesson, we learn how data can be transformed into meaningful information and insights."
      }
    ]
  },

  ai: {
    title: "Artificial Intelligence",
    instructor: "freeCodeCamp",
    lessons: [
      {
        id: 1,
        title: "Artificial Intelligence Introduction",
        videoId: "5q87K1WaoFI",
        transcript:
          "Artificial Intelligence is the field of computer science focused on creating systems that can perform tasks that normally require human intelligence. We explore AI applications and important concepts."
      },
      {
        id: 2,
        title: "Machine Learning Basics",
        videoId: "i_LwzRVP7bg",
        transcript:
          "Machine Learning is a branch of Artificial Intelligence where computers learn patterns from data. We introduce supervised learning, unsupervised learning, and the basic machine learning workflow."
      },
      {
        id: 3,
        title: "AI and Machine Learning Roadmap",
        videoId: "i_LwzRVP7bg",
        transcript:
          "A successful AI career requires knowledge of mathematics, programming, data structures, machine learning, deep learning, and practical projects. This lesson provides a roadmap for learning these skills."
      }
    ]
  },

  machineLearning: {
    title: "Machine Learning",
    instructor: "Krish Naik",
    lessons: [
      {
        id: 1,
        title: "Machine Learning Introduction",
        videoId: "GwIo3gDZCVQ",
        transcript:
          "Machine Learning enables computers to learn from data and make predictions or decisions. In this lesson, we explore the basic concepts and applications of machine learning."
      },
      {
        id: 2,
        title: "Machine Learning Basics",
        videoId: "GwIo3gDZCVQ",
        transcript:
          "Machine learning includes supervised, unsupervised, and reinforcement learning. We explore how data, features, models, training, and evaluation work together."
      },
      {
        id: 3,
        title: "Machine Learning Algorithms",
        videoId: "GwIo3gDZCVQ",
        transcript:
          "Machine learning algorithms help computers discover patterns and make predictions. We introduce algorithms such as linear regression, decision trees, clustering, and other common techniques."
      }
    ]
  },

  java: {
    title: "Java Programming",
    instructor: "Apna College",
    lessons: [
      {
        id: 1,
        title: "Java Introduction",
        videoId: "UmnCZ7-9yDY",
        transcript:
          "Java is a popular object-oriented programming language used to build applications, enterprise software, Android applications, and backend systems. This lesson introduces Java and its features."
      },
      {
        id: 2,
        title: "Java Variables and Data Types",
        videoId: "UmnCZ7-9yDY",
        transcript:
          "Java variables store data values. In this lesson, we learn about primitive data types, reference types, variable declarations, and basic operations."
      },
      {
        id: 3,
        title: "Java OOP Concepts",
        videoId: "UmnCZ7-9yDY",
        transcript:
          "Object-Oriented Programming is an important part of Java. We introduce classes, objects, inheritance, polymorphism, encapsulation, and abstraction."
      }
    ]
  },

  dsa: {
    title: "Data Structures and Algorithms",
    instructor: "Apna College",
    lessons: [
      {
        id: 1,
        title: "DSA Introduction",
        videoId: "VTLCoHnyACE",
        transcript:
          "Data Structures and Algorithms are fundamental skills for software developers. This lesson introduces data structures, algorithms, complexity, and problem-solving."
      },
      {
        id: 2,
        title: "Arrays and Strings",
        videoId: "VTLCoHnyACE",
        transcript:
          "Arrays and strings are common data structures. We learn how to store, access, search, and manipulate collections of data efficiently."
      },
      {
        id: 3,
        title: "Searching and Sorting",
        videoId: "VTLCoHnyACE",
        transcript:
          "Searching and sorting are essential algorithmic techniques. We introduce common approaches such as linear search, binary search, bubble sort, selection sort, and other methods."
      }
    ]
  },

  upsc: {
    title: "UPSC Civil Services Preparation",
    instructor: "UPSC Preparation",
    lessons: [
      {
        id: 1,
        title: "UPSC Preparation Strategy",
        videoId: "7I5QJrZz1YQ",
        transcript:
          "UPSC preparation requires consistency, planning, and a clear understanding of the examination pattern. This lesson introduces the stages of the examination and an effective preparation strategy."
      },
      {
        id: 2,
        title: "Indian Polity Preparation",
        videoId: "7I5QJrZz1YQ",
        transcript:
          "Indian Polity is an important part of UPSC preparation. Students should understand the Constitution, fundamental rights, Parliament, judiciary, executive, and important governance topics."
      },
      {
        id: 3,
        title: "General Studies Preparation",
        videoId: "7I5QJrZz1YQ",
        transcript:
          "General Studies covers multiple subjects including history, geography, economics, environment, science, technology, and current affairs. This lesson explains how to approach these subjects."
      }
    ]
  },

  law: {
    title: "Law Preparation",
    instructor: "Law Preparation",
    lessons: [
      {
        id: 1,
        title: "Introduction to Law",
        videoId: "dQw4w9WgXcQ",
        transcript:
          "Law is a system of rules created to regulate society and maintain justice. This lesson introduces the basic concepts of law and the role of legal professionals."
      },
      {
        id: 2,
        title: "Legal Reasoning",
        videoId: "dQw4w9WgXcQ",
        transcript:
          "Legal reasoning involves understanding principles, analyzing facts, and applying legal rules. This skill is important for law entrance examinations and legal studies."
      },
      {
        id: 3,
        title: "Law Entrance Preparation",
        videoId: "dQw4w9WgXcQ",
        transcript:
          "Law entrance examinations require preparation in areas such as legal reasoning, logical reasoning, English, general knowledge, and current affairs."
      }
    ]
  },

  mbbs: {
    title: "MBBS Preparation",
    instructor: "Medical Education",
    lessons: [
      {
        id: 1,
        title: "NEET and Medical Career Introduction",
        videoId: "dQw4w9WgXcQ",
        transcript:
          "A medical career begins with strong preparation in biology, physics, and chemistry. This lesson introduces the NEET pathway and the general journey toward medical education."
      },
      {
        id: 2,
        title: "Biology Preparation",
        videoId: "dQw4w9WgXcQ",
        transcript:
          "Biology is an important subject for medical entrance preparation. Students should build strong concepts in human physiology, genetics, ecology, cell biology, and other important topics."
      },
      {
        id: 3,
        title: "Medical Career Roadmap",
        videoId: "dQw4w9WgXcQ",
        transcript:
          "A medical career can include MBBS followed by specialization and higher education. This lesson provides an overview of the different stages of a medical career."
      }
    ]
  },

  police: {
    title: "Police Exam Preparation",
    instructor: "Government Exam Preparation",
    lessons: [
      {
        id: 1,
        title: "Police Exam Preparation Strategy",
        videoId: "dQw4w9WgXcQ",
        transcript:
          "Police examinations generally require preparation in general knowledge, reasoning, quantitative aptitude, language skills, and physical fitness. This lesson introduces a preparation strategy."
      },
      {
        id: 2,
        title: "General Knowledge Preparation",
        videoId: "dQw4w9WgXcQ",
        transcript:
          "General knowledge preparation includes current affairs, Indian history, geography, polity, economics, science, and important national events."
      },
      {
        id: 3,
        title: "Physical and Written Exam Preparation",
        videoId: "dQw4w9WgXcQ",
        transcript:
          "Police recruitment may include written examinations and physical tests. Candidates should prepare academically while maintaining a consistent physical fitness routine."
      }
    ]
  }
};

const CAREER_COURSE_MAP = {
  "software developer": "web",
  "web developer": "web",
  "frontend developer": "javascript",
  "backend developer": "python",
  "python developer": "python",
  "data scientist": "dataScience",
  "data analyst": "dataScience",
  "ai engineer": "ai",
  "artificial intelligence engineer": "ai",
  "machine learning engineer": "machineLearning",
  "ml engineer": "machineLearning",
  "java developer": "java",
  "software engineer": "dsa",
  "full stack developer": "web",
  "upsc officer": "upsc",
  "ias officer": "upsc",
  "civil services": "upsc",
  lawyer: "law",
  advocate: "law",
  doctor: "mbbs",
  mbbs: "mbbs",
  "police officer": "police"
};

function Learning() {
  const location = useLocation();
  const navigate = useNavigate();

  const locationState = location.state || {};

  const selectedCareerFromState = locationState.career;

  const selectedClass =
    locationState.selectedClass ||
    sessionStorage.getItem("selectedClass") ||
    "";

  let selectedCareer = selectedCareerFromState;

  if (!selectedCareer) {
    try {
      selectedCareer = JSON.parse(
        sessionStorage.getItem("selectedCareer") || "null"
      );
    } catch {
      selectedCareer = null;
    }
  }

  const careerTitle =
    typeof selectedCareer === "string"
      ? selectedCareer
      : selectedCareer?.title || "";

  const normalizedCareer = careerTitle.toLowerCase().trim();

  const courseKey =
    locationState.courseKey ||
    sessionStorage.getItem("learningCourse") ||
    CAREER_COURSE_MAP[normalizedCareer] ||
    "python";

  const course = COURSE_DATA[courseKey] || COURSE_DATA.python;
  const lessons = course.lessons;

  const progressStorageKey = `learningProgress_${courseKey}`;
  const completedStorageKey = `completedLessons_${courseKey}`;
  const [rating, setRating] = useState(0);
const [feedback, setFeedback] = useState("");
  const [currentLesson, setCurrentLesson] = useState(0);

  const [completedLessons, setCompletedLessons] = useState(() => {
    try {
      const saved = sessionStorage.getItem(completedStorageKey);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [videoProgress, setVideoProgress] = useState(0);
  const [isVideoComplete, setIsVideoComplete] = useState(false);

  const currentLessonData = lessons[currentLesson];

  const progressPercentage = useMemo(() => {
    if (lessons.length === 0) {
      return 0;
    }

    return Math.round(
      (completedLessons.length / lessons.length) * 100
    );
  }, [completedLessons, lessons.length]);

  useEffect(() => {
    try {
      sessionStorage.setItem(
        completedStorageKey,
        JSON.stringify(completedLessons)
      );

      sessionStorage.setItem(
        progressStorageKey,
        String(progressPercentage)
      );
    } catch (error) {
      console.error("Unable to save learning progress:", error);
    }
  }, [
    completedLessons,
    progressPercentage,
    completedStorageKey,
    progressStorageKey
  ]);

  useEffect(() => {
    const completed = completedLessons.includes(
      currentLessonData?.id
    );

    setIsVideoComplete(completed);
    setVideoProgress(completed ? 100 : 0);
  }, [currentLessonData, completedLessons]);

  const markLessonComplete = () => {
  if (!currentLessonData) return;

  if (!completedLessons.includes(currentLessonData.id)) {
    setCompletedLessons((previous) => [
      ...previous,
      currentLessonData.id,
    ]);
  }

  setIsVideoComplete(true);
  setVideoProgress(100);
};

  const handleNextLesson = () => {
    if (!isVideoComplete) {
      alert(
        "Please complete the current lesson before continuing."
      );
      return;
    }

    if (currentLesson < lessons.length - 1) {
      setCurrentLesson(currentLesson + 1);
      setVideoProgress(0);
      setIsVideoComplete(false);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const handlePreviousLesson = () => {
    if (currentLesson > 0) {
      const previousIndex = currentLesson - 1;

      setCurrentLesson(previousIndex);

      const previousCompleted = completedLessons.includes(
        lessons[previousIndex].id
      );

      setVideoProgress(previousCompleted ? 100 : 0);
      setIsVideoComplete(previousCompleted);

      window.scrollTo({
        top: 0,
        behavior: "smooth"
      });
    }
  };

  const selectLesson = (index) => {
    if (index === currentLesson) {
      return;
    }

    if (index === 0) {
      setCurrentLesson(0);
      return;
    }

    const previousLesson = lessons[index - 1];

    const previousCompleted = completedLessons.includes(
      previousLesson.id
    );

    if (!previousCompleted) {
      alert(
        "Complete the previous lesson to unlock this lesson."
      );
      return;
    }

    setCurrentLesson(index);
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    });
  };

  const handleCourseChange = (newCourseKey) => {
    sessionStorage.setItem(
      "learningCourse",
      newCourseKey
    );

    navigate("/learning", {
      state: {
        ...locationState,
        courseKey: newCourseKey
      },
      replace: true
    });
  };

  if (!currentLessonData) {
    return (
      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center px-6">
        <div className="text-center">
          <h1 className="text-3xl font-bold">
            No lessons available
          </h1>

          <button
            onClick={() => navigate("/dashboard")}
            className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 text-white">
      <header className="sticky top-0 z-40 bg-slate-950/95 backdrop-blur border-b border-white/10">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div>
              <p className="text-purple-400 font-semibold">
                🤖 CAREERGENIE AI
              </p>

              <h1 className="text-xl md:text-2xl font-bold">
                Personalized Learning
              </h1>
            </div>

            <button
              onClick={() => navigate("/dashboard")}
              className="bg-slate-800 hover:bg-slate-700 px-5 py-2 rounded-lg"
            >
              ← Dashboard
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-6 py-8">
        <section className="bg-gradient-to-r from-purple-900/40 to-blue-900/30 border border-purple-500/20 rounded-2xl p-6 md:p-8">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
            <div>
              <p className="text-purple-400 font-semibold">
                🎓 YOUR LEARNING PATH
              </p>

              <h2 className="text-3xl font-bold mt-2">
                {course.title}
              </h2>

              <p className="text-gray-400 mt-2">
                Instructor: {course.instructor}
              </p>

              {selectedClass && (
                <p className="text-gray-400 mt-1">
                  Education Level:{" "}
                  <span className="text-purple-300">
                    {selectedClass}
                  </span>
                </p>
              )}

              {careerTitle && (
                <p className="text-gray-400 mt-1">
                  Recommended for:{" "}
                  <span className="text-purple-300">
                    {careerTitle}
                  </span>
                </p>
              )}
            </div>

            <div className="min-w-[220px]">
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">
                  Course Progress
                </span>

                <span className="text-purple-400 font-bold">
                  {progressPercentage}%
                </span>
              </div>

              <div className="w-full h-3 bg-slate-800 rounded-full mt-2 overflow-hidden">
                <div
                  className="h-full bg-purple-500 rounded-full transition-all duration-500"
                  style={{
                    width: `${progressPercentage}%`
                  }}
                />
              </div>

              <p className="text-xs text-gray-500 mt-2">
                {completedLessons.length} of {lessons.length} lessons completed
              </p>
            </div>
          </div>
        </section>

        <section className="mt-8">
          <label className="text-gray-400 text-sm">
            Choose a learning path
          </label>

          <select
            value={courseKey}
            onChange={(event) =>
              handleCourseChange(event.target.value)
            }
            className="mt-2 w-full bg-slate-900 border border-white/10 rounded-lg px-4 py-3 text-white outline-none focus:border-purple-500"
          >
            {Object.entries(COURSE_DATA).map(
              ([key, value]) => (
                <option
                  key={key}
                  value={key}
                  className="bg-slate-900"
                >
                  {value.title}
                </option>
              )
            )}
          </select>
        </section>

        <div className="grid lg:grid-cols-3 gap-8 mt-8">
          <aside className="lg:col-span-1">
            <div className="bg-slate-900 border border-white/10 rounded-2xl p-5 sticky top-28">
              <h3 className="text-xl font-bold">
                📚 Course Lessons
              </h3>

              <p className="text-gray-400 text-sm mt-2">
                Complete lessons in order to unlock the next lesson.
              </p>

              <div className="space-y-3 mt-6">
                {lessons.map((lesson, index) => {
                  const completed =
                    completedLessons.includes(lesson.id);

                  const unlocked =
                    index === 0 ||
                    completedLessons.includes(
                      lessons[index - 1].id
                    );

                  const active =
                    index === currentLesson;

                  return (
                    <button
                      key={lesson.id}
                      disabled={!unlocked}
                      onClick={() => selectLesson(index)}
                      className={`w-full text-left p-4 rounded-xl border transition ${
                        active
                          ? "border-purple-500 bg-purple-600/20"
                          : completed
                          ? "border-green-500/30 bg-green-600/10"
                          : unlocked
                          ? "border-white/10 bg-slate-800 hover:border-purple-500/40"
                          : "border-white/5 bg-slate-800/50 opacity-50 cursor-not-allowed"
                      }`}
                    >
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 rounded-full bg-slate-700 flex items-center justify-center flex-shrink-0">
                          {completed
                            ? "✓"
                            : unlocked
                            ? index + 1
                            : "🔒"}
                        </div>

                        <div>
                          <p className="font-semibold text-sm">
                            Lesson {index + 1}
                          </p>

                          <p className="text-gray-400 text-xs mt-1">
                            {lesson.title}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>
          </aside>

          <section className="lg:col-span-2">
            <div className="bg-slate-900 border border-white/10 rounded-2xl overflow-hidden">
              <div className="p-6 border-b border-white/10">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-purple-400 font-semibold">
                      LESSON {currentLesson + 1} OF{" "}
                      {lessons.length}
                    </p>

                    <h2 className="text-2xl md:text-3xl font-bold mt-2">
                      {currentLessonData.title}
                    </h2>
                  </div>

                  {isVideoComplete && (
                    <span className="bg-green-600/20 text-green-300 px-4 py-2 rounded-full text-sm">
                      ✓ Completed
                    </span>
                  )}
                </div>
              </div>

              <div className="relative aspect-video bg-black">
                <iframe
                  key={`${courseKey}-${currentLessonData.id}`}
                  src={`https://www.youtube-nocookie.com/embed/${currentLessonData.videoId}?rel=0&modestbranding=1&controls=0&disablekb=1`}
                  title={currentLessonData.title}
                  className="absolute inset-0 w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />

                {!isVideoComplete && (
                  <div className="absolute top-4 left-4 right-4 bg-black/80 px-4 py-3 rounded-lg text-sm">
                    🔒 Complete this lesson before unlocking the next lesson.
                  </div>
                )}
              </div>

              <div className="p-6">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-400">
                    Lesson Progress
                  </span>

                  <span className="text-purple-400 font-bold">
                    {videoProgress}%
                  </span>
                </div>

                <div className="w-full bg-slate-800 h-3 rounded-full mt-2 overflow-hidden">
                  <div
                    className="bg-purple-500 h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${videoProgress}%`
                    }}
                  />
                </div>

                <p className="text-gray-500 text-sm mt-3">
                  Watch the lesson and use the completion button when you have finished studying the lesson.
                </p>

                <div className="flex flex-col sm:flex-row gap-3 mt-6">
                  <button
                    onClick={handlePreviousLesson}
                    disabled={currentLesson === 0}
                    className="flex-1 bg-slate-800 hover:bg-slate-700 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-3 rounded-lg font-semibold"
                  >
                    ← Previous
                  </button>

                  {!isVideoComplete && (
                    <button
                      onClick={markLessonComplete}
                      className="flex-1 bg-green-600 hover:bg-green-700 px-5 py-3 rounded-lg font-semibold"
                    >
                      ✓ Mark Lesson Complete
                    </button>
                  )}

                  <button
                    onClick={handleNextLesson}
                    disabled={
                      !isVideoComplete ||
                      currentLesson === lessons.length - 1
                    }
                    className="flex-1 bg-purple-600 hover:bg-purple-700 disabled:opacity-40 disabled:cursor-not-allowed px-5 py-3 rounded-lg font-semibold"
                  >
                    {currentLesson === lessons.length - 1
                      ? "Course Completed 🎉"
                      : "Next Lesson →"}
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-6 bg-slate-900 border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between gap-4">
                <div>
                  <p className="text-purple-400 font-semibold text-sm">
                    📜 LESSON TRANSCRIPT
                  </p>

                  <h3 className="text-xl font-bold mt-1">
                    Read Along With The Lesson
                  </h3>
                </div>

                <span className="bg-purple-600/20 text-purple-300 px-3 py-1 rounded-full text-xs">
                  📖 Transcript
                </span>
              </div>

              <div className="mt-5 bg-slate-950 border border-white/5 rounded-xl p-5 max-h-72 overflow-y-auto">
                <p className="text-gray-300 leading-8 whitespace-pre-line">
                  {currentLessonData.transcript ||
                    "Transcript for this lesson is not available yet."}
                </p>
              </div>
            </div>

            <div className="grid md:grid-cols-3 gap-4 mt-6">
              <div className="bg-slate-900 border border-white/10 rounded-xl p-5">
                <div className="text-3xl">📚</div>

                <p className="font-semibold mt-3">
                  Total Lessons
                </p>

                <p className="text-purple-400 text-2xl font-bold mt-1">
                  {lessons.length}
                </p>
              </div>

              <div className="bg-slate-900 border border-white/10 rounded-xl p-5">
                <div className="text-3xl">✅</div>

                <p className="font-semibold mt-3">
                  Completed
                </p>

                <p className="text-green-400 text-2xl font-bold mt-1">
                  {completedLessons.length}
                </p>
              </div>

              <div className="bg-slate-900 border border-white/10 rounded-xl p-5">
                <div className="text-3xl">🚀</div>

                <p className="font-semibold mt-3">
                  Remaining
                </p>

                <p className="text-orange-400 text-2xl font-bold mt-1">
                  {Math.max(
                    lessons.length - completedLessons.length,
                    0
                  )}
                </p>
              </div>
            </div>
          </section>
        </div>

        {progressPercentage === 100 && (
          <section className="mt-8 bg-gradient-to-r from-green-900/30 to-purple-900/30 border border-green-500/30 rounded-2xl p-8 text-center">
            <div className="text-6xl">🎉</div>

            <h2 className="text-3xl font-bold mt-4">
              Course Completed!
            </h2>

            <p className="text-gray-400 mt-3">
              Amazing work! You have completed the entire{" "}
              {course.title} learning path.
            </p>

            <button
              onClick={() =>
                navigate("/career-recommendation")
              }
              className="mt-6 bg-purple-600 hover:bg-purple-700 px-7 py-3 rounded-lg font-semibold"
            >
              ← Back to Career Recommendation
            </button>
          </section>
        )}
        {/* ================= FEEDBACK SECTION ================= */}

<section className="mt-10 bg-slate-900 border border-purple-500/20 rounded-2xl p-8">
  <h2 className="text-2xl font-bold mb-2">
    ⭐ Course Feedback
  </h2>

  <p className="text-gray-400 mb-6">
    Tell us what you think about this course.
  </p>

  {/* Rating */}
  <div className="mb-6">
    <p className="font-semibold mb-3">Rate this Course</p>

    <div className="flex gap-3 text-4xl cursor-pointer">
      {[1,2,3,4,5].map((star)=>(
        <span
          key={star}
          onClick={()=>setRating(star)}
          className={`transition ${
            star <= rating
              ? "text-yellow-400"
              : "text-gray-600"
          }`}
        >
          ★
        </span>
      ))}
    </div>
  </div>

  {/* Feedback */}
  <div>
    <p className="font-semibold mb-3">
      Your Feedback
    </p>

    <textarea
      rows={5}
      value={feedback}
      onChange={(e)=>setFeedback(e.target.value)}
      placeholder="Write your feedback here..."
      className="w-full bg-slate-800 border border-white/10 rounded-lg p-4 text-white outline-none focus:border-purple-500"
    />
  </div>

  <button
    onClick={()=>{
      alert("🎉 Thank you for your feedback!");
      setRating(0);
      setFeedback("");
    }}
    className="mt-6 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg font-semibold"
  >
    Submit Feedback
  </button>
</section>
      </main>
    </div>
  );
}

export default Learning;