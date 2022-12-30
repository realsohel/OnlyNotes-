import React, { useContext, useEffect , useRef , useState } from 'react'
import notecontext from '../context/notes/notecontext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(notecontext); // using context
    const{notes , fetchnotes , editNote} = context; // detruxting notes = notes(from Notestate.js) & setnote = setnote(from Notestate.js)
    
    const ref = useRef(null);
    const refClose = useRef(null);
    const[note , setNote] = useState({ id:"", etitle: "", edescription: "", etag:""})

        useEffect(()=>{
            fetchnotes();
            // eslint-disable-next-line
        },[])


        const updateNote = (currentNote)=>{
            ref.current.click();
            setNote({ id:currentNote._id, etitle: currentNote.title ,edescription: currentNote.description , etag : currentNote.tag });
            console.log({etitle: currentNote.title ,edescription: currentNote.description , etag : currentNote.tag })
        }

        const Addnotebtn = (e)=>{ //submit btn

            e.preventDefault();
            editNote(note.id , note.etitle , note.edescription , note.etag);
            refClose.current.click()
    }

        const onChange = (e)=>{
            setNote({...note , [e.target.name]: e.target.value});
            console.log(note)
        }
    return (
        <>
        <AddNote mode={props.mode} text={props.text}/>
        <hr className={` text-${props.text}`}/>

        
    
        {/* <!-- Button trigger modal --> */}
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
    </button>

    {/* <!-- Modal --> */}
    <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className="modal-header">
            <h5 className="modal-title" id="exampleModalLabel">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className="modal-body">
            <form>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label" ><b> Title</b></label>
                    <input type="text" className={`form-control text-${props.text} bg-${props.mode}`} id="etitle" name="etitle" onChange={onChange} value={note.etitle} aria-describedby="emailHelp" />
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label" ><b>Description</b></label>
                    <input type="text" className={`form-control text-${props.text} bg-${props.mode}`} id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label" ><b>Tag</b></label>
                    <input type="text" className={`form-control text-${props.text} bg-${props.mode}`} id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
            </form>
        </div>
        <div className="modal-footer">
            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
            <button type="button" className="btn btn-primary"  onClick={Addnotebtn} >Save changes</button>
        </div>
        </div>
    </div>
    </div>
        <div className={`row my-3 text-${props.text}`}>
            <h2>Your NOTES</h2>
            
            {notes.map((note)=>{   // maping 
                return <NoteItem  key={note._id}note={note} updateNote={updateNote} mode={props.mode} text={props.text} />; 

            })}
        </div>
        </>
    )
}

export default Notes
