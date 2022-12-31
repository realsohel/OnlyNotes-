import React, {useContext, useState} from 'react'
import notecontext from '../context/notes/notecontext'

const AddNote = (props) => {
    const context = useContext(notecontext); // using context
    const{addNote} = context; // detruxting notes = notes(from note.js) & setnote = setnote(from note.js)
    const[note , setNote] = useState({title: "", description: "", tag:""})

    const Addnotebtn = (e)=>{ //submit btn
            e.preventDefault();
            addNote(note.title , note.description , note.tag);
            setNote({title: "", description: "", tag:""});
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
                    <input type="text" className={`form-control text-${props.text} bg-${props.mode}`} id="title" name="title"  value={note.title} onChange={onChange} aria-describedby="emailHelp" />
                    <div  className="form-text">Min 3 characters</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label" ><b>Description</b></label>
                    <input type="text" className={`form-control text-${props.text} bg-${props.mode}`} id="description" name="description" value={note.description} onChange={onChange} />
                    <div  className="form-text">Min 4 characters</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label" ><b>Tag</b></label>
                    <input type="text" className={`form-control text-${props.text} bg-${props.mode}`} id="tag" name="tag" value={note.tag} onChange={onChange} />
                </div>
                <button disabled={( note.title.length< 3) || (note.description.length<4 )} type="submit" className="btn btn-primary" onClick={Addnotebtn}>Add Note</button>
            </form>
            </div>
        </div>
    )
}

export default AddNote
