# chat-app-backend
Backend Services with Nodejs, Typescript, SocketIo

## Features (APIs)
- User Register/Login
- User Connection List
- User Private Conversation Add/List
- Authentication for Rest APIs and Scoket Connection
- Send/Receive Message through socket-io

  ## Mostly Used Technology Features
- Typescript
- Express.js
- mongoose
- jsonwebtoken
- socket.io
- bcrypt

## .env Setup

```
# Environment type
ENV=DEV

NAME="Chat App"
VERSION="0.0.1"

LOG_PATH=./logs/

# API Paths
COMMON_API='/'

# Port
API_PORT=8080

API_URL=

#mongodn Connect
MONGO_HOST=mongodb+srv://mynkmk5:mynk.mk5@mynkmk5.tkjgfl1.mongodb.net/tekzy

AES_SECRETE_KEY=aes key
JWT_SECRET=jwt secret
JWT_EXPIRE_TIME=10000


# Debug 
LOG_LEVEL=debug

# Public path
PUBLIC_PATH=

```

## Quickstart
Install dependencies and Run Server in you local System. (Before Run application, Set .env file)
```
npm install
npm start
```

### Default Running on Port
> 8080

### API Path
> http://localhost:8080

### Socket Connection URL
> http://localhost:8080

### API List
| Path | Method   | Schema   |
| :---:   | :---: | :---: |
| /user/signup | POST | ``` { firstName: string,lastName: string,email: string,password: string }``` |
| /user/login | POST | ``` { email: string,password: string }``` |
| /user/connection?search= | GET | ``` { search : string }``` |
| /conversation | POST | ``` { "senderId":string,"text":string }``` |
| /conversation | GET | ``` { "receiverId":string }``` |
