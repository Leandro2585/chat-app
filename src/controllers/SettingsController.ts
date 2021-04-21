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
}

export default new SettingsController()
