import { Component } from "react";
import avatar from "@assets/avatar.png";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

class ExpandedRows extends Component {
	constructor(props) {
		super(props);
		this.state = {
			open: false,
		};
	}

	setOpen = (e, uniqueId) => {
		this.setState({
			open: e,
		});
	};
	render() {
		return (
			<>
				<tr>
					<td className="flex justify-center items-center">
						<img
							src={
								this.props.content.profile_pic
									? this.props.content.profile_pic
									: avatar
							}
							alt="avatar"
							className="rounded-full mr-4 w-[32px]"
						/>
						{this.props.content.name}
					</td>
					<td align="center">{this.props.content.contentsCount}</td>
					<td align="center">
						{this.props.content.spent} {this.props.campaign.currency_code}
					</td>
					{/* <td align="center">
						{this.props.content.stats &&
							this.props.content.stats.totalImpressions}
					</td> */}
					<td align="center">
						{this.props.content.stats &&
							this.props.content.stats.totalReach}
					</td>
					<td align="center">
						{this.props.content.stats &&
							this.props.content.stats.totalEngagement}
					</td>
					<td align="center">
						{this.props.content.stats &&
							this.props.content.stats.totalLikes}
					</td>
					<td align="center">
						{this.props.content.stats &&
							this.props.content.stats.totalComments}
					</td>
					<td align="center">
						{this.props.content.stats &&
							this.props.content.stats.totalViews}
					</td>
					{/* <td align="center">
						{this.props.content.stats &&
						this.props.content.stats.totalReach &&
						this.props.content.spent
							? (
									(this.props.content.spent /
										this.props.content.stats.totalReach) *
									1000
							  ).toFixed(2)
							: 0}{" "}
						{this.props.campaign.currency_code}
					</td>
					<td align="center">
						{this.props.content.stats &&
						this.props.content.stats.totalEngagement &&
						this.props.content.spent
							? (
									this.props.content.spent /
									this.props.content.stats.totalEngagement
							  ).toFixed(2)
							: 0}{" "}
						{this.props.campaign.currency_code}
					</td>
					<td align="center">
						N/A
						{this.state.open ? (
							<FiChevronUp onClick={(e) => this.setOpen(false)} />
						) : (
							<FiChevronDown onClick={(e) => this.setOpen(true)} />
						)}
					</td> */}
				</tr>
				<tr>
					<td style={{ padding: 0, border: 0 }} colSpan={11}>
						{this.state.open ? (
							<table>
								<tbody>
									{this.props.content &&
										this.props.content.stats &&
										this.props.content.stats.contents &&
										this.props.content.stats.contents.map(
											(historyRow, index) => (
												<tr key={index}>
													<td colSpan={2}>
														{historyRow.media_type === "VIDEO" ? (
															<a
																href={historyRow.permalink}
																target="_blank"
																rel="noopener noreferrer"
																className="card-link"
															>
																<iframe
																	title="Stats"
																	width="100%"
																	height="auto"
																	src={historyRow.media_url}
																	frameBorder="0"
																	allow="accelerometer; encrypted-media; gyroscope; picture-in-picture"
																	allowFullScreen
																></iframe>
															</a>
														) : (
															""
														)}
														{historyRow.media_type === "IMAGE" ||
														historyRow.media_type === "CAROUSEL_ALBUM" ? (
															<a
																href={historyRow.permalink}
																target="_blank"
																rel="noopener noreferrer"
																className="card-link"
															>
																<img
																	src={
																		historyRow.media_url
																			? historyRow.media_url
																			: avatar
																	}
																	alt="avatar"
																	className="rounded"
																	width="102px"
																/>
															</a>
														) : (
															""
														)}
													</td>
													<td align="center">--</td>
													<td align="center">--</td>
													<td align="center">{historyRow.impressions}</td>
													<td align="center">{historyRow.reach}</td>
													<td align="center">{historyRow.engagement}</td>
													<td align="center">{historyRow.like_count}</td>
													<td align="center">{historyRow.comments_count}</td>
													<td align="center">--</td>
													<td align="center">--</td>
													<td align="center">N/A</td>
												</tr>
											)
										)}
								</tbody>
							</table>
						) : (
							""
						)}
					</td>
				</tr>
			</>
		);
	}
}

export default ExpandedRows;
