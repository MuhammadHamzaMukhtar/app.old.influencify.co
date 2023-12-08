// import { combineReducers } from "redux";
import { persistCombineReducers } from "redux-persist";
import InfluencerReducer from "./InfluencerReducer";
import BasicReducer from "./BasicReducer";
import TypeReducer from "./TypeReducer";
import SetUpNewCampaignReducer from "./SetUpNewCampaignReducer";
import BriefReducer from "../reducers/BriefReducer";
import TimingReducer from "../reducers/TimingReducer";
import PaymentReducer from "../reducers/PaymentReducer";
import ProductsReducer from "../reducers/ProductsReducer";
import AddProductReducer from "../reducers/AddProductReducer";
import AddVoucherReducer from "../reducers/AddVoucherReducer";
import EditProductReducer from "../reducers/EditProductReducer";
import BasicInfoReducer from "../reducers/BasicInfoReducer";
import SettingAccountReducer from "../reducers/SettingAccountReducer";
import SettingPaymentReducer from "../reducers/SettingPaymentReducer";
import CampaignReducer from "../reducers/CampaignReducer";
import InfluencersContentReducer from "../reducers/InfluencersContentReducer";
import InfluencersHeaderReducer from "../reducers/InfluencersHeaderReducer";
import InfluencersFiltersReducer from "../reducers/InfluencersFiltersReducer";
import InfluencersReducer from "../reducers/InfluencersReducer";
import InfluencersSearchReducer from "../reducers/InfluencersSearchReducer";
import LoginReducer from "../reducers/LoginReducer";
import NewCampaignReducer from "../reducers/NewCampaignReducer";
import InfluencerBookingReducer from "../reducers/InfluencerBookingReducer";
import FindInfluencerCampaignsReducer from "../reducers/FindInfluencerCampaignsReducer";
import InfluencerProfileReducer from "../reducers/InfluencerProfileReducer";
import ViewInfluencerProfileReducer from "../reducers/ViewInfluencerProfileReducer";
import SettingPlatformReducer from "../reducers/SettingPlatformReducer";
import RegisterReducer from "../reducers/RegisterReducer";
import ForgetPasswordReducer from "../reducers/ForgetPasswordReducer";
import BrandProfileReducer from "../reducers/BrandProfileReducer";
import InfluencersBookingIDReducer from "../reducers/InfluencersBookingIDReducer";
import BrandBookingCampaignReducer from "../reducers/BrandBookingCampaignReducer";
import HeaderReducer from "../reducers/HeaderReducer";
import InfluencerHomeReducer from "../reducers/InfluencerHomeReducer";
import SettingNotificationReducer from "../reducers/SettingNotificationReducer";
import SettingSubscriptionReducer from "../reducers/SettingSubscriptionReducer";
import FinanceReducer from "../reducers/FinanceReducer";
import BrandDashboardReducer from "../reducers/BrandDashboardReducer";
import GeneralReducer from "../reducers/GeneralReducer";
import ContactReducer from "../reducers/ContactReducer";
import BrandAmbassadorsReducer from "../reducers/BrandAmbassadorsReducer";
import BrandReportsReducer from "../reducers/BrandReportsReducer";
import BrandAnalyzedInfluencersReducer from "../reducers/BrandAnalyzedInfluencersReducer";
import ErrorHandlerReducer from "../reducers/ErrorHandlerReducer";
import SettingReportsReducer from "../reducers/SettingReportsReducer";
import SettingGmailReducer from "../reducers/SettingGmailReducer";
import SettingShopifyReducer from "../reducers/SettingShopifyReducer";
import BrandListsReducer from "../reducers/BrandListsReducer";

import { reducer as InfluencerSearchRedux } from "../redux/InfluencerSearchRedux";
import { reducer as BrandReportsRedux } from "../redux/BrandReportsRedux";
import { reducer as InfluencialFollowersRedux } from "../redux/InfluencialFollowersRedux";
import { reducer as ErrorHandlerRedux } from "../redux/ErrorHandlerRedux";
import { reducer as InfluencerAnalyzerRedux } from "../redux/InfluencerAnalyzerRedux";
import { reducer as CampaignRedux } from "../redux/CampaignRedux";
import { reducer as SponsoredPostsRedux } from "../redux/SponsoredPostsRedux";
import { reducer as AppsumoRedux } from "../redux/AppsumoRedux";
import { reducer as GlobalRedux } from "../redux/GlobalRedux";
import { reducer as BrandListRedux } from "../redux/BrandListRedux";
import { reducer as SmtpRedux } from "../redux/SmtpRedux";
import { reducer as MonitoringCampaignRedux } from "../redux/MonitoringCampaignRedux";
import { reducer as ContentLibraryRedux } from "../redux/ContentLibraryRedux";
import { reducer as YoutubeAuthRedux } from "../redux/YoutubeAuthRedux";
import { reducer as AdLibraryRedux } from "../redux/AdLibraryRedux";
import { reducer as SavedSearchRedux } from "../redux/SavedSearch";
import { reducer as InfluencialMentionRedux } from "../redux/InfluencialMentionRedux";
import { reducer as EmailMatchRedux } from "../redux/EmailMatchRedux";
import { reducer as SettingRedux } from "../redux/SettingRedux";
import { reducer as SubAccountRedux } from "../redux/SubAccountRedux";
import { reducer as MarketingToolRedux } from "../redux/MarketingToolRedux";
import { reducer as GoogleAnalyticsRedux } from "../redux/GoogleAnalyticsRedux";
import { reducer as BillingRedux } from "../redux/BillingRedux";

