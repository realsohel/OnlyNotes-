
import { useState } from "react";
import Notecontext from "./notecontext";

const NoteState = (props)=>{

    const host="http://localhost:5000" 

    const initialnotes = []// hardcoring API 
    const[notes , setnotes] = useState(initialnotes);     
    // const [gettingnote , setgettingnote] = useState({title:"" , description:"" , tag:""});
    const [gettingnote , setgettingnote] = useState(initialnotes);

    // Fetch all  Notes.
    const fetchnotes = async()=>{
        // API call will be done here later. 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token" : localStorage.getItem('token')
            },
        });
            const json =  await response.json(); 
            console.log("data:" , json);
            setnotes(json);
            console.log("notes p: ", );

    }

    // Add a Note.
    const addNote = async(title, description , tag)=>{
        // API call will be done here later. 
        const response = await fetch(`${host}/api/notes/addnote`, {
            
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token" : localStorage.getItem('token') // storing in this computer
            },
            body: JSON.stringify({title , description , tag}) // body data type must match "Content-Type" header
        });
        
            const note = await response.json(); 
            setnotes(notes.concat(note));
        
    }

    // Delete a Note.
    const deleteNote = async (id)=>{
        // delete server side: API. 
        const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
            method: 'DELETE', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token" : localStorage.getItem('token')
            },
        });
            const json =  await response.json(); 
            console.log(json);

        //On client side
        console.log("deleting :" + id);
        const newnotes = notes.filter((note)=>{return  note._id!==id});
        setnotes(newnotes);
    }

    // Edit/update  a Note.
    const editNote = async (id , title , description , tag)=>{

        // API Call
        const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
            method: 'PUT', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token" : localStorage.getItem('token')
            },
            body: JSON.stringify({title , description , tag}) // body data type must match "Content-Type" header
        });
            const json =  await response.json(); 
            console.log(json);

        let newNote = JSON.parse(JSON.stringify(notes))
        //edit on client side.
        for (let index = 0; index < newNote.length; index++) {
            const element = newNote[index];
            if(element._id===id){
                newNote[index].title=title;
                newNote[index].description=description;
                newNote[index].tag=tag;
                break;
            }
        }
        setnotes(newNote);
    }

    // Fetch all  Notes.
    const getnote = async(id)=>{
        // API call will be done here later. 
        const response = await fetch(`${host}/api/notes/getnote/${id}`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token" : localStorage.getItem('token')
            },
        });
            const json =  await response.json(); 
            console.log("data:" , json);
            setgettingnote(json);

    }
    

    
    return(
        <Notecontext.Provider value={{notes , addNote, deleteNote , editNote, fetchnotes , getnote , gettingnote}} >
            {props.children}
        </Notecontext.Provider>

    )
}

export default NoteState;