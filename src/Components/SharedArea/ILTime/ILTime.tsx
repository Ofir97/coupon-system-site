import "./ILTime.css";
import Moment from "react-moment";

interface ILTimeProps {
	date: Date;
}

function ILTime(props: ILTimeProps): JSX.Element {
    return (
        <div className="ILTime">
            <Moment format="DD/MM/YYYY">
                {props.date}
            </Moment>
        </div>
    );
}

export default ILTime;
