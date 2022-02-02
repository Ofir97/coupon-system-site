import axios from "axios";
import { useState } from "react";
import { Button, Col, Nav, Row, Tab } from "react-bootstrap";
import { CouponsListModel } from "../../../Models/models-lists/CouponsList";
import store from "../../../Redux/Store";
import globals from "../../../Services/Globals";
import tokenAxios from "../../../Services/InterceptorAxios";
import notify from "../../../Services/Notification";
import "./FilterSection.css";

interface FilterSectionProps {
    filterCb: Function;
    model: string;
}

function FilterSection(props: FilterSectionProps): JSX.Element {

    const [category, setCategory] = useState('');
    const [price, setPrice] = useState(0);

    const getURL = () => {
        if (props.model === 'company')
            return globals.urls.companyCoupons;
        if (props.model === 'customer')
            return globals.urls.customerCoupons;
        if (props.model === 'coupon')
            return globals.urls.coupons;

        return '';
    }

    const allCoupons = () => {
        if (props.model === 'customer') {
            props.filterCb(store.getState().customerCouponsState.customerCoupons);
        }
        else { 
            props.filterCb(store.getState().couponsState.coupons);
        }
    }

    const filterByPrice = async (e: any) => {
        e.preventDefault();
        const url = getURL();

        tokenAxios.get<CouponsListModel>(url + '/byMaxPrice?maxPrice=' + price)
            .then((response) => {
                props.filterCb(response.data.coupons);
            })
            .catch((err) => {
                notify.error(err);
            })

    }

    const filterByCategory = async (e: any) => {
        e.preventDefault();
        const url = getURL();

        tokenAxios.get<CouponsListModel>(url + '/byCategory?category=' + category)
            .then((response) => {
                props.filterCb(response.data.coupons);
            })
            .catch((err) => {
                notify.error(err);
            })
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
                            <Tab.Pane eventKey="category">
                                <form onSubmit={filterByCategory} className="filter-form">
                                    <select defaultValue={''} className="form-select" onChange={handleCategoryChange} required>
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
                                    <input className="form-control" placeholder="enter max price" type="number" min="0" max={100000} step="any" required onChange={handlePriceChange} />
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
