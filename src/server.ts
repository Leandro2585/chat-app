import { http } from 'http'
import './websockets/client'

http.listen(3333, () => {
  console.log('Server is running at http:localhost:3333')
})
