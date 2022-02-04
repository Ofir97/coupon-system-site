import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import "./TotalCompanies.css";

function TotalCompanies(): JSX.Element {

    const [total, setTotal] = useState(store.getState().companiesState.companies?.length); 

    useEffect(() => {
            const unsubscribe = store.subscribe(() => { // get automatic updates about global state changes
                setTotal(store.getState().companiesState.companies.length) // set the companies local state, in order to use the length for display
            })

            return (() => { unsubscribe() }); // componentWillUnmount (close resource)
    })

    return (
        <div className="TotalCompanies total-box">
            <p>Total: {total} companies</p>
        </div>
    );
}

export default TotalCompanies;
