import oops from "@assets/oops.png";
import LinkTo from "./global/LinkTo";

function NotFound(props) {
	// useEffect(() => {
	// 	props.history.replace('/404');
	// }, []);

	return (
		<div>
			<div className="containers">
				<div className="text-center pt-12 mb-12">
					<img
						className="logo mx-auto"
						src={oops}
						alt="Page Not Found"
						width="400"
					/>
					<h2 className="text-[24px] black mt-6 mb-4">Page Not Found</h2>
					<p>Sorry, the page you are looking for could not be found.</p>
					<LinkTo
						to="/"
						text="Go Home"
						className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-4"
					/>
				</div>
			</div>
		</div>
	);
}
export default NotFound;
