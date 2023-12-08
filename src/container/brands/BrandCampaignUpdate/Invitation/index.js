import { Component, Fragment } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import { connect } from "react-redux";
import * as setUpCampaignActions from "@store/actions/SetUpCampaignActions";
import * as settingGmailActions from "@store/actions/SettingGmailActions";
import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
import Avatar from "@assets/avatar.png";
import { IoSettingsOutline } from "react-icons/io5";
import { BsEye } from "react-icons/bs";
import { FcGoogle } from "react-icons/fc";
import { FiArrowRight } from "react-icons/fi";
import { FaRegEnvelope } from "react-icons/fa";
import { BiShare, BiDotsHorizontalRounded } from "react-icons/bi";
import "./styles.css";
import { Link } from "react-router-dom";
import DOMPurify from "dompurify";
import Button from "@components/global/Button";
import Influencify from "../../../../constants/Influencify";

const modules = {
  toolbar: {
    container: [
      [{ header: [1, 2, 3, 4, 5, 6, false] }],
      [{ size: ["small", false, "large", "huge"] }],
      ["bold", "italic", "underline", "strike"],
      ["clean"],
      [
        {
          dynamicDropdown: [
            " {influencer_username} ",
            " {influencer_fullname} ",
            " {influencer_email} ",
            " {influencer_followers_count} ",
            " {brand_name} ",
            " {brand_website} ",
            " {campaign_start_date} ",
            " {campaign_end_date} ",
            " {campaign_url} ",
            " {company_name} ",
          ],
        },
      ],
    ],
    handlers: {
      dynamicDropdown: function (value) {
        if (value) {
          const cursorPosition = this.quill.getSelection().index;
          this.quill.insertText(cursorPosition, value);
          this.quill.setSelection(cursorPosition + value.length);
        }
      },
    },
  },
};

