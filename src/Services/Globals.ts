class Globals{
}

class DevelopmentGlobals extends Globals{
    public urls = {
        admin: "http://localhost:8080/coupon-system/admin",
        company: "http://localhost:8080/coupon-system/company",
        customer: "http://localhost:8080/coupon-system/customer",

        companies: "http://localhost:8080/coupon-system/admin/company",
        customers: "http://localhost:8080/coupon-system/admin/customer",
        companyCoupons: "http://localhost:8080/coupon-system/company/coupon",
        
    }
}

class ProductionGlobals extends Globals{
    public urls = {
        admin: "http://localhost:8080/coupon-system/admin",
        company: "http://localhost:8080/coupon-system/company",
        customer: "http://localhost:8080/coupon-system/customer",
        
        companies: "http://localhost:8080/coupon-system/admin/company",
        customers: "http://localhost:8080/coupon-system/admin/customer",
        companyCoupons: "http://localhost:8080/coupon-system/company/coupon",
    }
}

const globals = process.env.NODE_ENV === 'production' ? new ProductionGlobals : new DevelopmentGlobals;

export default globals;