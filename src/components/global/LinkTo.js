import { Link } from "react-router-dom";
export default function LinkTo(props) {
	return (
		<>
			<Link
				to={props.to}
				className={props.className}
				state={props.state}
				target={props.target}
			>
				{props.prefix}
				{props.text}
				{props.suffix}
			</Link>
		</>
	);
}
