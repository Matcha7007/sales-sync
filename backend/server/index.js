import express from 'express';
import cors from "cors";
import Router from '../router';
import { json, urlencoded } from "body-parser";
import { Server } from "socket.io";
import { createServer } from "http";

class CustomServer {
    constructor(port) {
        this.port = port
        this.app = express()
        this.router = Router
        this.app.use(cors())
        this.app.use(json());
        this.app.use(urlencoded({ extended: true }));
        this.server = createServer(this.app)
        this.io = new Server(this.server, {
            cors: {
                origin: "http://localhost:3000",
                methods: ["GET","POST"],
            }
        })
    }

    start() {
        this._setupRoutes()
        this._listen()
    }

    _setupRoutes() {
        this.router.create(this.app)
    }

    _listen() {
        this.io.on("connection", (socket) => {
            console.log("User Connected : ", socket.id)

            socket.on("join_room", (data) => {
                socket.join(data)
                console.log(`User with ID ${socket.id} joined room : ${data}`)
            })

            socket.on("send_message", (data) => {
                socket.to(data.room).emit("receive_message", data)
            })
            
            socket.on("disconnect", () => {
                console.log("User Disconnected : ", socket.id)
            })
        })
        this.server.listen(this.port, () => {
            console.log(`App is running on port ${this.port}`);
        })
    }
}

export default CustomServer