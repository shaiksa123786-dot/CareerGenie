// src/utils/careerEngine.js

import { careerData } from "./careerData.js";

/**
 * =========================================================
 * NORMALIZE VALUE
 * Converts text into a consistent format for matching.
 * Example:
 * "B.Tech / Engineering" -> "b.tech / engineering"
 * =========================================================
 */
function normalize(value) {
  return String(value || "")
    .trim()
    .toLowerCase();
}

/**
 * =========================================================
 * NORMALIZE ARRAY
 * Makes sure the value is always an array.
 * =========================================================
 */
function normalizeArray(value) {
  if (!Array.isArray(value)) {
    return [];
  }

  return value
    .map(normalize)
    .filter(Boolean);
}

/**
 * =========================================================
 * CHECK CLASS ELIGIBILITY
 *
 * A career will only be recommended if it belongs
 * to the student's selected education/class level.
 *
 * Example:
 *
 * Class 5-7
 *    -> Young Coder
 *    -> Creative Artist
 *
 * B.Tech / Engineering
 *    -> AI / ML Engineer
 *    -> Full Stack Developer
 *
 * =========================================================
 */
function isCareerEligible(career, selectedClass) {
  const education = normalize(selectedClass);

  // If no class is selected, don't filter by class.
  // This prevents the app from breaking if class is missing.
  if (!education) {
    return true;
  }

  // Get eligible classes from career data
  const eligibleClasses = Array.isArray(career.eligibleClasses)
    ? career.eligibleClasses.map(normalize)
    : [];

  // If career has no eligibleClasses,
  // allow it as a fallback.
  if (eligibleClasses.length === 0) {
    return true;
  }

  return eligibleClasses.includes(education);
}

/**
 * =========================================================
 * CHECK SKILL MATCH
 *
 * Matches:
 * User Skills
 *     ↓
 * Career Keywords
 *     OR
 * Career Skills To Learn
 *
 * Example:
 * User has "Python"
 * Career keywords has "python"
 *     -> Match
 * =========================================================
 */
function getMatchedSkills(
  selectedSkills,
  career
) {
  const careerKeywords = normalizeArray(
    career.keywords
  );

  const careerSkillsToLearn = normalizeArray(
    career.skillsToLearn
  );

  return selectedSkills.filter((skill) => {
    return (
      careerKeywords.includes(skill) ||
      careerSkillsToLearn.includes(skill)
    );
  });
}

/**
 * =========================================================
 * CHECK INTEREST MATCH
 * =========================================================
 */
function getMatchedInterests(
  selectedInterests,
  career
) {
  const careerInterests = normalizeArray(
    career.interests
  );

  return selectedInterests.filter((interest) => {
    return careerInterests.includes(interest);
  });
}

/**
 * =========================================================
 * GET SKILL GAPS
 *
 * Finds skills required for a career that the user
 * has not selected yet.
 * =========================================================
 */
function getSkillGaps(
  selectedSkills,
  career
) {
  const userSkills = new Set(
    selectedSkills
  );

  return (career.skillsToLearn || []).filter(
    (skill) => {
      return !userSkills.has(
        normalize(skill)
      );
    }
  );
}

/**
 * =========================================================
 * CALCULATE CAREER SCORE
 *
 * Scoring:
 *
 * Skill Match      = 15 points
 * Interest Match   = 20 points
 *
 * Class eligibility is handled BEFORE scoring.
 *
 * Maximum score = 100
 *
 * =========================================================
 */
function calculateScore(
  matchedSkills,
  matchedInterests
) {
  let score = 0;

  // Skills
  score +=
    matchedSkills.length * 15;

  // Interests
  score +=
    matchedInterests.length * 20;

  // Maximum score
  return Math.min(
    score,
    100
  );
}

/**
 * =========================================================
 * GENERATE CAREER RECOMMENDATIONS
 *
 * Inputs:
 *
 * selectedSkills
 * selectedInterests
 * selectedClass
 *
 * Returns:
 *
 * {
 *   topCareer,
 *   topCareers
 * }
 * =========================================================
 */
