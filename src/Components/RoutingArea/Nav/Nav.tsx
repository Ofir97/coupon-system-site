import CustomLink from "../CustomLink/CustomLink";
import {AiOutlineHome} from "react-icons/ai";
import {GoInfo} from "react-icons/go";
import {RiContactsFill} from "react-icons/ri";
import {TiWeatherPartlySunny} from "react-icons/ti";
import "./Nav.css";
import store from "../../../Redux/Store";
import { useEffect, useState } from "react";
import { HiMenu } from "react-icons/hi";

function Nav(): JSX.Element {

    const [user, setUser] = useState(store.getState().authState.user);

    useEffect(() => {
        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });
    
        return () => { unsubscribe(); }
    })
    
    return (
        <div className="Nav">
			<nav className="flex-column">
                <CustomLink to="/"><span className="icon"><AiOutlineHome/></span> Home</CustomLink>
                {user && <CustomLink to={user?.clientType?.toString().toLocaleLowerCase()}><span className="icon"><HiMenu /></span> Menu</CustomLink>}
                <CustomLink to="/weather"><span className="icon"><TiWeatherPartlySunny/></span> Weather</CustomLink>
                <CustomLink to="/about"><span className="icon"><GoInfo/></span> About</CustomLink>
                <CustomLink to="/contact-us"><span className="contact-us"><RiContactsFill/></span> Contact Us</CustomLink>
            </nav>
        </div>
    );
}

export default Nav;
