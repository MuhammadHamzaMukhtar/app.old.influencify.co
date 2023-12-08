import oops from "@assets/oops.png";
import LinkTo from "./global/LinkTo";

function InternalServer() {
	return (
		<div>
			<div className="containers">
				<div className="text-center pt-12 mb-12">
					<img
						className="w-[400px] mx-auto"
						src={oops}
						alt="500 Server Error"
					/>
					<h1 className="text-[32px] my-6 font-bold">500 Server Error</h1>
					<p>Whoops, something went wrong on our servers.</p>
					<LinkTo
						to="/"
						text="Go Home"
						className="px-12 rounded-[8px] h-[40px] text-[14px] mt-[1rem] inline-flex items-center bg--purple text-white hover:opacity-80"
					/>
				</div>
			</div>
		</div>
	);
}
export default InternalServer;
