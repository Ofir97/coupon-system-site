import { RiAddFill } from "react-icons/ri";
import { Link } from "react-router-dom";
import "./AddButton.css";
import Tooltip from 'react-bootstrap/Tooltip';
import { OverlayTrigger } from "react-bootstrap";

interface AddButtonProps {
    path: string;
    tooltipMsg: string;
}

function AddButton(props: AddButtonProps): JSX.Element {
    return (
        <span className="AddButton">
            <OverlayTrigger placement='top' overlay={(p) => (
                    <Tooltip {...p}>
                        {props.tooltipMsg}
                    </Tooltip>
                )}>
                <Link to={props.path} className="btn btn-outline-light"><RiAddFill /></Link>
            </OverlayTrigger>
        </span>
    );
}

export default AddButton;
