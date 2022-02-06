import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { BsFillMoonFill, BsFillSunriseFill, BsFillSunsetFill, BsSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import notify, { ErrMsg } from "../../../Services/Notification";
import "./CompanyPage.css";

function CompanyPage(): JSX.Element {

    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());
    const [numOfCompanyCoupons, setNumOfCompanyCoupons] = useState(store.getState().companyCouponsState.companyCoupons?.length)

    useEffect(() => {
        if (!store.getState().authState?.user) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
            return;
        }

        if (store.getState().authState?.user?.clientType.toString() !== 'COMPANY') {
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
        const userName = store.getState().authState?.user?.name;
        const hour = time.getHours();
        if (hour >= 5 && hour < 12) return <>Good Morning {userName}! <span className="hour-icon"><BsFillSunriseFill/></span></>;
        if (hour >= 12 && hour < 17) return <>Good Afternoon {userName}! <span className="hour-icon"><BsSunFill/></span></>;
        if (hour >= 17 && hour < 21) return <>Good Evening {userName}! <span className="hour-icon"><BsFillSunsetFill/></span></>;
        return <>Good Night {userName}! <span className="hour-icon"><BsFillMoonFill/></span></>;
    }

    return (
        <div className="CompanyPage">
            <h2 className="display-6">{displayGreetings(time)}</h2>
            <div className="row">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">View Coupons</h5>
                            <h5>{numOfCompanyCoupons > 0 && <Badge pill bg="secondary" text="light">
                                {numOfCompanyCoupons} coupons
                            </Badge>}
                            </h5>
                            <p className="card-text">Show all company's coupons.</p>
                            <Link to="coupons" className="btn btn-outline-secondary">Show Coupons</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">See your Profile</h5>
                            <p className="card-text">View your personal info.</p>
                            <Link to="company-details" className="btn btn-outline-secondary">Show Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Add Coupon</h5>
                            <p className="card-text">Add a new Coupon.</p>
                            <Link to="add-coupon" className="btn btn-outline-secondary">Add Coupon</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyPage;
