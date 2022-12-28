import React, {useContext, useState} from 'react'
import notecontext from '../context/notes/notecontext'

const AddNote = (props) => {
    const context = useContext(notecontext); // using context
    const{addNote} = context; // detruxting notes = notes(from note.js) & setnote = setnote(from note.js)
    const[note , setNote] = useState({title: "", description: "", tag:"none"})

    const Addnotebtn = (e)=>{ //submit btn
            e.preventDefault();
            addNote(note.title , note.description , note.tag);
    }

    const onChange = (e)=>{
        setNote({...note , [e.target.name]:e.target.value});
    }
    return (
        <div className={`container my-3 text-${props.text} bg-${props.mode==="dark"?"#171717":"light"}`}>
            <h2>Add A  New Note:</h2>
            <div className="container my-3">
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label" ><b> Title</b></label>
                    <input type="text" className={`form-control text-${props.text} bg-${props.mode}`} id="title" name="title" onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" ><b>Description</b></label>
                    <input type="text" className={`form-control text-${props.text} bg-${props.mode}`} id="description" name="description" onChange={onChange} />
                </div>
                <div className="mb-3 form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                    <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                </div>
                <button type="submit" className="btn btn-primary" onClick={Addnotebtn}>Submit</button>
            </form>
            </div>
        </div>
    )
}

export default AddNote
