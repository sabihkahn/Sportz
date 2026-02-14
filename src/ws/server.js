import {WebSocket, WebSocketServer} from 'ws'


function sendSocket(socket,payload){
    if(socket.readyState !== WebSocket.OPEN) return;
    socket.send(JSON.stringify(payload))
    
}

function broadcast(wss,payload){
     
     for(const client of wss.clients){
        if(client.readyState !== WebSocket.OPEN) continue;
        client.send(JSON.stringify(payload))
     } 
      
      
}

export function attachwebsocketserver(server){

    const wss = new WebSocketServer({
        server,
        path: '/ws',
        maxPayload: 1024 * 1024,
    })

  wss.on('connection',(socket)=>{
    socket.isAlive = true
    socket.on('pong',()=>{socket.isAlive = true })
    sendSocket(socket,{type:"welcome"})
    socket.on('error',(err)=>{
        console.log('error',err);
        
    })
  })  
 
  function broadcastmatchcrated(match){
    broadcast(wss,{type:"match_created",data:match})
  }
  return {broadcastmatchcrated}

}


