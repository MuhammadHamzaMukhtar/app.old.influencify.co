import { Component } from "react";
import axios from "axios";
import bgVector from "@assets/bg_grey.png";
import { saveAs } from "file-saver";

class ProxyImage extends Component {
	constructor(props) {
		super(props);
		this.state = {
			src: bgVector,
		};
	}

	async componentDidMount() {
		const { url } = this.props;
		let source = axios.CancelToken.source();
		this.props.addCancelToken(source);
		axios
			.get(process.env.REACT_APP_CDN_URL + "/proxy-image-content", {
				params: { url: url },
				cancelToken: source.token,
			})
			.then((response) => {
				if (response.status == 200) {
					this.setState({ src: response.data });
				}
			})
			.catch(function (thrown) {});
	}

	Download = (url) => {
		saveAs(url, "image.png");
	};

	render() {
		const { src } = this.state;
		const { className, alt } = this.props;
		return (
			<div className="row">
				<div className="flex justify-end mb-1">
					<div
						href={src}
						onClick={() => this.Download(src)}
						download
						className="success text-[14px] cursor-pointer"
					>
						Download
					</div>
				</div>
				<div className="col-md-8">
					<img className={className} src={src} alt={alt} />
				</div>
				<div className="bg-[#0000001f] h-[1px] w-full my-4" />
			</div>
		);
	}
}
export default ProxyImage;
