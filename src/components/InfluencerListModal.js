import { Component, Fragment } from "react";
import { Combobox, Dialog, Listbox, Transition } from "@headlessui/react";
import { FaPlusCircle } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import Button from "@components/global/Button";
import { AiFillCaretDown } from "react-icons/ai";
import { connect } from "react-redux";

class InfluencerListModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      selectedListId: "",
      selectedList: {},
      addNewListFlag: false,
      listName: {},
      newListName: "",
      listIndex: "",
      checkValue: "",
    };
  }
  handleSelectList = (data) => {
    this.setState({ selectedList: { list_id: data.id, list_name: data.list_name } })
    this.props.fetchListBoards(data.id);
  }
  handleSelectBoard = (data) => {
    this.setState({ selectedList: { ...this.state.selectedList, board_id: data.id, board_name: data.board_name } })
  }
  selectInfluencer = (value, id, index) => {
    if (value) {
      this.setState({
        selectedListId: id,
        listIndex: index,
        checkValue: value,
      });
    }
  };
  arrayRemove = (arr, value) => {
    return arr.filter(function (ele) {
      return ele !== value;
    });
  };
  searchBrandList = (event) => {
    this.setState({ selectedList: { ...this.state.selectedList, list_name: event.target.value } })
    let query = {
      searchQuery: event.target.value,
      platform: this.props.platform,
    };
    this.props.fetchBrandLists(query);
  };
  showForm = () => {
    this.setState({ addNewListFlag: true });
  };
  hideCreateListDiv = () => {
    this.setState({
      addNewListFlag: false,
      newListName: ''
    });
  };
  handleListNameChange = (event) => {
    let query = {
      list_name: event.target.value,
      platform: this.props.platform,
    };
    this.setState({
      listName: query,
      newListName: event.target.value
    });
  };
  handleAddNewList = (event) => {
    let query = this.state.listName;
    this.props.createBrand(query);
    this.setState({ addNewListFlag: false });
  };
  addInfluencerList = (listId, boardId) => {
    let data = [];
    let form = {};
    form.selectedListId = listId;
    form.selectedBoardId = boardId;
    form.platform = this.props.platform;
    if (this.props.selectedInfluencers) {
      this.props.selectedInfluencers.map((item) => {
        let influencer = {};
        if (item.user_profile) {
          influencer = item.user_profile;
        } else if (item.basicInfo) {
          influencer = item.basicInfo;
        } else {
          influencer = item;
        }
        data.push(influencer);

        // if(this.props?.analyzer){
        //   data.push({
        //     selectedInfluencerUserName: influencer.iq_user_id
        //       ? influencer.iq_user_id
        //       : influencer.iq_user_id,
        //     engagement_rate:
        //       influencer.engagement_rate > 1
        //         ? influencer.engagement_rate / 100
        //         : influencer.engagement_rate,
        //     engagements: influencer.engagements,
        //     followers: influencer.followers
        //       ? influencer.followers
        //       : influencer.followers_count,
        //   });
        // } else {
        //   data.push({
        //     selectedInfluencerUserName: influencer.user_id
        //       ? influencer.user_id
        //       : influencer.iq_user_id,
        //     engagement_rate:
        //       influencer.engagement_rate > 1
        //         ? influencer.engagement_rate / 100
        //         : influencer.engagement_rate,
        //     engagements: influencer.engagements,
        //     followers: influencer.followers
        //       ? influencer.followers
        //       : influencer.followers_count,
        //   });
        // }

      });
    }
    form.influencers = data;
    this.props.addInfluencer(form);
    this.props.closeModal();
    this.setState({ selectedList: {} })
  };
  callEventAddInfluencer = () => {
    this.addInfluencerList(this.state.selectedList?.list_id, this.state.selectedList?.board_id);
  };

  render() {
    const { selectedList } = this.state;
    return (
      <Transition appear show={this.props.show} as={Fragment}>
        <Dialog onClose={this.props.closeModal} className="relative z-[9999]">
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
              <Dialog.Panel className={`mx-auto sm:min-w-[56rem] min-w-full rounded-[8px] bg-white`}>
                <div className="text-black text-center grow flex justify-between border-b border-[#dee2e6] p-3">
                  <h3 className="text-[21px]">Influencer List</h3>
                  <div
                    className="bg-[#000] px-[12px] rounded-b-[8px] -mt-[18px] -mr-[13px] h-[46px] flex items-center cursor-pointer"
                    onClick={() => { this.props.closeModal(); this.setState({ addNewListFlag: false }); }}
                  >
                    <FiX size={24} className="text-white stroke-white" />
                  </div>
                </div>
                {!this.state.addNewListFlag ? (
                  <div className="p-3 pt-5 space-y-10">
                    <Combobox
                      onChange={(data) =>
                        this.handleSelectList(data)
                      }
                    >
                      <div className="relative w-full">
                        <Combobox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 text-left focus:outline-none border border-[#22242626] h-[40px] border-none">
                          <Combobox.Input
                            type="text"
                            name="searchList"
                            onChange={(e) => this.searchBrandList(e)}
                            value={this.state.selectedList?.list_name}
                            className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                            placeholder="Search List"
                            autoComplete="off"
                          />
                        </Combobox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Combobox.Options className="absolute max-h-60 z-10 mt-[7px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm">
                            {(this.props.brandLists &&
                              this.props.brandLists.length > 0) ?
                              this.props.brandLists.map((list) => (
                                <Combobox.Option
                                  key={list.id}
                                  className={`relative cursor-pointer select-none ${list.id === selectedList.list_id && "bg-[#00000008]"} hover:bg-[#00000008] p-[.78571429rem_1.14285714rem]`}
                                  value={list}
                                >
                                  <span
                                    className={`block ${list.id === selectedList.list_id
                                      ? "purple font-semibold"
                                      : "text-gray-900 font-medium"
                                      }`}
                                  >
                                    {list.list_name} ({list.listInfluencersCount})
                                  </span>
                                </Combobox.Option>
                              )) :
                              <div className="relative cursor-default select-none py-2 px-4 text-gray-700">
                                No results found.
                              </div>}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    </Combobox>
                    <Combobox
                      onChange={(data) =>
                        this.handleSelectBoard(data)
                      }
                    >
                      <div className="relative w-full">
                        <Combobox.Button className="relative w-full cursor-pointer rounded-lg bg-white py-2 pl-3 pr-6 text-left focus:outline-none border border-[#22242626] h-[40px]">
                          <span className="block">
                            {selectedList.hasOwnProperty("board_name") ? selectedList.board_name : "Choose Board"}
                          </span>
                          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                            <AiFillCaretDown
                              size={12}
                              className="text-black opacity-80"
                              aria-hidden="true"
                            />
                          </span>
                        </Combobox.Button>
                        <Transition
                          as={Fragment}
                          leave="transition ease-in duration-100"
                          leaveFrom="opacity-100"
                          leaveTo="opacity-0"
                        >
                          <Combobox.Options className="absolute max-h-60 z-10 -mt-[5px] w-full overflow-auto rounded-md bg-white py-1 text-[14px] shadow-[0_2px_3px_0_#22242626] focus:outline-none sm:text-sm">
                            {this.props.listBoards &&
                              this.props.listBoards.length > 0 ?
                              this.props.listBoards.map((board) => (
                                <Combobox.Option
                                  key={board.id}
                                  className={`relative cursor-pointer ${board.id === selectedList.board_id && "bg-[#00000008]"} select-none hover:bg-[#00000008] p-[.78571429rem_1.14285714rem]`}
                                  value={board}
                                >
                                  <span
                                    className={`block ${board.id === selectedList.board_id
                                      ? "purple font-semibold"
                                      : "text-gray-900 font-medium"
                                      }`}
                                  >
                                    {board.board_name}
                                  </span>
                                </Combobox.Option>
                              )) :
                              <div
                                className={`relative select-none p-[.78571429rem_1.14285714rem]`}
                              >
                                <span
                                  className={`block text-gray-500 font-medium`}
                                >
                                  No Board Found
                                </span>
                              </div>}
                          </Combobox.Options>
                        </Transition>
                      </div>
                    </Combobox>
                    {/* <div>
                        <input
                          type="text"
                          name="searchList"
                          onChange={(e) => this.searchBrandList(e)}
                          className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                          placeholder="Search List"
                        />
                      </div>
                      <div className="relative h-80 overflow-y-auto">
                        {this.props.brandLists &&
                          this.props.brandLists.length ? (
                          this.props.brandLists.map((list, index) => (
                            <div
                              className="flex justify-between items-center mb-2"
                              key={index}
                            >
                              <h6 className=" text-[16px]">
                                {list.list_name} ({list.listInfluencersCount})
                              </h6>
                              <label
                                htmlFor={`primary-${list.id}`}
                                className="cursor-pointer inline-flex items-center text-[15px] font-normal"
                              >
                                <input
                                  id={`primary-${list.id}`}
                                  type="radio"
                                  name="influencer_list"
                                  onChange={(e) =>
                                    this.selectInfluencer(
                                      e.target.checked,
                                      list.id,
                                      index
                                    )
                                  }
                                  className="hidden peer"
                                />
                                <span className="mr-3 peer-checked:bg-[#7c3292] bg-white h-[16px] w-[16px] before:content-[''] relative before:absolute before:bottom-[4.2px] before:left-[1.1px] before:h-[5px] before:w-[10px] before:border-b-2 before:border-l-2 before:-rotate-[45deg] before:border-white inline-block border-2 border-[#7c3292] rounded-sm"></span>
                              </label>
                            </div>
                          ))
                        ) : (
                          <div className="text-center w-full py-[5rem] px-[1rem] flex items-center justify-center text-[#bbb] text-[2.8rem] font-medium leading-[40px]">
                            We have nothing to show you here.
                          </div>
                        )}
                      </div> */}
                    <div className="flex justify-between items-center border-0 border-t pt-5 border-[#e5e7eb]">
                      <div
                        onClick={this.showForm}
                        className="flex items-center success text-[16px] cursor-pointer"
                      >
                        <FaPlusCircle className="mr-2" />
                        Create New List
                      </div>
                      {this.props.brandLists &&
                        this.props.brandLists.length ? (
                        <Button
                          disabled={!selectedList.board_id || !selectedList.list_id}
                          className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80 ml-4 disabled:opacity-70"
                          onClick={this.callEventAddInfluencer}
                          text="Add"
                        />
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="p-3 flex justify-between flex-col h-[88%]">
                      <div className="mb-4">
                        <label>List Name</label>
                        <input
                          type="text"
                          name="list_name"
                          onChange={(e) => this.handleListNameChange(e)}
                          value={this.state.newListName}
                          className="rounded-[8px] h-[40px] inline-flex w-full items-center px-3 border-[1px] border-[#ced4da] focus-visible:outline-0 focus:border-[#7c3292]"
                          placeholder="Enter List Name"
                        />
                      </div>
                      <div className="text-right multi-buttons border-0 border-t pt-3 border-[#e5e7eb]">
                        <Button
                          className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--lightGray dark hover:opacity-80 mt-2"
                          onClick={this.hideCreateListDiv}
                          text="Cancel"
                        />
                        <Button
                          className="px-12 rounded-[8px] h-[40px] text-[14px] inline-flex items-center bg--purple text-white hover:opacity-80  disabled:opacity-70 mt-2 ml-4"
                          onClick={this.handleAddNewList}
                          disabled={!this.state.newListName}
                          text="Submit"
                        />
                      </div>
                    </div>
                  </>
                )}
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition>
    );
  }
}

const mapStateToProps = ({ brandList }) => {
  return {
    listBoards: brandList.listBoards,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { actions } = require("@store/redux/BrandListRedux");
  return {
    fetchListBoards: (data) => {
      actions.fetchListBoards(dispatch, data);
    },
    fetchBrandLists: (data) => {
      actions.fetchBrandLists(dispatch, data);
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(InfluencerListModal);