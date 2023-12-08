import { Route, Routes, Navigate } from "react-router-dom";

// Brand Pages Start

// import BrandRegisterScreen from "@pages/brands/BrandRegisterScreen";
import BrandGetStartedFreeScreen from "@pages/brands/BrandGetStartedFreeScreen";
import BrandRegisterPlanScreen from "@pages/brands/BrandRegisterPlanScreen";
import BrandJoinScreen from "@pages/brands/BrandJoinScreen";
import BrandInvitationScreen from "@pages/brands/BrandInvitationScreen";
import BrandLoginScreen from "@pages/brands/BrandLoginScreen";
import BrandDashboardScreen from "@pages/brands/BrandDashboardScreen";
import BrandCampaignsScreen from "@pages/brands/BrandCampaignsScreen";
// import BrandSetUpNewCampaignScreen from "@pages/brands/BrandSetUpNewCampaignScreen";
import BrandCampaignUpdateScreen from "@pages/brands/BrandCampaignUpdateScreen";
import BrandBookingCampaignScreen from "@pages/brands/BrandBookingCampaignScreen";
import BrandNewCampaignScreen from "@pages/brands/BrandNewCampaignScreen";
import BrandNewCampaignTypeScreen from "@pages/brands/BrandNewCampaignTypeScreen";
import BrandNoCampaignsScreen from "@pages/brands/BrandNoCampaignsScreen";
import BrandInfluencersDiscoverInstargrmScreen from "@pages/brands/BrandInfluencersDiscoverInstargrmScreen";
import BrandInfluencersDiscoverYoutubeScreen from "@pages/brands/BrandInfluencersDiscoverYoutubeScreen";
import BrandInfluencersDiscoverTiktokScreen from "@pages/brands/BrandInfluencersDiscoverTiktokScreen";
import BrandInfluencersInstagramListScreen from "@pages/brands/BrandInfluencersInstagramListScreen";
import BrandInfluencersYoutubeListScreen from "@pages/brands/BrandInfluencersYoutubeListScreen";
import BrandInfluencersTiktokListScreen from "@pages/brands/BrandInfluencersTiktokListScreen";
import BrandInfluencersListDetailScreen from "@pages/brands/BrandInfluencersListDetailScreen";
import BrandInfluencersAnalyzerInstagramScreen from "@pages/brands/BrandInfluencersAnalyzerInstagramScreen";
import BrandInfluencersAnalyzerYoutubeScreen from "@pages/brands/BrandInfluencersAnalyzerYoutubeScreen";
import BrandInfluencersAnalyzerTiktokScreen from "@pages/brands/BrandInfluencersAnalyzerTiktokScreen";
// import BrandInfluencialInstagramFansScreen from "@pages/brands/BrandInfluencialInstagramFansScreen";
// import BrandInfluencialYoutubeFansScreen from "@pages/brands/BrandInfluencialYoutubeFansScreen";
// import BrandInfluencialTiktokFansScreen from "@pages/brands/BrandInfluencialTiktokFansScreen";
import BrandInfluentialEmailMatchScreen from "@pages/brands/BrandInfluentialEmailMatchScreen";
// import BrandMonitoringCampaignScreen from "@pages/brands/BrandMonitoringCampaignScreen";
import BrandMonitoringNewCampaignScreen from "@pages/brands/BrandMonitoringNewCampaignScreen";
import BrandMonitoringCampaignDetailScreen from "@pages/brands/BrandMonitoringCampaignDetailScreen";
// import BrandAdsLibraryScreen from "@pages/brands/BrandAdsLibraryScreen";
import BrandProductScreen from "@pages/brands/BrandProductScreen";
import BrandAddVoucherScreen from "@pages/brands/BrandAddVoucherScreen";
import BrandEditProductScreen from "@pages/brands/BrandEditProductScreen";
import BrandAddProductScreen from "@pages/brands/BrandAddProductScreen";
import BrandFinanceScreen from "@pages/brands/BrandFinanceScreen";
import BrandSettingProfileScreen from "@pages/brands/BrandSettingProfileScreen";
import BrandSettingReportsScreen from "@pages/brands/BrandSettingReportsScreen";
import BrandSettingPermissionScreen from "@pages/brands/BrandSettingPermissionScreen";
import BrandSettingInvitationScreen from "@pages/brands/BrandSettingInvitationScreen";
import BrandSettingSubscriptionScreen from "@pages/brands/BrandSettingSubscriptionScreen";
import BrandSettingGmailScreen from "@pages/brands/BrandSettingGmailScreen";
import BrandSettingSmtpScreen from "@pages/brands/BrandSettingSmtpScreen";
import BrandSettingAccountHistoryScreen from "@pages/brands/BrandSettingAccountHistoryScreen";
import BrandSettingCreditHistoryScreen from "@pages/brands/BrandSettingCreditHistoryScreen";
import BrandSettingCreditScreen from "@pages/brands/BrandSettingCreditScreen";
import BrandForgetPasswordScreen from "@pages/brands/BrandForgetPasswordScreen";
import BrandResetPasswordScreen from "@pages/brands/BrandResetPasswordScreen";
import BrandContentLibraryScreen from "@pages/brands/BrandContentLibraryScreen";
import BrandSettingAnalyticsScreen from "@pages/brands/BrandSettingAnalyticsScreen";
import AutoLoginScreen from "@pages/brands/AutoLoginScreen";
import PricingLandingScreen from "@pages/landings/PricingLandingScreen";
import AccountChangePasswordScreen from "@pages/brands/AccountChangePasswordScreen";
import AccountCloseScreen from "@pages/brands/AccountCloseScreen";
import BillingPaymentMethodScreen from "@pages/brands/BillingPaymentMethodScreen";
import BillingReceiptScreen from "@pages/brands/BillingReceiptScreen";
import Middleware from "./Middleware";
import BrandInfluencialFansScreen from "@pages/brands/BrandInfluencialFansScreen";
import BrandExport from "@container/brands/BrandExport";
import InstaNicheScreen from "@pages/landings/InstaNicheScreen";
import InstaLocationScreen from "@pages/landings/InstaLocationScreen";
import InstagramEngagementCalculatorScreen from "@pages/landings/InstagramEngagementCalculatorScreen";
import TiktokEngagementCalculatorScreen from "@pages/landings/TiktokEngagementCalculatorScreen";
import InstagramEmailFinderScreen from "@pages/landings/InstagramEmailFinderScreen";
import YoutubeEmailFinderScreen from "@pages/landings/YoutubeEmailFinderScreen";
import TiktokNicheScreen from "@pages/landings/TiktokNicheScreen";
import TiktokLocationScreen from "@pages/landings/TiktokLocationScreen";
import YoutubeNicheScreen from "@pages/landings/YoutubeNicheScreen";
import YoutubeLocationScreen from "@pages/landings/YoutubeLocationScreen";
import TiktokEmailFinderScreen from "@pages/landings/TiktokEmailFinderScreen";
import BrandReportsAndTrackingScreen from "@pages/brands/BrandReportsAndTrackingScreen";
import BrandReportDetailScreen from "@pages/brands/BrandReportDetailScreen";

