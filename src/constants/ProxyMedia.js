import { Component } from "react";
import axios from "axios";
import bgVector from "@assets/bg_grey.png";
import { BsFillPlayFill } from "react-icons/bs";

class ProxyMedia extends Component {
	constructor(props) {
		super(props);
		this.state = {
			src: bgVector,
			uri: null,
			loading: false,
		};
	}

	play = () => {
		const { item } = this.props;
		let url = item.video_url;
		if (item.post_type === "story") {
			if (item.video_versions && item.video_versions[0]) {
				url = process.env.REACT_APP_AWS_URl + item.video_url;
				this.setState({ uri: url });
			}
		} else {
			this.setState({ loading: true });
			axios
				.get(process.env.REACT_APP_CDN_URL + "/proxy-video-content", {
					params: { url: url },
				})
				.then((response) => {
					this.setState({ loading: false });
					if (response.status === 200) {
						this.setState({ uri: response.data });
					}
				})
				.catch(function (thrown) {
					this.setState({ loading: false });
				});
		}
	};

	downloadMedia = (src) => {
		const { item } = this.props;
		const downloadLink = document.createElement("a");
		downloadLink.href = src;
		downloadLink.target = "_blank";
		downloadLink.download = item.id;
		document.body.appendChild(downloadLink);
		downloadLink.click();
		document.body.removeChild(downloadLink);
	};

	download = () => {
		const { item } = this.props;
		let url = item.video_url;
		if (item.post_type === "story") {
			if (item.video_versions && item.video_versions[0]) {
				url = process.env.REACT_APP_AWS_URl + item.video_url;
				this.downloadMedia(url);
				this.setState({ uri: url });
			}
		} else {
			this.setState({ loading: true });
			axios
				.get(process.env.REACT_APP_CDN_URL + "/proxy-video-content", {
					params: { url: url },
				})
				.then((response) => {
					this.setState({ loading: false });
					if (response.status === 200) {
						this.downloadMedia(response.data);
						this.setState({ uri: response.data });
					}
				})
				.catch(function (thrown) {
					this.setState({ loading: false });
				});
		}
	};

	componentDidMount() {
		const { item } = this.props;
		if (item.post_type === "story") {
			let url = "";
			if (item.display_url) {
				url = process.env.REACT_APP_AWS_URl + item.display_url;
				this.setState({ src: url });
			}
		} else {
			let source = axios.CancelToken.source();
			this.props.addCancelToken(source);

			axios
				.get(process.env.REACT_APP_CDN_URL + "/proxy-image-content", {
					params: { url: item.display_url },
					cancelToken: source.token,
				})
				.then((response) => {
					if (response.status === 200) {
						this.setState({ src: response.data });
					}
				})
				.catch(function (thrown) {});
		}
	}

	render() {
		const { src, uri, loading } = this.state;
		const { width, height, className, item } = this.props;
		return (
			<>
				{uri ? (
					<iframe
						id={`download-video-${item.id}`}
						style={{ borderRadius: 10 }}
						frameBorder="0"
						width={"100%"}
						title="Proxy Media"
						height={280}
						src={uri}
					></iframe>
				) : (
					<>
						{item.media_type === 2 && (
							<>
								<div
									id={`download-play-${item.id}`}
									onClick={this.download}
								></div>
								<div
									onClick={this.play}
									className="absolute w-full h-full cursor-pointer flex items-center justify-center"
								>
									{loading ? (
										<div className="ui active centered inline loader back"></div>
									) : (
										<div className="purple items-center">
											<BsFillPlayFill size={90} />
										</div>
									)}
								</div>
							</>
						)}
						<img
							id={`download-${item.id}`}
							className={className}
							width={width}
							height={height}
							src={src}
							alt="download"
						/>
					</>
				)}
			</>
		);
	}
}
export default ProxyMedia;
