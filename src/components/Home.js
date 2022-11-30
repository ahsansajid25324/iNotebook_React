import React from "react";
import { useState } from "react";
import { useContext } from "react";
import { noteContext } from "../context/notes/noteState";
// import Notes from '../../backend/models/Notes'


import Notes from "./Notes";

function Home() {
  const [note, setnote] = useState({ title: "", description: "", tag: "" });
  const context = useContext(noteContext);
  const { addNote } = context;
  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title,note.description,note.tag);
    // setnote({ title: "", description: "", tag: "" })
  };
  const onChange = (e) => {
    

    setnote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div>
      <div className="container my-3">
        <h2>Add Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="exampleInputEmail1" className="form-label">
              Title
            </label>
            <input type="text" className="form-control" id="exampleInputEmail1" name="title" onChange={onChange} minLength={5} required  aria-describedby="emailHelp" />
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Description
            </label>

            <input type="text"className="form-control" name="description" minLength={5} required  onChange={onChange}/>
          </div>
          <div className="mb-3">
            <label htmlFor="exampleInputPassword1" className="form-label">
              Tag
            </label>

            <input type="text"className="form-control" name="description" minLength={5} required onChange={onChange}/>
          </div>

        <button disabled={note.title.length<5 ||note.description.length<5}type="submit" className="btn btn-primary" onClick={handleClick}> Add Note</button>
        </form>

        <div className=" my-3">
          <h2>Your Notes</h2>
          <Notes></Notes>
        </div>
      </div>
    </div>
  );
}

export default Home;
