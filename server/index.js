const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userRoutes = require('./routes/userRoutes');
const messagesRoutes = require('./routes/messagesRoute');
const socket = require("socket.io");

const app = express();
dotenv.config();

app.use(cors());
app.use(express.json());

app.use('/api/auth', userRoutes);
app.use('/api/messages', messagesRoutes);
app.get('/', (req, res) => {
    res.send('Hello World');
}
);


// check if the connection in mognodb is successful
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log('Connected to MongoDB');

}).catch((err) => { 
    console.log(err) 
    console.log('Connection failed');
});


const server = app.listen(process.env.PORT, () => {
    console.log(`Server is running on port: ${process.env.PORT}`);
});

const io = socket(server, {
    cors: {
        origin: "http://localhost:3000",
        credentials: true, 
    }
});

global.onlineUsers = new Map();

// io.on("connection", (socket) => {
//     console.log("Socket connected: ", socket.id);
//     global.chatSocket = socket;
//     socket.on("add-user", (userId) => {
//         console.log("User added: ", userId);
//         onlineUsers.set(userId, socket.id);
//     });

//     socket.on("send-msg", (data) => {
//         const sendUserSocket = onlineUsers.get(data.to);
//         if (sendUserSocket) {
//             socket.to(sendUserSocket.emit("msg-recieve", data.msg));
//         }
//     });
//     console.log("Online users:>>>> ", global.onlineUsers);
// });

io.on("connection", (socket) => {
    console.log("Socket connected: ", socket.id);

    socket.on("add-user", (userId) => {
        console.log("User added: ", userId);
        onlineUsers.set(userId, socket.id);
        console.log("Online users:", Array.from(onlineUsers.entries())); // ✅ Now prints updated map
    });

    socket.on("send-msg", (data) => {
        const sendUserSocket = onlineUsers.get(data.to);
        if (sendUserSocket) {
            io.to(sendUserSocket).emit("msg-recieve", data.msg); // ✅ Corrected
        }
    });

    socket.on("disconnect", () => {
        console.log("User disconnected: ", socket.id);
        for (let [userId, socketId] of onlineUsers.entries()) {
            if (socketId === socket.id) {
                onlineUsers.delete(userId);
                break;
            }
        }
        console.log("Updated Online Users:", Array.from(onlineUsers.entries())); // ✅ Updated list after disconnection
    });
});



