import { useState } from "react";
import Notecontext from "./notecontext";

const NoteState = (props)=>{
    const s1 = {
        "name":"sohel",
        "umar": "19"
    }
    
    const[state , setstate] = useState(s1);

    const update = ()=>{

        setTimeout(() => {
            setstate({
                "name":"nandkishor",
                "umar": "35"
            })
        }, 2000);
        
    }

    
    return(
        <Notecontext.Provider value={{state , update}} >
            {props.children}
        </Notecontext.Provider>

    )
}

export default NoteState;