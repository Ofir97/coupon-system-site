import axios from "axios";
import { useEffect, useState } from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import coupon from "../../../Assets/images/coupon.png";
import { Coupon } from "../../../Models/Coupon";
import store from "../../../Redux/Store";
import "./FilterSection.css";

interface FilterSectionProps {
    filterCb: Function;
    model: string;
}

function FilterSection(props: FilterSectionProps): JSX.Element {
    const [coupons, setCoupons] = useState<Coupon[]>([]);
    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);

    useEffect(() => {
        switch (props.model) {
            case 'company':
                setCoupons(store.getState().companyCouponsState.companyCoupons);
                break;
            case 'customer':
                setCoupons(store.getState().customerCouponsState.customerCoupons);
                break;
            case 'coupon':
                setCoupons(store.getState().couponsState.coupons);
                break;
        }

    }, [])

    const allCoupons = () => {
        props.filterCb(coupons);
    }

    const filterByPrice = async (e: any) => {
        e.preventDefault();
        props.filterCb(coupons.filter(coupon => {
            return coupon.price <= price;
        }))
    }

    const filterByCategory = async (e: any) => {
        e.preventDefault();
        props.filterCb(coupons.filter(coupon => {
            return coupon.category.toString() === category;
        }))
    }


    const handlePriceChange = (e: any) => {
        setPrice(e.target.value);
    }

    const handleCategoryChange = (e: any) => {
        setCategory(e.target.value);
    }

    return (
        <div className="FilterSection">
            <h3 className="filter-header">Filter coupons</h3>
            <Tab.Container id="left-tabs-example" defaultActiveKey="first">
                <Row>
                    <Col sm={5}>
                        <Nav variant="pills" className="flex-column">
                            <Nav.Item>
                                <Nav.Link eventKey="all" onClick={allCoupons}>Show all</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="category">By Category</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="price">By Price</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Col>
                    <Col sm={7}>
                        <Tab.Content>
                            <Tab.Pane eventKey="all">
                                <div className="coupon-icon"><img src={coupon}/></div>

                            </Tab.Pane>
                            <Tab.Pane eventKey="category">
                                <form onSubmit={filterByCategory} className="filter-form">
                                    <select defaultValue={''} className="form-select category-input" onChange={handleCategoryChange} required>
                                        <option value="" disabled>Choose Category</option>
                                        <option value="FOOD">Food</option>
                                        <option value="ELECTRICITY">Electricity</option>
                                        <option value="RESTAURANT">Restaurant</option>
                                        <option value="VACATION">Vacation</option>
                                        <option value="SPA">Spa</option>
                                        <option value="TECHNOLOGY">Technology</option>
                                    </select>

                                    <Button name="submit" variant="outline-primary" type="submit">Filter</Button>
                                </form>

                            </Tab.Pane>
                            <Tab.Pane eventKey="price">
                                <form onSubmit={filterByPrice} className="filter-form">
                                    <input className="form-control price-input" placeholder="enter max price" type="number" min="0" max={100000} step="any" required onChange={handlePriceChange} />
                                    <Button name="submit" variant="outline-primary" type="submit">Filter</Button>
                                </form>

                            </Tab.Pane>
                        </Tab.Content>
                    </Col>
                </Row>
            </Tab.Container>

        </div>
    );
}

export default FilterSection;
