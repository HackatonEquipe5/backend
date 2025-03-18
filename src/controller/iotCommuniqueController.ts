import { AssemblyAI } from 'assemblyai';
import { Context } from 'hono';
import mqtt from 'mqtt';
import fs  from 'fs';
import path from 'path';
import dotenv from 'dotenv';

export const getSpeechToText = async (audioFile: string) => {
  try {
    dotenv.config();
    const myEnv = process.env;
    const client = new AssemblyAI({
      apiKey: myEnv.ASSEMBLYAI_API_KEY ?? '',
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

export const postAudioFile = async (c: Context) => {
  try {
    dotenv.config();
    const myEnv = process.env;
    const { file, id_device } = await c.req.parseBody()
    const filePath = await uploadFile(file);
    console.log('fichier envoyé');
    console.log('data:'+id_device);
    const responseText = await getSpeechToText(filePath);
    console.log('traduction fait ');
    let message = '';

    if (responseText && responseText.includes("café")) { 
      const client = mqtt.connect('mqtt://' + myEnv.MQTT_IP + '/');
      console.log('mqtt://' + myEnv.MQTT_IP + '/');
      client.on('connect', async () => {
        await client.publish('machinecafe/' + id_device + '/command','start');
        console.log("client connecter")
        console.log(client);
        await new Promise(f => setTimeout(f, 5000));
        await client.publish('machinecafe' + id_device + 'command', 'stop');
        client.end();
      });

      message = 'café';
    } else {
      message = 'autre';
    }
    
    deleteFile(filePath);
    console.log("fichier supprimer")
    return c.json({ message }, 200);
  } catch (error) {
    return c.json({ message: 'Error processing audio file', error }, 500);
  }
};

const uploadFile = async (file: any) => {
  if (!fs.existsSync('./uploads')) {
    fs.mkdirSync('./uploads')
  }

  if (file instanceof File) {
    const buffer = Buffer.from(await file.arrayBuffer())
    const uploadPath = path.join('./uploads', file.name)

    fs.writeFileSync(uploadPath, buffer)
    return './uploads/' + file.name;
  } else {
    throw new Error('File not found')
  }
}

const deleteFile = async (filePath: string) => {
  fs.unlinkSync(filePath);
}