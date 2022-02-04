import "./Header.css";
import { Container, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../../Assets/images/coupon-logo.png";
import store from "../../../Redux/Store";
import { FiLogOut } from "react-icons/fi";
import { BiLogInCircle } from "react-icons/bi";

function Header(): JSX.Element {

    const navigate = useNavigate();
    const [time, setTime] = useState(new Date());
    const [user, setUser] = useState(store.getState().authState.user);

    useEffect(() => {
        if (Date.parse(new Date().toString()) > Date.parse(user?.tokenExpirationTime?.toString())) {
            navigate("/logout")
        }

        const unsubscribe = store.subscribe(() => {
            setUser(store.getState().authState.user);
        });

        const timerID = setInterval(() => {
            setTime(new Date());
        }, 1000)

        return () => {
            clearInterval(timerID);
            unsubscribe();
        }
    })

    const displayTime = () => {
        const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
        const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
        const seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
        return `${hours}:${minutes}:${seconds}`;
    }

    return (
        <div className="Header">
            <span className="clock">{displayTime()}</span>
            <Navbar variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/"><img src={logo} /><h6 className="display-6">Coupon System</h6></Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {user && <><Navbar.Text><span className="welcome-msg">Welcome back, </span></Navbar.Text>&#160;<Link to={user.clientType.toString().toLowerCase()} className="name">{user.name}</Link>
                            <span id="pipe">&#160;|&#160;</span><OverlayTrigger placement='bottom' overlay={(p) => (<Tooltip {...p}>log out</Tooltip>
                            )}><Link to="/logout" className="logout"><FiLogOut /></Link></OverlayTrigger></>}

                        {!user && <><Navbar.Text><span className="welcome-msg">Hello Guest</span><span id="pipe">&#160;|&#160;</span></Navbar.Text><OverlayTrigger placement='bottom' overlay={(p) => (<Tooltip {...p}>login</Tooltip>
                        )}><Link to="/login" className="sign-in"><BiLogInCircle /></Link></OverlayTrigger></>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
