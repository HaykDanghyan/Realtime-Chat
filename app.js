import express from "express"
import path from "path"
import { createServer } from "http";
import { Server } from "socket.io" 
import dotenv from "dotenv"

dotenv.config();

const app = express();
const server = createServer(app);
const port = process.env.PORT || 3000;
const io = new Server(server);

app.use(express.static(path.resolve() + "/public"));

io.on("connection", (socket) => {
    socket.on("newuser", (username) => {
        socket.broadcast.emit("update", `${username} joined the conversation`);
    });
    socket.on("exituser", (username) => {
        socket.broadcast.emit("update", `${username} left the conversation`);
    });
    socket.on("chat", (message) => {
        socket.broadcast.emit("chat", message);
    });
});

server.listen(port);