import Server from './server'

const port = 8003

const app = new Server(port)
app.start()