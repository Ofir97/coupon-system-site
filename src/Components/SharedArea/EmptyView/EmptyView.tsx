import "./EmptyView.css";
import icon from '../../../Assets/images/nothing-found.png';
import GoHome from "../GoHome/GoHome";

interface EmptyViewProps {
	message: string;
}

function EmptyView(props: EmptyViewProps): JSX.Element {
    return (
        <div className="EmptyView">
			<h2 className="display-7">{props.message}</h2>
            <img src={icon}/>

            <GoHome/>
        </div>
    );
}

export default EmptyView;
