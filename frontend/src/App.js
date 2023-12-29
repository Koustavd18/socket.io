import "./App.css";
import io from "socket.io-client";
import { useEffect, useState } from "react";

const socket = io.connect("http://localhost:3001");

function App() {
  const [id, setId] = useState("");
  const [to, setTo] = useState("");
  const [from, setFrom] = useState("");
  const [message, setMessage] = useState("");
  const [messageReceived, setMessageReceived] = useState("");

  useEffect(() => {
    const sId = socket.id;
    setId(sId);
    console.log(sId);

    socket.on("connect", () => {
      console.log(socket);
    });
    socket.on("receive_message", (data) => {
      setMessageReceived(data.message);
      setFrom(data.id);
      console.log(data);
    });
  }, [socket]);

  const sendMessage = () => {
    socket.emit("send_message", { message, to, id });
  };

  return (
    <div className="App">
      <input
        placeholder="To.... "
        onChange={(event) => {
          setTo(event.target.value);
        }}
      />
      <input
        placeholder="Message..."
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <button onClick={sendMessage}> Send Message</button>
      <h1> Message:</h1>
      {messageReceived}
      <h2>From:</h2>
      {from}
    </div>
  );
}

export default App;
