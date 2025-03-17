import { Context } from 'hono'
import { ConnectObjectModel } from '../models/connectObject'
import bcrypt from 'bcrypt'
import { AssemblyAI } from 'assemblyai';
import { promises as fs } from 'fs';

export const getConnectObject = async (c: Context) => {
  try {
    const ConnectObject = await ConnectObjectModel.find()
    return c.json(ConnectObject)
  } catch (error) {
    return c.json({ message: 'Error fetching users', error }, 500)
  }
}

export const getConnectObjectById = async (c: Context) => {
    try {
      const id = c.req.param('id')
      const ConnectObject = await ConnectObjectModel.findById(id)
      if (ConnectObject) {
        return c.json(ConnectObject)
      } else {
        return c.json({ message: 'ConnectObject not found' }, 404)
      }
    } catch (error) {
      return c.json({ message: 'Error fetching ConnectObject', error }, 500)
    }
}

export const getSpeechToText = async (c: Context) => {
  try {
    const client = new AssemblyAI({
      apiKey: '9001823fcda34038a7cbc150cdd37ad7',
      baseUrl: 'https://api.eu.assemblyai.com'
    });

    const FILE_URL =
        '/home/dorianjoly/Bureau/COURS_YNOV/Hackaton/backend/doc/Comment commencer un discours _ Ne plus dire bonjour mais captiver l\'audience dès votre arrivée..mp3';

// You can also transcribe a local file by passing in a file path
// const FILE_URL = './path/to/file.mp3';

// Request parameters
    const data = {
      audio: FILE_URL,
      language_code: 'fr'
    }

    const run = async () => {
      const transcript = await client.transcripts.transcribe(data);
      console.log(transcript.text);
      return transcript;
    };

    const transcript = await run();

    return c.json({ message: transcript.text }, 200);

  } catch (error) {
    console.error(error);
    return c.json({ message: 'Error processing audio file', error }, 500);
  }
};

export const createConnectObjectHandler = async (c: Context) => {
    try {
      const { name, location,isFavorite } = await c.req.json()
  
      const newConnectObject= new ConnectObjectModel({
        name,
        location,
        isFavorite,
      })
  
      await newConnectObject.save()
      return c.json(newConnectObject, 201)
    } catch (error) {
      return c.json({ message: 'Error creating user', error }, 500)
    }
  }
  export const updateConnectObjectHandler = async (c: Context) => {
    try {
      const id = c.req.param('id')
      const { name,location} = await c.req.json()
      const updateConnectObject = await ConnectObjectModel.findByIdAndUpdate(
        id,
        { name, location, },
        { new: true }
      )
      if (updateConnectObject) {
        return c.json(updateConnectObject)
      } else {
        return c.json({ message: 'ConnectObjectModel not found' }, 404)
      }
    } catch (error) {
      return c.json({ message: 'Error updating user', error }, 500)
    }
  }
  
  export const deleteConnectObjectHandler= async (c: Context) => {
    try {
      const id = c.req.param('id')
      const deletedConnectObject = await ConnectObjectModel.findByIdAndDelete(id)
      if (deletedConnectObject) {
        return c.json({ message: 'User deleted successfully' })
      } else {
        return c.json({ message: 'User not found' }, 404)
      }
    } catch (error) {
      return c.json({ message: 'Error deleting user', error }, 500)
    }
  }