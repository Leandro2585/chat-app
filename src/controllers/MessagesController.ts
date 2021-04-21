import { Request, Response } from 'express'
import messagesService from '../services/MessagesService'

class MessagesController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { user_id, admin_id, text } = request.body
      const message = await messagesService.create({ user_id, admin_id, text })
      return response.json(message)
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }
  async show(request: Request, response: Response): Promise<Response> {
    try {
      const { id } = request.params
      const list = await messagesService.listByUser(id)
      return response.json(list)
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }

  }
}

export default new MessagesController()
