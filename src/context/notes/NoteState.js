
import { useState } from "react";
import Notecontext from "./notecontext";

const NoteState = (props)=>{

    const initialnotes =  // hardcoring API 
    [
        {
            "_id": "63a951c4ff293e661dd08197",
            "user": "63a940a7b5b243191bd6ba66",
            "title": "1st note updating",
            "description": "I've updated my first note",
            "tag": "Update",
            "date": "2022-12-26T07:48:20.282Z",
            "__v": 0
        },
        {
            "_id": "63a95236ed971a69214c2948",
            "user": "63a940a7b5b243191bd6ba66",
            "title": "1st-b note updating",
            "description": "I've updated my 2nd note",
            "tag": "Update",
            "date": "2022-12-26T07:50:14.166Z",
            "__v": 0
        }
    ]

    const[notes , setnotes] = useState(initialnotes); 
    

    
    return(
        <Notecontext.Provider value={{notes , setnotes}} >
            {props.children}
        </Notecontext.Provider>

    )
}

export default NoteState;