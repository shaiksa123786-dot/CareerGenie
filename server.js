import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import OpenAI from "openai";

dotenv.config();

const app = express();

const PORT = 5000;

app.use(cors());
app.use(express.json());


// ==========================================
// GROQ AI CLIENT
// ==========================================

const groq = new OpenAI({
  apiKey: process.env.GROQ_API_KEY,
  baseURL: "https://api.groq.com/openai/v1",
});


// ==========================================
// TEST ROUTE
// ==========================================

app.get("/", (req, res) => {
  res.json({
    message: "CareerGenie AI Backend is running with Groq 🚀",
  });
});


// ==========================================
// CAREER RECOMMENDATION API
// ==========================================

app.post(
  "/api/career-recommendation",
  async (req, res) => {

    try {

      const {
        education,
        skills,
        interests,
      } = req.body;


      // -----------------------------
      // Validate input
      // -----------------------------

      if (
        !education ||
        !skills ||
        !interests
      ) {

        return res.status(400).json({
          error:
            "Education, skills, and interests are required.",
        });

      }


      console.log(
        "Generating CareerGenie recommendation..."
      );


      // -----------------------------
      // CareerGenie AI Prompt
      // -----------------------------

      const prompt = `

You are CareerGenie AI, an intelligent
personalized career advisor for students.

Analyze the student's education,
skills, and interests.

STUDENT EDUCATION:
${education}

STUDENT SKILLS:
${skills.join(", ")}

STUDENT INTERESTS:
${interests.join(", ")}


Your goal is to recommend the most
suitable career paths for this student.

The recommendations must be personalized
based on the student's actual profile.

Return ONLY valid JSON.

Do not use Markdown.
Do not use code blocks.
Do not add any explanation outside JSON.

Use EXACTLY this structure:

{
  "topCareer": {
    "title": "",
    "matchScore": 0,
    "reason": ""
  },

  "alternativeCareers": [
    {
      "title": "",
      "matchScore": 0,
      "reason": ""
    },
    {
      "title": "",
      "matchScore": 0,
      "reason": ""
    }
  ],

  "skillGaps": [
    "",
    "",
    "",
    ""
  ],

  "roadmap": [
    {
      "step": 1,
      "title": "",
      "description": ""
    },
    {
      "step": 2,
      "title": "",
      "description": ""
    },
    {
      "step": 3,
      "title": "",
      "description": ""
    },
    {
      "step": 4,
      "title": "",
      "description": ""
    },
    {
      "step": 5,
      "title": "",
      "description": ""
    }
  ],

  "projects": [
    {
      "title": "",
      "description": ""
    },
    {
      "title": "",
      "description": ""
    },
    {
      "title": "",
      "description": ""
    }
  ],

  "jobRoles": [
    "",
    "",
    "",
    ""
  ]
}


IMPORTANT RULES:

1. matchScore must be a number
between 0 and 100.

2. The top career must be strongly
related to the student's skills
and interests.

3. Alternative careers should also
be realistic career options.

4. Skill gaps should contain skills
the student needs to learn.

5. The roadmap should provide a
clear step-by-step path.

6. Projects should be suitable for
a student portfolio.

7. Job roles should be related to
the recommended career.

8. Give practical and realistic
recommendations.

Return ONLY valid JSON.
`;


      // -----------------------------
      // Call Groq
      // -----------------------------

      const completion =
        await groq.chat.completions.create({

          model:
            "llama-3.3-70b-versatile",

          messages: [

            {
              role: "system",
              content:
                "You are CareerGenie AI, an expert personalized career advisor.",
            },

            {
              role: "user",
              content: prompt,
            },

          ],

          temperature: 0.3,

          max_tokens: 4000,

        });


      // -----------------------------
      // Get AI response
      // -----------------------------

      let text =
        completion.choices[0]
          ?.message
          ?.content
          ?.trim();


      console.log(
        "Groq Response:",
        text
      );


      if (!text) {

        return res.status(500).json({

          error:
            "Groq returned an empty response.",

        });

      }


      // -----------------------------
      // Clean JSON response
      // -----------------------------

      text = text
        .replace(/```json/gi, "")
        .replace(/```/g, "")
        .trim();


      // -----------------------------
      // Parse JSON
      // -----------------------------

      let recommendation;

      try {

        recommendation =
          JSON.parse(text);

      } catch (parseError) {

        console.error(
          "JSON Parse Error:",
          parseError
        );

        console.log(
          "Raw Groq Response:",
          text
        );

        return res.status(500).json({

          error:
            "Groq returned an invalid JSON response.",

          raw:
            text,

        });

      }


      // -----------------------------
      // Send response to React
      // -----------------------------

      res.json(
        recommendation
      );


    } catch (error) {

      console.error(
        "Groq API Error:",
        error
      );


      res.status(500).json({

        error:
          error.message ||
          "Failed to generate AI career recommendation.",

      });

    }

  }
);


// ==========================================
// START SERVER
// ==========================================

app.listen(
  PORT,
  () => {

    console.log(
      `CareerGenie AI Backend running on http://localhost:${PORT}`
    );

    console.log(
      "AI Provider: Groq"
    );

  }
);