import storage from "redux-persist/lib/storage";
const config = {
  key: "root",
  storage,
  whitelist: ["marketingTool", "RegisterReducer"],
};
export default persistCombineReducers(config, {
  influencers: InfluencerReducer,
  BasicReducer: BasicReducer,
  BriefReducer: BriefReducer,
  TypeReducer: TypeReducer,
  SetUpNewCampaignReducer: SetUpNewCampaignReducer,
  TimingReducer: TimingReducer,
  PaymentReducer: PaymentReducer,
  ProductsReducer: ProductsReducer,
  AddProductReducer: AddProductReducer,
  AddVoucherReducer: AddVoucherReducer,
  EditProductReducer: EditProductReducer,
  BasicInfoReducer: BasicInfoReducer,
  SettingAccountReducer: SettingAccountReducer,
  SettingPaymentReducer: SettingPaymentReducer,
  CampaignReducer: CampaignReducer,
  InfluencersContentReducer: InfluencersContentReducer,
  InfluencersHeaderReducer: InfluencersHeaderReducer,
  InfluencersFiltersReducer: InfluencersFiltersReducer,
  InfluencersReducer: InfluencersReducer,
  InfluencersSearchReducer: InfluencersSearchReducer,
  LoginReducer: LoginReducer,
  NewCampaignReducer: NewCampaignReducer,
  InfluencerBookingReducer: InfluencerBookingReducer,
  FindInfluencerCampaignsReducer: FindInfluencerCampaignsReducer,
  InfluencerProfileReducer: InfluencerProfileReducer,
  ViewInfluencerProfileReducer: ViewInfluencerProfileReducer,
  SettingPlatformReducer: SettingPlatformReducer,
  RegisterReducer: RegisterReducer,
  ForgetPasswordReducer: ForgetPasswordReducer,
  BrandProfileReducer: BrandProfileReducer,
  InfluencersBookingIDReducer: InfluencersBookingIDReducer,
  BrandBookingCampaignReducer: BrandBookingCampaignReducer,
  HeaderReducer: HeaderReducer,
  InfluencerHomeReducer: InfluencerHomeReducer,
  SettingNotificationReducer: SettingNotificationReducer,
  SettingSubscriptionReducer: SettingSubscriptionReducer,
  FinanceReducer: FinanceReducer,
  BrandDashboardReducer: BrandDashboardReducer,
  GeneralReducer: GeneralReducer,
  ContactReducer: ContactReducer,
  BrandAmbassadorsReducer: BrandAmbassadorsReducer,
  BrandReportsReducer: BrandReportsReducer,
  BrandAnalyzedInfluencersReducer: BrandAnalyzedInfluencersReducer,
  ErrorHandlerReducer: ErrorHandlerReducer,
  SettingReportsReducer: SettingReportsReducer,
  SettingGmailReducer: SettingGmailReducer,
  SettingShopifyReducer: SettingShopifyReducer,
  BrandListsReducer: BrandListsReducer,

  influencerSearch: InfluencerSearchRedux,
  BrandReports: BrandReportsRedux,
  influencialFollowers: InfluencialFollowersRedux,
  errorHandler: ErrorHandlerRedux,
  influencerAnalyzer: InfluencerAnalyzerRedux,
  campaign: CampaignRedux,
  sponsoredPost: SponsoredPostsRedux,
  Appsumo: AppsumoRedux,
  global: GlobalRedux,
  brandList: BrandListRedux,
  smtp: SmtpRedux,
  MonitoringCampaign: MonitoringCampaignRedux,
  contentLibrary: ContentLibraryRedux,
  youtubeAuth: YoutubeAuthRedux,
  AdLibrary: AdLibraryRedux,
  savedSearch: SavedSearchRedux,
  influencialMention: InfluencialMentionRedux,
  listEmailMatch: EmailMatchRedux,
  settings: SettingRedux,
  subAccount: SubAccountRedux,
  marketingTool: MarketingToolRedux,
  googleAnalytics: GoogleAnalyticsRedux,
  billing: BillingRedux,
});
