import { Request, Response } from 'express'
import usersService from '../services/UsersService'

class UsersController {
  async create(request: Request, response: Response): Promise<Response> {
    try {
      const { email } = request.body
      const user = await usersService.create(email)
      return response.json(user)
    } catch (err) {
      return response.status(400).json({
        message: err.message
      })
    }
  }
}

export default new UsersController()
