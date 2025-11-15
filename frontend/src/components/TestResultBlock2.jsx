import React, { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../context/ThemeContext";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "react-loading-skeleton/dist/skeleton.css";
import Skeleton from "react-loading-skeleton";
import { IoSparkles } from "react-icons/io5";
import SensorAnalysis from "./SensorAnalysis";

const TestResultBlock2 = ({ loading, summerizedData, summeryShow, setSummerizedData, setSummeryShow }) => {
  const { theme } = useContext(ThemeContext);
  const [typedText, setTypedText] = useState("");

  const highlightWords = ["AI", "vision", "eye", "result", "summary"];

  const highlightText = (text) => {
    let updated = text;
    highlightWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      updated = updated.replace(regex, `**${word}**`);
    });
    return updated;
  };

  function handleSummeryClear() {
    setSummerizedData("");
  }

  function handleCloseSummeryTab() {
    setSummeryShow(false);
  }

  useEffect(() => {
    if (!summerizedData || loading) return;

    const formatted = highlightText(summerizedData);
    setTypedText("");

    let index = 0;
    const speed = 20;

    const typeInterval = setInterval(() => {
      if (index < formatted.length) {
        setTypedText((prev) => prev + formatted[index]);
        index++;
      } else {
        clearInterval(typeInterval);
      }
    }, speed);

    return () => clearInterval(typeInterval);
  }, [summerizedData, loading]);

  return (
    <div className="w-[30%] h-full flex flex-col">

      {/* HEADER */}
      <header
        className={`
          w-full h-12 px-6 flex items-center justify-between gap-4
          backdrop-blur-md border-b rounded-md 
          ${theme === "dark"
            ? "bg-gray-700/40 border-gray-500/30 text-white"
            : "bg-gray-200/40 border-gray-400/40 text-black"}
        `}
      >
        <div className="flex flex-row gap-3 items-center">
          <IoSparkles className="text-[20px]" />
          <p className="font-medium">Quick Summary</p>
        </div>
        

        <div className="flex gap-3">
          <button
            onClick={handleSummeryClear}
            className={`
              px-3 py-1 rounded-md transition
              ${theme === "dark"
                ? "bg-gray-600/40 hover:bg-gray-600/60 text-white"
                : "bg-gray-300/50 hover:bg-gray-300/80 text-black"}
            `}
          >
            Clear
          </button>

          <button
            onClick={handleCloseSummeryTab}
            className={`
              px-3 py-1 rounded-md transition
              ${theme === "dark"
                ? "bg-gray-600/40 hover:bg-gray-600/60 text-white"
                : "bg-gray-300/50 hover:bg-gray-300/80 text-black"}
            `}
          >
            Close
          </button>
        </div>
      </header>

      {/* SUMMARY BOX */}
      {summeryShow && (
        <div
          className={`w-full h-full mt-3 overflow-y-scroll rounded-md
            ${theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"}
          `}
          style={{ scrollbarWidth: "thin" }}
        >
          {loading ? (
            <div className="p-6">
              <Skeleton
                width={150}
                height={25}
                baseColor={theme === "dark" ? "#374151" : "#d1d5db"}
                highlightColor={theme === "dark" ? "#4b5563" : "#e5e7eb"}
              />
              <Skeleton
                height={18}
                count={6}
                baseColor={theme === "dark" ? "#374151" : "#d1d5db"}
                highlightColor={theme === "dark" ? "#4b5563" : "#e5e7eb"}
              />
            </div>
          ) : (
            <MarkdownPreview
              source={typedText}
              className="!text-left !wmde-markdown"
              wrapperElement={{
                style: {
                  backgroundColor: "transparent",
                  color: theme === "dark" ? "white" : "black",
                  fontSize: "16px",
                  padding: "16px",
                  lineHeight: "1.7",
                },
              }}
              style={{
                backgroundColor: "transparent",
                fontFamily: "Inter, sans-serif",
                color: theme === "dark" ? "#d1d5db" : "#111",
                boxShadow: "none",
                padding: "20px",
              }}
            />
          )}
        </div>
      )}

      {/* sensor part */}
      {!summeryShow && <SensorAnalysis />}
    </div>
  );
};

export default TestResultBlock2;
