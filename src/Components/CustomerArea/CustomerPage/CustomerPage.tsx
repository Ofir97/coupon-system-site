import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { BsFillMoonFill, BsFillSunriseFill, BsFillSunsetFill, BsSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { CouponsListModel } from "../../../Models/models-lists/CouponsList";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import { customerCouponsDownloadedAction } from "../../../Redux/CustomerCouponsAppState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg } from "../../../Services/Notification";
import "./CustomerPage.css";

function CustomerPage(): JSX.Element {

    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());
    const [customerCoupons, setCustomerCoupons] = useState<Coupon[]>(store.getState().customerCouponsState.customerCoupons);
    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsState.coupons);

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

    const getAllCouponsFromServer = async () => {
        tokenAxios.get<CouponsListModel>(globals.urls.coupons)
            .then((response) => {
                store.dispatch(couponsDownloadedAction(response.data.coupons));
                setCoupons(response.data.coupons);
            })
            .catch((err) => {
                notify.error(err);
            })
    }

    const getCustomerCouponsFromServer = async () => {
        tokenAxios.get<CouponsListModel>(globals.urls.customerCoupons)
            .then(response => {
                store.dispatch(customerCouponsDownloadedAction(response.data.coupons));
                setCustomerCoupons(response.data.coupons);
            })
            .catch(err => {
                notify.error(err);
            })
    }

    useEffect(() => {
        coupons?.length === 0 && getAllCouponsFromServer();
        customerCoupons?.length === 0 && getCustomerCouponsFromServer();
    }, [])

    const displayGreetings = (time: Date) => {
        const userName = store.getState().authState?.user?.name;
        const hour = time.getHours();
        if (hour >= 5 && hour < 12) return <>Good Morning {userName}! <span className="hour-icon"><BsFillSunriseFill/></span></>;
        if (hour >= 12 && hour < 17) return <>Good Afternoon {userName}! <span className="hour-icon"><BsSunFill/></span></>;
        if (hour >= 17 && hour < 21) return <>Good Evening {userName}! <span className="hour-icon"><BsFillSunsetFill/></span></>;
        return <>Good Night {userName}! <span className="hour-icon"><BsFillMoonFill/></span></>;
    }


    return (
        <div className="CustomerPage">
            <h2 className="display-6">{displayGreetings(time)}</h2>
            <div className="row">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">View all Coupons</h5>
                            <h5>{coupons?.length > 0 && <Badge pill bg="secondary" text="light">
                                {coupons?.length} coupons
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
                            <h5>{customerCoupons?.length > 0 && <Badge pill bg="secondary" text="light">
                                {customerCoupons?.length} coupons
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
