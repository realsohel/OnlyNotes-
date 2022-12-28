import React, {useContext} from 'react'
import notecontext from '../context/notes/notecontext';

function NoteItem(props) {

    const context = useContext(notecontext); // using context
    const{deleteNote} = context; // detruxting notes = notes(from note.js) & setnote = setnote(from note.js)
    
    const {note} = props;

    const deletingnote=()=>{
        let n = window.confirm("Do you really want to delete this note ? ");
        if(n){
            deleteNote(note._id);
        }
    }
    return (
        <div className={`col-md-3 my-3 text-${props.text} `}>
            <div className="card " >
                <div className={`card-body  bg-${props.mode}`}>
                    <div className={`d-flex align-items-center `}>
                    <h5 className={`card-title text-${props.text} bg-${props.mode}`}>{note.title}</h5>
                    <i className="fa-solid fa-trash-can mx-2" onClick={deletingnote}></i>
                    <i className="fa-solid fa-pen-to-square mx-2"></i>
                    </div>
                    <p className={`card-text text-${props.text} bg-${props.mode}`}>{note.description} </p>
                    
                </div>
            </div>
        </div>
    )
}

export default NoteItem
