const Tooltip = (props) => {
	return (
		<div className={"relative group/tooltip cursor-pointer"}>
			{props.trigger}
			<div
				className={`group-hover/tooltip:block hidden ${props.backgroundColor ? props.backgroundColor : 'before:bg-[#1b1c1d] bg-[#1b1c1d]'} ${props.text ? props.text : 'text-[#fff] '} shadow-lg before:absolute before:content-[''] before:w-[.71428571em] before:h-[.71428571em] before:transform before:rotate-[45deg]  absolute min-w-max z-[1900] rounded-[8px] ${
					props.placement === "top-left"
						? "bottom-full left-0 mb-[0.71428571em] before:bottom-[-.30714286em] before:left-[1em]"
						: props.placement === "top-right"
						? "bottom-full right-0 mb-[0.71428571em] before:bottom-[-.30714286em] before:right-[1em]"
						: props.placement === "top-center"
						? "bottom-full left-1/2 transform translate-x-[-50%] mb-[0.71428571em] before:bottom-[-.30714286em] before:left-1/2 before:translate-x-[-50%]"
						: props.placement === "bottom-left"
						? "top-full left-0 mt-[0.71428571em] before:top-[-.30714286em] before:left-[1em]"
						: props.placement === "bottom-right"
						? "top-full right-0 mt-[0.71428571em] before:top-[-.30714286em] before:right-[1em]"
						: props.placement === "bottom-center"
						? "top-full left-1/2 transform translate-x-[-50%] mt-[0.71428571em] before:top-[-.30714286em] before:left-1/2 before:translate-x-[-50%]"
						: props.placement === "left"
						? "left-full top-1/2 transform translate-y-[-50%] ml-[0.71428571em] before:left-[-.30714286em] before:top-1/2 before:translate-y-[-50%]"
						: null
				}`}
			>
				<p className="p-[0.833em_1em] font-normal w-full text-[12px] max-w-[250px] whitespace-normal z-[1059]">
					{props.tooltipText}
				</p>
			</div>
		</div>
	);
};

export default Tooltip;
