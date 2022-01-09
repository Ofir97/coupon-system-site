import axios from "axios";
import { useEffect, useState } from "react";
import { RiH1 } from "react-icons/ri";
import { Coupon } from "../../../Models/Coupon";
import { CouponsListModel } from "../../../Models/resources-lists/CouponsList";
import { ResponseDto } from "../../../Models/ResponseDto";
import { couponsDownloadedAction } from "../../../Redux/CouponsAppState";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import notify, { SccMsg } from "../../../Services/Notification";
import { Utils } from "../../../Services/Utils";
import Avatar from "../../SharedArea/Avatar/Avatar";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import ILTime from "../../SharedArea/ILTime/ILTime";
import { GrStatusGood } from "react-icons/gr";
import PurchaseButton from "../../UIArea/PurchaseButton/PurchaseButton";
import "./CouponsList.css";
import FilterSection from "../../UIArea/FilterSection/FilterSection";

function CouponsList(): JSX.Element {

    const [coupons, setCoupons] = useState<Coupon[]>(store.getState().couponsState.coupons);

    const init: Coupon[] = [];
    const [customerCoupons, setCustomerCoupons] = useState<Coupon[]>(init);

    const getCouponsFromFilter = (coupons: Coupon[]) => {
        coupons?.length > 0 ? setCoupons(coupons) : notify.error('no coupons from this filter');
    }

    const getAllCoupons = async () => {
        axios.get<CouponsListModel>(globals.urls.coupons)
        .then((response) => {
            store.dispatch(couponsDownloadedAction(response.data.coupons));
            setCoupons(response.data.coupons);
            response.data.coupons.length > 0 && notify.success(SccMsg.ALL_COUPONS);
        })
        .catch((err) => {
            notify.error(err);
        })
    }

    const getCustomerCoupons = async () => {
        axios.get<CouponsListModel>(globals.urls.customerCoupons)
            .then(response => {
                setCustomerCoupons(response.data.coupons);
            })
            .catch(err => {
                notify.error(err);
            })
    }

    useEffect(() => {
        coupons.length === 0 && getAllCoupons();
        getCustomerCoupons();

    }, [])

    const purchaseCoupon = async (couponId: number) => {
        axios.get<ResponseDto>(globals.urls.customer + '/purchaseCoupon/' + couponId)
            .then(response => {
                if (response.data.success) {
                    notify.success(response.data.message);
                    getCustomerCoupons();
                }
                else notify.error(response.data.message);
            })
            .catch(err => {
                notify.error(err);
            })
    }

    const isCouponPurchased = (couponId: number) => {
        let isPurchased = false;

        customerCoupons.forEach(coupon => {
            if (coupon.id === couponId) {
                isPurchased = true;
            }
        })

        return isPurchased;
    }

    return (
        <div className="CouponsList">
            {coupons?.length > 0 && <><h2 className="display-5">All coupons</h2>
            <FilterSection filterCb={getCouponsFromFilter} allCouponsCb={getAllCoupons} resource="coupon" />
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
                                    <li className="list-group-item"><span>Price: </span>{coupon.price.toFixed(2)}$</li>
                                    <li className="list-group-item"><span>{isCouponPurchased(coupon.id) ? <div className="purchased-msg">purchased</div> :
                                        (<PurchaseButton cb={purchaseCoupon} couponId={coupon.id} />)
                                    }</span></li>
                                </ul>
                            </div>
                        </div>
                    ]
                })}

                <GoMenu to='/customer' />
            </div></>}

            {coupons?.length === 0 && <><EmptyView message='Ooops.. No coupons to display!' /><GoMenu to='/customer' /></>}
        </div>
    );
}

export default CouponsList;
