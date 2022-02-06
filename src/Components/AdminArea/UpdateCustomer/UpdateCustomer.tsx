import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Link, useLocation, useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Customer } from "../../../Models/Customer";
import { ResponseDto } from "../../../Models/dto/ResponseDto";
import { customersUpdatedAction } from "../../../Redux/CustomersAppState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg } from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import "./UpdateCustomer.css";

function UpdateCustomer(): JSX.Element {

    const { id } = useParams();
    const navigate = useNavigate();

    const location = useLocation();
    const stateArr = location.state as Customer[];
    const customer = stateArr && stateArr[0];

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
    })

    const sendToRemoteServer = async (customer: Customer) => {
        customer.id = +id;
        tokenAxios.put<ResponseDto>(globals.urls.customers, customer)
            .then(response => {
                if (response.data.success) {
                    notify.success(response.data.message);
                    store.dispatch(customersUpdatedAction(customer));
                    navigate('/admin/customer');
                }

            })
            .catch((err) => {
                switch (err.response?.status) {
                    case 401: // unauthorized
                        notify.error(ErrMsg.UNAUTHORIZED_OPERATION);
                        break;
                    case 403: // forbidden
                        notify.error(err.response.data);
                        break;
                    default:
                        notify.error(err);
                }
            })
    }

    return (
        <div className="UpdateCustomer">
            {customer !== null && <><h3 className="display-6">Update Customer</h3>
                <form onSubmit={handleSubmit(sendToRemoteServer)} className="Form form-inline was-validated" noValidate >
                    <div className="form-group row">
                        <label className="col-4 col-form-label">ID</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("id")} disabled type="text" className="form-control" defaultValue={id} />
                            </div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-4 col-form-label">First Name</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("firstName")} type="text" className="form-control" defaultValue={customer?.firstName} />
                                <div className="invalid-feedback"></div>
                            </div>
                            <div className="bad">{errors.firstName?.message}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-4 col-form-label">Last Name</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("lastName")} type="text" className="form-control" defaultValue={customer?.lastName} />
                                <div className="invalid-feedback"></div>
                            </div>
                            <div className="bad">{errors.lastName?.message}</div>
                        </div>
                    </div>

                    <div className="form-group row">
                        <label className="col-4 col-form-label">Email</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("email")} type="text" className="form-control" required defaultValue={customer?.email} />
                                <div className="invalid-feedback"></div>
                            </div>
                            <div className="bad">{errors.email?.message}</div>
                        </div>
                    </div>


                    <div className="form-group row">
                        <label className="col-4 col-form-label">Password</label>
                        <div className="col-8">
                            <div className="input-group">
                                <input {...register("password")} type="password" className="form-control" required defaultValue={customer?.password} />
                                <div className="invalid-feedback"></div>
                            </div>
                            <div className="bad">{errors.password?.message}</div>
                        </div>
                    </div>


                    <div className="form-group row">
                        <div className="btn-container">
                            <button disabled={!isValid} name="submit" type="submit" className="btn btn-primary">Update Customer</button>
                        </div>
                    </div>
                </form>


                <GoMenu to='/admin/customer' /></>}

            {!customer && <><EmptyView message='Ooops.. customer does not exist!' />
                <Link to="/admin/customer"><button type="button" className="btn btn-secondary btn-md back-btn">Back to customers menu</button></Link></>}
        </div>
    );
}

export default UpdateCustomer;
