import CustomLink from "../CustomLink/CustomLink";
import "./Nav.css";

function Nav(): JSX.Element {
    return (
        <div className="Nav">
			<nav className="flex-column">
                <CustomLink to="/">Home</CustomLink>
                <CustomLink to="/admin" >Admin</CustomLink>
                <CustomLink to="/company">Company</CustomLink>
                <CustomLink to="/customer">Customer</CustomLink>
                <CustomLink to="/about">About</CustomLink>
            </nav>
        </div>
    );
}

export default Nav;
