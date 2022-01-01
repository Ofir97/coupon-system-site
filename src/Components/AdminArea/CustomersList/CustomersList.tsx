import { useEffect, useState } from "react";
import { Customer } from "../../../Models/Customer";
import { CustomersListModel } from "../../../Models/resources-lists/CustomersList";
import globals from "../../../Services/Globals";
import "./CustomersList.css";
import axios from "axios";
import notify from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import AddButton from "../../UIArea/AddButton/AddButton";
import DeleteButton from "../../UIArea/DeleteButton/DeleteButton";
import UpdateButton from "../../UIArea/UpdateButton/UpdateButton";
import { ResponseDto } from "../../../Models/ResponseDto";
import { useNavigate } from "react-router-dom";

function CustomersList(): JSX.Element {

    const navigate = useNavigate();
    
    const init: Customer[] = [];
    const [customers, setCustomers] = useState<Customer[]>(init);

    const getCustomers = async () => {
        return axios.get<CustomersListModel>(globals.urls.customers);
    }

    useEffect(() => {

        getCustomers()
            .then((response) => {
                setCustomers(response.data.customers);
            })
            .catch((err) => {
                notify.error(err);
            })

    }, [])

    const deleteCustomer = async (id: number) => {
        axios.delete<ResponseDto>(globals.urls.customers + '/' + id)
            .then(response => {
                response.data.success ? notify.success(response.data.message) : notify.error(response.data.message);
            })
            .catch(err => {
                notify.error(err);
            })

        navigate('/admin');
    }

    return (
        <div className="CustomersList">
            {customers?.length > 0 && <h2 className="display-5">All Customers</h2>}

            {customers?.length > 0 && <>
                <table className="myTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>First Name</th>
                            <th>Last Name</th>
                            <th>Email</th>
                            <th>Password</th>
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
                                    <td><DeleteButton cb={deleteCustomer} resource={"customer"} id={customer.id} />&nbsp;
                                        <UpdateButton id={customer.id} path='/admin/update-customer' tooltipMsg="update customer" /></td>
                                </tr>
                            ]
                        })}
                    </tbody>
                </table>

                <br /><br />
                <GoMenu to='/admin' /></>
            }

            {customers?.length === 0 && <EmptyView message='Ooops.. No customers to display!' />}

        </div>
    );
}

export default CustomersList;
