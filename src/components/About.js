const About = () => {
    return (
        <div>
            <div className="container my-3">
                <h1>About Us</h1>
                <div className="accordion" id="accordionExample">
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseOne" aria-expanded="false" aria-controls="collapseOne">
                                Seamless Note Management
                            </button>
                        </h2>
                        <div id="collapseOne" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                NoteNest allows users to securely create, edit, delete, and organize their notes in a simple and intuitive interface, ensuring easy access to their information anytime.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseTwo" aria-expanded="false" aria-controls="collapseTwo">
                                Real-Time Data Synchronization
                            </button>
                        </h2>
                        <div id="collapseTwo" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                Built using the MERN stack (MongoDB, Express, React, Node.js), NoteNest offers real-time synchronization, ensuring that all updates to notes are immediately saved and reflected across devices.
                            </div>
                        </div>
                    </div>
                    <div className="accordion-item">
                        <h2 className="accordion-header">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapseThree" aria-expanded="false" aria-controls="collapseThree">
                                Secure and Scalable
                            </button>
                        </h2>
                        <div id="collapseThree" className="accordion-collapse collapse" data-bs-parent="#accordionExample">
                            <div className="accordion-body">
                                NoteNest incorporates user authentication with token-based security (JWT) to safeguard data, providing a secure environment for managing personal notes, with scalability to handle growing user needs.
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        </div>
    )
}

export default About
