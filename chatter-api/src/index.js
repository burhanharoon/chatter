import dotenv from 'dotenv'
import expressService from './services/express.service'
import sequelizeService from './services/sequelize.service'
import awsService from './services/aws.service'
const { Server } = require('socket.io')
dotenv.config()

let sequenceNumberByClient = new Map()

// const services = [expressService, awsService, sequelizeService];
const services = [expressService]

;(async () => {
  try {
    for (const service of services) {
      await service.init()
    }
    console.log('Server initialized.')

    const io = new Server({
      cors: {
        origin: 'http://localhost:3000',
      },
    })

    io.listen(5000)

    io.on('connection', (socket) => {
      console.info(`Client connected [id=${socket.id}]`)
      // initialize this client's sequence number
      sequenceNumberByClient.set(socket.id, socket)

      socket.on('message', (message) => {
        io.emit('message', message)
      })

      // when socket disconnects, remove it from the list:
      socket.on('disconnect', () => {
        sequenceNumberByClient.delete(socket.id)
        console.info(`Client gone [id=${socket.id}]`)
      })
    })

    // await new Promise((resolve) => setTimeout(resolve, 5000))

    // for (const [socketId, client] of sequenceNumberByClient.entries()) {
    //   client.emit('message', `hello ${socketId}`)
    // }
  } catch (error) {
    console.log(error)
    process.exit(1)
  }
})()
