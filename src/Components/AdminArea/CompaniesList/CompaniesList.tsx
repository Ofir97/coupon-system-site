import { useEffect, useState } from "react";
import { Company } from "../../../Models/Company";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./CompaniesList.css";
import axios from "axios";
import globals from "../../../Services/Globals";
import { CompaniesListModel } from "../../../Models/resources-lists/CompaniesList";
import notify from "../../../Services/Notification";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import AddButton from "../../UIArea/AddButton/AddButton";
import DeleteButton from "../../UIArea/DeleteButton/DeleteButton";
import UpdateButton from "../../UIArea/UpdateButton/UpdateButton";
import { useNavigate } from "react-router-dom";
import { ResponseDto } from "../../../Models/ResponseDto";

function CompaniesList(): JSX.Element {

    const navigate = useNavigate();

    const init: Company[] = [];
    const [companies, setCompanies] = useState<Company[]>(init);


    const getCompanies = async () => {
        return axios.get<CompaniesListModel>(globals.urls.companies);
    }

    useEffect(() => {

        getCompanies()
            .then((response) => {
                setCompanies(response.data.companies);
            })
            .catch((err) => {
                notify.error(err);
            })

    }, [])

    const deleteCompany = async (id: number) => {
        axios.delete<ResponseDto>(globals.urls.companies + '/' + id)
            .then(response => {
                response.data.success ? notify.success(response.data.message) : notify.error(response.data.message);
            })
            .catch(err => {
                notify.error(err);
            })

        navigate('/admin');
    }

    return (
        <div className="CompaniesList">
            {companies?.length > 0 && <h2 className="display-5">All Companies</h2>}

            {companies?.length > 0 &&
                <>
                    <table className="myTable">
                        <thead>
                            <tr>
                                <th>Id</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Actions &nbsp;<AddButton path='/admin/add-company' tooltipMsg='add company' /></th>
                            </tr>
                        </thead>

                        <tbody>
                            {companies.map(company => {
                                return [
                                    <tr key={company.id}>
                                        <td>{company.id}</td>
                                        <td>{company.name}</td>
                                        <td>{company.email}</td>
                                        <td>{company.password}</td>
                                        <td><DeleteButton cb={deleteCompany} resource={"company"} id={company.id} /> &nbsp;
                                            <UpdateButton id={company.id} path='/admin/update-company' tooltipMsg="update company"  /></td>
                                    </tr>
                                ]
                            })}
                        </tbody>
                    </table>

                    <br /><br />
                    <GoMenu to='/admin' />
                </>
            }

            {companies?.length === 0 && <EmptyView message='Ooops.. No companies to display!' />}

        </div>
    );
}

export default CompaniesList;
