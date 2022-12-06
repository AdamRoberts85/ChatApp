
import './App.css';
import io from "socket.io-client"
import {useEffect, useState} from 'react'

function App() {

  const [socket] = useState(() => io(":8000"))
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])

  useEffect (() => {
    //listen from the server
    socket.on("post the unicorns!", (msg) => {
      console.log(msg)
      setMessages(prevMessages => {
        return [msg, ...prevMessages];
      })
    })

    return () => socket.disconnect(true)
  }, [socket])

  //input change
  const onChangeHanlder = e => {
    setInput(e.target.value)
  }
  //form submit
  const submitHandler = e => {
    e.preventDefault();

    // send stuff to the server "Marco!"
    socket.emit("Magical Unicorns Arise!", input)
    setInput("");
  }

  return (
    <div className="App">
      <h1>Hello socket.io</h1>

      <form onSubmit={submitHandler} >
        <input onChange={onChangeHanlder} value={input}/>
        <button>submit</button>
      </form>
      {
        messages.map((message, i) => {
          return (
            <div key={i}>
              {message}
            </div>
          )
        })
      }

    </div>
  );
}

export default App;
