import { useEffect, useRef } from "react";
import { ToastContainer } from "react-toastify";
import { Route, Routes, useNavigate } from "react-router-dom";
import ReactGA from "react-ga4";
import Emitter from "../constants/Emitter";

import ScrollToTop from "react-scroll-to-top";
import Swal from "sweetalert2";

// Common components
import BrandHeader from "@components/Header/Brand";
import InfluencerHeader from "@components/Header/Influencer";
import Header from "@components/Header/Landing";
import Footer from "@components/Footer";
import AccountCreatedScreen from "@components/AccountCreated";
import InternalServerScreen from "@components/InternalServer";

import BrandRoutes from "./Brand";
// import BrandAuth from "./BrandAuth";
import InfluencerRoutes from "./Influencer";
import Popup from "@components/Popup";
import InfluencerDrawer from "@components/InfluencerDrawer";

// Components not used in app
import BrandPurchaseTokensScreen from "@pages/brands/BrandPurchaseTokensScreen";
import BrandInfluentialsExportScreen from "@pages/brands/BrandInfluentialsExportScreen";
import BrandPlanPricingScreen from "@pages/brands/BrandPlanPricingScreen";
import BrandPromotionalPricingScreen from "@pages/brands/BrandPromotionalPricingScreen";
import GmailVerifyTokenScreen from "@pages/brands/GmailVerifyTokenScreen";
import BrandSettingShopifyScreen from "../unusedcomponents/BrandSettingShopify";
import BrandSettingWebhookScreen from "../unusedcomponents/BrandSettingWebhook";
import BrandSettingPlatformsScreen from "../unusedcomponents/BrandSettingPlatforms";
import EamilVerificationScreen from "@pages/brands/EamilVerificationScreen";
import YoutubeVerifyTokenScreen from "../unusedcomponents/YoutubeVerifyToken";
import ShopifyVerifyTokenScreen from "../unusedcomponents/ShopifyVerifyToken";
import RegisterInvitedInfluencerScreen from "../unusedcomponents/RegisterInvitedInfluencer";
import BrandInfluencerDeepScanScreen from "@pages/brands/BrandInfluencerDeepScanScreen";
import InfluencerInstagramProfileScreen from "../unusedcomponents/InfluencerInstagramProfile";
import InfluencerYoutubeProfileScreen from "../unusedcomponents/InfluencerYoutubeProfile";
import InfluencerTiktokProfileScreen from "../unusedcomponents/InfluencerTiktokProfile";
import AuthShopifyCallbackScreen from "@pages/brands/AuthShopifyCallbackScreen";
import InstagramCallbackScreen from "@pages/brands/InstagramCallbackScreen";
import YoutubeCallbackScreen from "@pages/brands/YoutubeCallbackScreen";
import TiktokCallbackScreen from "@pages/brands/TiktokCallbackScreen";
import AnalyticsVerifyTokenScreen from "@pages/brands/AnalyticsVerifyTokenScreen";
import AppsumoScreen from "@components/Appsumo";
import PricingLandingScreen from "@pages/landings/PricingLandingScreen";
import ContactScreen from "@pages/landings/ContactScreen";
import InfluencerProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerProfileModal";
import InfluencerFullProfileModal from "@components/BrandInfluencerDiscover/Profile/InfluencerFullProfileModal";

const path = window.location.pathname;
const setToken = path.split("/");
const setInvite = path.split("/");
const setPlan = path.split("/");
const verifyToken = path.split("/");

if (path === "/appsumo/registration") {
  localStorage.removeItem("access-token");
  localStorage.removeItem("isLogin");
  localStorage.removeItem("role");
}

const AuthChecker = () => {
  if (path === "/influencer/login") {
    if (localStorage.getItem("isLogin")) {
      //window.location.href = "/influencer/dashboard";
    }
  }
  if (path === "/influencer/register") {
    if (localStorage.getItem("isLogin")) {
      window.location.href = "/influencer/dashboard";
    }
  }
  if (path === "/brand/login") {
    if (localStorage.getItem("isLogin")) {
      window.location.href = "/dashboard";
    }
  }
  if (path === "/brand/register") {
    if (localStorage.getItem("isLogin")) {
      window.location.href = "/dashboard";
    }
  }
};

const UrlChecker = () => {
  // const navigate = useNavigate();
  if (path === "/login") {
    window.location.href = "/brand/login";
  }
  if (path === '/') {
    if (localStorage.role === "brand") {
      //window.location.href = "/dashboard";
      // navigate("/dashboard");
    }
    if (localStorage.role === "influencer") {
      window.location.href = "/influencer/dashboard";
      // navigate("/influencer/dashboard");
    }
  }
};

