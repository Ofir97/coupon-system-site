import { useEffect, useState } from "react";
import { Company } from "../../../Models/Company";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import "./CompaniesList.css";
import globals from "../../../Services/Globals";
import { CompaniesListModel } from "../../../Models/models-lists/CompaniesList";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import AddButton from "../../UIArea/AddButton/AddButton";
import DeleteButton from "../../UIArea/DeleteButton/DeleteButton";
import UpdateButton from "../../UIArea/UpdateButton/UpdateButton";
import { Link, useNavigate } from "react-router-dom";
import { ResponseDto } from "../../../Models/dto/ResponseDto";
import store from "../../../Redux/Store";
import { companiesDeletedAction, companiesDownloadedAction } from "../../../Redux/CompaniesAppState";
import TotalCompanies from "../TotalCompanies/TotalCompanies";
import { RiCoupon3Line } from "react-icons/ri";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import tokenAxios from "../../../Services/InterceptorAxios";

function CompaniesList(): JSX.Element {

    const navigate = useNavigate();

    const [companies, setCompanies] = useState<Company[]>(store.getState().companiesState.companies);

    const getCompanies = async () => {
        return tokenAxios.get<CompaniesListModel>(globals.urls.companies);
    }

    useEffect(() => {
        {
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
        tokenAxios.delete<ResponseDto>(globals.urls.companies + '/' + id)
            .then(response => {
                if (response.data.success) {
                    notify.success(response.data.message);
                    store.dispatch(companiesDeletedAction(id));
                    setCompanies(store.getState().companiesState.companies);
                }
            })
            .catch(err => {
                switch (err.response.status) {
                    case 401: // unauthorized
                        notify.error(ErrMsg.UNAUTHORIZED_OPERATION);
                        break;
                    case 403: // forbidden
                        notify.error(err.response.data);
                        break;
                }
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
                                <th>ID</th>
                                <th>Name</th>
                                <th>Email</th>
                                <th>Password</th>
                                <th>Coupons</th>
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
                                        <td><OverlayTrigger placement='top' overlay={(p) => (<Tooltip {...p}>view coupons</Tooltip>
                                        )}><Link to={company.id + '/coupon'} state={{ model: 'company', coupons: company.coupons }} className="btn btn-outline-dark"><RiCoupon3Line /></Link></OverlayTrigger></td>
                                        <td><DeleteButton cb={deleteCompany} model={"company"} id={company.id} /> &nbsp;
                                            <UpdateButton id={company.id} model={companies.filter(c => c.id === company.id)} path='/admin/update-company' tooltipMsg="update company" /></td>
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
