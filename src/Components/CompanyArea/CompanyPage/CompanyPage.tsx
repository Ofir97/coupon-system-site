import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./CompanyPage.css";

function CompanyPage(): JSX.Element {

    const [time, setTime] = useState(new Date());

    useEffect(() => {
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
        <div className="CompanyPage">
            <h2>{displayGreetings(time)} Company!</h2>
            <div className="row">
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">View Coupons</h5>
                            <p className="card-text">Show all company's coupons.</p>
                            <Link to="coupons" className="btn btn-primary">Show Coupons</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">See your Profile</h5>
                            <p className="card-text">View your personal info.</p>
                            <Link to="company-details" className="btn btn-primary">Show Details</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-3">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">Add Coupon</h5>
                            <p className="card-text">Add a new Coupon.</p>
                            <Link to="add-coupon" className="btn btn-primary">Add Coupon</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CompanyPage;
