import { useLocation } from "react-router-dom";
import { Coupon } from "../../../Models/Coupon";
import { Utils } from "../../../Services/Utils";
import Avatar from "../../SharedArea/Avatar/Avatar";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import ILTime from "../../SharedArea/ILTime/ILTime";
import "./ViewCouponsList.css";

function ViewCouponsList(): JSX.Element {

    const location = useLocation();
    const state: any = location.state;
    const coupons = state.coupons as Coupon[];
    const model = state.model as string;

    return (
        <div className="ViewCouponsList">
            {coupons?.length > 0 && <><h2 className="display-6">{model}'s Coupons</h2>
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
                                    </ul>
                                </div>
                            </div>
                        ]
                    })}


                </div>
            </>
            }

            {coupons?.length === 0 && <EmptyView message='Ooops.. No coupons to display!' />}
            <GoMenu to={'/admin/' + model} />
        </div>
    );
}

export default ViewCouponsList;
