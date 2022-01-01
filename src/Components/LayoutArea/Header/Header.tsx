import "./Header.css";
import { Container, Navbar } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

function Header(): JSX.Element {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timerID = setInterval(() => {
            setTime(new Date());
        }, 1000)

        return () => {
            clearInterval(timerID);
        }
    })

    const displayTime = () => {
        const hours = time.getHours() < 10 ? '0' + time.getHours() : time.getHours();
        const minutes = time.getMinutes() < 10 ? '0' + time.getMinutes() : time.getMinutes();
        const seconds = time.getSeconds() < 10 ? '0' + time.getSeconds() : time.getSeconds();
        return `${hours}:${minutes}:${seconds}`;
    }
    
    const flag = false;
    return (
        <div className="Header">
            <span className="clock">{displayTime()}</span>
            <Navbar variant="dark">
                <Container>
                    <Navbar.Brand as={Link} to="/">Coupon System</Navbar.Brand>
                    <Navbar.Toggle />
                    <Navbar.Collapse className="justify-content-end">
                        {flag && <Navbar.Text>Signed in as: <a href="#login">Ofir</a></Navbar.Text>}
                        {!flag && <Navbar.Text>Hello Guest <Link to="/login">sign in</Link></Navbar.Text>}
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;
