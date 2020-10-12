import React, {useEffect, useState} from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";
import Pusher from "pusher-js";
import axios from "./axios.js";

function App() {
  const  [messages, setMessages] = useState([]);
  useEffect(() => {
    axios.get('/messages/sync')
    .then(response =>{
      
      setMessages(response.data)
    } )
  }, [])

  useEffect(() => {
    // when the app load, run this piece of code, once
    const pusher = new Pusher('ea50c69ccb3fd03b258e', {
      cluster: 'eu'
    });

    const channel = pusher.subscribe('messages');
    channel.bind('inserted', (newMessage) => {
      alert(JSON.stringify(newMessage));
      setMessages([...messages, newMessage])  // "Keep all the messages but also add the new one"
    });
    return () => {
      channel.unbind_all();
      channel.unsubscribe();
    }
  }, [messages])
  console.log(messages)
  return (
    <div className="app">
      <div className="app__body">
        {/* Sidebar */}
        <Sidebar />
        {/* Chat component */}
        <Chat messsages={messages}/>
      </div>
    </div>
  );
}

export default App;
