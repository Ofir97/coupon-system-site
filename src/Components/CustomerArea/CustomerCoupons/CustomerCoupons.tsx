import axios from "axios";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { CouponsListModel } from "../../../Models/resources-lists/CouponsList";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import { Utils } from "../../../Services/Utils";
import Avatar from "../../SharedArea/Avatar/Avatar";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import ILTime from "../../SharedArea/ILTime/ILTime";
import FilterSection from "../../UIArea/FilterSection/FilterSection";
import "./CustomerCoupons.css";

function CustomerCoupons(): JSX.Element {

    const init: Coupon[] = [];
    const [coupons, setCoupons] = useState<Coupon[]>(init);

    const getCouponsFromFilter = (coupons: Coupon[]) => {
        coupons?.length > 0 ? setCoupons(coupons) : notify.error('no coupons from this filter');
    }

    const getAllCoupons = async () => {
        getCoupons();
    }

    const getCoupons = async () => {
        axios.get<CouponsListModel>(globals.urls.customerCoupons)
            .then(response => {
                setCoupons(response.data.coupons);
            })
            .catch(err => {
                notify.error(err);
            })
    }

    useEffect(() => {

        getCoupons()

    }, [])

    return (
        <div className="CustomerCoupons">
            {coupons?.length > 0 && <><h2 className="display-5">Purchased Coupons</h2>
                <FilterSection filterCb={getCouponsFromFilter} allCouponsCb={getAllCoupons} resource="customer" />
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
                                    </ul>
                                </div>
                            </div>
                        ]
                    })}

                    <GoMenu to='/customer' />
                </div></>}

            {coupons?.length === 0 && <><EmptyView message='No coupons have been purchased!' />
                <GoMenu to='/customer' />
                <Link to="/customer/coupons"><Button variant="outline-primary">View all coupons</Button></Link></>}
        </div >
    );
}

export default CustomerCoupons;
