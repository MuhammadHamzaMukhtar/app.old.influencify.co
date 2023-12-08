const helper = {
	url: process.env.REACT_APP_BASE_URL,
	access_token: "access-token",
	token_type: "token_type",
	remember_me: "remember_me",
	isLogin: "isLogin",
	successMsg: "Your changes have been saved.",
	productcreditMsg:
		"You don't have any credits to create product, please upgrade the subscription or purchase more credits",
	headers: {
		authorization: `Bearer ${localStorage.getItem("access-token")}`,
		Accept: "application/json",
		"Content-Type": "application/json",
	},

	home_title: "The Data-Driven Influencer Marketing Platform - Influencify",
	home_description:
		"Grow your sales via 35 Million influencers database across Instagram, Tiktok and Youtube. Discover your influential customers & followers. A comprehensive influencer marketing platform allows you to activate campaigns, connect with influencers, whitelabel messages, review and approve content.",

	sign_up_title: "Try Influencify | 30-Day Free Trial, No Commitment.",
	sign_up_description:
		"Influencer, Marketing Platform With 16+ Million influencers built specifically for direct to consumer brands & marketers. Discover your influential customers & fans.",

	pricing_title: "Influencer Marketing Platform Pricing | Influencify",
	pricing_description:
		"Influencify is the smartest influencer marketing platform. Discover Influencify pricing plans made for all businesses from startup to enterprise.",

	brand_title: "Influencers that fuels your growth l Influencify",
	brand_description:
		"Filter through directly message over 16 Million IG, Tiktok & YT influencers. Discover your influential customers & followers. Analyze any account for fake followers and audience stats.",

	contact_title: "Contact Us | Influencify",
	contact_description:
		"Want to book a demo? Need more information? Contact our team about your influencer marketing needs. We answer in 24h and in 5 languages.",

	ugc_title: "Branded Content Marketing Platform - Influencify",
	ugc_description:
		"Collect & curate user generated content with Influencify. From real customers celebrating the products they love through user generated gontent that performes.",
	manage_services_title: "Influencer marketing managed service - Influencify",
	manage_services_description:
		"Let the team of influencer marketing experts bring your objectives to life through high-quality campaigns. You set objectives and we deliver the plan that matches your kPis, Get Campaign estimated results before commiting to one.",

	discovery_title: "Influencer discovery and recruitment - Influencify",
	discovery_description:
		"A revolutionary way of finding brand-fit creaters to partner with you. discover and filter through 35M influencers database plus tools to discover your influential fans, customers and lookalike influencers",

	monitoring_campaign_tool_title:
		"Instagram Stories Tracking & Monitoring for Brands",
	monitoring_campaign_tool_description:
		"Track & monitor every instagram story and post that mentions your brand. Collect influencer creted content on autopilot",

	instagram_email_finder_title: "Instagram email finder (Free tool)",
	instagram_email_finder_description:
		"How to get instagram users email? instagram emails don't show on the desktop version but here is a free tool to help you search & find someone's instagram email instantly. Acess database of instagram influencers emails, phone number and connected social media profiles. Please, be mindful of rules and regulations around sending cold emails.",

	youtube_email_finder_title: "Youtube channel email finder (Free tool)",
	youtube_email_finder_description:
		"How to get Youtube users email? Here is a free tool to help you find someone's youtube email instantly. Access youtube influencer database with info such as email, phone number and connected social media profiles. Please, be mindful of rules and regulations around sending cold emails.",

	instagram_niche_title:
		"Find Instagram influencers in your niche - Influencify",
	instagram_niche_description:
		"Influencify's free tool to find Instagram influencers in your niche. Enter your query like fashion, food, crypto, etc. and get a list of relevant instagram niche influencers",

	instagram_location_title:
		"Find Instagram influencers by location - Influencify",
	instagram_location_description:
		"Influencify's free tool to find Instagram influencers by location. Enter your location by country or city or state and get a list of relevant instagram influencers in that location",

	instagram_engagement_calculator_title:
		"Free Instagram Engagement Rate Calculator - Influencify",
	instagram_engagement_calculator_description:
		"Calculate Instagram Engagement Rate for any account with our free ER calculator. Find out how many of Influencer's followers are engaged with their content.",

	tiktok_engagement_calculator_title:
		"Free Tiktok Engagement Rate Calculator - Influencify",
	tiktok_engagement_calculator_description:
		"Calculate Tiktok Engagement Rate for any account with our free ER calculator. Find out how many of Influencer's followers are engaged with their content.",

	tiktok_location_title: "Find Tiktok influencers by location - Influencify",
	tiktok_location_description:
		"Influencify's free tool to find Tiktok influencers by location. Enter your location by country or city or state and get a list of relevant tiktok influencers in that location",

	tiktok_niche_title: "Find Tiktok influencers by niche - Influencify",
	tiktok_niche_description:
		"Influencify's free tool to find Tiktok influencers in your niche. Enter your query like fashion, food, crypto, etc. and get a list of relevant Tiktok niche influencers",

	tiktok_email_finder_title: "Tiktok email finder (Free tool)",
	tiktok_email_finder_description:
		"How to get tiktok users email? tiktok emails don't show on the desktop version but here is a free tool to help you search & find someone's tiktok email instantly. Acess database of tiktok influencers emails, phone number and connected social media profiles. Please, be mindful of rules and regulations around sending cold emails.",

	youtube_niche_title: "Find Youtube influencers by niche - Influencify",
	youtube_niche_description:
		"Influencify's free tool to find Youtube influencers in your niche. Enter your query like fashion, food, saas, etc. and get a list of relevant Youtubeniche influencers",

	youtube_location_title: "Find Youtube influencers by location - Influencify",
	youtube_location_description:
		"Influencify's free tool to find Youtube influencers by location. Enter your location by country or city or state and get a list of relevant Youtube influencers in that location",

	discover_recipes_title:
		"Influencer marketing growth hacks & recipes - Influencify",
	discover_recipes_description:
		"How to growth hack influencer marketing? Here's a list of 20 Influencers discovery, activation and revenue tracking tips and tricks to maximize your ROI",

	influencer_marketing_title: "Free Influencer Marketing Tools - Influencify",
	influencer_marketing_description:
		"Discover the best influencer marketing tools to improve your influencer marketing strategy and campaigns. Brought to you by the Influencify's gurus for the professional influencer marketers.",

	analyzer_title:
		"Influencer analytics for Instagram, YouTube, TikTok - Influencify",
	analyzer_description:
		"Analyze & audit influencer accounts, detect fake followers, and reveal influencer audiences demographics such as age groups, gender, country of origin, cities or interests. With Influencify's powerful influencer analyzer tool",

	search_results_limit: 12,

	YOUTUBE_API_KEY: "AIzaSyC5BTHtHoSCf08P_Nor3Ja1GGoLDLiRPTk",
	YOUTUBE_CLIENT_ID:
		"60396850116-do8e3qmqid62vdnvj5l48c3kgi2v077p.apps.googleusercontent.com",
	YOUTUBE_DISCOVERY_DOCS: [
		"https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest",
	],
	YOUTUBE_SCOPE: "https://www.googleapis.com/auth/youtube.readonly",
};

export default helper;
