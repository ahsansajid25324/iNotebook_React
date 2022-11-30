import React from 'react'
import { noteContext } from '../context/notes/noteState'
import { useContext } from 'react'


function Noteitem(props) {
  const context = useContext(noteContext);
  const { deleteNote } = context;
  const {note,updatenote}=props


 

  return (
    <div className="col-md-2">
        
        
        <div className="card my-2" >
  
        <div className="card-body">
            <div className='d-flex align-items-center'>
            <h5 className="card-title">{props.note.title}</h5><i className="fa-solid fa-trash mx-2" onClick={()=>{deleteNote(note._id)}}> </i>
            <i className="fa-solid fa-pen-to-square mx-1" onClick={()=>{updatenote(note)}}></i>
            </div>
            
            <p className="card-text">{props.note.description}</p>
          
            

        </div>
        </div>
        
      
    </div>
  )
}

export default Noteitem
