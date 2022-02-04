import { Button } from "react-bootstrap";
import { IoMdArrowBack } from "react-icons/io";
import { Link } from "react-router-dom";
import "./GoBack.css";

interface GoBack {
    to: string;
}

function GoBack(props: GoBack): JSX.Element {
    return (
        <div className="GoBack">
            <Link to={props.to}><Button type="button" variant="outline-secondary" className="btn-md back-btn">
                <span className="icon"><IoMdArrowBack /></span> Back</Button>
            </Link>
        </div>
    );
}

export default GoBack;
