import React, { useState, useContext, useEffect } from "react";
import MicOnIcon from "../assets/mic-on-icon.svg";
import MicOffIcon from "../assets/mic-off-icon.svg";
import sendIcon from "../assets/send-icon.svg";
import { SessionContext } from "../Context/SessionContext";
// import { doChat } from "../utils/ChatGPT";
import axios from "axios";
import {
  generateSpeech,
  convertToWav,
  generateLipSync,
} from "../utils/textToSpeech";
import { LoginContext } from "../Context/LoginContext";
// import voice from "elevenlabs-node"
// import fs from "fs";
// import { exec } from "child_process";

const Chatbot = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [userInput, setUserInput] = useState("");
  const [isChatUpdated, setIsChatUpdated] = useState(false);
  const { currSession, setCurrSession } = useContext(SessionContext);
  const { currUser, setCurrUser } = useContext(LoginContext);

  const elevenLabsApiKey = import.meta.env.VITE_ELEVENLABS_KEY;
  const voiceId = import.meta.env.VITE_ELEVENLABS_VOICE_ID;

  const [chatHistory, setChatHistory] = useState(() => {
    if (currSession.ChatHistory) {
      return currSession.ChatHistory;
    } else {
      return [];
    }
  });
  console.log(chatHistory);
  async function fetchChatResponse(input, context, chatHistory) {
    return axios.post(
      `${import.meta.env.VITE_API_URL}/api/therapydatas/do-chat`,
      {
        input,
        context,
        chatHistory,
      }
    );
  }

  useEffect(() => {
    updateChatNew().then(() => {}).catch((error) => {console.log(error)});
  }, [isChatUpdated]);

  async function updateChatSession(sessionId, newChatHistory) {
    return axios.patch(
      `${
        import.meta.env.VITE_API_URL
      }/api/therapydatas/update-context/${sessionId}`,
      {
        ChatHistory: newChatHistory,
      }
    );
  }

  async function updateChatNew() {
    try {
      const res = await updateChatSession(currSession._id, chatHistory);
      console.log("currSession._id:", currSession._id);

      const updatedSession = res.data.updatedTherapySession;
      console.log("updatedSession:", updatedSession);

      setCurrSession(updatedSession);
      localStorage.setItem("currSession", JSON.stringify(updatedSession));
    } catch (error) {
      console.log(error);
    }
  }

  async function getResponse() {
    try {
      setIsChatUpdated(false);
      console.log({
        input: userInput,
        context: currSession.UserSolution,
        chatHistory,
      });

      const response = await fetchChatResponse(
        userInput,
        currSession.UserSolution,
        chatHistory
      );
      console.log(response.data.chatInfo.text);

      const newChatHistory = response.data.chatInfo.chatHistory;
      setChatHistory(newChatHistory);
      setIsChatUpdated(true);
    } catch (error) {
      console.error("Error during chat request:", error);
      if (error.response) {
        console.error("Response Data:", error.response.data);
      }
    }
  }

  async function handleSend() {
    const response = await getResponse();
    return response;
    // processText(response);
  }

  async function processText(text) {
    const fileName = "message_0";

    // 1. Generate Speech (MP3)
    const mp3File = await generateSpeech(text, fileName);

    // 2. Convert to WAV
    const wavFile = await convertToWav(mp3File);

    // 3. Generate Lip Sync JSON
    const jsonFile = await generateLipSync(wavFile);

    console.log(`Generated files: ${mp3File}, ${wavFile}, ${jsonFile}`);
  }

  return (
    <>
      <div className="h-[90vh] overflow-y-scroll">
        <div className="">
          {chatHistory.map((chat, index) => (
            <div
              key={index}
              className={`chat ${
                chat.role === "user" ? "chat-end" : "chat-start"
              }`}
            >
              <div className="chat-bubble">{chat.content}</div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex ">
        <input
          type="text"
          placeholder="Type your message here"
          className="input input-bordered w-full max-w-xs"
          onChange={(e) => setUserInput(e.target.value)}
        />
        <button
          className="btn btn-square bg-[#AF90D8] p-4"
          onClick={() => {
            getResponse();
          }}
        >
          <img src={sendIcon} />
        </button>
        <button className="btn btn-square bg-[#AF90D8] p-4">
          <img src={MicOnIcon} />
        </button>
      </div>
    </>
  );
};

export default Chatbot;