const showHeaderOrFooter = () => {
  return (
    path === "/" ||
    path === "/brand" ||
    path === "/influencer" ||
    path === "/about-us" ||
    path === "/discovery" ||
    path === "/analyzer" ||
    path === "/influencer-marketing" ||
    path === "/discover-recipes" ||
    path === "/affiliate-program" ||
    path === "/managed-services" ||
    path === "/ugc" ||
    path === "/plant-tree" ||
    path === "/monitor-campaign-tools" ||
    //path === "/instagram-location" ||
    //path === "/youtube-niche" ||
    //path === "/youtube-location" ||
    //path === "/tiktok-niche" ||
    //path === "/tiktok-location" ||
    //path === "/instagram-engagement-calculator" ||
    //path === "/emv-calculator" ||
    //path === "/tiktok-engagement-calculator" ||
    //path === "/tiktok-email-finder" ||
    //path === "/instagram-email-finder" ||
    //path === "/youtube-email-finder" ||
    path === "/social-monitoring-tools" ||
    path === "/insta-stories-monitoring" ||
    path === "/ecom-video-ads" ||
    path === "/sponsored-posts" ||
    path === "/pricing" ||
    path === "/plan/pricing" ||
    path === "/promotionalpricing" ||
    path === "/brand/login" ||
    path === "/brand/register" ||
    path === "/brand/join/" + verifyToken[3] ||
    path === "/appsumo/registration" ||
    path === "/brand/get-started-free" ||
    path === "/brand/forgot-password" ||
    path === "/influencer/register" ||
    path === "/influencer/register/Step2" ||
    path === "/influencer/register/Step3" ||
    path === "/influencer/register/Step4" ||
    path === "/influencer/register/Step5" ||
    path === "/influencer/login" ||
    path === "/account-created" ||
    path === "/influencer/forgot-password" ||
    path === "/terms-of-service" ||
    path === "/privacy-policy" ||
    path === "/contact" ||
    path === "/email/verify/" + verifyToken[3] ||
    path === "/gmail/verify" ||
    path === "/password/reset/" + setToken[3] ||
    path === "/brand/register/" + setPlan[3] ||
    path ===
    "/register/" + setInvite[2] + "/" + setInvite[3] + "/" + setInvite[4] ||
    path === "/500" ||
    path === "/403" ||
    path === "/404"
  );
};

const dynamicClassForHeader = (props) => {
  return path === "/" ||
    path === "/brand" ||
    path === "/influencer" ||
    path === "/about-us" ||
    path === "/discovery" ||
    path === "/analyzer" ||
    path === "/influencer-marketing" ||
    path === "/discover-recipes" ||
    path === "/affiliate-program" ||
    path === "/managed-services" ||
    path === "/ugc" ||
    path === "/plant-tree" ||
    path === "/social-monitoring-tools" ||
    path === "/monitor-campaign-tools" ||
    path === "/instagram-location" ||
    path === "/youtube-niche" ||
    path === "/youtube-location" ||
    path === "/tiktok-niche" ||
    path === "/tiktok-location" ||
    path === "/instagram-engagement-calculator" ||
    path === "/emv-calculator" ||
    path === "/tiktok-engagement-calculator" ||
    path === "/tiktok-email-finder" ||
    path === "/instagram-email-finder" ||
    path === "/youtube-email-finder" ||
    path === "/insta-stories-monitoring" ||
    path === "/ecom-video-ads" ||
    path === "/sponsored-posts" ||
    path === "/pricing" ||
    path === "/plan/pricing" ||
    path === "/promotionalpricing" ||
    path === "/brand/login" ||
    path === "/influencer/login" ||
    path === "/account-created" ||
    path === "/brand/register" ||
    path === "/appsumo/registration" ||
    path === "/brand/get-started-free" ||
    path === "/brand/forgot-password" ||
    path === "/influencer/register" ||
    path === "/influencer/register/Step2" ||
    path === "/influencer/register/Step3" ||
    path === "/influencer/register/Step4" ||
    path === "/influencer/register/Step5" ||
    path === "/influencer/forgot-password" ||
    path === "/terms-of-service" ||
    path === "/privacy-policy" ||
    path === "/contact" ||
    path === "/email/verify/" + verifyToken[3] ||
    path === "/gmail/verify" ||
    path === "/password/reset/" + setToken[3] ||
    path === "/brand/register/" + setPlan[3] ||
    path ===
    "/register/" + setInvite[2] + "/" + setInvite[3] + "/" + setInvite[4] ||
    path === "/500" ||
    path === "/403" ||
    path === "/404"
    ? "w-full relative bg-white overflow-x-hidden grow"
    : "w-full relative bg-[#f4f4f5] overflow-x-hidden grow";
};

// const isLogin = () => {
// 	if (!localStorage.getItem("isLogin")) {
// 		return <Navigate to="/influencer/login" />;
// 	}
// };

