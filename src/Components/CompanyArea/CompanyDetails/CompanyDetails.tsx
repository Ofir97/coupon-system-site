import axios from "axios";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Company } from "../../../Models/Company";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import "./CompanyDetails.css";

function CompanyDetails(): JSX.Element {

    const init: Company = undefined;
    const [company, setCompany] = useState<Company>(init);

    const getCompany = async () => {
        return axios.get<Company>(globals.urls.company);
    }

    useEffect(() => {
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
