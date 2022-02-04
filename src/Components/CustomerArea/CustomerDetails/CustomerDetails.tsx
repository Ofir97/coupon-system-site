import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg } from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import "./CustomerDetails.css";


function CustomerDetails(): JSX.Element {

    const init: Customer = undefined;
    const [customer, setCustomer] = useState<Customer>(init);
    const navigate = useNavigate();

    const getCustomer = async () => {
        return tokenAxios.get<Customer>(globals.urls.customer);
    }

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

        getCustomer()
            .then((response) => {
                (Object.keys(response.data).length !== 0) && setCustomer(response.data);
            })
            .catch((err) => {
                notify.error(err);
            })
    }, [])

    return (
        <div className="CustomerDetails">
            {customer !== undefined && <h2 className="display-5">Customer Details</h2>}

            {customer !== undefined && <>
                <table className="myTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{customer.id}</td>
                            <td>{customer.firstName}</td>
                            <td>{customer.lastName}</td>
                            <td>{customer.email}</td>
                            <td>{customer.password}</td>
                        </tr>
                    </tbody>
                </table>

                <br /><br />
                <GoMenu to='/Customer' /></>
            }

            {customer === undefined && <EmptyView message='Ooops.. No customer to display!' />}
        </div>
    );
}

export default CustomerDetails;
