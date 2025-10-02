# Real-Time Chat Application

A modern, full-stack chat application built with React.js, Node.js, and Socket.io for seamless real-time communication. This application provides an intuitive interface for users to connect, chat, and share messages instantly.

## 🚀 Features

- **Real-time messaging** with Socket.io
- **User authentication** and registration
- **Avatar selection** and profile customization
- **Contact management** and user listing
- **Message history** with persistent storage
- **Responsive design** for all devices
- **Modern UI** with styled-components
- **Secure authentication** with bcrypt encryption

## 🛠️ Tech Stack

### Frontend
- **React.js** (v19.0.0) - Modern JavaScript library for building user interfaces
- **React Router DOM** - Client-side routing
- **Styled Components** - CSS-in-JS styling
- **Axios** - HTTP client for API requests
- **React Toastify** - Elegant notifications

### Backend
- **Node.js** - JavaScript runtime environment
- **Express.js** - Web application framework
- **Socket.io** - Real-time bidirectional event-based communication
- **MongoDB** with Mongoose - NoSQL database and ODM
- **bcrypt** - Password hashing
- **CORS** - Cross-Origin Resource Sharing
- **dotenv** - Environment variable management

## 📋 Prerequisites

Before running this application, make sure you have the following installed:

- **Node.js** (v14.0.0 or higher)
- **npm** or **yarn**
- **MongoDB** (local installation or MongoDB Atlas)

## ⚙️ Installation & Setup

### 1. Clone the repository
```bash
git clone https://github.com/zelabbas/Chat-App-with-React-Node.js-Socket.io.git
cd Chat-App-with-React-Node.js-Socket.io
```

### 2. Install server dependencies
```bash
cd server
npm install
```

### 3. Install client dependencies
```bash
cd ../public
npm install
```

### 4. Environment Configuration

Create a `.env` file in the server directory:
```env
PORT=5000
MONGO_URL=mongodb://localhost:27017/chat-app
# or use MongoDB Atlas connection string
# MONGO_URL=mongodb+srv://<username>:<password>@cluster.mongodb.net/chat-app
```

### 5. Start the application

#### Start the backend server
```bash
cd server
npm run start
# or for development with nodemon
npm run dev
```

#### Start the frontend (in a new terminal)
```bash
cd public
npm start
```

The application will be available at:
- **Frontend**: http://localhost:3000
- **Backend**: http://localhost:5000

## 📁 Project Structure

```
├── public/                 # React frontend
│   ├── src/
│   │   ├── components/     # Reusable React components
│   │   ├── pages/          # Page components
│   │   ├── assets/         # Static assets and images
│   │   └── utils/          # Utility functions and API routes
│   └── package.json
├── server/                 # Node.js backend
│   ├── controllers/        # Route controllers
│   ├── model/              # MongoDB models
│   ├── routes/             # API routes
│   ├── index.js           # Server entry point
│   └── package.json
└── README.md
```

## 🎯 Usage

1. **Register/Login**: Create a new account or login with existing credentials
2. **Set Avatar**: Choose an avatar for your profile
3. **Start Chatting**: Select contacts from the sidebar and start messaging
4. **Real-time Updates**: Messages appear instantly for all connected users

## 🔧 API Endpoints

### User Routes
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/setAvatar/:id` - Set user avatar
- `GET /api/auth/allusers/:id` - Get all users except current user

### Message Routes
- `POST /api/messages/addmsg` - Send a new message
- `POST /api/messages/getmsg` - Get messages between users

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the ISC License.

## 👨‍💻 Author

**zelabbas**
- GitHub: [@zelabbas](https://github.com/zelabbas)

## 🙏 Acknowledgments

- Socket.io for real-time communication
- React.js community for excellent documentation
- MongoDB for flexible data storage
- All contributors who helped improve this project

---
