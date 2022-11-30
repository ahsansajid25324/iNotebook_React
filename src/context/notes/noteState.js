import React, { createContext } from "react";
import { useState } from "react";
const noteContext = createContext();

const NoteState = (props) => {
  const material =[]

 
  // }
  const [notes, setnotes] = useState(material);
  // console.log( "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4MzdmMTQ2MzAxZjQ5MzVmZTBkMmNjIn0sImlhdCI6MTY2OTU2NjAwOH0.Ds6G4RXujeE6lBUdWoFMyHuwurx9MBTA8TBpptXnbqo")

  const getallNotes =async()=>{
    


  const response = await fetch("http://localhost:5000/api/notes/fetchnotes", {
      method: "GET",
  
      headers: {
        "Content-Type": "application/json",
        "auth-token":  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4MzdmMTQ2MzAxZjQ5MzVmZTBkMmNjIn0sImlhdCI6MTY2OTU2NjAwOH0.Ds6G4RXujeE6lBUdWoFMyHuwurx9MBTA8TBpptXnbqo"
        // localStorage.getItem("token")
        
         
      }
      
      
  
    });



    const json =await response.json()
    setnotes(json)
    
  };
  
   



  const addNote = async(title, description, tag) => {

    const response = await fetch("http://localhost:5000/api/notes/addnote", {
      method: "POST",
  
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4MzdmMTQ2MzAxZjQ5MzVmZTBkMmNjIn0sImlhdCI6MTY2OTU2NjAwOH0.Ds6G4RXujeE6lBUdWoFMyHuwurx9MBTA8TBpptXnbqo"
      },
  
      body: JSON.stringify({title, description, tag})
    });

    const note=await response.json()
   
    
    

    setnotes(notes.concat(note));
  };



  const deleteNote = async(id) => {

    const response = await fetch(`http://localhost:5000/api/notes/deletenote/${id}`, {
      method: "GET",
  
      headers: {
        "Content-Type": "application/json",
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4MzdmMTQ2MzAxZjQ5MzVmZTBkMmNjIn0sImlhdCI6MTY2OTU2NjAwOH0.Ds6G4RXujeE6lBUdWoFMyHuwurx9MBTA8TBpptXnbqo"
      }
  
     
    });

    console.log("id" + id);

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };




  const editNote = async (id, title, description, tag) => {
    
    let newNotes=JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < newNotes.length; index++){
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
      setnotes(newNotes)
    }
    

    const response = await fetch(`http://localhost:5000/api/notes/updatenote/${id}`, {
      method: "PUT",
  
      headers: {
        "Content-Type": "application/json",
        
        "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjM4MzdmMTQ2MzAxZjQ5MzVmZTBkMmNjIn0sImlhdCI6MTY2OTU2NjAwOH0.Ds6G4RXujeE6lBUdWoFMyHuwurx9MBTA8TBpptXnbqo"
      },
  
      body: JSON.stringify({title, description, tag})
      
      
    });
    
    
    
    
  
};

  return (
    <noteContext.Provider value={{ notes, addNote, deleteNote, editNote,getallNotes }}>
      {props.children}
    </noteContext.Provider>
  );
};

export { NoteState, noteContext };