const CustomRoutes = () => {

  const popupRef = useRef(null);
  const drawerRef = useRef(null);
  const fullProfileRef = useRef(null);

  useEffect(() => {
    ReactGA.initialize("G-7R5KBTDFKR");
    ReactGA.send("pageview");
    Emitter.on("PERMISSION_POPUP", firePermissionPopup);
    Emitter.on("MESSAGE_POPUP", messagePopup);
    Emitter.on("INFLUENCER_POPUP", influencerPopup);
    Emitter.on("FULL_PROFILE_POPUP", fullProfilePopup);
    return () => Emitter.off("PERMISSION_POPUP")
  }, []);

  const firePermissionPopup = () => {
    Swal.fire({
      title: "Permission denied",
      text: "Don’t have permission to do that action, contact your account admin",
      showCancelButton: false,
      showCloseButton: true,
      confirmButtonText: "Ok",
      cancelButtonText: "",
      confirmButtonColor: "#7c3292",
      cancelButtonColor: "#f4f4f5",
      customClass: {
        actions: "flex-row-reverse",
        closeButton: "hover:text-[#7c3292]",
        confirmButton: "hover:!shadow-none focus:!shadow-none min-w-[100px]",
        cancelButton:
          "hover:!shadow-none focus:!shadow-none min-w-[100px] !text-[#202020]",
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => { });
  };

  const messagePopup = (data) => {
    popupRef?.current?.open(data)
  }

  const influencerPopup = (data) => {
    drawerRef?.current?.open(data);
  }

  const fullProfilePopup = (data) => {
    fullProfileRef?.current?.open(data)
  }

  const navigate = useNavigate();

  return (
    <>
      <ToastContainer />
      {AuthChecker()}
      {UrlChecker()}
      {showHeaderOrFooter() ? (
        <Header />
      ) : localStorage.getItem("role") === "brand" ? (
        <BrandHeader navigate={navigate} />
      ) : localStorage.getItem("role") === "influencer" ? (
        <InfluencerHeader navigate={navigate} />
      ) : (
        <Header />
      )}
      <div className={dynamicClassForHeader()}>

        <BrandRoutes />

        {/* Influencer Routes */}
        <InfluencerRoutes />
        <Routes>
          <Route
            exact
            path="/auth/shopify/callback"
            element={<AuthShopifyCallbackScreen />}
          />
          <Route
            exact
            path="/facebook/callback"
            element={<InstagramCallbackScreen />}
          />
          <Route
            exact
            path="/tiktok/callback"
            element={<TiktokCallbackScreen />}
          />
          <Route
            exact
            path="/oauth/youtube/callback"
            element={<YoutubeCallbackScreen />}
          />
          <Route
            exact
            path="/brand/setting-brand-platforms"
            element={<BrandSettingPlatformsScreen />}
          />
          <Route
            exact
            path="/brand/setting-brand-webhook"
            element={<BrandSettingWebhookScreen />}
          />
          <Route
            exact
            path="/integration/shopify"
            element={<BrandSettingShopifyScreen />}
          />
          <Route
            exact
            path="/promotionalpricing"
            element={<BrandPromotionalPricingScreen />}
          />
          <Route
            exact
            path="/plan/pricing"
            element={<BrandPlanPricingScreen />}
          />
          <Route
            exact
            path="/brand/pricing"
            element={<BrandPurchaseTokensScreen />}
          />
          <Route
            exact
            path="/brand/influentials/export"
            element={<BrandInfluentialsExportScreen />}
          />
          <Route
            exact
            path="/email/verify/:verifyToken"
            element={<EamilVerificationScreen />}
          />
          <Route
            path="/oauth/gmail/callback"
            element={<GmailVerifyTokenScreen />}
          />
          <Route
            path="/youtube/verify/:digit/:code"
            element={<YoutubeVerifyTokenScreen />}
          />
          <Route
            path="/oauth/analytics/callback"
            element={<AnalyticsVerifyTokenScreen />}
          />
          <Route
            exact
            path="/shopify/verify"
            element={<ShopifyVerifyTokenScreen />}
          />
          <Route
            exact
            path="/register/:campaignId/:brandId/:email"
            element={<RegisterInvitedInfluencerScreen />}
          />
          <Route
            exact
            path="/appsumo/registration"
            element={<AppsumoScreen />}
          />
          <Route
            exact
            path="/account-created"
            element={<AccountCreatedScreen />}
          />
          <Route
            exact
            path="/influencer/profile/instagram"
            element={<InfluencerInstagramProfileScreen />}
          />
          <Route
            exact
            path="/influencer/profile/youtube"
            element={<InfluencerYoutubeProfileScreen />}
          />
          <Route
            exact
            path="/brand/influencer/:platform/:id"
            element={<BrandInfluencerDeepScanScreen />}
          />
          <Route
            exact
            path="/influencer/profile/tiktok"
            element={<InfluencerTiktokProfileScreen />}
          />
          <Route exact path="/pricing" element={<PricingLandingScreen />} />
          <Route exact path="/contact" element={<ContactScreen />} />
          <Route path="/500" element={<InternalServerScreen />} />
          {/* <Route path="*" element={<NotFoundScreen />} /> */}
        </Routes>
      </div>
      {showHeaderOrFooter() ? <Footer /> : null}
      <ScrollToTop className="flex z-[99] items-center justify-center" smooth />
      <Popup ref={popupRef} onClose={() => { }} />
      <InfluencerDrawer ref={drawerRef} onClose={() => { }} />
      <InfluencerFullProfileModal ref={fullProfileRef} onClose={() => { }} />
    </>
  );
}

export default CustomRoutes;
