import "./Avatar.css";

interface AvatarProps {
    className: string;
    uuid: string;
}

function Avatar(props: AvatarProps): JSX.Element {
    return (
        <div className="Avatar">
			<img className={props.className} src={props.uuid} />
        </div>
    );
}

export default Avatar;
