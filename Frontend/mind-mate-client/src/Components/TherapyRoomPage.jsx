import { Canvas } from "@react-three/fiber";
import React from "react";
import Bg from "../assets/therapist-bg.jpg";
import { Experience } from "../Avatars/Experience";
import Chatbot from "./Chatbot";

const TherapyRoomPage = () => {
  return (
    <>
      <div className="flex max-h-screen">
        {/* avatar ui */}
        <div
          className="w-2/3"
          style={{
            backgroundImage: "url(" + Bg + ")",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <Canvas shadows>
            <Experience />
          </Canvas>
        </div>

        {/* chatUi */}
        <div className="w-1/3">
          {/* chatHistory */}
          {/* <div>
            <div class="chat chat-start">
              <div class="chat-bubble">
                It's over Anakin,
                <br />I have the high ground.
              </div>
            </div>
            <div class="chat chat-end">
              <div class="chat-bubble">You underestimate my power!</div>
            </div>
          </div>

          {/* chatInput */}
          {/* <div className="flex ">
            <input
              type="text"
              placeholder="Type your message here"
              class="input input-bordered w-full max-w-xs"
            />
            <button class="btn btn-square"></button>
            <button class="btn btn-square"></button>
          </div> */} 

          <Chatbot />
        </div>
      </div>
    </>
  );
};

export default TherapyRoomPage;
