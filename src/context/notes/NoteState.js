
import { useState } from "react";
import Notecontext from "./notecontext";

const NoteState = (props)=>{

    const host="http://localhost:5000" 

    const initialnotes = []// hardcoring API 
    const[notes , setnotes] = useState(initialnotes); 

    // Fetch all  Notes.
    const fetchnotes = async()=>{
        // API call will be done here later. 
        const response = await fetch(`${host}/api/notes/fetchallnotes`, {
            method: 'GET', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzU1NGQxZTAyNTljZTE1ODcwMzc1In0sImlhdCI6MTY3MjIzODQxM30.-0gG-fmHK0dZFNjTKlwN9wY82OjTE6ApG0zReOgLeWY"
            },
        });
            const json =  await response.json(); 
            console.log(json);
            setnotes(json);

    }

    // Add a Note.
    const addNote = async(title, description , tag)=>{
        // API call will be done here later. 
        const response = await fetch(`${host}/api/notes/addnote`, {
            
            method: 'POST', // *GET, POST, PUT, DELETE, etc.
            headers: {
                'Content-Type': 'application/json',
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzU1NGQxZTAyNTljZTE1ODcwMzc1In0sImlhdCI6MTY3MjIzODQxM30.-0gG-fmHK0dZFNjTKlwN9wY82OjTE6ApG0zReOgLeWY"
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
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzU1NGQxZTAyNTljZTE1ODcwMzc1In0sImlhdCI6MTY3MjIzODQxM30.-0gG-fmHK0dZFNjTKlwN9wY82OjTE6ApG0zReOgLeWY"
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
                "auth-token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjNhYzU1NGQxZTAyNTljZTE1ODcwMzc1In0sImlhdCI6MTY3MjIzODQxM30.-0gG-fmHK0dZFNjTKlwN9wY82OjTE6ApG0zReOgLeWY"
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
    

    
    return(
        <Notecontext.Provider value={{notes , addNote, deleteNote , editNote, fetchnotes}} >
            {props.children}
        </Notecontext.Provider>

    )
}

export default NoteState;