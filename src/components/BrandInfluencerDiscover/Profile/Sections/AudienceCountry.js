import { useSelector } from "react-redux";
import { LeafletMap, TileLayer, CircleMarker, Tooltip } from "leaflet";

export default function AudienceCountry() {
	const current_influencer = useSelector(
		(state) => state.influencerSearch.current_influencer
	);
	return (
		<>
			<div className="grid grid-cols-12 gap-5">
				<div className="mt-4 col-span-12">
					<div className="border rounded-[8px]">
						<div className="p-4">
							<h4 className="text-[20px] text-center font-medium black pt-4">
								AUDIENCE TOP COUNTIRES
							</h4>
						</div>
						<div className="p-4">
							<div className="grid grid-cols-12 gap-5">
								<div className="md:col-span-7 col-span-12">
									{/* <LeafletMap
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
										{current_influencer.audienceTopCountries &&
										current_influencer.audienceTopCountries.length
											? current_influencer.audienceTopCountries.map(
													(country, k) => {
														return (
															<CircleMarker
																key={k}
																center={[
																	country.latitude ? country.latitude : "",
																	country.longitude ? country.longitude : "",
																]}
																radius={country.country_percentage}
																fillOpacity={0.7}
																stroke={false}
															>
																<Tooltip
																	direction="top"
																	offset={[-8, -2]}
																	opacity={1}
																>
																	<span>
																		{country.country_name +
																			": " +
																			country.country_percentage}
																		%
																	</span>
																</Tooltip>
															</CircleMarker>
														);
													}
											  )
											: ""}
									</LeafletMap> */}
								</div>
								<div className="md:col-span-5 col-span-12">
									<div className="flex flex-wrap">
										{current_influencer.audienceTopCountries &&
										current_influencer.audienceTopCountries.length ? (
											current_influencer.audienceTopCountries.map(
												(country, index) => (
													<div
														className="bg-[#f7f7f7] rounded-full px-[1rem] py-[0.5rem] cursor-pointer flex items-center m-[0.5rem]"
														key={index}
													>
														{country.country_code ? (
															<span
																className={`text-[15px] flag-icon mr-2 flag-icon-${(
																	country.country_code || ""
																).toLowerCase()}`}
															></span>
														) : (
															""
														)}
														<p className="text-[12px]">
															{" "}
															{country.country_name}{" "}
															<b>{country.country_percentage}%</b>
														</p>
													</div>
												)
											)
										) : (
											<div className="text-center w-full py-[5rem] px-[1rem] justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
												We have nothing to show you here.
											</div>
										)}
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}
