import { useEffect, useState } from "react";
import { Badge } from "react-bootstrap";
import { BsFillMoonFill, BsFillSunriseFill, BsFillSunsetFill, BsSunFill } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { Company } from "../../../Models/Company";
import { Customer } from "../../../Models/Customer";
import { CompaniesListModel } from "../../../Models/models-lists/CompaniesList";
import { CustomersListModel } from "../../../Models/models-lists/CustomersList";
import { companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import { customersDownloadedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg } from "../../../Services/Notification";
import "./AdminPage.css";

function AdminPage(): JSX.Element {

    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());

    const [companies, setCompanies] = useState<Company[]>(store.getState().companiesState.companies);
    const [customers, setCustomers] = useState<Customer[]>(store.getState().customersState.customers);

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

    const getCompanies = async () => {
        return tokenAxios.get<CompaniesListModel>(globals.urls.companies);
    }

    const getCustomers = async () => {
        return tokenAxios.get<CustomersListModel>(globals.urls.customers);
    }

    useEffect(() => {
        companies?.length == 0 && getCompanies()
            .then((response) => {
                store.dispatch(companiesDownloadedAction(response.data.companies)); 
                setCompanies(response.data.companies); 
            })
            .catch((err) => {
                notify.error(err);
            })

        customers?.length == 0 && getCustomers()
            .then((response) => {
                store.dispatch(customersDownloadedAction(response.data.customers));
                setCustomers(response.data.customers);
            })
            .catch((err) => {
                notify.error(err)
            })

    }, [])


    const displayGreetings = (time: Date) => {
        const hour = time.getHours();
        if (hour >= 5 && hour < 12) return <>Good Morning Admin! <span className="hour-icon"><BsFillSunriseFill /></span></>;
        if (hour >= 12 && hour < 17) return <>Good Afternoon Admin! <span className="hour-icon"><BsSunFill /></span></>;
        if (hour >= 17 && hour < 21) return <>Good Evening Admin! <span className="hour-icon"><BsFillSunsetFill /></span></>;
        return <>Good Night Admin! <span className="hour-icon"><BsFillMoonFill /></span></>;
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
                                {companies?.length > 0 &&
                                    <Badge pill bg="secondary" text="light">
                                        {companies?.length} companies
                                    </Badge>
                                }
                            </h5>
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
                                {customers?.length > 0 &&
                                    <Badge pill bg="secondary" text="light">
                                        {customers?.length} customers
                                    </Badge>
                                }
                            </h5>
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
