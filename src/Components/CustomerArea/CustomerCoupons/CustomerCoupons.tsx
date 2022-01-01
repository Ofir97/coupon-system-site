import { Coupon } from "../../../Models/Coupon";
import EmptyView from "../../SharedArea/EmptyView/EmptyView";
import GoMenu from "../../SharedArea/GoMenu/GoMenu";
import "./CustomerCoupons.css";

function CustomerCoupons(): JSX.Element {

    const coupons: Coupon[] = [];

    return (
        <div className="CustomerCoupons">
            {coupons?.length > 0 && <h2 className="display-5">Customer Coupons</h2>}
            {coupons?.length > 0 && <ul>{coupons.map(coupon => <li key={coupon.id}>{coupon.title}</li>)}</ul>} 

            {coupons?.length === 0 && <><EmptyView message='Ooops.. No coupons to display!' /><GoMenu to='/customer'/></>}
        </div >
    );
}

export default CustomerCoupons;
