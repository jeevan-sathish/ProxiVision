import React, { useContext, useEffect, useState } from "react";
import PuffLoaderRL from "./ui/ResLoader";
import { ThemeContext } from "../context/ThemeContext";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Comment } from "react-loader-spinner";

const AiResponceBlock = ({ responce, collaps }) => {
  const { theme } = useContext(ThemeContext);
  const [displayText, setDisplayText] = useState("");

  const highlightWords = ["AI", "vision", "eye", "health", "risk", "condition"];

  const highlightText = (text) => {
    let updated = text;
    highlightWords.forEach((word) => {
      const regex = new RegExp(`\\b${word}\\b`, "gi");
      updated = updated.replace(regex, `**${word}**`);
    });
    return updated;
  };

  useEffect(() => {
    if (!responce) return;

    const formatted = highlightText(responce);
    setDisplayText("");

    let i = 0;
    const speed = 25;

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
      className={`
        ${collaps ? "w-full h-full" : "w-[70%]"}
        overflow-y-scroll border-r
        ${theme === "dark" ? "border-gray-700 bg-gray-900 text-white" : "border-gray-300 bg-white text-black"}
      `}
      style={{ scrollbarWidth: "thin" }}
    >
   
      {responce.length > 0 && (
        <div className="flex flex-row pl-8 items-center mt-3">
          <Comment
            visible={true}
            height="55"
            width="55"
            ariaLabel="comment-loading"
            color={theme === "dark" ? "#38bdf8" : "#0ea5e9"}
            backgroundColor={theme === "dark" ? "#1f2937" : "#e0f2fe"}
          />
          <span
            className={`
              ml-2 font-medium
              ${theme === "dark" ? "text-cyan-300" : "text-cyan-600"}
            `}
          >
            This is ProxiVision Agent.
          </span>
        </div>
      )}

      
      {responce.length > 0 ? (
        <MarkdownPreview
          source={displayText}
          className="ai-markdown !text-left !wmde-markdown"
          components={{
            table: ({ children }) => (
              <table
                className={`my-4 w-full border-collapse ${
                  theme === "dark" ? "text-white" : "text-black"
                }`}
                style={{
                  border: `1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"}`,
                }}
              >
                {children}
              </table>
            ),

            th: ({ children }) => (
              <th
                className={`px-3 py-2 ${
                  theme === "dark"
                    ? "bg-gray-700 text-white"
                    : "bg-gray-200 text-black"
                }`}
                style={{
                  border: `1px solid ${theme === "dark" ? "#4b5563" : "#9ca3af"}`,
                }}
              >
                {children}
              </th>
            ),

            td: ({ children }) => (
              <td
                className="px-3 py-2"
                style={{
                  border: `1px solid ${theme === "dark" ? "#4b5563" : "#d1d5db"}`,
                  backgroundColor: theme === "dark" ? "#1f2937" : "white",
                  color: theme === "dark" ? "#e5e7eb" : "#111",
                }}
              >
                {children}
              </td>
            ),
          }}
          wrapperElement={{
            style: {
              backgroundColor: "transparent",
              color: theme === "dark" ? "#e5e7eb" : "#111",
              fontSize: "16px",
              lineHeight: "1.7",
              padding: "18px",
              width: "100%",
            },
          }}
          style={{
            backgroundColor: "transparent",
            fontFamily: "Inter, sans-serif",
            color: theme === "dark" ? "#d1d5db" : "#111",
            padding: "30px",
            textAlign: "left",
          }}
        />
      ) : (
        <div className="flex w-full h-full items-center justify-center">
          <PuffLoaderRL theme={theme} />
        </div>
      )}
    </div>
  );
};

export default AiResponceBlock;
