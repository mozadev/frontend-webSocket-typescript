import { Manager, Socket } from "socket.io-client"

export const connecToServer = (token: string) => {
        
    
    const manager = new Manager('http://localhost:3000/socket.io/socket.io.js', {
        extraHeaders: {
            hola: 'mundo',
            authentication: token,
        }
    })
    // localhost:3000/socket.io/socket.io.js
  

    const socket = manager.socket('/')
    // console.log({socket})
    addListerners(socket);
}

const addListerners = (socket: Socket) => {

    const clientsUl = document.querySelector<HTMLOListElement>('#clients-ul')!;
    const messageForm =document.querySelector<HTMLFormElement>('#message-form')!;
    const messageInput = document.querySelector<HTMLInputElement>('#message-input')!;
    const messagesUl = document.querySelector<HTMLUListElement>('#messages-ul')!;
    const serverStatusLabel = document.querySelector<HTMLSpanElement>('#server-status')!;
    

// TODO: #clients-ul */

    socket.on('connect', () => {
        // console.log('Connected to server')
        serverStatusLabel.innerHTML='connected'
    })

    socket.on('disconnect', () => {
        // console.log('Disconnected from server')
        serverStatusLabel.innerHTML='disconnected'
    })

    socket.on('clients-updated', (clients: string[]) => {
        let clientsHtml = '';
        clients.forEach(clientId => {
            clientsHtml += `<li> ${clientId}</li>`
        })
        clientsUl.innerHTML = clientsHtml;
    //   console.log({clients})  
    })

    messageForm.addEventListener('submit', (event) => {
        event.preventDefault();
        if (messageInput.value.trim().length <= 0) return;
        
        socket.emit('message-from-client', {
            id: 'YO!!',
            message: messageInput.value,
        })

        messageInput.value = '';
        // console.log({ id: 'YO!!', message: messageInput.value })
    })

    socket.on('message-from-server', (payload: { fullName: string, message: string }) => {
        const newMessage = `
        <li>
        <strong>${payload.fullName}</strong>
        <span>${payload.message}</span>
        </li>
        `;
        const li = document.createElement('li');
        li.innerHTML = newMessage;
        messagesUl.append(li); 

    // console.log(payload)        
})
        
}

