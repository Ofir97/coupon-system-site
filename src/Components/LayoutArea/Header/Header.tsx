import "./Header.css";
import { Container, Navbar, OverlayTrigger, Tooltip } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import logo from "../../../Assets/images/coupon-logo.png";
import store from "../../../Redux/Store";
import { FiLogOut } from "react-icons/fi";
import { BiLogInCircle } from "react-icons/bi";

function Header(): JSX.Element {

    const [time, setTime] = useState(new Date());
    const [user, setUser] = useState(store.getState().authState.user);

    useEffect(() => {
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
                        {user && <><Navbar.Text>Welcome back, </Navbar.Text>&#160;<Link to={user.clientType.toString().toLowerCase()} className="name">{user.name}</Link>
                            <span>&#160;|&#160;</span><OverlayTrigger placement='bottom' overlay={(p) => (<Tooltip {...p}>log out</Tooltip>
                            )}><Link to="/logout" className="logout"><FiLogOut /></Link></OverlayTrigger></>}

                        {!user && <><Navbar.Text>Hello Guest,&#160;</Navbar.Text><OverlayTrigger placement='bottom' overlay={(p) => (<Tooltip {...p}>login</Tooltip>
                            )}><Link to="/login" className="sign-in"><BiLogInCircle /></Link></OverlayTrigger></>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