export function generateCareerRecommendations(
  selectedSkills = [],
  selectedInterests = [],
  selectedClass = ""
) {

  // =======================================================
  // NORMALIZE USER DATA
  // =======================================================

  const skills =
    normalizeArray(
      selectedSkills
    );

  const interests =
    normalizeArray(
      selectedInterests
    );

  const education =
    normalize(
      selectedClass
    );


  console.log(
    "Career Recommendation Input:",
    {
      selectedClass,
      skills,
      interests,
    }
  );


  // =======================================================
  // FILTER CAREERS BY CLASS
  //
  // THIS IS THE MAIN FIX
  //
  // Only careers belonging to the selected class
  // will be considered.
  // =======================================================

  const eligibleCareers =
    careerData.filter(
      (career) =>
        isCareerEligible(
          career,
          selectedClass
        )
    );


  console.log(
    "Selected Class:",
    selectedClass
  );

  console.log(
    "Eligible Careers:",
    eligibleCareers.map(
      (career) =>
        career.title
    )
  );


  // =======================================================
  // CALCULATE SCORE
  // =======================================================

  const scoredCareers =
    eligibleCareers.map(
      (career) => {

        // -----------------------------------------------
        // MATCH SKILLS
        // -----------------------------------------------

        const matchedSkills =
          getMatchedSkills(
            skills,
            career
          );


        // -----------------------------------------------
        // MATCH INTERESTS
        // -----------------------------------------------

        const matchedInterests =
          getMatchedInterests(
            interests,
            career
          );


        // -----------------------------------------------
        // CALCULATE SCORE
        // -----------------------------------------------

        let score =
          calculateScore(
            matchedSkills,
            matchedInterests
          );


        // =================================================
        // ADD SMALL BONUS FOR STRONG MATCHES
        // =================================================

        // If user has both skill and interest matches,
        // give a small bonus.
        if (
          matchedSkills.length > 0 &&
          matchedInterests.length > 0
        ) {
          score += 5;
        }


        // If user has both multiple skills and interests,
        // give another small bonus.
        if (
          matchedSkills.length >= 2 &&
          matchedInterests.length >= 2
        ) {
          score += 5;
        }


        // Maximum 100
        score =
          Math.min(
            score,
            100
          );


        // -----------------------------------------------
        // FIND SKILL GAPS
        // -----------------------------------------------

        const skillGaps =
          getSkillGaps(
            skills,
            career
          );


        // -----------------------------------------------
        // RETURN CAREER WITH PERSONALIZED DATA
        // -----------------------------------------------

        return {
          ...career,

          matchScore:
            score,

          matchedSkills,

          matchedInterests,

          skillGaps,

          selectedClass:
            selectedClass,
        };
      }
    );


  // =======================================================
  // SORT CAREERS
  //
  // Highest match score first
  // =======================================================

  scoredCareers.sort(
    (a, b) => {

      // First compare match score
      if (
        b.matchScore !==
        a.matchScore
      ) {
        return (
          b.matchScore -
          a.matchScore
        );
      }

      // If scores are equal,
      // prefer careers with more interest matches
      if (
        b.matchedInterests.length !==
        a.matchedInterests.length
      ) {
        return (
          b.matchedInterests.length -
          a.matchedInterests.length
        );
      }

      // If still equal,
      // prefer careers with more skill matches
      return (
        b.matchedSkills.length -
        a.matchedSkills.length
      );
    }
  );


  // =======================================================
  // IF NO CAREERS FOUND
  // =======================================================

  if (
    scoredCareers.length === 0
  ) {

    console.warn(
      "No eligible careers found for:",
      selectedClass
    );

    return {
      topCareer:
        null,

      topCareers:
        [],
    };
  }


  // =======================================================
  // GET TOP 3 CAREERS
  // =======================================================

  const topCareers =
    scoredCareers
      .slice(0, 3)
      .map(
        (career, index) => ({
          ...career,

          rank:
            index + 1,
        })
      );


  // =======================================================
  // RETURN RESULT
  // =======================================================

  console.log(
    "Final Career Recommendations:",
    topCareers
  );


  return {

    // Best career
    topCareer:
      topCareers[0] ||
      null,

    // Top 3 careers
    topCareers:
      topCareers,

  };
}