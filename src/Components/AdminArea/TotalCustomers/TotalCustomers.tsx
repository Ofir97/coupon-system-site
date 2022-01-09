import { useEffect, useState } from "react";
import store from "../../../Redux/Store";
import "./TotalCustomers.css";

function TotalCustomers(): JSX.Element {

    const [total, setTotal] = useState(store.getState().customersState.customers?.length); 

    useEffect(() => {
            const unsubscribe = store.subscribe(() => { // get automatic updates about global state changes
                setTotal(store.getState().customersState.customers.length) // set the customers local state, in order to use the length for display
            })

            return (() => { unsubscribe() }); // componentWillUnmount (close resource)
    })
    
    return (
        <div className="TotalCustomers total-box">
			<p>Total: {total} customers</p>
        </div>
    );
}

export default TotalCustomers;
