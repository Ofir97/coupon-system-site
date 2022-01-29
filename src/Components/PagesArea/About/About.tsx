import "./About.css";
import { IoIosContact } from "react-icons/io";
import { BsQuestionCircleFill } from "react-icons/bs";
import { HiOutlineDesktopComputer } from "react-icons/hi";
import { Link } from "react-router-dom";

function About(): JSX.Element {
    return (
        <div className="About">
            <h2 className="display-5">About Coupon System</h2>

            <div className="card">
                <h5 className="card-header"><span className="question-logo"><BsQuestionCircleFill /></span> WHO WE ARE</h5>
                <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5> */}
                    <p className="card-text">Coupon System is designed to promote the selling of coupons by companies.<br />
                        Customers that are registered to the system are able to purchase coupons. <br />
                        All coupons in the system are divided into categories to better suit your personal needs! <br />
                        Coupon can be purchased only once! Also, please pay attention to the expiration date of the coupon you are interested in.
                    </p>
                </div>

                <h5 className="card-header"><span className="technology-logo"><HiOutlineDesktopComputer /></span> THE TECHNOLOGIES</h5>
                <div className="card-body">
                    {/* <h5 className="card-title">Special title treatment</h5> */}
                    <p className="card-text">Coupon System has been created with React library for a great UI experience supporting SPA! <br />
                        As you might have noticed - there is only one single page in the whole application, so moving between pages is easy, quick and super convenient!<br />
                        The server side has been created with Spring Boot framework.
                    </p>
                </div>

                <h5 className="card-header"> <span className="contact-logo"><IoIosContact /></span> CONTACT US</h5>
                <div className="card-body">
                    <Link to="/contact-us" className="btn btn-outline-primary">Visit Contact-Us</Link>
                </div>

            </div>
        </div>
    );
}

export default About;
