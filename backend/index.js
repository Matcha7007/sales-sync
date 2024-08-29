import Server from './server/index.js'

const port = 8003

const app = new Server(port)
app.start()