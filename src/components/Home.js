
import Notes from './Notes';

const Home = (props) => {
    return (
    <>  
        
        <Notes mode={props.mode} text={props.text} showAlert={props.showAlert}/>

    </>
    )
}

export default Home
