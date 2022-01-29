import "./AddCustomer.css";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { Customer } from "../../../Models/Customer";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import { customersAddedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import { ResponseDto } from "../../../Models/ResponseDto";

function AddCustomer(): JSX.Element {

    const navigate = useNavigate();

    const schema = z.object({
        firstName: z.string().nonempty("Please provide first name."),
        lastName: z.string().nonempty("Please provide last name."),
        email: z.string().nonempty("Please provide a valid email.").email('Invalid email.'),
        password: z.string().nonempty("Please choose a password.").min(5).max(15),
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isValid },
    } = useForm<Customer>({
        mode: "all",
        resolver: zodResolver(schema),
    });

    const sendToRemoteServer = async (customer: Customer) => {
        axios.post<ResponseDto>(globals.urls.customers, customer)
            .then(response => {
                if (response.data.success) {
                    notify.success(SccMsg.ADDED_CUSTOMER);
                    customer.id = +response.data.message;
                    store.dispatch(customersAddedAction(customer));
                    navigate('/admin/customer');
                }
                else notify.error(response.data.message);

            })
            .catch((err) => {
                notify.error(err);
            })
    }

    return (
        <div className="AddCustomer">
            <h3 className="display-6">Add Customer</h3>
            <form onSubmit={handleSubmit(sendToRemoteServer)} className="Form form-inline was-validated" noValidate>
                <div className="form-group row">
                    <label className="col-4 col-form-label">First Name</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register('firstName')} type="text" className="form-control" required />
                            <div className="invalid-feedback"></div>
                            <span className="bad">{errors.firstName?.message}</span>
                        </div>
                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-4 col-form-label">Last Name</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register('lastName')} type="text" className="form-control" required />
                            <div className="invalid-feedback"></div>
                            <span className="bad">{errors.lastName?.message}</span>
                        </div>
                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-4 col-form-label">Email</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register('email')} type="text" className="form-control" required />
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="bad">{errors.email?.message}</div>
                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-4 col-form-label">Password</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register('password')} type="password" className="form-control" required />
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="bad">{errors.password?.message}</div>
                    </div>
                </div>

                <div className="form-group row">
                    <div className="btn-container">
                        <button disabled={ !isValid } name="submit" type="submit" className="btn btn-primary">Add Customer</button>
                    </div>
                </div>
            </form>

            <Link to="/admin"><button type="button" className="btn btn-secondary btn-md back-btn">Back to Menu</button></Link>

        </div>
    );
}

export default AddCustomer;
