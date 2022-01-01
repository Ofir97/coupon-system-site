import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import "./Login.css";
import { LoginModel } from "../../../Models/LoginModel";
import { ClientType } from "../../../Models/ClientType";
import globals from "../../../Services/Globals";
import axios from "axios";
import notify from "../../../Services/Notification";
import { useNavigate } from "react-router-dom";

function Login(): JSX.Element {

    const navigate = useNavigate();
    
    const schema = z.object({
        email: z.string().nonempty("Please provide an email.").email('Invalid email.'),
        password: z.string().nonempty("Please provide a password.").min(5).max(15),
        clientType: z.string().nonempty("Client Type is required.")
    });

    const {
        register, // takes hold of all input fields
        handleSubmit, //collects all field values {...register} and turns into LoginModel object
        formState: { errors, isDirty, isValid },
    } = useForm<LoginModel>({
        mode: "all",
        resolver: zodResolver(schema),
    });


    const login = async (url: string, loginModel: LoginModel) => {
        return axios.post<Boolean>(url, loginModel);
    }

    const sendToRemoteServer = (loginModel: LoginModel) => {
        let clientURL = '', clientRoute = '';
        switch (loginModel.clientType.toString()) {
            case 'ADMINISTRATOR':
                clientURL = globals.urls.admin;
                clientRoute = '/admin';
                break;
            case 'COMPANY':
                clientURL = globals.urls.company;
                clientRoute = '/company';
                break;
            case 'CUSTOMER':
                clientURL = globals.urls.customer;
                clientRoute = '/customer';
                break;
        }

        clientURL += '/login';

        login(clientURL, loginModel)
            .then((response) => {
                if (response.data) { //login is successful 
                    navigate(clientRoute);
                }
                else notify.error('Login failed: bad credentials');
                    
            })
            .catch((err) => {
                notify.error(err);
            })
    }

    return (
        <div className="Login">
            <h2>Login</h2>
            <form onSubmit={handleSubmit(sendToRemoteServer)} className="Form form-inline was-validated" noValidate>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input {...register("email")} placeholder="Email Address" type="text" className="form-control" aria-describedby="emailHelpBlock" required />
                    <div className="invalid-feedback"></div>
                    <span className="bad">{errors.email?.message}</span>
                </div>


                <div className="form-group">
                    <label htmlFor="password">Password</label>
                    <input {...register("password")} placeholder="Password" type="password" className="form-control" aria-describedby="passwordHelpBlock" required />
                    <div className="invalid-feedback"></div>
                    <span id="passwordHelpBlock" className="bad">{errors.password?.message}</span>
                </div>


                <div className="form-group">
                    <label htmlFor="select">Select</label>
                    <div>
                        <select {...register("clientType")} className="custom-select" required defaultValue={''}>
                            <option value="" disabled>Choose Type</option>
                            <option value="ADMINISTRATOR">Admin</option>
                            <option value="COMPANY">Company</option>
                            <option value="CUSTOMER">Customer</option>
                        </select>
                        <div className="bad">{errors.clientType?.message}</div>
                    </div>

                </div>

                <div className="form-group">
                    <button disabled={!isDirty || !isValid} name="submit" type="submit" className="btn btn-primary">Login</button>
                </div>
            </form>
        </div>
    );
}

export default Login;
