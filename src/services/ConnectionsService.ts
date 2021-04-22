import { getCustomRepository, Repository } from 'typeorm'
import ConnectionsRepository from '../repositories/ConnectionsRepository'
import Connection from '../entities/Connection'

interface IConnectionCreate {
  socket_id: string;
  user_id: string;
  admin_id?: string;
  id?: string;
}

class ConnectionsService {
  private connectionsRepository: Repository<Connection>;
  constructor() {
    this.connectionsRepository = getCustomRepository(Connection)
  }
  async create({ socket_id, user_id, admin_id, id }: IConnectionCreate) {
    const connection = this.connectionsRepository.create({
      socket_id,
      user_id,
      admin_id,
      id
    })
  }
  async findByUserId(user_id: string) {
    const connection = await this.connectionsRepository.findOne({
      user_id
    })

    return connection
  }
}

export default new ConnectionsService()
