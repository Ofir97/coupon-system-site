import { Company } from "../../../Models/Company";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import "./AddCompany.css";
import { Link, useNavigate } from "react-router-dom";
import globals from "../../../Services/Globals";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import { ResponseDto } from "../../../Models/dto/ResponseDto";
import store from "../../../Redux/Store";
import { companiesAddedAction } from "../../../Redux/CompaniesAppState";
import tokenAxios from "../../../Services/InterceptorAxios";
import { useEffect } from "react";

function AddCompany(): JSX.Element {

    const navigate = useNavigate();

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

    const schema = z.object({
        name: z.string().nonempty("Please provide company name."),
        email: z.string().nonempty("Please provide a valid email.").email('Invalid email.'),
        password: z.string().nonempty("Please choose a password.").min(5).max(15),
    })

    const {
        register,
        handleSubmit,
        formState: { errors, isDirty, isValid },
    } = useForm<Company>({
        mode: "all",
        resolver: zodResolver(schema),
    });

    const sendToRemoteServer = async (company: Company) => {
        tokenAxios.post<ResponseDto>(globals.urls.companies, company)
            .then(response => {
                if (response.data.success) {
                    notify.success(SccMsg.ADDED_COMPANY);
                    company.id = +response.data.message;
                    store.dispatch(companiesAddedAction(company)); 
                    navigate('/admin/company');
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
        <div className="AddCompany"  >
            <h3 className="display-6">Add Company</h3>
            <form onSubmit={handleSubmit(sendToRemoteServer)} className="Form form-inline was-validated" noValidate>
                <div className="form-group row">
                    <label className="col-4 col-form-label">Company Name</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register("name")} type="text" className="form-control" required />
                            <div className="invalid-feedback"></div>
                            <span className="bad">{errors.name?.message}</span>
                        </div>
                    </div>
                </div>

                <div className="form-group row">
                    <label className="col-4 col-form-label">Email</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register("email")} type="text" className="form-control" required />
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="bad">{errors.email?.message}</div>
                    </div>
                </div>


                <div className="form-group row">
                    <label className="col-4 col-form-label">Password</label>
                    <div className="col-8">
                        <div className="input-group">
                            <input {...register("password")} type="password" className="form-control" required />
                            <div className="invalid-feedback"></div>
                        </div>
                        <div className="bad">{errors.password?.message}</div>
                    </div>
                </div>


                <div className="form-group row">
                    <div className="btn-container">
                        <button disabled={!isValid} name="submit" type="submit" className="btn btn-primary">Add Company</button>
                    </div>
                </div>
            </form>

            <Link to="/admin"><button type="button" className="btn btn-secondary btn-md back-btn">Back to Menu</button></Link>

        </div>
    );
}

export default AddCompany;
