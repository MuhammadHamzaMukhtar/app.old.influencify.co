import { Component } from "react";
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import LinkTo from "@components/global/LinkTo";

class SettingBrandBillingTopTab extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeTab: 0,
    };
  }

  componentDidMount = () => {
    const pathname = window.location.pathname;
    if (pathname === "/billing") {
      this.setState({
        activeTab: 1,
      });
    }
    if (pathname === "/billing/payment-method") {
      this.setState({
        activeTab: 2,
      });
    }
    if (pathname === "/billing/invoice") {
      this.setState({
        activeTab: 3,
      });
    }
    if (pathname === "/billing/credit") {
      this.setState({
        activeTab: 4,
      });
    }
  };

  render() {
    const url = window.location.href;
    const { refreshData, currentLoggedUser } = this.props;
    return (
      <div>
        <Helmet>
          <meta charSet="utf-8" />
          <title>Settings | Influencify</title>
          <link rel="canonical" href={url} />
        </Helmet>
        <div className="bg-white border-b-[3px] border-[#ccc] min-h-[50px]z mb-12">
          <div className="containers">
            <div className="flex flex-wrap">
              <LinkTo
                to="/billing"
                className={`mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 ${
                  this.state.activeTab === 1
                    ? "font-semibold before:w-full"
                    : "font-normal before:w-0"
                }`}
                text="Subscription"
              />
              {!currentLoggedUser.is_shopify && (
                <>
                  <LinkTo
                    to="/billing/payment-method"
                    className={`mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 ${
                      this.state.activeTab === 2
                        ? "font-semibold before:w-full"
                        : "font-normal before:w-0"
                    }`}
                    text="Payment method"
                  />
                  <LinkTo
                    to="/billing/invoice"
                    className={`mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 ${
                      this.state.activeTab === 3
                        ? "font-semibold before:w-full"
                        : "font-normal before:w-0"
                    }`}
                    text="Invoices"
                  />
                </>
              )}
              <LinkTo
                to="/billing/credit"
                className={`mr-[20px] min-w-[80px] text-center relative leading-[33px] text-black  before:ease-[cubic-bezier(0.26,1.8,0.17,0.96)] bg-transparent text-[14px] py-[0.5rem] px-[1rem] block before:content-[''] before:absolute before:bottom-[-3px] before:left-0 hover:before:w-full before:duration-[0.6s] before:delay-[0.1s] before:bg-[#7c3292] before:h-[3px] focus-visible:outline-0 ${
                  this.state.activeTab === 4
                    ? "font-semibold before:w-full"
                    : "font-normal before:w-0"
                }`}
                text="Credits & Upgrades"
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    currentLoggedUser: state.HeaderReducer.currentLoggedUser,
    refreshData: state.HeaderReducer.refreshData,
  };
};

export default connect(mapStateToProps)(SettingBrandBillingTopTab);
