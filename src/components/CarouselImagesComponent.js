import React from "react";
import Carousel, { Modal, ModalGateway } from "react-images";

const navButtonStyles = (base) => ({
	...base,
	backgroundColor: "white",
	boxShadow: "0 1px 6px rgba(0, 0, 0, 0.18)",
	color: "#000",

	"&:hover, &:active": {
		backgroundColor: "white",
		color: "#000",
		opacity: 1,
	},
	"&:active": {
		boxShadow: "0 1px 3px rgba(0, 0, 0, 0.14)",
		transform: "scale(0.96)",
	},
});

class CarouselImagesComponent extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			modalIsOpen: true,
			currentModal: null,
		};
	}

	toggleModal = (index) => {
		this.setState({ currentModal: index });
	};

	render() {
		const { currentModal } = this.state;

		return (
			<div>
				{!this.props.isLoading ? (
					<FilmStrip>
						{this.props.images.map((image, index) => (
							<div className="mx-3" onClick={() => this.toggleModal(index)} key={index}>
								<img
									className="w-full cursor-pointer"
									alt={image.caption}
									src={image.src}
									css={{
										cursor: "pointer",
										position: "absolute",
										maxWidth: "100%",
									}}
								/>
							</div>
						))}
					</FilmStrip>
				) : null}
				<ModalGateway>
					{Number.isInteger(currentModal) ? (
						<Modal
							allowFullscreen={false}
							closeOnBackdropClick={false}
							onClose={this.toggleModal}
							styles={{
								positioner: (base) => ({
									...base,
									display: "block",
								}),
							}}
						>
							<Carousel
								currentIndex={currentModal}
								views={this.props.images}
								styles={{
									container: (base) => ({
										...base,
										height: "100vh",
									}),
									view: (base) => ({
										...base,
										alignItems: "center",
										display: "flex ",
										height: "calc(100vh - 54px)",
										justifyContent: "center",

										"& > img": {
											maxHeight: "calc(100vh - 94px)",
										},
									}),
									navigationPrev: navButtonStyles,
									navigationNext: navButtonStyles,
								}}
							/>
						</Modal>
					) : null}
				</ModalGateway>
			</div>
		);
	}
}

const FilmStrip = (props) => (
	<div className="FilmStripWrap flex flex-wrap" {...props} />
);

export default CarouselImagesComponent;
