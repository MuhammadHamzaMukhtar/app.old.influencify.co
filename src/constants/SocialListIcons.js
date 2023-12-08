import InstagramLogo from "@assets/instagram_logo.png";
import TicktokLogo from "@assets/tiktok_logo.png";
import YoutubeLogo from "@assets/youtube_logo.png";
import FacebookLogo from "@assets/facebook_logo.png";
import TwitterLogo from "@assets/twitter_logo.png";

export default function SocialListIcons(name, sized) {
	switch (name) {
		case "instagram":
			return (
				<img src={InstagramLogo} alt="instagram" className={`w-[${sized}px]`} />
			);
		case "youtube":
			return <img src={YoutubeLogo} alt="youtube" className={`w-[${sized}px]`} />;
		case "tiktok":
			return <img src={TicktokLogo} alt="tiktok" className={`w-[${sized}px]`} />;
		case "facebook":
			return (
				<img
					src={FacebookLogo}
					alt="facebook"
					className={`w-[${sized}px] h-[${sized}px]`}
				/>
			);
		case "twitter":
			return (
				<img
					src={TwitterLogo}
					alt="twitter"
					className={`w-[${sized}px] h-[${sized}px]`}
				/>
			);
		default:
			return "";
	}
}
