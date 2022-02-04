import { Link } from "react-router-dom";
import "./GoMenu.css";
import { HiMenu } from "react-icons/hi";
import { Button } from "react-bootstrap";

interface GoMenuProps {
    to: string;
}

function GoMenu(props: GoMenuProps): JSX.Element {
    return (
        <div className="GoMenu">
            <Link to={props.to}><Button type="button" variant="outline-secondary" className="btn-md back-btn">
                <span className="icon"><HiMenu /></span> Back to Menu</Button>
            </Link>
        </div>
    );
}

export default GoMenu;
