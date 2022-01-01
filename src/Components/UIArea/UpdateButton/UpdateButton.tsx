import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsPencilSquare } from "react-icons/bs";
import { Link } from "react-router-dom";
import "./UpdateButton.css";

interface UpdateButtonProps {
    path: string;
    id: number;
    tooltipMsg: string;
}

function UpdateButton(props: UpdateButtonProps): JSX.Element {
    return (
        <span className="UpdateButton">
            <OverlayTrigger placement='top' overlay={(p) => (
                <Tooltip {...p}>
                    {props.tooltipMsg}
                </Tooltip>
            )}>

            <Link to={props.path + '/' + props.id} className="btn btn-outline-info"><BsPencilSquare /></Link>
            </OverlayTrigger>
        </span>
    );
}

export default UpdateButton;
