import { connecToServer } from './socket-client'
import './style.css'


document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
   <h1>Websocket - Client</h1>
   <span id="server-status">Offline</span>
  </div>
` 
connecToServer();


//setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)