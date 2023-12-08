//import "react-app-polyfill/ie11";
//import "react-app-polyfill/stable";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import CustomRoutes from "./route";
import * as serviceWorker from "./serviceWorker";
import "react-quill/dist/quill.snow.css";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import "flag-icon-css/css/flag-icons.min.css";
import "./assets/css/leflet.css";
import "noty/lib/noty.css";  
import "noty/lib/themes/mint.css"; 
import "./index.css";
import "./assets/css/colors.css";
import { Provider } from "react-redux";
import axios from "axios";
import { PersistGate } from "redux-persist/integration/react";

import helper from "./constants/helper";
import ErrorBoundary from "./constants/ErrorBoundary";
// import { createBrowserHistory } from "history";
// import { useNavigate } from "react-router-dom";
import store from "./store";
import { persistStore } from "redux-persist";
import Api from "@services/axios";
import Influencify from "./constants/Influencify";

// export const history = createBrowserHistory({ forceRefresh: true });

const persistor = persistStore(store);
// const logger = (store) => {
//     return (next) => {
//         return (action) => {};
//     };
// };
Api.init({ url: process.env.REACT_APP_BASE_URL });

let token = localStorage.getItem("access-token");
axios.defaults.headers.common["Authorization"] = "Bearer " + token;
Api.setClientToken(token);
Influencify.init({ url: process.env.REACT_APP_BASE_URL });
Influencify.setClientToken(token);
Influencify.middleware();
// let auth = false;
const root = ReactDOM.createRoot(document.getElementById("root")); // createRoot(container!) if you use TypeScript

const render = () => {
	return root.render(
		<Provider store={store}>
			<PersistGate loading={null} persistor={persistor}>
				<ErrorBoundary>
					<BrowserRouter>
						<CustomRoutes />
					</BrowserRouter>
				</ErrorBoundary>
			</PersistGate>
		</Provider>
	);
};
if (token) {
	const params = { main_account: localStorage.getItem("main_account") };
	axios.get(helper.url + "/api/v1/validate-token", { params }).then((res) => {
		if (res.data.valid) {
			localStorage.setItem(helper.isLogin, true);
			localStorage.setItem("geo_info", JSON.stringify(res.data.geo_info));
		} else {
			localStorage.removeItem(helper.access_token);
			localStorage.removeItem(helper.token_type);
			localStorage.removeItem(helper.isLogin);
			localStorage.removeItem("user");
			localStorage.removeItem("role");
		}
		render();
	});
} else {
	render();
}

serviceWorker.unregister();
