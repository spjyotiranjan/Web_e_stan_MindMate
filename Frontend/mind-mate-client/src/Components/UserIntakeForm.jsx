import React, { useContext, useState } from "react";
import MainBg from "../assets/mainbg.png";
import Navbar from "./ui/Navbar";
import axios from "axios";
import { LoginContext } from "../Context/LoginContext";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const UserIntakeForm = () => {
  const { currUser, setCurrUser } = useContext(LoginContext);
  const navigate = useNavigate()

  const [formData, setFormData] = useState({
    majorIssues: "",
    recentSymptoms: "",
    relationships: { family: "", friends: "", romantic: "" },
    career: {
      profession: "",
      stressLevel: "Moderate",
      jobSatisfaction: "Neutral",
    },
    triggers: "",
    copingMechanisms: "",
    supportSystem: { family: false, friends: false, therapist: false },
    medicalHistory: { pastDiagnoses: "", medications: "" },
    familyHistory: "",
    lifestyle: {
      sleepHours: 7,
      dietQuality: "Average",
      exerciseFrequency: "Occasionally",
      substanceUse: "None",
    },
    therapeuticGoals: "",
    age: "",
    gender: "Male",
    sex: "Male",
  });

  const handleChange = (e, field, nestedField) => {
    if (nestedField) {
      setFormData({
        ...formData,
        [field]: {
          ...formData[field],
          [nestedField]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
        },
      });
    } else {
      setFormData({ ...formData, [field]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    patchUser()
  };

  const patchUser = async () => {
    try {
      const response = await axios.patch(
        `${
          import.meta.env.VITE_API_URL
        }/api/userdatas/update-user-mental-context/${currUser._id}`,
        formData
      );
      const updatedUser = response.data.updatedUser;
      Cookies.set("user", JSON.stringify(updatedUser), {
        expires: 7,
        path: "/",
      });
      setCurrUser(updatedUser)
      navigate("/")
    } catch (error) {
      console.log(error);
      
    }
  };

  return (
    <div
      className="h-screen"
      style={{ backgroundImage: `url(${MainBg})`, backgroundSize: "cover" }}
    >
      <div className="top-section">
        <Navbar />
      </div>
      <div className="max-w-2xl mx-auto p-6 bg-gray-900 text-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Mental Health Assessment</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Major Issues */}
          <div>
            <label className="block text-sm font-medium">Major Issues</label>
            <textarea
              className="w-full p-2 rounded bg-gray-800"
              value={formData.majorIssues}
              onChange={(e) => handleChange(e, "majorIssues")}
            />
          </div>

          {/* Recent Symptoms */}
          <div>
            <label className="block text-sm font-medium">Recent Symptoms</label>
            <textarea
              className="w-full p-2 rounded bg-gray-800"
              value={formData.recentSymptoms}
              onChange={(e) => handleChange(e, "recentSymptoms")}
            />
          </div>

          {/* Relationships */}
          {Object.keys(formData.relationships).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium">{`Relationship - ${key}`}</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800"
                value={formData.relationships[key]}
                onChange={(e) => handleChange(e, "relationships", key)}
              />
            </div>
          ))}

          {/* Career */}
          {Object.keys(formData.career).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium">{`Career - ${key}`}</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800"
                value={formData.career[key]}
                onChange={(e) => handleChange(e, "career", key)}
              />
            </div>
          ))}

          {/* Triggers */}
          <div>
            <label className="block text-sm font-medium">Triggers</label>
            <textarea
              className="w-full p-2 rounded bg-gray-800"
              value={formData.triggers}
              onChange={(e) => handleChange(e, "triggers")}
            />
          </div>

          {/* Coping Mechanisms */}
          <div>
            <label className="block text-sm font-medium">
              Coping Mechanisms
            </label>
            <textarea
              className="w-full p-2 rounded bg-gray-800"
              value={formData.copingMechanisms}
              onChange={(e) => handleChange(e, "copingMechanisms")}
            />
          </div>


          {/* Medical History */}
          {Object.keys(formData.medicalHistory).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium">{`Medical History - ${key}`}</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800"
                value={formData.medicalHistory[key]}
                onChange={(e) => handleChange(e, "medicalHistory", key)}
              />
            </div>
          ))}

          {/* Family History */}
          <div>
            <label className="block text-sm font-medium">Family History</label>
            <textarea
              className="w-full p-2 rounded bg-gray-800"
              value={formData.familyHistory}
              onChange={(e) => handleChange(e, "familyHistory")}
            />
          </div>

          {/* Lifestyle */}
          {Object.keys(formData.lifestyle).map((key) => (
            <div key={key}>
              <label className="block text-sm font-medium">{`Lifestyle - ${key}`}</label>
              <input
                type="text"
                className="w-full p-2 rounded bg-gray-800"
                value={formData.lifestyle[key]}
                onChange={(e) => handleChange(e, "lifestyle", key)}
              />
            </div>
          ))}

          {/* Gender & Sex */}
          <div>
            <label className="block text-sm font-medium">Gender</label>
            <select
              className="w-full p-2 rounded bg-gray-800"
              value={formData.gender}
              onChange={(e) => handleChange(e, "gender")}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Non-binary</option>
              <option>Other</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium">Sex</label>
            <select
              className="w-full p-2 rounded bg-gray-800"
              value={formData.sex}
              onChange={(e) => handleChange(e, "sex")}
            >
              <option>Male</option>
              <option>Female</option>
              <option>Intersex</option>
              <option>Other</option>
            </select>
          </div>

          {/* Age */}
          <div>
            <label className="block text-sm font-medium">Age</label>
            <input
              type="number"
              className="w-full p-2 rounded bg-gray-800"
              value={formData.age}
              onChange={(e) => handleChange(e, "age")}
            />
          </div>

          {/* Support System */}
        {Object.keys(formData.supportSystem).map((key) => (
          <div key={key} className="flex items-center">
            <input type="checkbox" className="mr-2" checked={formData.supportSystem[key]} onChange={(e) => handleChange(e, "supportSystem", key)} />
            <label className="text-sm font-medium">{`Support System - ${key}`}</label>
          </div>
        ))}
        {/* Therapeutic Goals */}
        <div>
            <label className="block text-sm font-medium">Therapeutic Goals</label>
            <textarea
              className="w-full p-2 rounded bg-gray-800"
              value={formData.therapeuticGoals}
              onChange={(e) => handleChange(e, "therapeuticGoals")}
            />
          </div>


          <button
            type="submit"
            className="w-full p-3 mt-4 bg-blue-600 rounded hover:bg-blue-700"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserIntakeForm;
