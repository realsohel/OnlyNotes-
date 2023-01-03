import React , {useContext , useEffect} from 'react'
import { useParams } from 'react-router-dom'
import notecontext from '../context/notes/notecontext'

const Notedetails = (props) => {

    // function convertToSlug(text){
    //     return text.toLowerCase().replace(/[^\w-]+/g, '');
    // }

    const params = useParams();
    console.log(params.id);

    const context = useContext(notecontext);
    const {getnote , gettingnote} = context;


    console.log("id", getnote._id);
    // const n = getnote.find((np)=>{ return np._id===params.id});
    // console.log(n);

    useEffect(()=>{
        getnote(params.id);
            // console.log(getnote.id=params)
            
        
        // eslint-disable-next-line
    },[])

    
    console.log(gettingnote.title)

    // const capitalizeFirstLetter=(string) =>{
    //     return (string.charAt(0).toUpperCase() + string.slice(1)) ;
    // }
    
    return (
        <div className={`container border mr-4  text-${props.text}`}>
            <div className="container d-flex  flex-column justify-content-center my-4" style={{width: "50%"}}>
                <h3 className='justify-content-center text-align-center mt-4' style={{textAlign: "center"}}> {gettingnote.title}</h3>
                <hr />
                <h4 className=' font-weight-normal justify-content-center text-align-center mt-4' style={{textAlign: "center"}}> {gettingnote.description}</h4>
                <hr />
                <h5 className='text-muted justify-content-center text-align-center mt-4' style={{textAlign: "center"}}>#{gettingnote.tag}</h5>
            </div>
        </div>
    )
}

export default Notedetails
