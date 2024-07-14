import { Manager, Socket } from "socket.io-client"

export const connecToServer = () => {
        
    
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')
    // localhost:3000/socket.io/socket.io.js
  

    const socket = manager.socket('/')
    // console.log({socket})
    addListerners(socket);
}

const addListerners = (socket: Socket) => {

    const serverStatusLabel = document.querySelector('#server-status')!;

    socket.on('connect', () => {
        // console.log('Connected to server')
        serverStatusLabel.innerHTML='connected'
    })

    socket.on('disconnect', () => {
        // console.log('Disconnected from server')
        serverStatusLabel.innerHTML='disconnected'
    })
}

