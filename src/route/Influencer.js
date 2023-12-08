import { Route, Routes, Navigate } from "react-router-dom";

// Influencer Pages Start
import InfluencerLoginScreen from "@pages/influencer/InfluencerLoginScreen";
import InfluencerDashboardScreen from "@pages/influencer/InfluencerDashboardScreen";
import InfluencerMyCampaignScreen from "@pages/influencer/InfluencerMyCampaignScreen";
import InfluencerSettingProfileScreen from "@pages/influencer/InfluencerSettingProfileScreen";
import InfluencerSettingPlatformsScreen from "@pages/influencer/InfluencerSettingPlatformsScreen";
import InfluencerSettingAccountScreen from "@pages/influencer/InfluencerSettingAccountScreen";
import InfluencerSettingSubscriptionScreen from "@pages/influencer/InfluencerSettingSubscriptionScreen";
import InfluencerSettingPaymentScreen from "@pages/influencer/InfluencerSettingPaymentScreen";
import InfluencerSettingNotificationsScreen from "@pages/influencer/InfluencerSettingNotificationsScreen";
import InfluencerSettingRevAndRefScreen from "@pages/influencer/InfluencerSettingRevAndRefScreen";
import InfluencerSettingFinancesAndProductsScreen from "@pages/influencer/InfluencerSettingFinancesAndProductsScreen";
import InfluencerFindCampaignsScreen from "@pages/influencer/InfluencerFindCampaignsScreen";
import InfluencerBookingIDScreen from "@pages/influencer/InfluencerBookingIDScreen";
import InfluencerRedirectScreen from "@pages/influencer/InfluencerRedirectScreen";
import InfluencerRegisterScreen from "@pages/influencer/InfluencerRegisterScreen";
import InfluencerStep2Screen from "@pages/influencer/auth/InfluencerStep2Screen";
import InfluencerStep4Screen from "@pages/influencer/auth/InfluencerStep4Screen";
import InfluencerStep5Screen from "@pages/influencer/auth/InfluencerStep5Screen";
import InfluencerStep6Screen from "@pages/influencer/auth/InfluencerStep6Screen";
import InfluencerAutoLoginScreen from "@pages/influencer/InfluencerAutoLoginScreen";
// Influencer Pages End

const InfluencerRoutes = () => {
  let token = localStorage.getItem("access-token");
  function InfluencerLoggedIn({ children }) {
    return token ? children : <Navigate to="/influencer/login" />;
  }
  return (
    <Routes>
      <Route exact path="/invitation/:id" element={<InfluencerAutoLoginScreen />} />
      {/* <Route
        exact
        path="/influencer/login"
        element={<InfluencerLoginScreen />}
      /> */}
      <Route
        exact
        path="/influencer/dashboard"
        element={
          <InfluencerLoggedIn>
            <InfluencerDashboardScreen />
          </InfluencerLoggedIn>
        }
      />
      <Route
        exact
        path="/influencer/my-campaigns"
        element={
          <InfluencerLoggedIn>
            <InfluencerMyCampaignScreen />
          </InfluencerLoggedIn>
        }
      />
      <Route
        exact
        path="/influencer/setting-influencer-profile"
        element={
          <InfluencerLoggedIn>
            <InfluencerSettingProfileScreen />
          </InfluencerLoggedIn>
        }
      />
      <Route
        exact
        path="/influencer/setting-influencer-platforms"
        element={
          <InfluencerLoggedIn>
            <InfluencerSettingPlatformsScreen />
          </InfluencerLoggedIn>
        }
      />
      <Route
        exact
        path="/influencer/setting-influencer-account"
        element={
          <InfluencerLoggedIn>
            <InfluencerSettingAccountScreen />
          </InfluencerLoggedIn>
        }
      />
      <Route
        exact
        path="/influencer/setting-influencer-subscription"
        element={
          <InfluencerLoggedIn>
            <InfluencerSettingSubscriptionScreen />
          </InfluencerLoggedIn>
        }
      />
      {/* <Route
        exact
        path="/influencer/setting-influencer-payment"
        element={
          <InfluencerLoggedIn>
            <InfluencerSettingPaymentScreen />
          </InfluencerLoggedIn>
        }
      /> */}
      <Route
        exact
        path="/influencer/setting-influencer-notifications"
        element={
          <InfluencerLoggedIn>
            <InfluencerSettingNotificationsScreen />
          </InfluencerLoggedIn>
        }
      />
      <Route
        exact
        path="/influencer/setting-influencer-revandref"
        element={
          <InfluencerLoggedIn>
            <InfluencerSettingRevAndRefScreen />
          </InfluencerLoggedIn>
        }
      />
      <Route
        exact
        path="/influencer/setting-influencer-finances"
        element={
          <InfluencerLoggedIn>
            <InfluencerSettingFinancesAndProductsScreen />
          </InfluencerLoggedIn>
        }
      />{" "}
      {/* <Route
        exact
        path="/influencer/find-campaigns"
        element={
          <InfluencerLoggedIn>
            <InfluencerFindCampaignsScreen />
          </InfluencerLoggedIn>
        }
      /> */}
      <Route
        exact
        path="/influencer/influencer-booking/:id"
        element={
          <InfluencerLoggedIn>
            <InfluencerBookingIDScreen />
          </InfluencerLoggedIn>
        }
      />
      <Route
        path="/influencer/redirect/:id+"
        element={
          <InfluencerLoggedIn>
            <InfluencerRedirectScreen />
          </InfluencerLoggedIn>
        }
      />
      <Route
        exact
        path="/influencer/register"
        element={<InfluencerRegisterScreen />}
      />
      <Route
        exact
        path="/influencer/register/Step2"
        element={<InfluencerStep2Screen />}
      />
      <Route
        exact
        path="/influencer/register/Step3"
        element={<InfluencerStep4Screen />}
      />
      <Route
        exact
        path="/influencer/register/Step4"
        element={<InfluencerStep5Screen />}
      />
      <Route
        exact
        path="/influencer/register/Step5"
        element={<InfluencerStep6Screen />}
      />
    </Routes>
  );
};

export default InfluencerRoutes;
