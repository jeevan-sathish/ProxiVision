import React, { useContext, useState, useEffect } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import { MdHealthAndSafety } from "react-icons/md";
import TestResult from "../TestResult";

const Test = () => {
  const { theme } = useContext(ThemeContext);
  const [btnclick,setbtnClick] =useState(false)

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
  });

  const [isFormValid, setIsFormValid] = useState(false);

  function handleBtnClick(){
      setbtnClick(prev=>!prev)
  }


  useEffect(() => {
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
    ];

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

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Collected Data:", userData);
    alert("Form submitted successfully ✅");
  };

  return (
    <div
      className={`w-full min-h-screen flex flex-col relative  text-center transition-colors duration-500 ${
        theme === "light"
          ? "bg-gray-100 text-gray-900"
          : "bg-gray-900 text-gray-100"
      }`}
    >
      {/* ==== HEADER ==== */}
      <div className="w-full h-20 relative flex justify-center items-center gap-3 overflow-hidden shadow-md">
        <div className="absolute inset-0 bg-emerald-500 blur-3xl saturate-200 opacity-90"></div>
        <h1
          className={`relative text-[34px] font-bold tracking-wide ${
            theme === "dark" ? "text-cyan-400" : "text-gray-800"
          }`}
        >
          👁️ Eye Health Analysis Form
        </h1>
        <MdHealthAndSafety className="relative w-[35px] h-[35px] text-amber-400" />
      </div>

   
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-col items-center py-10 px-6"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full max-w-5xl">

          <div className="flex flex-col text-left">
            <label className="text-lg font-medium mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={userData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              required
              className={`h-[55px] rounded-[10px] text-[18px] px-4 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                theme === "dark"
                  ? "border-cyan-600 border-4 text-gray-200 bg-gray-800 focus:ring-cyan-500"
                  : "border-black border-2 text-black bg-white focus:ring-gray-700"
              }`}
            />
          </div>

    
          <div className="flex flex-col text-left">
            <label className="text-lg font-medium mb-2">Age</label>
            <input
              type="number"
              name="age"
              value={userData.age}
              onChange={handleChange}
              placeholder="Enter your age"
              min="1"
              required
              className={`h-[55px] rounded-[10px] text-[18px] px-4 placeholder-gray-400 focus:outline-none focus:ring-2 transition-all ${
                theme === "dark"
                  ? "border-cyan-600 border-4 text-gray-200 bg-gray-800 focus:ring-cyan-500"
                  : "border-black border-2 text-black bg-white focus:ring-gray-700"
              }`}
            />
          </div>

   
          <div className="flex flex-col text-left">
            <label className="text-lg font-medium mb-2">Gender</label>
            <select
              name="gender"
              value={userData.gender}
              onChange={handleChange}
              required
              className={`h-[55px] rounded-[10px] text-[18px] px-4 focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "border-cyan-600 border-4 bg-gray-800 text-gray-200 focus:ring-cyan-500"
                  : "border-black border-2 bg-white text-black focus:ring-gray-700"
              }`}
            >
              <option value="">Select gender</option>
              <option>Male</option>
              <option>Female</option>
              <option>Other</option>
            </select>
          </div>

     
          <div className="flex flex-col text-left">
            <label className="text-lg font-medium mb-2">
              Screen Time (hours/day)
            </label>
            <input
              type="number"
              name="screenTime"
              value={userData.screenTime}
              onChange={handleChange}
              placeholder="e.g. 6"
              min="0"
              required
              className={`h-[55px] rounded-[10px] text-[18px] px-4 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "border-cyan-600 border-4 bg-gray-800 text-gray-200 focus:ring-cyan-500"
                  : "border-black border-2 bg-white text-black focus:ring-gray-700"
              }`}
            />
          </div>


          <div className="flex flex-col text-left">
            <label className="text-lg font-medium mb-2">
              Sleep Duration (hours/night)
            </label>
            <input
              type="number"
              name="sleepHours"
              value={userData.sleepHours}
              onChange={handleChange}
              placeholder="e.g. 7"
              min="0"
              required
              className={`h-[55px] rounded-[10px] text-[18px] px-4 placeholder-gray-400 focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "border-cyan-600 border-4 bg-gray-800 text-gray-200 focus:ring-cyan-500"
                  : "border-black border-2 bg-white text-black focus:ring-gray-700"
              }`}
            />
          </div>


          <div className="flex flex-col text-left">
            <label className="text-lg font-medium mb-2">Diet Type</label>
            <select
              name="diet"
              value={userData.diet}
              onChange={handleChange}
              required
              className={`h-[55px] rounded-[10px] text-[18px] px-4 focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "border-cyan-600 border-4 bg-gray-800 text-gray-200 focus:ring-cyan-500"
                  : "border-black border-2 bg-white text-black focus:ring-gray-700"
              }`}
            >
              <option value="">Select diet</option>
              <option>Balanced</option>
              <option>Junk-heavy</option>
              <option>Vegetarian</option>
              <option>Non-Vegetarian</option>
              <option>Vegan</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="glasses"
              checked={userData.glasses}
              onChange={handleChange}
              className="w-6 h-6 cursor-pointer accent-cyan-500"
            />
            <label className="text-lg font-medium">Do you wear glasses?</label>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              name="surgery"
              checked={userData.surgery}
              onChange={handleChange}
              className="w-6 h-6 cursor-pointer accent-cyan-500"
            />
            <label className="text-lg font-medium">
              Have you undergone eye surgery?
            </label>
          </div>

      
          <div className="flex flex-col text-left">
            <label className="text-lg font-medium mb-2">Eye Pain Frequency</label>
            <select
              name="eyePain"
              value={userData.eyePain}
              onChange={handleChange}
              required
              className={`h-[55px] rounded-[10px] text-[18px] px-4 focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "border-cyan-600 border-4 bg-gray-800 text-gray-200 focus:ring-cyan-500"
                  : "border-black border-2 bg-white text-black focus:ring-gray-700"
              }`}
            >
              <option value="">Select frequency</option>
              <option>Never</option>
              <option>Sometimes</option>
              <option>Often</option>
              <option>Always</option>
            </select>
          </div>

          <div className="flex flex-col text-left">
            <label className="text-lg font-medium mb-2">
              Blurriness in Vision
            </label>
            <select
              name="blurriness"
              value={userData.blurriness}
              onChange={handleChange}
              required
              className={`h-[55px] rounded-[10px] text-[18px] px-4 focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "border-cyan-600 border-4 bg-gray-800 text-gray-200 focus:ring-cyan-500"
                  : "border-black border-2 bg-white text-black focus:ring-gray-700"
              }`}
            >
              <option value="">Select</option>
              <option>Yes</option>
              <option>No</option>
              <option>Sometimes</option>
            </select>
          </div>

          <div className="flex flex-col text-left">
            <label className="text-lg font-medium mb-2">Hydration Level</label>
            <select
              name="hydration"
              value={userData.hydration}
              onChange={handleChange}
              required
              className={`h-[55px] rounded-[10px] text-[18px] px-4 focus:outline-none focus:ring-2 ${
                theme === "dark"
                  ? "border-cyan-600 border-4 bg-gray-800 text-gray-200 focus:ring-cyan-500"
                  : "border-black border-2 bg-white text-black focus:ring-gray-700"
              }`}
            >
              <option value="">Select hydration level</option>
              <option>Low</option>
              <option>Normal</option>
              <option>High</option>
            </select>
          </div>
        </div>

        {/* === SUBMIT BUTTON === */}
        <button onClick={handleBtnClick}
          type="submit"
          disabled={!isFormValid}
          className={`mt-10 w-[250px] h-[55px] rounded-[12px] text-[20px] font-semibold shadow-lg transition-all ${
            isFormValid
              ? theme === "dark"
                ? "bg-emerald-500 hover:bg-cyan-700 text-white cursor-pointer"
                : "bg-emerald-500 hover:bg-blue-800 text-white cursor-pointer"
              : "bg-emerald-500 text-gray-300 cursor-not-allowed"
          }`}
        >
          Analyze Eye Health
        </button>
      </form>

      {
      <TestResult userData ={userData} handleBtnClick={handleBtnClick}  />
      }

     
    </div>
  );
};

export default Test;
