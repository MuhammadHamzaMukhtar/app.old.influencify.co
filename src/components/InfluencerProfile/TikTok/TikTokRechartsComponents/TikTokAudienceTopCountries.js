import { Component } from "react";
import { connect } from "react-redux";
import {
	Map as LeafletMap,
	TileLayer,
	CircleMarker,
	Tooltip,
} from "react-leaflet";

const style = {
	fillColor: "#F28F3B",
	weight: 2,
	opacity: 1,
	color: "white",
	dashArray: "3",
	fillOpacity: 0.5,
};

class TikTokAudienceTopCountries extends Component {
	constructor(props) {
		super(props);
		this.state = {
			setContent: "",
			content: "",
		};
	}
	render() {
		return (
			<div className="grid grid-cols-12 gap-5">
				<div className="md:col-span-7 col-span-12">
					<LeafletMap
						center={[50, 10]}
						zoom={1}
						maxZoom={1}
						attributionControl={false}
						zoomControl={false}
						doubleClickZoom={false}
						scrollWheelZoom={false}
						dragging={false}
						animate={false}
						easeLinearity={0.35}
					>
						<TileLayer url="https://{s}.tile.osm.org/{z}/{x}/{y}.png" />
						{/*
							{this.props.audienceTopCountries.map((country , index)=>
								country.latitude && country.longitude ? 
								<Marker key={index} position={[country.latitude, country.longitude]}>
								<Popup>
								{country.country_name} <br /> {country.country_value}
								</Popup>
								</Marker>
								: ''
							)}
						*/}

						{this.props.audienceTopCountries.map((country, k) => {
							return (
								<CircleMarker
									key={k}
									center={[country.latitude, country.longitude]}
									radius={country.country_percentage}
									fillOpacity={0.7}
									stroke={false}
								>
									<Tooltip direction="right" offset={[-8, -2]} opacity={1}>
										<span>
											{country.country_name + ": " + country.country_value}
										</span>
									</Tooltip>
								</CircleMarker>
							);
						})}
					</LeafletMap>
				</div>
				<div className="md:col-span-5 col-span-12">
					<div className="flex flex-col">
						{this.props.audienceTopCountries.length ? (
							this.props.audienceTopCountries.map((country, index) => (
								<div
									className="flex justify-between px-[16px] py-[8px] items-center"
									key={index}
								>
									<div className="grid grid-cols-12 gap-5 w-full">
										<div className="sm:col-span-6 col-span-12 pl-0">
											<p>{country.country_name}</p>
										</div>
										<div className="sm:col-span-3 col-span-12 text-center">
											<b>{country.country_value}</b>
										</div>
										<div className="sm:col-span-3 col-span-12 text-right pr-0">
											<b>{country.country_percentage}%</b>
										</div>
									</div>
								</div>
							))
						) : (
							<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
								We have nothing to show you here.
							</div>
						)}
					</div>
				</div>
			</div>
		);
	}
}

const mapStateToProps = (state) => {
	return {
		audienceTopCountries: state.InfluencerProfileReducer.audienceTopCountries,
		geojson: state.InfluencerProfileReducer.geojson,
	};
};

export default connect(mapStateToProps, null)(TikTokAudienceTopCountries);