// import BrandRedirect from "@pages/brands/BrandRedirect";
// import BrandLogin from "@container/brands/auth/BrandLogin";
// import BrandAuth from "./BrandAuth";

// Brand Pages End

const BrandRoutes = () => {
  let token = localStorage.getItem("access-token");

  function UserLoggedIn({ children }) {
    return token ? children : <Navigate to="/brand/login" />;
  }

  return (
    <>
      <Routes>
        <Route exact path="/brand/link/:id" element={<AutoLoginScreen />} />
        <Route
          exact
          path="/brand/register"
          element={<PricingLandingScreen />}
        />
        <Route
          exact
          path="/brand/get-started-free"
          element={<BrandGetStartedFreeScreen />}
        />
        <Route
          exact
          path="/brand/register/:id/:type"
          element={<BrandRegisterPlanScreen />}
        />
        <Route exact path="/brand/join/:id" element={<BrandJoinScreen />} />
        <Route
          exact
          path="/brand/invitation/:id"
          element={
            <UserLoggedIn>
              <BrandInvitationScreen />
            </UserLoggedIn>
          }
        />
        <Route exact path="/brand/login" element={<BrandLoginScreen />} />
        <Route exact path="/" element={<BrandLoginScreen />} />
        <Route
          exact
          path="/list/instagram"
          element={
            <UserLoggedIn>
              <BrandInfluencersInstagramListScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/list/youtube"
          element={
            <UserLoggedIn>
              <BrandInfluencersYoutubeListScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/list/tiktok"
          element={
            <UserLoggedIn>
              <BrandInfluencersTiktokListScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/list/:id"
          element={
            <UserLoggedIn>
              <BrandInfluencersListDetailScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/brand/campaign/:id"
          element={
            <UserLoggedIn>
              <BrandCampaignUpdateScreen />
            </UserLoggedIn>
          }
        />
        {/* <Route
				exact
				path="/brand/sponsored-posts"
				element={
					<UserLoggedIn>
						<BrandAdsLibraryScreen />
					</UserLoggedIn>
				}
			/> */}

        {/* <Route
				exact
				path="/brand/monitoring/campaign"
				element={
					<UserLoggedIn>
						<BrandMonitoringCampaignScreen />
					</UserLoggedIn>
				}
			/> */}
        <Route
          exact
          path="/brand/monitoring/campaign/detail/:id"
          element={
            <UserLoggedIn>
              <BrandMonitoringCampaignDetailScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/brand/monitoring/campaign/new"
          element={
            <UserLoggedIn>
              <BrandMonitoringNewCampaignScreen />
            </UserLoggedIn>
          }
        />

        <Route
          exact
          path="/discovery/instagram"
          element={
            <UserLoggedIn>
              <BrandInfluencersDiscoverInstargrmScreen />
            </UserLoggedIn>
          }
        />

        <Route
          exact
          path="/discovery/youtube"
          element={
            <UserLoggedIn>
              <BrandInfluencersDiscoverYoutubeScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/discovery/tiktok"
          element={
            <UserLoggedIn>
              <BrandInfluencersDiscoverTiktokScreen />
            </UserLoggedIn>
          }
        />
        {/* change URL beacuse type and props canot pas through previous style */}

        {/* <Route
				exact
				path="/influencial/instagram"
				// path="/influencial/instagram"/:type?
				element={
					<UserLoggedIn>
						<BrandInfluencialInstagramFansScreen />
					</UserLoggedIn>
				}
			/>
			<Route
				exact
				path="/influencial/youtube"
				element={
					<UserLoggedIn>
						<BrandInfluencialYoutubeFansScreen />
					</UserLoggedIn>
				}
			/>
			<Route
				exact
				path="/influencial/tiktok"
				element={
					<UserLoggedIn>
						<BrandInfluencialTiktokFansScreen />
					</UserLoggedIn>
				}
			/> */}
        <Route
          exact
          path="/influencial/:platform"
          element={
            <UserLoggedIn>
              <BrandInfluencialFansScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/influencial/email-match"
          element={
            <UserLoggedIn>
              <BrandInfluentialEmailMatchScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/reports"
          element={
            <UserLoggedIn>
              <BrandReportsAndTrackingScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/report/:id"
          element={
            <UserLoggedIn>
              <BrandReportDetailScreen />
            </UserLoggedIn>
          }
        />

        <Route
          exact
          path="/past-report/instagram"
          element={
            <UserLoggedIn>
              <BrandInfluencersAnalyzerInstagramScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/past-report/youtube"
          element={
            <UserLoggedIn>
              <BrandInfluencersAnalyzerYoutubeScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/past-report/tiktok"
          element={
            <UserLoggedIn>
              <BrandInfluencersAnalyzerTiktokScreen />
            </UserLoggedIn>
          }
        />

        <Route
          exact
          path="/products"
          element={
            <UserLoggedIn>
              <BrandProductScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/products/voucher/add"
          element={
            <UserLoggedIn>
              <BrandAddVoucherScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/products/add"
          element={
            <UserLoggedIn>
              <BrandAddProductScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/products/:id"
          element={
            <UserLoggedIn>
              <BrandEditProductScreen />
            </UserLoggedIn>
          }
        />

        <Route
          exact
          path="/account/reports"
          element={
            <UserLoggedIn>
              <BrandSettingReportsScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/integration"
          element={
            <UserLoggedIn>
              <BrandSettingGmailScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/account"
          element={
            <UserLoggedIn>
              <BrandSettingProfileScreen />
            </UserLoggedIn>
          }
        />
        {/* <Route
          exact
          path="/account/change-password"
          element={
            <UserLoggedIn>
              <AccountChangePasswordScreen />
            </UserLoggedIn>
          }
        /> */}
        <Route
          exact
          path="/account/close-account"
          element={
            <UserLoggedIn>
              <AccountCloseScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/billing"
          element={
            <UserLoggedIn>
              <BrandSettingSubscriptionScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/billing/payment-method"
          element={
            <UserLoggedIn>
              <BillingPaymentMethodScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/billing/invoice"
          element={
            <UserLoggedIn>
              <BillingReceiptScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/permission"
          element={
            <UserLoggedIn>
              <BrandSettingPermissionScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/permission/invitation"
          element={
            <UserLoggedIn>
              <BrandSettingInvitationScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/billing/credit"
          element={
            <UserLoggedIn>
              <BrandSettingCreditScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/history/credits-history"
          element={
            <UserLoggedIn>
              <BrandSettingCreditHistoryScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/integration/analytics"
          element={
            <UserLoggedIn>
              <BrandSettingAnalyticsScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/history/account-history"
          element={
            <UserLoggedIn>
              <BrandSettingAccountHistoryScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/brand/forgot-password"
          element={<BrandForgetPasswordScreen role="brand" />}
        />
        <Route
          exact
          path="/password/reset/:token/:email"
          element={<BrandResetPasswordScreen />}
        />
        <Route
          exact
          path="/invoices"
          element={
            <UserLoggedIn>
              <BrandFinanceScreen />
            </UserLoggedIn>
          }
        />

        <Route
          exact
          path="/brand/content-library"
          element={
            <UserLoggedIn>
              <BrandContentLibraryScreen />
            </UserLoggedIn>
          }
        />

        <Route
          exact
          path="/integration/smtp"
          element={
            <UserLoggedIn>
              <BrandSettingSmtpScreen />
            </UserLoggedIn>
          }
        />

        {/* <Route
          exact
          path="/brand/brand-booking/:id"
          element={
            <UserLoggedIn>
              <BrandBookingCampaignScreen />
            </UserLoggedIn>
          }
        /> */}
        {/* <Route
          exact
          path="/brand/campaigns"
          element={
            <UserLoggedIn>
              <BrandCampaignsScreen />
            </UserLoggedIn>
          }
        /> */}

        <Route
          exact
          path="/brand/campaign/new"
          element={
            <UserLoggedIn>
              <BrandNewCampaignTypeScreen />
            </UserLoggedIn>
          }
        />
        {/* <Route
				exact
				path="/brand/campaigns/:id"
				element={
					<UserLoggedIn>
						<BrandSetUpNewCampaignScreen />
					</UserLoggedIn>
				}
			/> */}
        <Route
          exact
          path="/new-campaign"
          element={
            <UserLoggedIn>
              <BrandNewCampaignScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/no-campaigns"
          element={
            <UserLoggedIn>
              <BrandNoCampaignsScreen />
            </UserLoggedIn>
          }
        />
        {/* <Route
				exact
				path="/set-up-new-campaign"
				element={
					<UserLoggedIn>
						<BrandSetUpNewCampaignScreen />
					</UserLoggedIn>
				}
			/> */}
        <Route
          exact
          path="/dashboard"
          element={
            <UserLoggedIn>
              <BrandDashboardScreen />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/export"
          element={
            <UserLoggedIn>
              <BrandExport />
            </UserLoggedIn>
          }
        />
        <Route
          exact
          path="/influencer/forgot-password"
          element={<BrandForgetPasswordScreen role="influencer" />}
        />
        {!localStorage.getItem("isLogin") && (
          <>
            <Route
              exact
              path="/instagram-niche"
              element={<InstaNicheScreen />}
            />
            <Route
              exact
              path="/instagram-location"
              element={<InstaLocationScreen />}
            />
            <Route
              exact
              path="/instagram-engagement-calculator"
              element={<InstagramEngagementCalculatorScreen />}
            />
            <Route
              exact
              path="/tiktok-engagement-calculator"
              element={<TiktokEngagementCalculatorScreen />}
            />
            <Route
              exact
              path="/instagram-email-finder"
              element={<InstagramEmailFinderScreen />}
            />
            <Route
              exact
              path="/youtube-email-finder"
              element={<YoutubeEmailFinderScreen />}
            />
            <Route exact path="/tiktok-niche" element={<TiktokNicheScreen />} />
            <Route
              exact
              path="/tiktok-location"
              element={<TiktokLocationScreen />}
            />
            <Route
              exact
              path="/youtube-niche"
              element={<YoutubeNicheScreen />}
            />
            <Route
              exact
              path="/youtube-location"
              element={<YoutubeLocationScreen />}
            />
            <Route
              exact
              path="/tiktok-email-finder"
              element={<TiktokEmailFinderScreen />}
            />
          </>
        )}

        {/* <Route exact path="/brand/*" element={<BrandLoginScreen />} /> */}
      </Routes>
      <Middleware />
    </>
  );
};

export default BrandRoutes;
