import { Component } from "react";
class InfluencerRedirect extends Component {
	componentDidMount() {
		const id = this.props.match.params.id;
		setTimeout(() => {
			window.location.href = decodeURIComponent(id);
		}, 2000);
	}
	render() {
		return <div>Redirect...</div>;
	}
}

export default InfluencerRedirect;
