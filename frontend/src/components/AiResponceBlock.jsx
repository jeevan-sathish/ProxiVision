import React, { useContext, useEffect, useState } from "react";
import PuffLoaderRL from "./ui/ResLoader";
import { ThemeContext } from "../context/ThemeContext";
import MarkdownPreview from "@uiw/react-markdown-preview";

const AiResponceBlock = ({ responce, collaps }) => {
  const { theme } = useContext(ThemeContext);
  const [displayText, setDisplayText] = useState(""); // for typing animation

  // Bold highlight words
  const highlightWords = ["AI", "vision", "eye", "health", "risk", "condition"];

  const highlightText = (text) => {
    let updated = text;

    highlightWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      updated = updated.replace(regex, `**${word}**`);
    });

    return updated;
  };

  // Typing animation effect
  useEffect(() => {
    if (!responce) return;

    const formatted = highlightText(responce);
    setDisplayText(""); // reset for new response

    let i = 0;
    const speed = 15; // typing speed (lower = faster)

    const typer = setInterval(() => {
      if (i < formatted.length) {
        setDisplayText((prev) => prev + formatted[i]);
        i++;
      } else {
        clearInterval(typer);
      }
    }, speed);

    return () => clearInterval(typer);
  }, [responce]);

  return (
    <div
      className={`${
        collaps ? "w-full h-full overflow-y-hidden" : "w-[70%] overflow-y-scroll"
      } border-r border-black ${
        theme === "dark" ? "bg-gray-800 text-white" : "bg-white text-black"
      }`}
      style={{ scrollbarWidth: "thin" }}
    >
      {responce.length > 0 ? (
        <MarkdownPreview
          source={displayText}
          wrapperElement={{
            style: {
              backgroundColor: theme === "dark" ? "#000000" : "#ffffff",
              color: theme === "dark" ? "#ffffff" : "#000000",
              borderRadius: "12px",
              fontSize: "16px",
              lineHeight: "1.7",
              textAlign: "left",
              width: "100%",
              padding: "16px",
            },
          }}
          style={{
            fontFamily: "Inter, sans-serif",
          }}
        />
      ) : (
        <div className="flex w-full h-full items-center justify-center">
          <PuffLoaderRL />
        </div>
      )}
    </div>
  );
};

export default AiResponceBlock;
