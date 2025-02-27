// src/utils/textToSpeech.js

// Generate TTS using ElevenLabs API
export async function textToSpeech(text) {
  try {
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${import.meta.env.VITE_ELEVENLABS_VOICE_ID}`,
      {
        method: "POST",
        headers: {
          "xi-api-key": import.meta.env.VITE_ELEVENLABS_API_KEY,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          text,
          model_id: "eleven_monolingual_v1",
          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.5,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error("Failed to generate TTS");
    }

    const audioBlob = await response.blob();
    const audioURL = URL.createObjectURL(audioBlob);

    // Generate lipsync data (using a placeholder for now)
    const lipsync = await generateLipSync(audioBlob);

    return {
      audioURL,
      lipsync,
    };
  } catch (error) {
    console.error("TTS Error:", error);
    throw error;
  }
}

// Generate lipsync data (placeholder implementation)
async function generateLipSync(audioBlob) {
  // For now, return a placeholder lipsync object
  return {
    mouthCues: [
      { start: 0, end: 0.5, value: "A" },
      { start: 0.5, end: 1.0, value: "B" },
    ],
  };
}