import React, { useEffect, useRef, useState} from 'react'
import  { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { noteContext } from '../context/notes/noteState'
import Noteitem from './Noteitem'

function Notes() {
 

  const context=useContext(noteContext)
  let Navigate=useNavigate()
  const {notes,getallNotes,editNote}=context
  useEffect(()=>{
  

      getallNotes()

    
    

    
    // eslint-disable-next-line
  })
  const ref=useRef(null);
  const refclose=useRef(null);
  const [note,setnote]=useState({id:" ",etitle:" ",edescription:" ",etag:" "})
  const updatenote=(currentnote)=>{
    ref.current.click()
    setnote({id:currentnote._id,etitle:currentnote.title,edescription:currentnote.edescription,etag:currentnote.tag})
   
  
   }
  

  const handleClick = (e) => {
    editNote(note.id,note.etitle,note.edescription,note.etag)
    console.log("updating the note",note)
    
    refclose.current.click()
  };
  const onChange = (e) => {
    

    setnote({ ...note, [e.target.name]: e.target.value });
  };
  

  return (
 
    <>


    <button  ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
      Launch demo modal
    </button>


    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div className="modal-body">

            <form>

              <div className="mb-3">
                <label htmlFor="title" className="form-label">Title</label>
                <input type="text" className="form-control" id="etitle" name="etitle"  onChange={onChange} aria-describedby="emailHelp" />
              </div>
              <div className="mb-3">
                <label htmlFor="description" className="form-label">Description</label>

                <input type="text"className="form-control"  id="edescription" name="edescription"   onChange={onChange}/>
              </div>
              <div className="mb-3">
                <label htmlFor="tag" className="form-label">Tag</label>

                <input type="text"className="form-control" id="etag" name="etag"   onChange={onChange}/>
              </div>

            </form>


       
          </div>
          <div className="modal-footer">
            <button ref={refclose} type="button" className="btn btn-primary" data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary" onClick={handleClick}>Update Note</button>
          </div>
        </div>
      </div>
    </div>
    
   

    
    
    
    <div className="row my-3">
        {notes.map((note)=>{
            return <Noteitem  key={note._id} updatenote={()=>{updatenote(note)}} note={note}></Noteitem>

          })}
      
    </div>
     

    </>
  )

}

export default Notes
