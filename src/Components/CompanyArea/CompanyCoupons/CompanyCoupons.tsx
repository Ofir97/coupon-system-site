import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import globals from "../../../Services/Globals";
import "./CompanyCoupons.css";
import axios from "axios";
import { CouponsListModel } from "../../../Models/resources-lists/CouponsList";
import notify from "../../../Services/Notification";
import Avatar from "../../SharedArea/Avatar/Avatar";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import DeleteButton from "../../UIArea/DeleteButton/DeleteButton";
import UpdateButton from "../../UIArea/UpdateButton/UpdateButton";
import { Utils } from "../../../Services/Utils";
import { ResponseDto } from "../../../Models/ResponseDto";
import { useNavigate } from "react-router-dom";
import { BsCheckLg } from "react-icons/bs";

function CompanyCoupons(): JSX.Element {

    const navigate = useNavigate();

    const init: Coupon[] = [];
    const [coupons, setCoupons] = useState<Coupon[]>(init);

    const getCoupons = async () => {
        return axios.get<CouponsListModel>(globals.urls.companyCoupons);
    }

    useEffect(() => {

        getCoupons()
            .then((response) => {
                setCoupons(response.data.coupons);
            })
            .catch((err) => {
                notify.error(err);
            })

    }, [])

    const deleteCoupon = async (id: number) => {
        axios.delete<ResponseDto>(globals.urls.companyCoupons + '/' + id)
            .then(response => {
                response.data.success ? notify.success(response.data.message) : notify.error(response.data.message);
            })
            .catch(err => {
                notify.error(err);
            })

        navigate('/company');
    }

    return (
        <div className="CompanyCoupons">
            {coupons?.length > 0 && <h2 className="display-5">Company's Coupons</h2>}

            {coupons?.length > 0 &&
                <div className="row">
                    {coupons.map(coupon => {
                        return [
                            <div className="card" style={{ width: "19rem" }} key={coupon.id} >
                                <Avatar className="card-img-top" uuid={coupon.image} />
                                <div className="card-body">
                                    <h4 className="card-title">{coupon.title}</h4>
                                    <p className="card-text">{coupon.description}</p>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><span>Category: </span>{Utils.lowerCaseAndCapitalizeFirstLetter(coupon.category.toString())}</li>
                                        <li className="list-group-item"><span>start date: </span>{Utils.formatDate(coupon.startDate)}</li>
                                        <li className="list-group-item"><span>end date: </span>{Utils.formatDate(coupon.endDate)}</li>
                                        <li className="list-group-item"><span>Amount: </span>{coupon.amount}</li>
                                        <li className="list-group-item"><span>Price: </span>{coupon.price}$</li>
                                        <li className="list-group-item"><span>Actions: <DeleteButton cb={deleteCoupon} resource={"coupon"} id={coupon.id} />&nbsp;
                                            <UpdateButton id={coupon.id} path={"/company/update-coupon"} tooltipMsg={"update coupon"} /></span></li>
                                    </ul>
                                </div>
                            </div>
                        ]
                    })}
                </div>
            }

            {coupons?.length === 0 && <><EmptyView message='Ooops.. No coupons to display!' /></>}
            <GoMenu to='/company' />
        </div>
    );
}

export default CompanyCoupons;
