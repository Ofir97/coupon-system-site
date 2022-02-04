import { Button } from "react-bootstrap";
import { AiOutlineHome } from "react-icons/ai";
import { Link } from "react-router-dom";
import "./GoHome.css";

function GoHome(): JSX.Element {
    return (
        <div className="GoHome">
			<Link to="/"><Button type="button" variant="outline-secondary" className="btn-md back-btn">
            <span className="icon"><AiOutlineHome/></span> Go Home</Button>
            </Link>
        </div>
    );
}

export default GoHome;
