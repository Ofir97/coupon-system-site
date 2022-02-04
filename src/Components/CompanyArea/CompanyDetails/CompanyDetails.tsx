import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Company } from "../../../Models/Company";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify, { ErrMsg } from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const init: Company = undefined;
    const [company, setCompany] = useState<Company>(init);
    const navigate = useNavigate();

    const getCompany = async () => {
        return tokenAxios.get<Company>(globals.urls.company);
    }

    useEffect(() => {
        if (!store.getState().authState?.user) {
            notify.error(ErrMsg.PLS_LOGIN);
            navigate('/login');
            return;
        }

        if (store.getState().authState?.user?.clientType.toString() !== 'COMPANY') {
            notify.error(ErrMsg.UNAUTHORIZED);
            navigate('/');
            return;
        }

        getCompany()
            .then((response) => {
                (Object.keys(response.data).length !== 0) && setCompany(response.data);
            })
            .catch((err) => {
                notify.error(err);
            })
    }, [])

    return (
        <div className="CompanyDetails">
            {company !== undefined && <h2 className="display-5">Company Details</h2>}

            {company !== undefined && <>
                <table className="myTable">
                    <thead>
                        <tr>
                            <th>Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Password</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>{company.id}</td>
                            <td>{company.name}</td>
                            <td>{company.email}</td>
                            <td>{company.password}</td>
                        </tr>
                    </tbody>
                </table>

                <br /><br />
                <GoMenu to='/company' /></>
            }

            {company === undefined && <EmptyView message='Ooops.. No company to display!' />}
        </div>
    );
}

export default CompanyDetails;
