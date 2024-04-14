import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import http from 'http'
import https from 'https'
import fs from 'fs'

import { requestInterceptor } from './utils/request-interceptor'
import authRoutes from './routes/auth-route'
import adminRoutes from './routes/admin-route'
import publicRoutes from './routes/public-route'

const app = express()

app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use('/*', requestInterceptor)

app.use('/auths', authRoutes)
app.use('/admins', adminRoutes)
app.use('/', publicRoutes)

const runServer = (port: number, server: http.Server) => {
  server.listen(port, () => {
    console.log(`🚀 Running at port: ${port}`)
  })
}

const regularServer = http.createServer(app)
if (process.env.NODE_ENV === 'producttion') {
  const options = {
    key: fs.readFileSync(process.env.SSL_KEY as string),
    cert: fs.readFileSync(process.env.SSL_CERT as string),
  }
  const secServer = https.createServer(options, app)
  runServer(80, regularServer)
  runServer(443, secServer)
} else {
  const serverPort: number = process.env.PORT
    ? parseInt(process.env.PORT)
    : 9000
  runServer(serverPort, regularServer)
}
