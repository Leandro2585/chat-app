import { Request, Response } from 'express'
import settingsService from '../services/SettingsService'

class SettingsController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { chat, username } = request.body
      const settings = await settingsService.create({ chat, username })
      return response.json(settings)
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }
  async findByUsername(request: Request, response: Response): Promise<Response> {
    const { username } = request.params
    const settings = await settingsService.findByUsername(username)
    return response.json(settings)
  }
  async update(request: Request, response: Response): Promise<Response> {
    const { username } = request.params
    const { chat } = request.body
    const settings = await settingsService.update(username, chat)
    return response.json(settings)
  }
}

export default new SettingsController()
