import React, { Component } from "react";
import { FaSpinner } from "react-icons/fa";

class ContainerLoader extends Component {
	render() {
		return (
			<div className="container-loader absolute flex justify-center items-center   ">
				<div>
					<FaSpinner className="animate-[spin_2s_linear_infinite] pink" />
					<h5 className="container-loader-text text-[16px] mt-4">
						Loading, please wait...
					</h5>
				</div>
			</div>
		);
	}
}

export default ContainerLoader;
