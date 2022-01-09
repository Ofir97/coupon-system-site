import { Company } from "../../../Models/Company";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import "./AddCompany.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import { ResponseDto } from "../../../Models/ResponseDto";
import store from "../../../Redux/Store";
import { companiesAddedAction } from "../../../Redux/CompaniesAppState";

function AddCompany(): JSX.Element {

    const navigate = useNavigate();

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
        axios.post<ResponseDto>(globals.urls.companies, company)
            .then(response => {
                if (response.data.success) {
                    notify.success(SccMsg.ADDED_COMPANY);
                    company.id = +response.data.message;
                    store.dispatch(companiesAddedAction(company)); 
                    navigate('/admin/company');
                }
                else notify.error(response.data.message);

            })
            .catch((err) => {
                notify.error(err);
            })
    }

    return (
        <div className="AddCompany"  >
            <h2>Add Company</h2>
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
                    <div className="offset-4 col-8">
                        <button disabled={!isValid} name="submit" type="submit" className="btn btn-primary">Add Company</button>
                    </div>
                </div>
            </form>

            <Link to="/admin"><button type="button" className="btn btn-secondary btn-md back-btn">Back to Menu</button></Link>

        </div>
    );
}

export default AddCompany;
