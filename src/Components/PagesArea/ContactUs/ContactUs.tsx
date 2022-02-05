import "./ContactUs.css";
import { MdAlternateEmail } from 'react-icons/md';
import { AiFillLinkedin } from "react-icons/ai";
import {VscGithubInverted} from "react-icons/vsc";

function ContactUs(): JSX.Element {
    return (
        <div className="ContactUs">
            <h2 className="display-5">Contact Us</h2>
            <div className="card" style={{ width: "40rem" }}>
                <h5 className="card-header"><span className="logo"><MdAlternateEmail /></span> EMAIL</h5>
                <div className="card-body">
                    <p className="card-text">
                        pengoled@gmail.com
                    </p>
                </div>

                <h5 className="card-header"><span className="logo"><AiFillLinkedin /></span> LinkedIn</h5>
                <div className="card-body">
                    <p className="card-text">
                        <a href="https://www.linkedin.com/in/ofir-avraham-87260b227/" target={"_blank"}>My LinkedIn</a>
                    </p>
                </div>

                <h5 className="card-header"><span className="logo"><VscGithubInverted/></span> GitHub</h5>
                <div className="card-body">
                    <p className="card-text">
                        <a href="https://github.com/Pengoled" target={"_blank"}>My GitHub</a>
                    </p>
                </div>
                

            </div>
        </div>
    );
}

export default ContactUs;
