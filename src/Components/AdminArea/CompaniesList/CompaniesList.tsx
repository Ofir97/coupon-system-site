import { useEffect, useState } from "react";
import { Company } from "../../../Models/Company";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./CompaniesList.css";
import axios from "axios";
import globals from "../../../Services/Globals";
import { CompaniesListModel } from "../../../Models/resources-lists/CompaniesList";
import notify, { SccMsg } from "../../../Services/Notification";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import AddButton from "../../UIArea/AddButton/AddButton";
import DeleteButton from "../../UIArea/DeleteButton/DeleteButton";
import UpdateButton from "../../UIArea/UpdateButton/UpdateButton";
import { useNavigate } from "react-router-dom";
import { ResponseDto } from "../../../Models/ResponseDto";
import store from "../../../Redux/Store";
import { companiesDeletedAction, companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import TotalCompanies from "../TotalCompanies/TotalCompanies";

function CompaniesList(): JSX.Element {

    const [companies, setCompanies] = useState<Company[]>(store.getState().companiesState.companies);

    const getCompanies = async () => {
        return axios.get<CompaniesListModel>(globals.urls.companies);
    }

    useEffect(() => {
        {
            companies?.length == 0 && getCompanies()
                .then((response) => {

                    store.dispatch(companiesDownloadedAction(response.data.companies)); // Update AppState
                    setCompanies(response.data.companies); // Update LocalState
                    notify.success(SccMsg.ALL_COMPANIES);
                })
                .catch((err) => {
                    notify.error(err);
                })
        }
    }, [])

    const deleteCompany = async (id: number) => {
        axios.delete<ResponseDto>(globals.urls.companies + '/' + id)
            .then(response => {
                if (response.data.success) {
                    notify.success(response.data.message);
                    store.dispatch(companiesDeletedAction(id));
                    setCompanies(store.getState().companiesState.companies);
                }
                else notify.error(response.data.message);
            })
            .catch(err => {
                notify.error(err);
            })

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
                                            <UpdateButton id={company.id} resource={companies.filter(c => c.id === company.id)} path='/admin/update-company' tooltipMsg="update company" /></td>
                                    </tr>
                                ]
                            })}
                        </tbody>
                    </table>

                    <TotalCompanies />
                    <br /><br />
                    <GoMenu to='/admin' />
                </>
            }

            {companies?.length === 0 && <EmptyView message='Ooops.. No companies to display!' />}

        </div>
    );
}

export default CompaniesList;
