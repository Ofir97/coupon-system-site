import { useEffect, useState } from "react";
import { Coupon } from "../../../Models/Coupon";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import globals from "../../../Services/Globals";
import "./CompanyCoupons.css";
import { CouponsListModel } from "../../../Models/models-lists/CouponsList";
import notify, { ErrMsg, SccMsg } from "../../../Services/Notification";
import Avatar from "../../SharedArea/Avatar/Avatar";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import DeleteButton from "../../UIArea/DeleteButton/DeleteButton";
import UpdateButton from "../../UIArea/UpdateButton/UpdateButton";
import { Utils } from "../../../Services/Utils";
import { ResponseDto } from "../../../Models/dto/ResponseDto";
import ILTime from "../../SharedArea/ILTime/ILTime";
import store from "../../../Redux/Store";
import { Link, useNavigate } from "react-router-dom";
import FilterSection from "../../UIArea/FilterSection/FilterSection";
import tokenAxios from "../../../Services/InterceptorAxios";
import { companyCouponsDeletedAction, companyCouponsDownloadedAction } from "../../../Redux/CompanyCouponsAppState";

function CompanyCoupons(): JSX.Element {

    const navigate = useNavigate();
    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().companyCouponsState.companyCoupons);

    const getCouponsFromFilter = (coupons: Coupon[]) => {
        coupons?.length > 0 ? setCoupons(coupons) : notify.error('no coupons from this filter');
    }

    const getCoupons = async () => {
        return tokenAxios.get<CouponsListModel>(globals.urls.companyCoupons);
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

        coupons.length === 0 && getCoupons()
            .then((response) => {
                store.dispatch(companyCouponsDownloadedAction(response.data.coupons));
                setCoupons(response.data.coupons);
                response.data.coupons.length > 0 && notify.success(SccMsg.ALL_COMPANY_COUPONS);
            })
            .catch((err) => {
                notify.error(err);
            })

    }, [])

    const deleteCoupon = async (id: number) => {
        tokenAxios.delete<ResponseDto>(globals.urls.companyCoupons + '/' + id)
            .then(response => {
                if (response.data.success) {
                    notify.success(response.data.message);
                    store.dispatch(companyCouponsDeletedAction(id));
                    setCoupons(store.getState().companyCouponsState.companyCoupons);
                }
                else notify.error(response.data.message);
            })
            .catch(err => {
                notify.error(err);
            })

    }

    return (
        <div className="CompanyCoupons">
            {coupons?.length > 0 && <><h2 className="display-5">Company's Coupons</h2>
                <FilterSection filterCb={getCouponsFromFilter} model="company" />
                <Link to="/company/add-coupon" className="btn btn-success">Add a new Coupon</Link>
                <div className="row">
                    {coupons.map(coupon => {
                        return [
                            <div className="card" style={{ width: "19rem" }} key={coupon.id} >
                                <Avatar className="card-img-top" uuid={coupon.image} />
                                <div className="card-body">
                                    <h4 className="card-title">{coupon.title}</h4>
                                    <h5>{Utils.lowerCaseAndCapitalizeFirstLetter(coupon.category.toString())}</h5>
                                    <p className="card-text">{coupon.description}</p>

                                    <ul className="list-group list-group-flush">
                                        <li className="list-group-item"><span>start date: </span><ILTime date={coupon.startDate} /></li>
                                        <li className="list-group-item"><span>end date: </span><ILTime date={coupon.endDate} /></li>
                                        <li className="list-group-item"><span>Amount: </span>{coupon.amount}</li>
                                        <li className="list-group-item"><span>Price: </span>{coupon.price.toFixed(2)}$</li>
                                        <li className="list-group-item"><span>Actions: <DeleteButton cb={deleteCoupon} model={"coupon"} id={coupon.id} />&nbsp;
                                            <UpdateButton id={coupon.id} model={coupons.filter(c => c.id === coupon.id)} path={"/company/update-coupon"} tooltipMsg={"update coupon"} /></span></li>
                                    </ul>
                                </div>
                            </div>
                        ]
                    })}

                    <GoMenu to='/company' />
                </div></>

            }

            {coupons?.length === 0 && <><EmptyView message='Ooops.. No coupons to display!' />
                <GoMenu to='/company' />
                <Link to="/company/add-coupon" className="btn btn-success">Add a new Coupon</Link></>}


        </div>
    );
}

export default CompanyCoupons;
