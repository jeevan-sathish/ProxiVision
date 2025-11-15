import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { MdHealthAndSafety } from "react-icons/md";
import TestResult from "../TestResult";
import { GoogleGenerativeAI } from "@google/generative-ai";

const Test = () => {
  const { theme } = useContext(ThemeContext);

  const [btnclick, setbtnClick] = useState(false);
  const [responce, setResponse] = useState("");

  const [userData, setUserData] = useState({
    name: "",
    age: "",
    gender: "",
    screenTime: "",
    sleepHours: "",
    diet: "",
    glasses: false,
    surgery: false,
    eyePain: "",
    blurriness: "",
    hydration: "",
    familyHistory: "",
    allergies: "",
    outdoorTime: "",
    stressLevel: "",
    brightnessExposure: "",
    eyeDropsUsage: "",
    medicalConditions: "",
  });

  const [isFormValid, setIsFormValid] = useState(false);

  const handleBtnClick = () => {
    setbtnClick((prev) => !prev);
  };

  // ⭐ VALIDATION
  const requiredFields = [
    "name",
    "age",
    "gender",
    "screenTime",
    "sleepHours",
    "diet",
    "eyePain",
    "blurriness",
    "hydration",
    "familyHistory",
    "allergies",
    "outdoorTime",
    "stressLevel",
    "brightnessExposure",
    "eyeDropsUsage",
    "medicalConditions",
  ];

  useEffect(() => {
    const allFilled = requiredFields.every(
      (field) => userData[field] !== "" && userData[field] !== null
    );
    setIsFormValid(allFilled);
  }, [userData]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setUserData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // ⭐ GEMINI AI OUTPUT
  const generateContent = async () => {
    const genAI = new GoogleGenerativeAI("AIzaSyCXdbwzRDDvi1wkiq3tgcLimcpwA4WSCfM");
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash" });

    const prompt = `
      Based on this user data:
      ${JSON.stringify(userData, null, 2)}

      Provide complete eye health analysis , tips , recomendation  strictly in table format only .
    `;

    const result = await model.generateContent(prompt);
    setResponse(result.response.text());
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    generateContent();
  };

  // ⭐ REUSABLE INPUT COMPONENTS
  const InputField = ({ label, name, value, placeholder, type = "text" }) => {
    const isEmpty = requiredFields.includes(name) && value === "";

    return (
      <div className="flex flex-col text-left">
        <label className="text-[16px] font-medium mb-1">{label}</label>
        <input
          type={type}
          name={name}
          value={value}
          placeholder={placeholder}
          onChange={handleChange}
          className={`h-[45px] rounded-[8px] text-[16px] px-3 transition-all
          ${theme === "dark"
              ? `bg-gray-800 text-gray-200 border ${
                  isEmpty ? "border-red-500" : "border-cyan-600"
                }`
              : `bg-white text-black border ${
                  isEmpty ? "border-red-500" : "border-black"
                }`
            }`}
        />
      </div>
    );
  };

  const SelectField = ({ label, name, value, options }) => {
    const isEmpty = requiredFields.includes(name) && value === "";

    return (
      <div className="flex flex-col text-left">
        <label className="text-[16px] font-medium mb-1">{label}</label>
        <select
          name={name}
          value={value}
          onChange={handleChange}
          className={`h-[45px] rounded-[8px] text-[16px] px-3
          ${theme === "dark"
              ? `bg-gray-800 text-gray-200 border ${
                  isEmpty ? "border-red-500" : "border-cyan-600"
                }`
              : `bg-white text-black border ${
                  isEmpty ? "border-red-500" : "border-black"
                }`
            }`}
        >
          <option value="">Select an option</option>
          {options.map((opt, idx) => (
            <option key={idx}>{opt}</option>
          ))}
        </select>
      </div>
    );
  };

  const CheckboxField = ({ label, name, checked }) => (
    <div className="flex items-center gap-2 mt-2">
      <input
        type="checkbox"
        name={name}
        checked={checked}
        onChange={handleChange}
        className="w-5 h-5 accent-cyan-500 cursor-pointer"
      />
      <label className="text-[16px] font-medium">{label}</label>
    </div>
  );

  return (
    <div
      className={`w-full min-h-screen flex flex-col text-center ${
        theme === "light"
          ? "bg-gray-100 text-gray-800"
          : "bg-gray-800 text-gray-100"
      }`}
    >
      {/* HEADER */}
      <div className="w-full h-15 flex justify-center items-center gap-3 shadow-md">
        <h1
          className={`text-[25px] font-bold ${
            theme === "dark" ? "text-cyan-400" : "text-gray-800"
          }`}
        >
           Eye Health Analysis
        </h1>
        <MdHealthAndSafety className="w-[30px] h-[30px] text-amber-400" />
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center py-8 px-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 w-full max-w-5xl">

          <InputField label="Full Name" name="name" value={userData.name} placeholder="Enter your name" />
          <InputField type="number" label="Age" name="age" value={userData.age} placeholder="Your age" />

          <SelectField
            label="Gender"
            name="gender"
            value={userData.gender}
            options={["Male", "Female", "Other"]}
          />

          <InputField type="number" label="Screen Time (hrs/day)" name="screenTime" value={userData.screenTime} placeholder="e.g. 5" />

          <InputField type="number" label="Sleep Hours" name="sleepHours" value={userData.sleepHours} placeholder="e.g. 7" />

          <SelectField
            label="Diet Type"
            name="diet"
            value={userData.diet}
            options={["Balanced", "Junk-heavy", "Vegetarian", "Non-Vegetarian", "Vegan"]}
          />

          <CheckboxField label="Do you wear glasses?" name="glasses" checked={userData.glasses} />
          <CheckboxField label="Had eye surgery?" name="surgery" checked={userData.surgery} />

          <SelectField
            label="Family History"
            name="familyHistory"
            value={userData.familyHistory}
            options={["None", "Myopia", "Glaucoma", "Cataract", "Diabetic Retinopathy"]}
          />

          <SelectField
            label="Allergies"
            name="allergies"
            value={userData.allergies}
            options={["No", "Dust", "Pollen", "Seasonal", "Unknown"]}
          />

          <InputField type="number" label="Outdoor Time (hrs/day)" name="outdoorTime" value={userData.outdoorTime} placeholder="e.g. 2" />

          <SelectField
            label="Stress Level"
            name="stressLevel"
            value={userData.stressLevel}
            options={["Low", "Medium", "High"]}
          />

          <SelectField
            label="Screen Brightness Exposure"
            name="brightnessExposure"
            value={userData.brightnessExposure}
            options={["Low", "Medium", "High"]}
          />

          <SelectField
            label="Eye Drops Usage"
            name="eyeDropsUsage"
            value={userData.eyeDropsUsage}
            options={["Never", "Occasionally", "Daily"]}
          />

          <SelectField
            label="Medical Conditions"
            name="medicalConditions"
            value={userData.medicalConditions}
            options={["None", "Diabetes", "Thyroid", "Hypertension"]}
          />

          <SelectField
            label="Eye Pain Frequency"
            name="eyePain"
            value={userData.eyePain}
            options={["Never", "Sometimes", "Often", "Always"]}
          />

          <SelectField
            label="Blurriness"
            name="blurriness"
            value={userData.blurriness}
            options={["No", "Yes", "Sometimes"]}
          />

          <SelectField
            label="Hydration Level"
            name="hydration"
            value={userData.hydration}
            options={["Low", "Normal", "High"]}
          />
        </div>

        {/* SUBMIT BUTTON */}
        <button
          onClick={handleBtnClick}
          type="submit"
          disabled={!isFormValid}
          className={`mt-10 w-[250px] h-[50px] rounded-[10px] text-[18px] font-semibold shadow-lg 
            ${
              !isFormValid
                ? "bg-green-200 text-black cursor-not-allowed opacity-60"
                : "bg-green-500 text-black cursor-pointer"
            }
          `}
        >
          Analyze Eye Health
        </button>
      </form>

      { (btnclick&&
        <TestResult responce={responce}  setResponse={setResponse} handleBtnClick={handleBtnClick} />
      )}
    </div>
  );
};

export default Test;
