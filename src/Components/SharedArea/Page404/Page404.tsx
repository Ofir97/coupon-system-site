import "./Page404.css";
import img from '../../../Assets/images/404.png';
import GoHome from "../GoHome/GoHome";

function Page404(): JSX.Element {
    return (
        <div className="Page404">
            <div className="page-wrap d-flex flex-row align-items-center">
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-md-12 text-center">
                            <img src={img}></img>
                            <span className="display-1 d-block msg-404">404</span>
                            <div className="mb-4 lead">The page you are looking for was not found.</div>
                            {/* <a href="https://www.totoprayogo.com/#" className="btn btn-link">Back to Home</a> */}
                            
                            <GoHome />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Page404;
