import { io } from '../http'
import connectionsService from '../services/ConnectionsService'
import usersService from '../services/UsersService'
import messagesService from '../services/MessagesService'

interface IParams {
  text: string;
  email: string;
}

io.on('connect', (socket) => {
  socket.on('client_first_access', params => {
    const socket_id = socket.id
    const { text, email } = params as IParams
    let user_id = null
    const userExists = await usersService.findByEmail(email)
    if(!userExists) {
      const user = usersService.create(email)
      await connectionsService.create({
        socket_id,
        user_id
      })
      user_id = user.id
    } else {
      user_id = userExists.id
      const connection = await connectionsService.findByUserId(userExists.id)

      if(!connection) {
        await connectionsService.create({
          socket_id,
          user_id: userExists.id
        })
      } else {
        connection.socket_id = socket_id
        await connectionsService.create(connection)
      }
    }

    await messagesService.create({ text, user_id })
  })
})
