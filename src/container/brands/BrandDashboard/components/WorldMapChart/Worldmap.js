import { memo } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import Worldgeography from "./geography.json";

const Worldmap = ({ setTooltipContent, data }) => {
	let list = data.audience_country ? data.audience_country : {};
	return (
		<>
			<ComposableMap data-tip="">
				<Geographies geography={Worldgeography}>
					{({ geographies }) =>
						geographies.map((geo) => (
							<Geography
								key={geo.rsmKey}
								geography={geo}
								onMouseEnter={() => {
									setTooltipContent(
										`${geo.properties.name} (${
											list[geo.id] ? list[geo.id] : 0
										})`
									);
								}}
								onMouseLeave={() => {
									setTooltipContent("");
								}}
								style={{
									default: {
										fill: list[geo.id] ? "#7c3292" : "#D6D6DA",
										outline: "none",
									},
									hover: {
										fill: "#F53",
										outline: "none",
									},
									pressed: {
										fill: "#E42",
										outline: "none",
									},
								}}
							/>
						))
					}
				</Geographies>
			</ComposableMap>
		</>
	);
};

export default memo(Worldmap);
