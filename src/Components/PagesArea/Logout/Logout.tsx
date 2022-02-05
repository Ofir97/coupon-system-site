import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { logoutAction } from "../../../Redux/AuthAppState";
import { companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import { companyCouponsDownloadedAction } from "../../../Redux/CompanyCouponsAppState";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import { customerCouponsDownloadedAction } from "../../../Redux/CustomerCouponsAppState";
import { customersDownloadedAction } from "../../../Redux/CustomersAppState";

import store from "../../../Redux/Store";
import "./Logout.css";

function Logout(): JSX.Element {

    const navigate = useNavigate();

    useEffect(() => {
        store.dispatch(customersDownloadedAction([]));
        store.dispatch(companiesDownloadedAction([]));
        store.dispatch(couponsDownloadedAction([]))
        store.dispatch(customerCouponsDownloadedAction([]))
        store.dispatch(companyCouponsDownloadedAction([]))
        store.dispatch(logoutAction());
        navigate('/');
    })

    return (
        <div className="Logout">
        </div>
    );
}

export default Logout;
