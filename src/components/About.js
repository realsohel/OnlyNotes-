import React , { useContext , useEffect} from 'react'
import notecontext from '../context/notes/notecontext'
// import { useEffect } from 'react';

const About = () => {

    const a = useContext(notecontext);

    useEffect(()=>{
        a.update()
        // eslint-disable-next-line
    },[])
    return (
        <div>
        <h1>THIS IS ABOUT  {a.state.name} & {a.state.umar}</h1>
        </div>
    )
}

export default About
