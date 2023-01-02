import React , {useContext} from 'react'
import { useParams } from 'react-router-dom'
import notecontext from '../context/notes/notecontext'

const Notedetails = () => {

    function convertToSlug(text){
        return text.toLowerCase().replace(/[^\w-]+/g, '');
    }

    const params = useParams();
    console.log(params.id);

    const context = useContext(notecontext);
    let {notes} = context;

    console.log(notes);
    const n = notes.find((np)=>{ return (np.id===params.id) });
    console.log(n);
    
    return (
        <div>
        <h2>{params.id}</h2>
        helllo
        </div>
    )
}

export default Notedetails
