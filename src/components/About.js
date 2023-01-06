import React  from 'react' 
import logoweb3_edit from "./logoweb3_edit.png"

const About = (props) => {

    document.title='OnlyNotes - About Us'

    return (
        <>
        <div className='container d-flex justify-content-center my-5  animate__animated animate__backInDown'>
        <img src={logoweb3_edit} alt="" />
        </div>
        <div style={{marginBottom: '288px'}} className={` text-${props.text}`}>
            <h2 className='container animate__animated animate__backInDown'>
                OnlyNotes - Where you can store your notes on the cloud securely. 
            </h2>
            <div className="container border my-4 mt-4">
                <h4>Usualy Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla pariatur natus dignissimos commodi! Laborum, enim illum error quidem veniam libero iste blanditiis a repellendus recusandae tempore et inventore ducimus labore dolore. Ab a totam fugit omnis cumque voluptates beatae eum.</h4>
            </div>
        </div>
        </>
    )
}

export default About
