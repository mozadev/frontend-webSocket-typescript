import { Manager } from "socket.io-client"

export const connecToServer = () => {
        
    
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js')
    // localhost:3000/socket.io/socket.io.js
  

    const socket = manager.socket('/')
    console.log({socket})
}