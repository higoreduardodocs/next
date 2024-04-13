import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'

import { requestInterceptor } from './utils/request-interceptor'
import authRoutes from './routes/auth-route'
import adminRoutes from './routes/admin-route'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/*', requestInterceptor)

app.use('/auths', authRoutes)
app.use('/admins', adminRoutes)

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`🚀 Running at port: ${port}`)
  })
}

const regularServer = http.createServer(app)
if (process.env.NODE_ENV === 'producttion') {
} else {
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 9000
  runServer(serverPort, regularServer)
}
