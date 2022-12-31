import React, { useContext, useEffect , useRef , useState } from 'react'
import { useNavigate } from 'react-router-dom';
import notecontext from '../context/notes/notecontext'
import AddNote from './AddNote';
import NoteItem from './NoteItem';

const Notes = (props) => {
    const context = useContext(notecontext); // using context
    const{notes , fetchnotes , editNote} = context; // detruxting notes = notes(from Notestate.js) & setnote = setnote(from Notestate.js)
    
    const ref = useRef(null);
    const refClose = useRef(null);
    const[note , setNote] = useState({ id:"", etitle: "", edescription: "", etag:""})
    let history = useNavigate();

        useEffect(()=>{
            if(localStorage.getItem('token')){
                fetchnotes();
            }
            else{
                props.showAlert("Login/SignUp before visiting to Home page" , 'warning')
                history("/login");
            }
            // eslint-disable-next-line
        },[])


        const updateNote = (currentNote)=>{
            ref.current.click();
            setNote({ id:currentNote._id, etitle: currentNote.title ,edescription: currentNote.description , etag : currentNote.tag });
            
            // console.log({etitle: currentNote.title ,edescription: currentNote.description , etag : currentNote.tag })
        }

        const Addnotebtn = (e)=>{ //submit btn

            e.preventDefault();
            editNote(note.id , note.etitle , note.edescription , note.etag);
            props.showAlert("Note updated  Successfully." , "success");
            refClose.current.click()
            
    }

        const onChange = (e)=>{
            setNote({...note , [e.target.name]: e.target.value});
            // console.log(note)
        }
    return (
        <>
        <AddNote mode={props.mode} text={props.text} showAlert={props.showAlert}/> 
        <hr className={` text-${props.text}`}/>

        
    
        {/* <!-- Button trigger modal --> */}
    <button type="button" ref={ref} className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
    Launch demo modal
    </button>

    {/* <!-- Modal --> */}
    <div className={`modal fade text-${props.text}`} id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div className="modal-dialog">
        <div className="modal-content">
        <div className={`modal-header bg-${props.mode}`}>
            <h5 className="modal-title " id="exampleModalLabel ">Edit Note</h5>
            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div className={`modal-body bg-${props.mode}`}>
            <form>
                <div className="mb-3">
                    <label htmlFor="etitle" className="form-label" ><b> Title</b></label>
                    <input type="text" className={`form-control text-${props.text} bg-${props.mode}`} id="etitle" name="etitle" onChange={onChange} value={note.etitle} aria-describedby="emailHelp" />
                    <div  className="form-text">Min 3 characters</div>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="edescription" className="form-label" ><b>Description</b></label>
                    <input type="text" className={`form-control text-${props.text} bg-${props.mode}`} id="edescription" name="edescription" value={note.edescription} onChange={onChange} />
                    <div  className="form-text">Min 4 characters</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="etag" className="form-label" ><b>Tag</b></label>
                    <input type="text" className={`form-control text-${props.text} bg-${props.mode}`} id="etag" name="etag" value={note.etag} onChange={onChange} />
                </div>
            </form>
        </div>
        <div className={`modal-footer bg-${props.mode}`}>
            <button type="button" className="btn btn-secondary" ref={refClose} data-bs-dismiss="modal">Close</button>
            <button disabled={( note.etitle.length< 3) || (note.edescription.length<4 )} type="button" className="btn btn-primary"  onClick={Addnotebtn} >Save changes</button>
        </div>
        </div>
    </div>
    </div>
        <div className={`row my-3 text-${props.text}`}>
            <h2 className='my-3'>Your NOTES</h2>
            <div className="container mx-3 my-3  ">
                <h2>{notes.length===0 && "No notes!  Your Notes will be displayed here! "}</h2>
            </div>
            {notes.map((note)=>{   // maping 
                return <NoteItem  key={note._id}note={note} updateNote={updateNote} mode={props.mode} text={props.text} showAlert={props.showAlert} />; 

            })}
        </div>
        </>
    )
}

export default Notes
