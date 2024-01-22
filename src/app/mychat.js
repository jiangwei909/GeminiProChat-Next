"use client";

import { Input } from "postcss";
import React, { useState, useRef, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Markdown from "react-markdown";
import { GrClearOption } from "react-icons/gr";
import { FaUserSecret } from "react-icons/fa";

let sessionMessages = [];
function MyChat() {
  const [loading, setLoading] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState([]);
  const [reversedText, setReversedText] = useState("");
  const [rows, setRows] = useState(1);
  const divRef = useRef(null);

  const handleTextChange = (e) => {
    let currentRows = Math.ceil(e.target.value.length / 30);

    if (currentRows == 0) {
      currentRows = 1;
    }
    setInput(e.target.value);
    setRows(currentRows >= 3 ? 3 : currentRows);
  };

  const newSubject = (e) => {
    sessionMessages = [];
    setMessages((messages) => [
      ...messages,
      { role: "delimiter", content: "=== a new topic ===" },
    ]);
  };

  const handleKeyDown = async (event) => {
    // The event.metaKey corresponds to the 'Command' key on Mac, and the 'Windows' key on Windows or Linux.
    // The event.key represents the key that is pressed, in this case we're checking for 'Enter'.
    if (event.metaKey && event.key === "Enter") {
      // If both 'Command'/'Windows' and 'Enter' are pressed at the same time, we trigger the button's click event.
      await handleClick();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await handleClick();
  };

  const handleClick = async () => {
    if (input.length == 0) return;

    setLoading(true);

    setMessages((preMessages) => [
      ...preMessages,
      { role: "user", content: input },
    ]);

    sessionMessages.push({ role: "user", content: input });

    const response = await fetch("/api/gemini", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ input: sessionMessages }),
    });
    const data = await response.json();
    console.log(data);
    console.log(`status = ${response.status}`);

    setLoading(false);
    if (response.status !== 200) {
      console.log(data);
      setMessages((messages) => [
        ...messages,
        { role: "error", content: data.error },
      ]);
      return;
    }

    // setReversedText(data.reversedText);
    setMessages((messages) => [
      ...messages,
      { role: "model", content: data.text },
    ]);

    sessionMessages.push({ role: "model", content: data.text });

    setInput("");
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && event.metaKey) {
      event.preventDefault(); //preven default
      handleSubmit(event); //
      setInput(""); //clear textarea
    }
  };

  const scrollToBottom = () => {
    const div = divRef.current;
    div.scrollTop = div.scrollHeight - div.clientHeight;
  };

  useEffect(scrollToBottom, []);
  useEffect(scrollToBottom, [messages]);

  return (
    <div className=" bg-gray-100 px-1 py-2 rounded-md">
      <div ref={divRef} className="overflow-auto h-96">
        {messages.map((m, idx) => (
          <div key={idx} className={`flex flex-col p-2 rounded`}>
            <div className="flex p-1 items-center	">
              {m.role === "user" && (
                <div className="flex items-center">
                  <FaUserSecret />
                  <span className="ml-1">You</span>
                </div>
              )}
              {m.role === "model" && (
                <div className="flex items-center">
                  <img src="/logo.png" className="w-6 h-6"></img>
                  <span className="ml-1">Gemini</span>
                </div>
              )}
            </div>
            <div
              className={`flex flex-col p-2 rounded-xl w-fit-content ${
                m.role == "user" ? "bg-blue-700 text-white " : ""
              } ${m.role == "model" ? "bg-white" : ""} ${
                m.role == "error" ? "bg-rose-100" : ""
              }`}
            >
              <Markdown>{m.content}</Markdown>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-center mt-2" onKeyDown={handleKeyDown}>
        <div
          className="rounded-full mx-1 hover:bg-gray-300 bg-rose-100 p-2 hover:cursor-pointer"
          onClick={newSubject}
        >
          <GrClearOption />
        </div>
        <div className="flex items-baseline	rounded-3xl p-2  bg-white border border-sky-600	flex-grow">
          <form className="flex flex-grow">
            <textarea
              className={`w-full flex-1 ${
                rows >= 10 ? "h-10 overflow-y-scroll" : `h-${rows}`
              } p-1 outline-none`}
              rows={rows}
              value={input}
              onChange={handleTextChange}
              placeholder="Enter something and press the 'Command' + 'Enter' keys"
            />
          </form>
          <button
            disabled={loading}
            onClick={handleSubmit}
            className={`ml-2 rounded-3xl py-1 px-4 text-white ${
              loading ? "bg-gray-500" : "bg-blue-700 hover:bg-blue-600"
            }`}
          >
            {loading ? "Thinking" : "Clike me"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyChat;
