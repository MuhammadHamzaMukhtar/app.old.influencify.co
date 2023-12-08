import ShoppingRetail from "@assets/shopping_retail.png";
import TelevisionFilm from "@assets/television_film.png";
import ClothesShoesHandbags from "@assets/clothes_shoes_handbags.png";
import BeautyCosmetics from "@assets/beauty_cosmetics.png";
import FriendsFamilyRelationships from "@assets/friends_family_relationships.png";
import CameraPhotography from "@assets/camera_photography.png";
import TravelTourismAviation from "@assets/travel_tourism_aviation.png";
import RestaurantsFoodGrocery from "@assets/restaurants_food_grocery.png";
import Music from "@assets/music.png";
import ElectronicsComputers from "@assets/electronics_computers.png";
import ArtDesign from "@assets/art_design.png";
import Wedding from "@assets/wedding.png";
import ToysChildrenBaby from "@assets/toys_children_baby.png";
import Sports from "@assets/sports.png";
import LuxuryGoods from "@assets/luxury_goods.png";
import JewelleryWatches from "@assets/jewellery_watches.png";
import Activewear from "@assets/activewear.png";
import HealthyLifestyle from "@assets/healthy_lifestyle.png";
import BeerWineSpirits from "@assets/beer_wine_spirits.png";
import CoffeeTeaBeverages from "@assets/coffee_tea_beverages.png";
import FitnesYoga from "@assets/fitnes_yoga.png";
import CarsMotorbikes from "@assets/cars_motorbikes.png";
import Gaming from "@assets/gaming.png";
import Pets from "@assets/pets.png";
import TobaccoSmoking from "@assets/tobacco_smoking.png";
import HomeDecorFurnitureGarden from "@assets/home_decor_furniture_garden.png";

export default function AudienceInterestIcons(name) {
	if (name === "Shopping & Retail") {
		return (
			<img src={ShoppingRetail} className="w-[22px]" alt="Shopping & Retail" />
		);
	} else if (name === "Television & Film") {
		return (
			<img src={TelevisionFilm} className="w-[22px]" alt="Television & Film" />
		);
	} else if (name === "Clothes, Shoes, Handbags & Accessories") {
		return (
			<img
				src={ClothesShoesHandbags}
				className="w-[22px]"
				alt="Clothes, Shoes, Handbags & Accessories"
			/>
		);
	} else if (name === "Beauty & Cosmetics") {
		return (
			<img
				src={BeautyCosmetics}
				className="w-[22px]"
				alt="Beauty & Cosmetics"
			/>
		);
	} else if (name === "Friends, Family & Relationships") {
		return (
			<img
				src={FriendsFamilyRelationships}
				className="w-[22px]"
				alt="Friends, Family & Relationships"
			/>
		);
	} else if (name === "Camera & Photography") {
		return (
			<img
				src={CameraPhotography}
				className="w-[22px]"
				alt="Camera & Photography"
			/>
		);
	} else if (name === "Travel, Tourism & Aviation") {
		return (
			<img
				src={TravelTourismAviation}
				className="w-[22px]"
				alt="Travel, Tourism & Aviation"
			/>
		);
	} else if (name === "Restaurants, Food & Grocery") {
		return (
			<img
				src={RestaurantsFoodGrocery}
				className="w-[22px]"
				alt="Restaurants, Food & Grocery"
			/>
		);
	} else if (name === "Music") {
		return <img src={Music} className="w-[22px]" alt="Music" />;
	} else if (name === "Electronics & Computers") {
		return (
			<img
				src={ElectronicsComputers}
				className="w-[22px]"
				alt="Electronics & Computers"
			/>
		);
	} else if (name === "Art & Design") {
		return <img src={ArtDesign} className="w-[22px]" alt="Art & Design" />;
	} else if (name === "Wedding") {
		return <img src={Wedding} className="w-[22px]" alt="Wedding" />;
	} else if (name === "Toys, Children & Baby") {
		return (
			<img
				src={ToysChildrenBaby}
				className="w-[22px]"
				alt="Toys, Children & Baby"
			/>
		);
	} else if (name === "Sports") {
		return <img src={Sports} className="w-[22px]" alt="Sports" />;
	} else if (name === "Luxury Goods") {
		return <img src={LuxuryGoods} className="w-[22px]" alt="Luxury Goods" />;
	} else if (name === "Jewellery & Watches") {
		return (
			<img
				src={JewelleryWatches}
				className="w-[22px]"
				alt="Jewellery & Watches"
			/>
		);
	} else if (name === "Activewear") {
		return <img src={Activewear} className="w-[22px]" alt="Activewear" />;
	} else if (name === "Healthy Lifestyle") {
		return (
			<img
				src={HealthyLifestyle}
				className="w-[22px]"
				alt="Healthy Lifestyle"
			/>
		);
	} else if (name === "Beer, Wine & Spirits") {
		return (
			<img
				src={BeerWineSpirits}
				className="w-[22px]"
				alt="Beer, Wine & Spirits"
			/>
		);
	} else if (name === "Healthcare & Medicine") {
		return (
			<img
				src={HealthyLifestyle}
				className="w-[22px]"
				alt="Healthcare & Medicine"
			/>
		);
	} else if (name === "Coffee, Tea & Beverages") {
		return (
			<img
				src={CoffeeTeaBeverages}
				className="w-[22px]"
				alt="Coffee, Tea & Beverages"
			/>
		);
	} else if (name === "Fitness & Yoga") {
		return <img src={FitnesYoga} className="w-[22px]" alt="Fitness & Yoga" />;
	} else if (name === "Cars & Motorbikes") {
		return (
			<img src={CarsMotorbikes} className="w-[22px]" alt="Cars & Motorbikes" />
		);
	} else if (name === "Gaming") {
		return <img src={Gaming} className="w-[22px]" alt="Gaming" />;
	} else if (name === "Pets") {
		return <img src={Pets} className="w-[22px]" alt="Pets" />;
	} else if (name === "Tobacco & Smoking") {
		return (
			<img src={TobaccoSmoking} className="w-[22px]" alt="Tobacco & Smoking" />
		);
	} else if (name === "Home Decor, Furniture & Garden") {
		return (
			<img
				src={HomeDecorFurnitureGarden}
				className="w-[22px]"
				alt="Home Decor, Furniture & Garden"
			/>
		);
	}
}
