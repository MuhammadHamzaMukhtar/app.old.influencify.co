import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import Api from "@services/axios";

import * as settingInstagramActions from "@store/actions/SettingInstagramActions";

export default function InstagramCallbackScreen() {
  const locationn = useLocation();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const search = locationn.search;
  const query = new URLSearchParams(search);
  const [verificationStatus, setVerificationStatus] = useState("");


  return (
    <div className="flex h-screen items-center justify-center">
      {verificationStatus.message !== "error" ? (
        <div className="text-center">
          <p className="text-3xl text-gray-500 mt-2">Redirecting...</p>
        </div>
      ) : (
        <div className="text-center">
          {verificationStatus.data && (
            <p className="text-lg text-red-500 mt-2">
              {verificationStatus.data.description}
            </p>
          )}
          {verificationStatus.exception && (
            <p className="text-2xl text-red-500 font-semibold">
              Access token expired! Please try again
            </p>
          )}
        </div>
      )}
    </div>
  );
}
