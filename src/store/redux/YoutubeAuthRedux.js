import helper from "../../constants/helper";
import { fetchBrandNotableUsers } from "../actions/BrandAmbassadorsActions";
import { handleFetchPlatforms } from "../actions/SettingPlatformActions";
import { HANDLE_YOUTUBE_CONNECT_RES } from "../constants/action-types";
import Api from "@services/axios";

var GoogleAuth;

export const actions = {
	connectYoutube: (dispatch) => {
		window.gapi.load("client:auth2", () => {
			window.gapi.client
				.init({
					apiKey: helper.YOUTUBE_API_KEY,
					clientId: helper.YOUTUBE_CLIENT_ID,
					discoveryDocs: helper.YOUTUBE_DISCOVERY_DOCS,
					scope: helper.YOUTUBE_SCOPE,
					access_type: "offline",
					prompt: "consent",
					redirect_uri: "https://influencify.co/oauth/gmail/callback",
				})
				.then(function () {
					GoogleAuth = window.gapi.auth2.getAuthInstance();
					if (GoogleAuth.isSignedIn.get()) {
						GoogleAuth.signOut();
					} else {
						GoogleAuth.signIn().then(function () {
							var profile = GoogleAuth.currentUser.get().getBasicProfile();
							var response = GoogleAuth.currentUser.get().getAuthResponse();
							let query = {
								name: profile.getName(),
								email: profile.getEmail(),
								access_token: response.access_token,
								id_token: response.id_token,
								token_type: response.token_type,
								expires_at: response.expires_at,
								expires_in: response.expires_in,
								scope: response.scope,
							};

							Api.GoogleConnect(query).then((res) => {
								const json = res.data;
								if (json.success === true) {
									if (json.role === "brand") {
										dispatch(fetchBrandNotableUsers({ platform: "youtube" }));
									} else if (json.role === "influencer") {
										if (!json.auth) {
											dispatch({
												type: HANDLE_YOUTUBE_CONNECT_RES,
												payload: json.response,
											});
										} else {
											dispatch(handleFetchPlatforms());
										}
									}
								}
							});
						});
					}
				});
		});
	},
};

const initialState = {};

export const reducer = (state = initialState, action) => {
	const { type } = action;
	switch (type) {
		default: {
			return state;
		}
	}
};
