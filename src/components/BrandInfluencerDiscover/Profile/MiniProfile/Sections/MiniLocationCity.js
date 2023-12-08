import { IoMdInformationCircle } from "react-icons/io";

export default function MiniLocationCity() {
	return (
		<div className="bg-white rounded-[8px] border p-4 h-full shadow-none">
			<div className="pb-3">
				<h4 className="font-normal text-[16px] darkGray flex items-center">
					Location by City{" "}
					<IoMdInformationCircle size={22} className="ml-2 gray" />
				</h4>
			</div>
			<div>
				<div className="flex items-center mb-4">
					<div className="flex items-center">
						<span className="text-[22px] -mb-4 flag-icon flag-icon-us"></span>
						<p className="text-[14px] black font-normal mt-4 ml-2">Ney York</p>
					</div>
					<div className="ml-auto text-[14px] black font-normal mt-4">
						1.59%
					</div>
				</div>
				<div className="flex items-center mb-4">
					<div className="flex items-center">
						<span className="text-[22px] -mb-4 flag-icon flag-icon-us"></span>
						<p className="text-[14px] black font-normal mt-4 ml-2">Ney York</p>
					</div>
					<div className="ml-auto text-[14px] black font-normal mt-4">
						1.59%
					</div>
				</div>
				<div className="flex items-center mb-4">
					<div className="flex items-center">
						<span className="text-[22px] -mb-4 flag-icon flag-icon-us"></span>
						<p className="text-[14px] black font-normal mt-4 ml-2">Ney York</p>
					</div>
					<div className="ml-auto text-[14px] black font-normal mt-4">
						1.59%
					</div>
				</div>
				<div className="flex items-center mb-4">
					<div className="flex items-center">
						<span className="text-[22px] -mb-4 flag-icon flag-icon-us"></span>
						<p className="text-[14px] black font-normal mt-4 ml-2">Ney York</p>
					</div>
					<div className="ml-auto text-[14px] black font-normal mt-4">
						1.59%
					</div>
				</div>
				<div className="flex items-center mb-4">
					<div className="flex items-center">
						<span className="text-[22px] -mb-4 flag-icon flag-icon-us"></span>
						<p className="text-[14px] black font-normal mt-4 ml-2">Ney York</p>
					</div>
					<div className="ml-auto text-[14px] black font-normal mt-4">
						1.59%
					</div>
				</div>
			</div>
		</div>
	);
}
