import { Link } from "react-router-dom";
import "./GoHome.css";

function GoHome(): JSX.Element {
    return (
        <div className="GoHome">
			<Link to="/"><button type="button" className="btn btn-secondary btn-md back-btn">Back to Home</button></Link>
        </div>
    );
}

export default GoHome;
