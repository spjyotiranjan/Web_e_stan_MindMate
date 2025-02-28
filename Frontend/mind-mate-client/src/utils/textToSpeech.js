// src/utils/textToSpeech.js
// import { createFFmpeg, fetchFile } from "@ffmpeg/ffmpeg";
import { runCommands } from "rhubarb-lip-sync";
import { ElevenLabsClient } from "elevenlabs";
import dotenv from "dotenv";

// dotenv.config();
let createFFmpeg, fetchFile;

(async () => {
  const ffmpegModule = await import("@ffmpeg/ffmpeg");
  createFFmpeg = ffmpegModule.createFFmpeg;
  fetchFile = ffmpegModule.fetchFile;
})();


// Load environment variables
const apiKey = import.meta.env.VITE_ELEVENLABS_KEY;
const voiceID = import.meta.env.VITE_ELEVENLABS_VOICE_ID;

// ElevenLabs Client

// Initialize FFmpeg
;

// 1️⃣ Generate Speech from ElevenLabs API
export const generateSpeech = async (text, fileName) => {
  if (!apiKey || !voiceID) throw new Error("API Key or Voice ID is missing!");

  // const url = `https://api.elevenlabs.io/v1/text-to-speech/${voiceID}`;

  // const response = await fetch(url, {
  //   method: "POST",
  //   headers: {
  //     "xi-api-key": apiKey,
  //     "Content-Type": "application/json",
  //   },
  //   body: JSON.stringify({
  //     text: text,
  //     model_id: "eleven_monolingual_v1",
  //     voice_settings: { stability: 0.5, similarity_boost: 0.5 },
  //   }),
  // });

  // const client = new ElevenLabsClient();
  const client = new ElevenLabsClient({ apiKey });
  const response = await client.textToSpeech.convert("JBFqnCBsd6RMkjVDRZzb", {
    text: "The first move is what sets everything in motion.",
    model_id: "eleven_multilingual_v2",
    output_format: "mp3_44100_128",
  });
  // await play(audio);

  console.log(response);

  // const audioBlob = await response.blob();
  // saveFile(audioBlob, `${fileName}.mp3`);
  return `${fileName}.mp3`;
};

// 2️⃣ Convert MP3 to WAV using FFmpeg
export const convertToWav = async (inputFile) => {
  const outputFile = inputFile.replace(".mp3", ".wav");

  if (!ffmpeg.isLoaded()) await ffmpeg.load();

  ffmpeg.FS("writeFile", inputFile, await fetchFile(inputFile));
  await ffmpeg.run("-i", inputFile, outputFile);
  const wavData = ffmpeg.FS("readFile", outputFile);

  saveFile(new Blob([wavData]), outputFile);
  return outputFile;
};

// 3️⃣ Generate Lip Sync JSON
export const generateLipSync = async (audioFile) => {
  if (!audioFile.endsWith(".wav")) throw new Error("Lip Sync requires a .wav file");

  const bufferAudio = await fetchFile(audioFile);
  const lipSyncData = await runCommands(bufferAudio);

  const outputFile = audioFile.replace(".wav", ".json");
  saveFile(new Blob([JSON.stringify(lipSyncData)]), outputFile);
  return outputFile;
};

// Utility to Save Files
export function saveFile(blob, fileName) {
  const a = document.createElement("a");
  a.href = URL.createObjectURL(blob);
  a.download = fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
