import React from "react";
import "./App.css";
import Chat from "./Chat";
import Sidebar from "./Sidebar";

function App() {
  return (
    <div className="app">
      <h1>Let's build a whatsapp clone with MERN stack !</h1>
      {/* Sidebar */}
      <Sidebar />
      {/* Chat component */}
      <Chat />
    </div>
  );
}

export default App;
