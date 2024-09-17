import React from 'react'
import Notes from './Notes';

const Home1 = (props) => {
    const { showAlert } = props;
    return (
        <div>
            <Notes showAlert={showAlert} />
        </div>
    )
}

export default Home1
