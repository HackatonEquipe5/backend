import { Context } from 'hono';
import { ConnectObjectModel } from '../models/connectObject';


export const getConnectObject = async (c: Context) => {
  try {
    const connectObjects = await ConnectObjectModel.find();
    return c.json(connectObjects);
  } catch (error) {
    return c.json({ message: 'Error fetching connect objects', error }, 500);
  }
};

export const getConnectObjectById = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const connectObject = await ConnectObjectModel.findById(id);
    if (connectObject) {
      return c.json(connectObject);
    } else {
      return c.json({ message: 'ConnectObject not found' }, 404);
    }
  } catch (error) {
    return c.json({ message: 'Error fetching connect object', error }, 500);
  }
};


export const createConnectObjectHandler = async (c: Context) => {
  try {
    const { name, location, isFavorite, image,  id_device } = await c.req.json();

    const newConnectObject = new ConnectObjectModel({
      name,
      location,
      isFavorite,
      image,
      id_device
    });

    await newConnectObject.save();
    return c.json(newConnectObject, 201);
  } catch (error) {
    return c.json({ message: 'Error creating connect object', error }, 500);
  }
};

export const updateConnectObjectHandler = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const { name, location, isFavorite, image,  id_device } = await c.req.json();
    const updateConnectObject = await ConnectObjectModel.findByIdAndUpdate(
      id,
      { name, location, isFavorite, image,  id_device },
      { new: true }
    );
    if (updateConnectObject) {
      return c.json(updateConnectObject);
    } else {
      return c.json({ message: 'ConnectObject not found' }, 404);
    }
  } catch (error) {
    return c.json({ message: 'Error updating connect object', error }, 500);
  }
};

export const deleteConnectObjectHandler = async (c: Context) => {
  try {
    const id = c.req.param('id');
    const deletedConnectObject = await ConnectObjectModel.findByIdAndDelete(id);
    if (deletedConnectObject) {
      return c.json({ message: 'ConnectObject deleted successfully' });
    } else {
      return c.json({ message: 'ConnectObject not found' }, 404);
    }
  } catch (error) {
    return c.json({ message: 'Error deleting connect object', error }, 500);
  }
};