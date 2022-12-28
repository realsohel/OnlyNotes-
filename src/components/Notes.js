import React, { useContext } from 'react'
import notecontext from '../context/notes/notecontext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(notecontext); // using context
    const{notes} = context; // detruxting notes = notes(from Notestate.js) & setnote = setnote(from Notestate.js)
    
    return (
        <>
        <AddNote mode={props.mode} text={props.text}/>
        <hr />
        <div className={`row my-3 text-${props.text}`}>
            <h2>Your NOTES</h2>
            
            {notes.map((note)=>{   // maping 
                return <NoteItem  key={note._id}note={note}  mode={props.mode} text={props.text} />; 

            })}
        </div>
        </>
    )
}

export default Notes
