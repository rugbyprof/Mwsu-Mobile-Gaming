## Just Notes

1. You need a game :)
2. You want to make it multiplayer.
3. You need a server (unless your going peer to peer or (P2P)).
4. You need to have code on the server listening for:
    - new players
    - players moves / actions 
    - basically any and all "values" necessary to maintain game state. 
5. Server will broadcast necessary info to every player at a given interval.
6. Server will only accept predefined commands (for security).
7. Your client will also have to accept info from server (like other players actions) and update its own game state.

### Node Package Manager

We can't get away from managing packages, so ....

https://www.sitepoint.com/beginners-guide-node-package-manager/

### Guide to sockets.io 

This is a Bidirectional RPC (remote procedure call) library. That combine with node, can server our purposes.

http://rawkes.com/articles/creating-a-real-time-multiplayer-game-with-websockets-and-node.html

### Monit

```bash
check process tanks with pidfile "/var/run/tanks.pid"
    start program = "/sbin/start tanks" with timeout 30 seconds
    stop program = "/sbin/stop tanks"
    if failed
        port 10000
        protocol HTTP
        request "/index.html"
	with timeout 7 seconds
    then restart
```


### Upstart

Upstart helps us manage services that get started at boot time or stopped when shutting down (simply put). We will use 
upstart to create a "command" that will start and stop our little game server.

http://blog.terminal.com/getting-started-with-upstart/

```bash
description "Eureca game server script"
author "Griffin"

start on startup
stop on shutdown

script
    echo $$ > /var/run/eureca_server.pid
    /usr/bin/node /var/www/html/eureca_server/server.js
end script

pre-start script
    echo "[`date`] Starting Eureca Server" >> /var/log/eureca_server.log
end script

pre-stop script
    rm /var/run/eureca_server.pid
    echo "[`date`] Stopping Eureca Server" >> /var/log/eureca_server.log
end script
```

https://developer.valvesoftware.com/wiki/Latency_Compensating_Methods_in_Client/Server_In-game_Protocol_Design_and_Optimization#Client_Side_Prediction


http://socket.io/get-started/chat/


### Protocol Tradoffs

http://blogs.shephertz.com/2013/01/28/picking-the-right-communication-protocol-for-your-game/


https://github.com/xicombd/phaser-multiplayer-game/tree/a3aa46e1b86aa82f331fcd658caec92c3f3248df
