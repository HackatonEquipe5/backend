import { Context } from 'hono'
import { ConnectObjectModel } from '../models/connectObject'
import bcrypt from 'bcrypt'

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