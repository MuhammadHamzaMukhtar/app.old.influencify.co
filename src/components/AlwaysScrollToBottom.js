import { useEffect, useRef } from "react";

const AlwaysScrollToBottom = () => {
	const elementRef = useRef();
	useEffect(() => elementRef.current.scrollIntoView());
	return <li ref={elementRef} className="list-none" />;
};

export default AlwaysScrollToBottom;
