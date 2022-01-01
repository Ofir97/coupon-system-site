import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import { Customer } from "../../../Models/Customer";
import { ResponseDto } from "../../../Models/ResponseDto";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import "./UpdateCustomer.css";

function UpdateCustomer(): JSX.Element {

    const { id } = useParams();
    const navigate = useNavigate();

    const init: Customer = undefined;
    const [customer, setCustomer] = useState<Customer>(init);

    const schema = z.object({
        firstName: z.string().nonempty("Please provide first name."),
        lastName: z.string().nonempty("Please provide last name."),
        email: z.string().nonempty("Please provide a valid email.").email('Invalid email.'),
        password: z.string().nonempty("Please choose a password.").min(5).max(15),
    })

    useEffect(() => {
        getCustomer()
            .then((response) => {
                if (response.data.firstName === undefined) {
                    notify.error('customer with id ' + id + ' does not exist')
                    navigate('/admin/customer');
                }
                else {
                    setCustomer(response.data);
                }
            })
            .catch((err) => {
                notify.error(err);
            })

    }, [])

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid},
    } = useForm<Customer>({
        mode: "all",
        resolver: zodResolver(schema),
    });

    const getCustomer = async () => {
        return axios.get<Customer>(globals.urls.customers + '/' + id);
    }
    
    const sendToRemoteServer = async (customer: Customer) => {
        customer.id = +id;
        axios.put<ResponseDto>(globals.urls.customers, customer)
            .then(response => {
                if (response.data.success) {
                    notify.success(response.data.message);
                    navigate('/admin/customer');
                }
                else notify.error(response.data.message);

            })
            .catch((err) => {
                notify.error(err);
            })
    }

    return (
        <div className="UpdateCustomer">
			<h2>Update Customer</h2>
            <form onSubmit={handleSubmit(sendToRemoteServer)} className="Form form-inline was-validated" noValidate >
            <div className="form-group row">
                    <label className="col-4 col-form-label">Id</label>
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
                            <input {...register("firstName")} type="text" className="form-control" defaultValue={customer?.firstName}  />
                            <div className="invalid-feedback"></div>
                            <span className="bad">{errors.firstName?.message}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label">Last Name</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register("lastName")} type="text" className="form-control" defaultValue={customer?.lastName} />
                            <div className="invalid-feedback"></div>
                            <span className="bad">{errors.lastName?.message}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label">Email</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register("email")} type="text" className="form-control" required defaultValue={customer?.email}/>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="bad">{errors.email?.message}</div>
                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-4 col-form-label">Password</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register("password")} type="password" className="form-control" required defaultValue={customer?.password}/>
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="bad">{errors.password?.message}</div>
                    </div>
                </div>


                <div className="form-group row">
                    <div className="offset-4 col-8">
                        <button disabled={ !isDirty || !isValid } name="submit" type="submit" className="btn btn-primary">Update Customer</button>
                    </div>
                </div>
            </form>


            <GoMenu to='/admin/customer' />
        </div>
    );
}

export default UpdateCustomer;
