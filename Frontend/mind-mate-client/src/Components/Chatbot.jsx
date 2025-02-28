import React, { useState, useContext } from "react";
import MicOnIcon from "../assets/mic-on-icon.svg";
import MicOffIcon from "../assets/mic-off-icon.svg";
import sendIcon from "../assets/send-icon.svg";
import { SessionContext } from "../Context/SessionContext";


const Chatbot = () => {
  const [isMicOn, setIsMicOn] = useState(true);
  const [userInput, setUserInput] = useState("");
  const { currSession, setCurrSession } = useContext(SessionContext);
  const [chatHistory, setChatHistory] = useState(() => {
    if (currSession.ChatHistory) {
      return currSession.ChatHistory;
    } else {
      return [];
    }
  });
  console.log(chatHistory);

  async function handleSend() {
    // try{

    //     const res = await doChat(userInput,currSession.UserSolution,chatHistory);
    //     console.log(res);
    // }catch(error){
    //   console.log(error);
    // }
    
  }

  return (
    <>
    <div className="max-h-[90vh] overflow-y-scroll">
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
          <button className="btn btn-square bg-[#AF90D8] p-4" onClick={handleSend}>
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
