export default function Button(props) {
	return (
		<>
			<button
				type={props.type}
				key={props.key}
				disabled={props.disabled}
				onClick={props.onClick}
				className={props.className}
			>
				{props.prefix}
				{props.text}
				{props.suffix}
			</button>
		</>
	);
}