class Invitation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      disconnectModal: false,
      value: "",
      false: "",
      text: "",
      placeholder: "Message",
      editorHtml: "",
      toolbarState: true,
      preview: true,
      gmail_connected_message: "",
    };
    this.timer = null;
  }

  componentDidMount() {
    /*
      const placeholderPickerItems = Array.prototype.slice.call(document.querySelectorAll('.ql-dynamicDropdown .ql-picker-item'));
      placeholderPickerItems.forEach(item => item.textContent = item.dataset.value);
      if(document.querySelector('.ql-dynamicDropdown .ql-picker-label') != null){
        document.querySelector('.ql-dynamicDropdown .ql-picker-label').innerHTML
        = '<svg stroke="currentColor" className="merger-list" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 400H48V80h480v352zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2zM360 320h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8z"></path></svg><svg className="merger-down-arrow" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>'
      }
      */
  }

  componentDidUpdate(prevProps) {
    const { currentLoggedUser, gmail_setting, smtp_setting, form } = this.props;

    if (currentLoggedUser && currentLoggedUser.isGmailLinked && gmail_setting) {
      if (!form.email_provider) {
        this.handleChange("email_provider", "gmail");
      }
    } else if (smtp_setting.id) {
      if (!form.email_provider) {
        if (smtp_setting && smtp_setting.sender_email) {
          this.handleChange("email_provider", "smtp");
        }
      }
    }
  }

  gmailSync = async () => {
    if (this.props.form.campaign_status === "active") return;
    const url = await Influencify.authGmailUrl();
    window.location.href = url.data;
  };

  showDisconnetModal = () => {
    this.setState({
      disconnectModal: true,
    });
  };

  handleClose = () => {
    this.setState({
      disconnectModal: false,
    });
  };

  gmailDisconnect = () => {
    if (this.props.form.campaign_status === "active") return;
    this.props.disconnectGmail();
    this.handleClose();
  };

  handleUpdateInvitationMessage = () => {
    //if (this.props.form.campaign_status === "active") return;
    const form = Object.assign({}, this.props.form);
    let query = {
      campaign_id: form.campaign_id,
      subject_line: form.campaign_invitation.subject_line,
      verified_message: form.campaign_invitation.verified_message,
      non_verified_message: form.campaign_invitation.non_verified_message,
      gmail_connected_message: this.state.gmail_connected_message,
    };
    this.props.updateInvitationMessage(query);
  };

  handleChange = (key, value) => {
    //if (this.props.form.campaign_status === "active") return;
    const { addForm } = this.props;
    const form = Object.assign({}, this.props.form);
    if (key === "subject_line") {
      form.campaign_invitation.subject_line = value;
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        this.handleUpdateInvitationMessage();
      }, 2000);
    } else if (key === "gmail_connected_message") {
      form.campaign_invitation.gmail_connected_message = value;
    } else if (key === "verified_message") {
      form.campaign_invitation.verified_message = value;
    } else if (key === "non_verified_message") {
      form.campaign_invitation.non_verified_message = value;
    } else if (key === "email_provider") {
      form[key] = value;
    }

    addForm(form);
  };

  createMarkup = (html) => {
    return {
      __html: DOMPurify.sanitize(html),
    };
  };

  populateTemplate = (item) => {
    // if (this.props.form.campaign_status === "active") return;
    const { addForm } = this.props;
    this.setState({ gmail_connected_message: "" });
    const form = Object.assign({}, this.props.form);
    form.template_item_id = item.id;
    form.campaign_invitation.subject_line = item.subject;
    form.campaign_invitation.gmail_connected_message = item.body;
    addForm(form);
    this.handleUpdateInvitationMessage();
  };

  setEditor = (html, delta, source, editor) => {
    this.setState({ gmail_connected_message: html });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.handleUpdateInvitationMessage();
    }, 1000);
  };

  setNewEditor = (event, editor) => {
    const data = editor.getData();
    this.setState({ gmail_connected_message: data });
    clearTimeout(this.timer);
    this.timer = setTimeout(() => {
      this.handleUpdateInvitationMessage();
    }, 1000);
  };

  render() {
    const {
      currentLoggedUser,
      form,
      gmail_setting,
      templates,
      smtp_setting,
      templateSaving,
      refreshData,
    } = this.props;
    const placeholderPickerItems = Array.prototype.slice.call(
      document.querySelectorAll(".ql-dynamicDropdown .ql-picker-item")
    );
    placeholderPickerItems.forEach(
      (item) => (item.textContent = item.dataset.value)
    );
    if (
      document.querySelector(".ql-dynamicDropdown .ql-picker-label") != null
    ) {
      document.querySelector(".ql-dynamicDropdown .ql-picker-label").innerHTML =
        '<svg stroke="currentColor" className="merger-list static top-[unset] mt-[1px]" fill="currentColor" stroke-width="0" viewBox="0 0 576 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M528 32H48C21.5 32 0 53.5 0 80v352c0 26.5 21.5 48 48 48h480c26.5 0 48-21.5 48-48V80c0-26.5-21.5-48-48-48zm0 400H48V80h480v352zM208 256c35.3 0 64-28.7 64-64s-28.7-64-64-64-64 28.7-64 64 28.7 64 64 64zm-89.6 128h179.2c12.4 0 22.4-8.6 22.4-19.2v-19.2c0-31.8-30.1-57.6-67.2-57.6-10.8 0-18.7 8-44.8 8-26.9 0-33.4-8-44.8-8-37.1 0-67.2 25.8-67.2 57.6v19.2c0 10.6 10 19.2 22.4 19.2zM360 320h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8zm0-64h112c4.4 0 8-3.6 8-8v-16c0-4.4-3.6-8-8-8H360c-4.4 0-8 3.6-8 8v16c0 4.4 3.6 8 8 8z"></path></svg><svg className="static" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 320 512" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M41 288h238c21.4 0 32.1 25.9 17 41L177 448c-9.4 9.4-24.6 9.4-33.9 0L24 329c-15.1-15.1-4.4-41 17-41z"></path></svg>';
    }
    return (
      <div>
        {/* <div className="-mt-[42px] shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white rounded-[8px] px-4 mb-2">
                <h4>Quick Invite Message</h4>
              </div> */}
        <div className="shadow-[0px_4px_5px_#96969640] hover:shadow-[0px_10px_30px_#96969640] bg-white mb-12 p-4 rounded-[8px]">
          <h5 className="mb-4 font-medium text-[18px]">
            Simply connect your email provider
          </h5>
          <div className="grid grid-cols-12 gap-5">
            <div className="md:col-span-6 col-span-12">
              {currentLoggedUser &&
              currentLoggedUser.isGmailLinked &&
              gmail_setting ? (
                <div
                  className="cursor-pointer"
                  onClick={() => this.handleChange("email_provider", "gmail")}
                >
                  <div
                    className={`flex border  rounded-[8px] p-3 ${
                      form &&
                      form.email_provider &&
                      form.email_provider === "gmail"
                        ? "bg-[#7c3292] [&_p]:text-white [&_h6]:text-white"
                        : ""
                    } `}
                  >
                    <div className="pr-3 pt-2 sm:flex hidden ">
                      <FcGoogle size={18} />
                    </div>
                    <div className="flex justify-between grow items-center">
                      <div className="flex flex-col tracking-[2px] grow">
                        <p className="text-[8px] gray">GOOGLE</p>
                        <div className="flex flex-wrap items-center">
                          <p className="text-[13px]">Sent from: </p>
                          <h6 className="text-[15px] ml-0 ml-md-2 ">
                            {(gmail_setting && gmail_setting.name) ||
                              " Connected"}
                          </h6>
                        </div>
                      </div>
                      <div className="sm:flex hidden ">
                        <FiArrowRight className="gray" size={20} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : refreshData.is_admin ? (
                <Link to="#" onClick={this.gmailSync} className="mt-4 sm:!mt-0">
                  <div className="flex border  rounded-[8px] p-3">
                    <div className="pr-3 pt-2 sm:flex hidden ">
                      <FcGoogle size={18} />
                    </div>
                    <div className="flex justify-between grow items-center">
                      <div className="flex flex-col tracking-[2px] grow">
                        <p className="text-[8px] gray">GOOGLE</p>
                        <h6 className="text-[13px]">Gmail / G-Suite</h6>
                      </div>
                      <div className="sm:flex hidden ">
                        <FiArrowRight className="gray" size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              ) : (
                <div className="flex border rounded-[8px] p-3">
                  <div className="pr-3 pt-2 sm:flex hidden ">
                    <FcGoogle size={18} />
                  </div>
                  <div className="flex justify-between grow items-center">
                    <div className="flex flex-col tracking-[2px] grow">
                      <p className="text-[8px] gray">GOOGLE</p>
                      <h6 className="text-[13px]">
                        Please ask admin to connect
                      </h6>
                    </div>
                    <div className="sm:flex hidden ">
                      <FiArrowRight className="gray" size={18} />
                    </div>
                  </div>
                </div>
              )}
            </div>
            <div className="md:col-span-6 col-span-12">
              {smtp_setting && smtp_setting.sender_email ? (
                <div
                  className="cursor-pointer"
                  onClick={() => this.handleChange("email_provider", "smtp")}
                >
                  <div
                    className={`flex border rounded-[8px] p-3 ${
                      form &&
                      form.email_provider &&
                      form.email_provider === "smtp"
                        ? "bg-[#7c3292] [&_p]:text-white [&_h6]:text-white [&_svg]:text-white "
                        : "black"
                    } `}
                  >
                    <div className="pr-3 sm:flex flex-col hidden ">
                      <FaRegEnvelope size={18} />
                      <p className="black text-[8px] font-medium">SMTP</p>
                    </div>
                    <div className="flex justify-between grow items-center">
                      <div className="flex flex-col tracking-[2px] ">
                        <p className="text-[8px] gray">SMTP</p>
                        <div className="flex flex-wrap items-center">
                          <p className="text-[13px] mr-2">Sent from: </p>
                          <h6 className="text-[15px]">
                            {" "}
                            {smtp_setting.sender_email}
                          </h6>
                        </div>
                      </div>
                      <div className="sm:flex hidden ">
                        <FiArrowRight className="gray" size={18} />
                      </div>
                    </div>
                  </div>
                </div>
              ) : (
                <Link to="/integration/smtp">
                  <div className="flex border  rounded-[8px] p-3">
                    <div className="pr-3 sm:flex flex-col hidden ">
                      <FaRegEnvelope size={18} className="black" />
                      <p className="black text-[8px] font-medium">SMTP</p>
                    </div>
                    <div className="flex justify-between grow items-center">
                      <div className="flex flex-wrap flex-col tracking-[2px] ">
                        <p className="text-[8px] gray">SMTP</p>
                        <h6 className="text-[15px]">Other</h6>
                      </div>
                      <div className="sm:flex hidden ">
                        <FiArrowRight className="gray" size={18} />
                      </div>
                    </div>
                  </div>
                </Link>
              )}
            </div>
          </div>
          {(currentLoggedUser && currentLoggedUser.isGmailLinked) ||
          (smtp_setting && smtp_setting.sender_email) ? (
            <div className="grid grid-cols-12 gap-5 mt-12">
              <div className="lg:col-span-6 col-span-12 mb-12 lg:!mb-0 invitation-quill">
                <div className="relative">
                  <label className="text-[10px] darkGray absolute -top-[6px] left-[6px] px-3 py-0 bg-white">
                    Subject Line
                  </label>
                  <input
                    onChange={(e) =>
                      this.handleChange("subject_line", e.target.value)
                    }
                    value={
                      form && form.campaign_invitation
                        ? form.campaign_invitation.subject_line
                        : ""
                    }
                    className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292] mb-4"
                  />
                </div>
                <ReactQuill
                  //onChange={(editor) => this.handleChange('gmail_connected_message', editor) }
                  onChange={this.setEditor}
                  placeholder={this.state.placeholder}
                  modules={modules}
                  value={
                    this.state.gmail_connected_message
                      ? this.state.gmail_connected_message
                      : form.campaign_invitation
                      ? form.campaign_invitation.gmail_connected_message
                      : ""
                  }
                  //readOnly={form.campaign_status === "active" ? true : false}
                />
                <div className="border-x border-b border-[#ccc] flex justify-between p-3 py-[0.5rem] rounded-b-[8px]">
                  <div className="py-1 flex">
                    <div
                      className="viewButton flex items-center"
                      role="button"
                      onClick={() =>
                        this.setState({
                          preview: !this.state.preview,
                        })
                      }
                    >
                      <BsEye />
                      {this.state.preview ? (
                        <span className="ml-2">Hide Preview</span>
                      ) : (
                        <span className="ml-2">Show Preview</span>
                      )}
                    </div>
                    <div className="viewBuiltIn ml-4" role="button"></div>
                  </div>
                </div>
                <div className="text-right mt-4">
                  {templateSaving ? "Saving..." : ""}
                </div>
              </div>
              <div className="lg:col-span-3 md:col-span-6 col-span-12 mb-12 lg:!mb-0">
                {this.state.preview ? (
                  <div className="bg-[url('@assets/iphone.png')] bg-center bg-no-repeat bg-[length:100%_100%] py-4 ">
                    <div className="mobile-view-scroller min-h-[470px] max-h-[480px] overflow-y-auto px-4 my-6">
                      <div className="flex pt-4">
                        <div className="grow">
                          <p className="font-bold">
                            {form && form.campaign_invitation
                              ? form.campaign_invitation.subject_line
                              : ""}
                          </p>
                        </div>
                        <div className="ml-2">
                          <IoSettingsOutline />
                        </div>
                      </div>
                      <div className="flex pt-4 mb-6">
                        <div className="shrink-0">
                          <img
                            className="rounded-full"
                            width={30}
                            src={Avatar}
                            alt="avatar"
                          />
                        </div>
                        {currentLoggedUser &&
                        currentLoggedUser.isGmailLinked &&
                        form.email_provider &&
                        form.email_provider === "gmail" ? (
                          <div className="grow ml-2">
                            <p className="mb-1 text-[18px]">
                              {gmail_setting.name}
                            </p>
                            <p className="mb-1 text-[12px]">
                              {gmail_setting.email}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        {smtp_setting &&
                        smtp_setting.sender_email &&
                        form.email_provider &&
                        form.email_provider === "smtp" ? (
                          <div className="grow ml-2">
                            <p className="mb-1 text-[18px]">
                              {smtp_setting.sender_name}
                            </p>
                            <p className="mb-1 text-[12px]">
                              {smtp_setting.sender_email}
                            </p>
                          </div>
                        ) : (
                          ""
                        )}
                        <div className="shrink-0 ml-auto flex items-center">
                          <BiShare />
                          <BiDotsHorizontalRounded className="ml-2" />
                        </div>
                      </div>
                      <div>
                        <div
                          dangerouslySetInnerHTML={this.createMarkup(
                            this.state.gmail_connected_message
                              ? this.state.gmail_connected_message
                              : form.campaign_invitation
                              ? form.campaign_invitation.gmail_connected_message
                              : ""
                          )}
                        ></div>
                      </div>
                      {/* <div className="text-center mt-12 mb-6 ">
                        <Button
                          className="px-[1rem] rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80"
                          text="View Campaign"
                        />
                      </div> */}
                    </div>
                  </div>
                ) : (
                  ""
                )}
              </div>
              <div className="lg:col-span-3 md:col-span-6 col-span-12 mb-12 lg:!mb-0">
                <ul className="bg-white rounded-[8px] border-[1px] border-[#00000020] overflow-hidden">
                  <li className="relative block bg-[#7c3292] px-[1.25rem] py-[0.75rem]">
                    <p className="text-white font-bold capitalize py-[0.5rem] text-[15px]">
                      Templates
                    </p>
                  </li>
                  {templates && templates.length
                    ? templates
                        // .filter((i) => {
                        //   if (form.campaign_type === "quoteCampaign") {
                        //     return i.type === "request_a_quote";
                        //   }
                        //   return i.type !== "request_a_quote";
                        // })
                        .map((item, index) => (
                          <li
                            className={`relative block px-[1.25rem] py-[0.75rem] border-t border-[#00000020] ${
                              form.template_item_id === item.id
                                ? "bg--lightGray"
                                : ""
                            }`}
                          >
                            <p
                              role="button"
                              onClick={() => this.populateTemplate(item)}
                              className="py-1  font-bold"
                            >
                              #{index + 1} {item.title}
                            </p>
                          </li>
                        ))
                    : ""}
                </ul>
              </div>
            </div>
          ) : (
            ""
          )}
        </div>
        <Transition appear show={this.state.disconnectModal} as={Fragment}>
          <Dialog onClose={this.handleClose} className="relative z-[9999]">
            <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
            <div className="fixed inset-0 flex items-center justify-center p-4">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="mx-auto sm:min-w-[36rem] min-w-full rounded-[8px] bg-white">
                  <Dialog.Title className="text-white text-center grow flex justify-between border-b border-[#dee2e6] p-3">
                    <h3>Are You Sure?</h3>
                    <div
                      className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
                      onClick={this.handleClose}
                    >
                      <FiX size={24} className="text-white stroke-white" />
                    </div>
                  </Dialog.Title>
                  <div className="p-3">
                    <div className="mb-6">
                      <p className="font-medium text-[15px]">
                        Do you want to disconnect your Gmail Account
                      </p>
                    </div>
                    <div className="flex justify-end pt-3 border-t border-t-[#dee2e6]">
                      <Button
                        className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mr-2"
                        onClick={this.handleClose}
                        text="Cancel"
                      />
                      <Button
                        className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70"
                        onClick={this.gmailDisconnect}
                        text="Yes"
                      />
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition>
      </div>
    );
  }
}

const mapStateToProps = ({ campaign, HeaderReducer, global, smtp }) => {
  return {
    currentLoggedUser: HeaderReducer.currentLoggedUser,
    form: campaign.form,
    gmail_setting: campaign.gmail_setting,
    templates: global.templates,
    smtp_setting: smtp.form,
    templateSaving: campaign.templateSaving,
    refreshData: HeaderReducer.refreshData,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@store/redux/CampaignRedux");
  return {
    addForm: (form) => {
      actions.addForm(dispatch, form);
    },
    updateInvitationMessage: (query) =>
      dispatch(setUpCampaignActions.updateInvitationMessage(query)),
    disconnectGmail: () => dispatch(settingGmailActions.disconnectGmail()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Invitation);
