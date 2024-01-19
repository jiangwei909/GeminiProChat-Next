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
            <div className="flex p-2 items-center	">
              {m.role === "user" && (
                <div className="flex">
                  <svg xmlns="http://www.w3.org/2000/svg" height="24" viewBox="0 -960 960 960" width="24" fill="#3B82F6"><path d="M620-520q25 0 42.5-17.5T680-580q0-25-17.5-42.5T620-640q-25 0-42.5 17.5T560-580q0 25 17.5 42.5T620-520Zm-280 0q25 0 42.5-17.5T400-580q0-25-17.5-42.5T340-640q-25 0-42.5 17.5T280-580q0 25 17.5 42.5T340-520Zm140 260q68 0 123.5-38.5T684-400H276q25 63 80.5 101.5T480-260Zm0 180q-83 0-156-31.5T197-197q-54-54-85.5-127T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 83-31.5 156T763-197q-54 54-127 85.5T480-80Zm0-400Zm0 320q134 0 227-93t93-227q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 134 93 227t227 93Z"/></svg>
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
