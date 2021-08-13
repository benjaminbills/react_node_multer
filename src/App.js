import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import axios from "axios";

function App() {
  const [name, setName] = useState();
  const [file, setFile] = useState();
  const send = (event) => {
    const data = new FormData();
    data.append("name", name);
    data.append("file", file);
    axios
      .post("http://localhost:3005/upload", data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err));
  };
  return (
    <div className="App">
      <header className="App-header">
        <form>
          <div>
            <label>Name</label>
            <input
              type="text"
              id="name"
              onChange={(event) => {
                const { value } = event.target;
                setName(value);
              }}
            />
          </div>
          <div>
            <label>File</label>
            <input
              type="file"
              id="file"
              encType="multipart/form-data"
              onChange={(event) => {
                const file = event.target.files[0];
                setFile(file);
              }}
            />
          </div>
        </form>
        <button onClick={send}>Send</button>
      </header>
    </div>
  );
}

export default App;
