import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./AdminPage.css";

function AdminPage(): JSX.Element {

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
        <div className="AdminPage">
            <h2>{displayGreetings(time)} Admin!</h2>
            <div className="row">           
                <div className="col-sm-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">View Companies</h5>
                            <p className="card-text">Show all companies in coupon system.</p>
                            <Link to="company" className="btn btn-primary">Show Companies</Link>
                        </div>
                    </div>
                </div>
                <div className="col-sm-5">
                    <div className="card">
                        <div className="card-body">
                            <h5 className="card-title">View Customers</h5>
                            <p className="card-text">Show all customers in coupon system.</p>
                            <Link to="customer" className="btn btn-primary">Show Customers</Link>
                        </div>
                    </div>
                </div>
            </div>
            
            
        </div>
    );
}

export default AdminPage;
