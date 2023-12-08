import React, { useState, useEffect, useRef } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { FiX } from "react-icons/fi";
import FullInstagramProfile from "@components/BrandInfluencerDiscover/Profile/FullInstagramProfile";
import MiniProfileLoader from "@components/BrandInfluencerDiscover/Profile/Loader/MiniProfileLoader";
import faceWithRollingEyes from "@assets/face_with_rolling_eyes.gif";
import Influencify from "../../../constants/Influencify";
import { refreshReports } from "../../../store/actions/HeaderActions";
import Swal from "sweetalert2";
import { useDispatch, useSelector } from "react-redux";
import AnalyzerConfirmation from "@components/AnalyzerConfirmation";
import Popup from "@components/Popup";
import { actions } from "@store/redux/InfluencerSearchRedux";

function MyVerticallyCenteredModal({ data, show, onHide }) {
  return (
    <>
      <div className="flex h-screen items-center justify-center">
        <div className="text-center">
          <p className="text-xl text-red-500 mt-2">
            {data?.error_message || ""}
          </p>
        </div>
      </div>
    </>
  );
}

function BrandInfluencerDeepScan(props) {
  const popupRef = useRef(null);
  const [isProfileLoading, setIsProfileLoading] = useState(false);
  const [platform] = useState(props.platform);
  const [open, setOpen] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const brandlist = useSelector((state) => state.brandList.current_list);
  const [currentInfluencer, setCurrentInfluencer] = useState({});
  const isShowMessage = useSelector(
    (state) => state.influencerSearch?.isShowMessage
  );
  const dispatch = useDispatch();

  const onHide = () => {
    setOpen(false);
  };

  const onClose = () => {
    props.onClose();
  };

  const fetchInfluencer = (id) => {
    let params = {
      id: id,
      platform: brandlist.list_channel,
      listId: brandlist.id,
    };
    actions.fetchInfluencer(dispatch, params);
  };

  const proceed = async () => {
    dispatch({ type: "INFLUENCER_SET_IS_SHOW_MESSAGE", data: isChecked });
    let query = {
      platform: props.platform,
      user_id: props.id,
      main_account: localStorage.getItem("main_account"),
      dry_run: false,
    };
    if (props?.influencerId) {
      query["influencer_id"] = props?.influencerId || null;
    }
    const json = await Influencify.influencerDeepScan(query);
    if (props?.influencerId) {
      fetchInfluencer(props?.id);
    }
    setCurrentInfluencer(json.data);
    setIsProfileLoading(false);
    props.dispatch(refreshReports());
  };

  const onChange = (e) => {
    setIsChecked(e.target.checked);
  };

  useEffect(() => {
    const fetchData = async () => {
      setIsProfileLoading(true);
      let query = {
        platform: props.platform,
        user_id: props.id,
        main_account: localStorage.getItem("main_account"),
        dry_run: true,
      };
      if (isShowMessage) {
        query["dry_run"] = false;
      }
      const json = await Influencify.influencerDeepScan(query);
      props.dispatch(refreshReports());
      if (json !== undefined) {
        if (json.status === 200) {
          if (json.data?.cost) {
            popupRef?.current?.open(json.data?.cost);
          } else {
            setCurrentInfluencer(json.data);
            setIsProfileLoading(false);
            props.dispatch(refreshReports());
          }
        }
      }
    };

    fetchData();
  }, []);

  return (
    <div className="containers">
      {isProfileLoading ? (
        <div className="profile-modal-loader">
          <MiniProfileLoader />
        </div>
      ) : (
        <>
          {currentInfluencer ? (
            <>
              {currentInfluencer.success === false ? (
                <MyVerticallyCenteredModal
                  data={currentInfluencer}
                  show={true}
                  onHide={() => onHide()}
                />
              ) : (
                <FullInstagramProfile
                  current_influencer={currentInfluencer}
                  platform={platform}
                  onClose={props.onClose}
                />
              )}
            </>
          ) : (
            <MyVerticallyCenteredModal
              data={{
                error_message:
                  "Something goes wrong while processing your request. We already got notification for it and will fix it soon. Try again later and say us if it doesn't help",
              }}
              show={true}
              onHide={() => onHide()}
            />
          )}
        </>
      )}
      <AnalyzerConfirmation
        ref={popupRef}
        onClose={onClose}
        proceed={proceed}
        onChange={onChange}
      />
    </div>
  );
}

export default BrandInfluencerDeepScan;
