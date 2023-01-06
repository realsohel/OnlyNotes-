
import Notes from './Notes';

const Home = (props) => {
    document.title = 'OnlyNotes - Home'
    return (
    <>  
        <Notes mode={props.mode} text={props.text} showAlert={props.showAlert}/>

    </>
    )
}

export default Home