export default function Anchor(props) {
	return (
		<>
			<a
				key={props.key}
				href={props.href}
				title={props.title}
				target={props.target}
				rel={props.rel}
				className={props.className}
				download={props.download}
			>
				{props.prefix}
				{props.text}
				{props.suffix}
			</a>
		</>
	);
}
