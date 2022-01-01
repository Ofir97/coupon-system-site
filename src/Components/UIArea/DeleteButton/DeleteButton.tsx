import { useState } from "react";
import { Button, Modal, OverlayTrigger, Tooltip } from "react-bootstrap";
import { BsTrash } from "react-icons/bs";
import "./DeleteButton.css";

interface DeleteButtonProps {
    cb: Function;
    resource: string;
    id: number;
}

function DeleteButton(props: DeleteButtonProps): JSX.Element {

    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete {props.resource}</Modal.Title>
                </Modal.Header>
                <Modal.Body>Are you sure you want to delete this {props.resource}?</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                    <Button variant="primary" onClick={() => {handleClose(); props.cb(props.id);}}>
                        Delete {props.resource}
                    </Button>
                </Modal.Footer>
            </Modal>

            <span className="DeleteButton">
                <OverlayTrigger placement='top' overlay={(p) => (
                    <Tooltip {...p}>
                        delete {props.resource}
                    </Tooltip>
                )}>
                    <button type="button" className="btn btn-outline-danger" onClick={() => { handleShow() }}><BsTrash /></button>
                </OverlayTrigger>
            </span>
        </>
    );
}

export default DeleteButton;
