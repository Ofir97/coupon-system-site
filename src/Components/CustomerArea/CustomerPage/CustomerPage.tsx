import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import notify, { ErrMsg } from "../../../Services/Notification";
import "./CustomerPage.css";

function CustomerPage(): JSX.Element {

    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());
    const [numOfCustomerCoupons, setNumOfCustomerCoupons] = useState(store.getState().customerCouponsState.customerCoupons?.length);
    const [numOfCoupons, setNumOfCoupons] = useState(store.getState().couponsState.coupons?.length)

    useEffect(() => {
        if (!store.getState().authState?.user) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
            return;
        }

        if (store.getState().authState?.user?.clientType.toString() !== 'CUSTOMER') {
            notify.error(ErrMsg.UNAUTHORIZED);
            navigate('/');
            return;
        }

        const timerId = setInterval(() => {
            setTime(new Date())
        }, 1000)

        return () => clearInterval(timerId);
    })

    const displayGreetings = (time: Date) => {
        const hour = time.getHours();
        if (hour >= 5 && hour < 12) return 'Good Morning';
        if (hour >= 12 && hour < 17) return 'Good Afternoon';
        if (hour >= 17 && hour < 21) return 'Good Evening';
        return 'Good Night';
    }


    return (
        <div className="CustomerPage">
            <h2 className="display-6">{displayGreetings(time)} {store.getState().authState?.user?.name}!</h2>
            <div className="row">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">View all Coupons</h5>
                            <h5>{numOfCoupons > 0 && <Badge pill bg="secondary" text="light">
                                {numOfCoupons} coupons
                            </Badge>}
                            </h5>
                            <p className="card-text">Show all coupons of the system.</p>
                            <Link to="coupons" className="btn btn-outline-secondary">Show Coupons</Link>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">View your coupons</h5>
                            <h5>{numOfCustomerCoupons > 0 && <Badge pill bg="secondary" text="light">
                                {numOfCustomerCoupons} coupons
                            </Badge>}
                            </h5>
                            <p className="card-text">Show your purchased coupons.</p>
                            <Link to="purchased-coupons" className="btn btn-outline-secondary">Show Purchased Coupons</Link>
                        </div>
                    </div>
                </div>

                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">See your Profile</h5>
                            <p className="card-text">View your personal info.</p>
                            <Link to="customer-details" className="btn btn-outline-secondary">Show Details</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CustomerPage;
