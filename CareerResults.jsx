import { useLocation, useNavigate } from "react-router-dom";

function CareerResults() {
  const location = useLocation();
  const navigate = useNavigate();

  const profileId = location.state?.profileId;

  return (
    <div className="min-h-screen bg-slate-950 text-white p-10">

      <h1 className="text-4xl font-bold text-purple-400">
        🎯 Career Recommendations
      </h1>

      <p className="text-gray-400 mt-4">
        CareerGenie is analyzing your skills and interests...
      </p>

      <p className="mt-4">
        Profile ID: {profileId || "Not found"}
      </p>

      <button
        onClick={() => navigate("/interest")}
        className="mt-8 bg-purple-600 hover:bg-purple-700 px-6 py-3 rounded-lg"
      >
        Back
      </button>

    </div>
  );
}

export default CareerResults;