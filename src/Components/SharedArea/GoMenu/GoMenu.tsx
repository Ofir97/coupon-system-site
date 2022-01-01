import { Link } from "react-router-dom";
import "./GoMenu.css";

interface GoMenuProps {
    to: string;
}

function GoMenu(props: GoMenuProps): JSX.Element {
    return (
        <div className="GoMenu">
			<Link to={props.to}><button type="button" className="btn btn-secondary btn-md back-btn">Back to Menu</button></Link>
        </div>
    );
}

export default GoMenu;
