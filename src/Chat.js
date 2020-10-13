import { Avatar, Icon, IconButton } from "@material-ui/core";
import {
  AttachFile,
  InsertEmoticon,
  Mic,
  MoreVert,
  SearchOutlined,
} from "@material-ui/icons";
import React, {useState}  from "react";
import "./Chat.css";
import axios from "./axios.js";

function Chat({ messages }) {
  const [input, setInput] = useState ("");
  const sendMessage = async (e) =>{
    e.preventDefault();
    await axios.post('/messages/new',{
      message: input,
      name: "DEMO Name",
      timestamp: "DEMO Timestamp",
      received: true
    });
    setInput('');
  };

  return (
    <div className="chat">
      <div className="chat__header">
        <Avatar />
        <div className="chat__headerInfo">
          <h3>Room name</h3>
          <p>Last seen at...</p>
        </div>

        <div className="chat__headerRight">
          <IconButton>
            <SearchOutlined />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>
      <div className="chat__body">
        {/* Could put messsage as a component */}
        {messages.map(message => (
          <p className={`chat__message ${message.received && "chat__receiver"}`}>
            <span className="chat__name">{message.name}</span>
              {message.message}
            <span className="chat__timestamp">{message.timestamp}</span>
          </p>
        ))}
        
        {/* <p className="chat__message chat__receiver">
          <span className="chat__name">Author</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p>
        <p className="chat__message">
          <span className="chat__name">Author</span>
          This is a message
          <span className="chat__timestamp">{new Date().toUTCString()}</span>
        </p> */}
      </div>
      <div className="chat__footer">
        <InsertEmoticon />
        <form>
          <input value={input} onChange={e => setInput(e.target.value)}   placeholder="Type a message" type="text" />
          <button onClick={sendMessage} type="submit">Send a message</button>
        </form>
        <Mic />
      </div>
    </div>
  );
}

export default Chat;
