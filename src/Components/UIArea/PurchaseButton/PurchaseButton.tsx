import { OverlayTrigger, Tooltip } from "react-bootstrap";
import "./PurchaseButton.css";

interface PurchaseButtonProps {
    cb: Function;
    couponId: number;
}

function PurchaseButton(props: PurchaseButtonProps): JSX.Element {
    return (
        <div className="PurchaseButton">
            <OverlayTrigger placement='top' overlay={(p) => (
                <Tooltip {...p}>
                    purchase coupon
                </Tooltip>
            )}>
            <button className="btn btn-success" onClick={() => props.cb(props.couponId)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-credit-card" viewBox="0 0 16 16">
                    <path d="M0 4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V4zm2-1a1 1 0 0 0-1 1v1h14V4a1 1 0 0 0-1-1H2zm13 4H1v5a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V7z" />
                    <path d="M2 10a1 1 0 0 1 1-1h1a1 1 0 0 1 1 1v1a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1v-1z" />
                </svg>
                <span className="purchase-span">Purchase</span>
            </button>
            </OverlayTrigger>
        </div>
    );
}

export default PurchaseButton;