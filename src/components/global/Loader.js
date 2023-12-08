import { FaSpinner } from "react-icons/fa";
const Loader = (props) => {
	return (
		<div className={props.className}>
			<FaSpinner
				className={`animate-[spin_2s_linear_infinite]  ${
					props.color ? props.color : "pink"
				}`}
				size={props.size}
			/>
		</div>
	);
};

export default Loader;
