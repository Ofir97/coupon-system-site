import { useEffect, useState } from "react";
import { Customer } from "../../../Models/Customer";
import { CustomersListModel } from "../../../Models/models-lists/CustomersList";
import globals from "../../../Services/Globals";
import "./CustomersList.css";
import axios from "axios";
import notify, { SccMsg } from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import AddButton from "../../UIArea/AddButton/AddButton";
import DeleteButton from "../../UIArea/DeleteButton/DeleteButton";
import UpdateButton from "../../UIArea/UpdateButton/UpdateButton";
import { ResponseDto } from "../../../Models/ResponseDto";
import { Link, useNavigate } from "react-router-dom";
import TotalCustomers from "../TotalCustomers/TotalCustomers";
import store from "../../../Redux/Store";
import { customersDeletedAction, customersDownloadedAction } from "../../../Redux/CustomersAppState";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import { RiCoupon3Line } from "react-icons/ri";

function CustomersList(): JSX.Element {

    const navigate = useNavigate();

    const [customers, setCustomers] = useState<Customer[]>(store.getState().customersState.customers);

    const getCustomers = async () => {
        return axios.get<CustomersListModel>(globals.urls.customers);
    }

    useEffect(() => {
        {
            customers?.length == 0 && getCustomers()
                .then((response) => {
                    store.dispatch(customersDownloadedAction(response.data.customers));
                    setCustomers(response.data.customers);
                    notify.success(SccMsg.ALL_CUSTOMERS);
                })
                .catch((err) => {
                    notify.error(err);
                })
                
        }
    }, [])

    const deleteCustomer = async (id: number) => {
        axios.delete<ResponseDto>(globals.urls.customers + '/' + id)
            .then(response => {
                if (response.data.success) {
                    notify.success(response.data.message);
                    store.dispatch(customersDeletedAction(id));
                    setCustomers(store.getState().customersState.customers);
                }  
                else notify.error(response.data.message);
            })
            .catch(err => {
                notify.error(err);
            })

        navigate('/admin/customer');
    }

    return (
        <div className="CustomersList">
            {customers?.length > 0 && <h2 className="display-5">All Customers</h2>}

            {customers?.length > 0 && <>
                <table className="myTable">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Password</th>
                            <th>Coupons</th>
                            <th>Actions &nbsp;<AddButton path='/admin/add-customer' tooltipMsg='add customer' /></th>
                        </tr>
                    </thead>

                    <tbody>
                        {customers.map(customer => {
                            return [
                                <tr key={customer.id}>
                                    <td>{customer.id}</td>
                                    <td>{customer.firstName}</td>
                                    <td>{customer.lastName}</td>
                                    <td>{customer.email}</td>
                                    <td>{customer.password}</td>
                                    <td><OverlayTrigger placement='top' overlay={(p) => (<Tooltip {...p}>view coupons</Tooltip>
                                        )}><Link to={customer.id + '/coupon'} state={{model: 'customer', coupons: customer.coupons}} className="btn btn-outline-dark"><RiCoupon3Line /></Link></OverlayTrigger></td>
                                    <td><DeleteButton cb={deleteCustomer} model={"customer"} id={customer.id} />&nbsp;
                                        <UpdateButton model={customers.filter(c => c.id === customer.id)} id={customer.id} path='/admin/update-customer' tooltipMsg="update customer" /></td>
                                </tr>
                            ]
                        })}
                    </tbody>
                </table>

                <TotalCustomers />
                <br /><br />
                <GoMenu to='/admin' /></>
            }

            {customers?.length === 0 && <EmptyView message='Ooops.. No customers to display!' />}

        </div>
    );
}

export default CustomersList;
