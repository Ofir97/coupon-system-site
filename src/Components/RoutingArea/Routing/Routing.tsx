import { Route, Routes } from "react-router-dom";
import { Customer } from "../../../Models/Customer";
import AddCompany from "../../AdminArea/AddCompany/AddCompany";
import AddCustomer from "../../AdminArea/AddCustomer/AddCustomer";
import AdminPage from "../../AdminArea/AdminPage/AdminPage";
import CompaniesList from "../../AdminArea/CompaniesList/CompaniesList";
import CustomersList from "../../AdminArea/CustomersList/CustomersList";
import UpdateCompany from "../../AdminArea/UpdateCompany/UpdateCompany";
import UpdateCustomer from "../../AdminArea/UpdateCustomer/UpdateCustomer";
import ViewCouponsList from "../../AdminArea/ViewCouponsList/ViewCouponsList";
import AddCoupon from "../../CompanyArea/AddCoupon/AddCoupon";
import CompanyCoupons from "../../CompanyArea/CompanyCoupons/CompanyCoupons";
import CompanyDetails from "../../CompanyArea/CompanyDetails/CompanyDetails";
import CompanyPage from "../../CompanyArea/CompanyPage/CompanyPage";
import UpdateCoupon from "../../CompanyArea/UpdateCoupon/UpdateCoupon";
import CouponsList from "../../CustomerArea/CouponsList/CouponsList";
import CustomerCoupons from "../../CustomerArea/CustomerCoupons/CustomerCoupons";
import CustomerDetails from "../../CustomerArea/CustomerDetails/CustomerDetails";
import CustomerPage from "../../CustomerArea/CustomerPage/CustomerPage";
import About from "../../PagesArea/About/About";
import ContactUs from "../../PagesArea/ContactUs/ContactUs";
import Home from "../../PagesArea/Home/Home";
import Login from "../../PagesArea/Login/Login";
import Logout from "../../PagesArea/Logout/Logout";
import Weather from "../../PagesArea/Weather/Weather";
import Page404 from "../../SharedArea/Page404/Page404";

import "./Routing.css";

function Routing(): JSX.Element {
    return (
        <div className="Routing">
            <Routes>
                <Route index element={<Home />} />
                <Route path="about" element={<About />} />
                <Route path="login" element={<Login />} />
                <Route path="logout" element={<Logout />} />
                <Route path="contact-us" element={<ContactUs />} />
                <Route path="*" element={<Page404 />} />
                <Route path="weather" element={<Weather/>}/>

                {/* Admin Area */}
                <Route path="admin" element={<AdminPage />} />
                <Route path="admin/add-company" element={<AddCompany />} />
                <Route path="admin/update-company/:id" element={<UpdateCompany />} />
                <Route path="admin/company" element={<CompaniesList />} />
                <Route path="admin/company/:id/coupon" element={<ViewCouponsList />} />

                <Route path="admin/add-customer" element={<AddCustomer />} />
                <Route path="admin/update-customer/:id" element={<UpdateCustomer />} />
                <Route path="admin/customer" element={<CustomersList />} />
                <Route path="admin/customer/:id/coupon" element={<ViewCouponsList />} />

                {/* Company Area */}
                <Route path="company" element={<CompanyPage />} />
                <Route path="company/add-coupon" element={<AddCoupon />} />
                <Route path="company/update-coupon/:id" element={<UpdateCoupon />} />
                <Route path="company/coupons" element={<CompanyCoupons />} />
                <Route path="company/company-details" element={<CompanyDetails />} />

                {/* Customer Area */}
                <Route path="customer" element={<CustomerPage />} />
                <Route path="customer/coupons" element={<CouponsList />} />
                <Route path="customer/purchased-coupons" element={<CustomerCoupons />} />
                <Route path="customer/customer-details" element={<CustomerDetails />} />

            </Routes>
        </div>
    );
}

export default Routing;
