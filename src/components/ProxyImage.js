import { Component } from "react";
import axios from "axios";
import bgVector from "@assets/bg_grey.png";

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

	render() {
		const { src } = this.state;
		const { className, alt } = this.props;
		return (
			<>
				<img className={className} src={src} alt={alt} />
			</>
		);
	}
}
export default ProxyImage;
