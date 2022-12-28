import React, { useContext } from 'react'
import notecontext from '../context/notes/notecontext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(notecontext); // using context
    const{notes} = context; // detruxting notes = notes(from Notestate.js) & setnote = setnote(from Notestate.js)
    
    return (
        <>
        <AddNote />
        <hr />
        <div className="row my-3">
            <h2>Your NOTES</h2>

            {notes.map((note)=>{   // maping 
                return <NoteItem  key={note._id}note={note}/>; 

            })}
        </div>
        </>
    )
}

export default Notes
