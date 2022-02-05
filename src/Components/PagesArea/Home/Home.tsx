import axios from "axios";
import { useEffect, useState } from "react";
import { Carousel } from "react-bootstrap";
import { Coupon } from "../../../Models/Coupon";
import { CouponsListModel } from "../../../Models/models-lists/CouponsList";
import globals from "../../../Services/Globals";
import notify from "../../../Services/Notification";
import "./Home.css";

function Home(): JSX.Element {

    const init: Coupon[] = [];
    const [coupons, setCoupons] = useState<Coupon[]>(init);

    const getAllCoupons = () => {
        axios.get<CouponsListModel>(globals.urls.coupons)
            .then((response) => {
                setCoupons(response.data.coupons);
            })
            .catch((err) => {
                notify.error(err);
            })
    }

    useEffect(() => {
        getAllCoupons();

    }, [])

    return (
        <div className="Home">
            <h2 className="display-4">Coupon System</h2>

            

            {coupons?.length > 0 &&
                <Carousel interval={3000} variant="dark">
                    {coupons.map(coupon => (
                        <Carousel.Item key={coupon.id}>
                            <img
                                className="testimonialImages d-block w-50"
                                src={coupon.image}
                            />
                            <Carousel.Caption>
                                <div className="caption-container">
                                    <h4 className="display-5">{coupon.title}</h4>
                                    <p className="description">{coupon.description}</p>
                                    <p className="price">Price: {coupon.price}$</p>
                                </div>
                            </Carousel.Caption>
                        </Carousel.Item>
                    ))}
                </Carousel>}
        </div>
    );
}

export default Home;
