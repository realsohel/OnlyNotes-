
import Notes from './Notes';

const Home = (props) => {
    return (
    <>  
        
        <Notes mode={props.mode} text={props.text}/>

    </>
    )
}

export default Home
