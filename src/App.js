import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import "./App.css";
// import noteContext from "./context/notes/noteContext";
import { NoteState } from "./context/notes/noteState";
import Login from "./components/Login";

 
import { BrowserRouter, Routes, Route } from "react-router-dom";
// import Alert from "./components/Alert";
import Signup from "./components/Signup";

function App() {
  return (
    <>
      <NoteState>
        <BrowserRouter>
      

          <Navbar />
          
          {/* <Alert message="Welcome in iNotebook"></Alert> */}

          <div className="container">
            <Routes>
              <Route exact path="/" element={<Home />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
          </div>
        </BrowserRouter>
      </NoteState>
    </>
  );
}

export default App;
