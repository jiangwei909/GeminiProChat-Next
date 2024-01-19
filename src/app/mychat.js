"use client";

import { Input } from "postcss";
import React, { useState, useRef, useEffect } from "react";
import "tailwindcss/tailwind.css";
import Markdown from "react-markdown";

let sessionMessages = [];
function MyChat() {
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

  //   const handleInputChange = (e) => {
  //     setInput(e.target.value);
  //   };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (input.length == 0) return;

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
      body: JSON.stringify({ input: input }),
    });
    const data = await response.json();
    console.log(data);
    console.log(`status = ${response.status}`);
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
      { role: "ai", content: data.text },
    ]);

    sessionMessages.push({ role: "ai", content: data.text });

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
            <div className="flex p-2">
              {m.role === "user" && (
                <div className="flex">
                  <link
                    rel="stylesheet"
                    href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200"
                  />
                  <span className="ml-1">You</span>
                </div>
              )}
              {m.role === "ai" && (
                <div className="flex">
                  <img src="/logo.png" className="w-6 h-6"></img>
                  <span className="ml-1">Gemini</span>
                </div>
              )}
            </div>
            <div
              className={`flex flex-col p-2 rounded-md ${
                m.role == "user" && "bg-blue-700 text-white "
              } ${m.role == "ai" && "bg-white"} ${m.role == "error" && "bg-rose-100"}`}
            >
              <Markdown>{m.content}</Markdown>
            </div>
          </div>
        ))}
      </div>

      <div className="flex items-baseline mt-2">
        <div className="flex items-baseline	rounded-xl p-2  bg-white border border-sky-600	flex-grow">
          <form className="flex flex-grow">
            <textarea
              className={`w-full flex-1 ${
                rows >= 10 ? "h-10 overflow-y-scroll" : `h-${rows}`
              } p-1 outline-none`}
              rows={rows}
              value={input}
              onChange={handleTextChange}
            />
          </form>
          <button
            onClick={handleSubmit}
            className="ml-2 rounded-md py-1 px-4 text-white bg-blue-700 hover:bg-blue-600"
          >
            submit
          </button>
        </div>
      </div>
    </div>
  );
}

export default MyChat;
