import React, { useContext } from 'react'
import notecontext from '../context/notes/notecontext'
import NoteItem from './NoteItem';

const Notes = () => {
    const context = useContext(notecontext); // using context
    const{notes} = context; // detruxting notes = notes(from Notestate.js) & setnote = setnote(from Notestate.js)
    
    return (
        <div className="row my-3">
            <h2>Your NOTES</h2>

            {notes.map((note)=>{   // maping 
                return <NoteItem note={note}/>; 

            })}
        </div>
    )
}

export default Notes
