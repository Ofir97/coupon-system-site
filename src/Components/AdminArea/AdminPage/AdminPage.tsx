import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { BsFillMoonFill, BsFillSunriseFill, BsFillSunsetFill, BsSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import store from "../../../Redux/Store";
import notify, { ErrMsg } from "../../../Services/Notification";
import "./AdminPage.css";

function AdminPage(): JSX.Element {

    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());
    const [numOfCompanies, setNumOfCompanies] = useState(store.getState().companiesState.companies?.length);
    const [numOfCustomers, setNumOfCustomers] = useState(store.getState().customersState.customers?.length);

    useEffect(() => {
        if (!store.getState().authState?.user) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
            return;
        }

        if (store.getState().authState?.user?.clientType.toString() !== 'ADMIN') {
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
        if (hour >= 5 && hour < 12) return <>Good Morning Admin! <span className="hour-icon"><BsFillSunriseFill/></span></>;
        if (hour >= 12 && hour < 17) return <>Good Afternoon Admin! <span className="hour-icon"><BsSunFill/></span></>;
        if (hour >= 17 && hour < 21) return <>Good Evening Admin! <span className="hour-icon"><BsFillSunsetFill/></span></>;
        return <>Good Night Admin! <span className="hour-icon"><BsFillMoonFill/></span></>;
    }

    return (
        <div className="AdminPage">
            <h2 className="display-6">{displayGreetings(time)}</h2>
            <div className="row">
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">View Companies</h5>
                            <h5>
                                {numOfCompanies > 0 &&
                                    <Badge pill bg="secondary" text="light">
                                        {numOfCompanies} companies
                                    </Badge>
                                }
                            </h5>
                            <br />

                            <p className="card-text">Show all companies in coupon system.</p>
                            <Link to="company" className="btn btn-outline-secondary">Show Companies</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-4">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">View Customers</h5>
                            <h5>
                                {numOfCustomers > 0 &&
                                    <Badge pill bg="secondary" text="light">
                                        {numOfCustomers} customers
                                    </Badge>
                                }
                            </h5>
                            <br />

                            <p className="card-text">Show all customers in coupon system.</p>
                            <Link to="customer" className="btn btn-outline-secondary">Show Customers</Link>
                        </div>
                    </div>
                </div>
            </div>


        </div>
    );
}

export default AdminPage;
