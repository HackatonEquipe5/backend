import { AssemblyAI } from 'assemblyai';
import { Context } from 'hono';

export const getSpeechToText = async (audioFile: string) => {
  try {
    const client = new AssemblyAI({
      apiKey: '9001823fcda34038a7cbc150cdd37ad7',
      baseUrl: 'https://api.eu.assemblyai.com'
    });

    const data = {
      audio: audioFile,
      language_code: 'fr'
    };

    const transcript = await client.transcripts.transcribe(data);
    console.log(transcript.text);
    return transcript.text;

  } catch (error) {
    console.error(error);
    throw new Error('Error processing audio file');
  }
};

export const getIot = async (c: Context) => {
  try {
    const audioFile = './doc/fichie.m4a'; 
    const responseText = await getSpeechToText(audioFile);
    if (responseText && responseText.includes("café")) {
      return c.json({ message: 'café' }, 200);
      // logique pour le café
    } else {
      return c.json({ message: 'autre' }, 200);
    }
  } catch (error) {
    return c.json({ message: 'Error processing audio file', error }, 500);
  }
};