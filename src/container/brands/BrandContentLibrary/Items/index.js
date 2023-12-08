import React, { Component } from "react";
import { AiOutlineInstagram } from "react-icons/ai";
import ContentDetail from "./ContentDetail";
import avatar from "@assets/avatar.png";
import { connect } from "react-redux";

class LibraryContentCard extends Component {
	constructor(props) {
		super(props);
		this.state = {};
		this.contentRef = React.createRef();
	}
	showContentDetail = () => {
		this.contentRef.current.showContentDetail();
	};
	render() {
		const { item } = this.props;
		return (
			<>
				<div
					className="library-grid-card rounded-[8px] shadow-sm overflow-hidden cursor-pointer flex flex-col relative border-[1px] border-[#0000002d]"
					onClick={this.showContentDetail}
				>
					<div>
						{item ? (
							<>
								{item.media_type === "VIDEO" ? (
									<a
										href={item.permalink}
										rel="noreferrer noopener"
										target="_blank"
										className="card-link"
									>
										<iframe
											title="VIDEO"
											className="w-full h-[auto]"
											src={item.media_url}
											frameBorder="0"
											allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
											allowFullScreen
										></iframe>
									</a>
								) : (
									""
								)}
								{item.media_type === "IMAGE" && (
									<a
										href={item.permalink}
										target="_blank"
										rel="noreferrer noopener"
										className="card-link"
									>
										<img
											className="max-h-[307px] object-cover"
											src={item.media_url}
											alt="avatar"
										/>
									</a>
								)}
							</>
						) : (
							<img
								className="max-h-[307px] object-cover"
								src={avatar}
								alt="avatar"
							/>
						)}
					</div>
					<div className="p-[1rem] grow">
						<div className="flex items-center">
							<div className="mr-4 success">
								<AiOutlineInstagram size={25} className="purple" />
							</div>
							<div>
								<h6 className="mb-1 text-[16px]">
									@{item && item.username ? item.username : ""}
								</h6>
								<p className="gray">
									{item && item.caption ? item.caption : ""}
								</p>
							</div>
						</div>
					</div>
				</div>

				<ContentDetail item={item} ref={this.contentRef} />
			</>
		);
	}
}
const mapStateToProps = ({ contentLibrary }) => {
	return {
		is_loading: contentLibrary.filter_loading,
		// items       : contentLibrary.items
	};
};

const mapDispatchToProps = (dispatch) => {
	return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(LibraryContentCard);
