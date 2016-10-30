# README
## TCP Chat Server

This library creates a simple command line chat interface for people connecting over a TCP network.

### SETUP
Install the package in the directory of your choice, note your machine's IP address, and navigate to the install directory on the command line interface of your choice. Take Mac OS X -bash terminal as the example here. 

### REQUIREMENTS
  - UNIX-LIKE command line terminal
  - Node.js; this can be found, downloaded and compiled via the instructions on nodejs.org.
  - An available TCP port for connecting the chat streams; 65000 is the default but can easily be changed in the code.
  - Like-minded confederates with terminal command line shells of their own

### STARTING THE SERVER 
In the project directory root, type `node ./lib/tcpChatServer.js`; OS X bash returns a confirmation prompt that says `server listening on 65000`.

### CONNECTING A CLIENT
To participate on the same machine running the server, type `telnet localhost 65000` after a telnet message with instructions as to how to disconnect, you will see a chat prompt with the message `Chatter no.1 has entered the ChatterBox!`  You may type your first chat message at the prompt below this greeting; hit return and other connected users will see your message.

### CONNECTING REMOTELY 
To connect remotely and chat, do as above but instead of typing `localhost`, type the IP address at which your machine accepts remote connections.  If this is on a shared local router, this information is available from the network's sytem administrator.  Note that other users will only be able to connect from inside the router firewall unless further provisions are made for them to do so from beyond the local area network.

### **_NEW!_** CHANGING YOUR CHATTER NAME
Changing your chat nickname is easy.  At your chat prompt just type `/nick`, a space, and the name you'd like to use.  All users will see a notification of your nickname change, and your new nickname will begin appearing to the left of your messages the next time you broadcast.

### DISCONNECTING TELNET
Use the instructions for your particular operating system or telnet client to disconnect.  In the OS X bash shell this would be to type ^] (ctrl + ]), wait for the telnet prompt, and then type ^C (ctrl + C).  Other users will see the message `Chatter no.1 has fled the ChatterBox!`
