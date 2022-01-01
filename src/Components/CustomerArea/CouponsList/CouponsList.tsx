import { Coupon } from "../../../Models/Coupon";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import "./CouponsList.css";

function CouponsList(): JSX.Element {

    const coupons: Coupon[] = [];


    return (
        <div className="CouponsList">
            {coupons?.length > 0 && <h2 className="display-5">All coupons of the system...</h2>}
            {coupons?.length > 0 && <ul>{coupons.map(coupon => <li key={coupon.id}>{coupon.title}</li>)}</ul>} 
                

            {coupons?.length === 0 && <><EmptyView message='Ooops.. No coupons to display!' /><GoMenu to='/customer'/></>}
        </div>
    );
}

export default CouponsList;
