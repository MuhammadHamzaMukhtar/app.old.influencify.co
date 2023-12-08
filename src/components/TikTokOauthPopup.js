import Api from "@services/axios";
import { useEffect, useState, useRef } from "react";

const createPopup = ({ url, title, height, width, brandType }) => {
  const left = window.screenX + (window.outerWidth - width) / 2;
  const top = window.screenY + (window.outerHeight - height) / 2.5;
  const externalPopup =
    brandType == "influencer" || brandType == "influencer_profile"
      ? window.open(
          url,
          "_self",
          title,
          `width=${width},height=${height},left=${left},top=${top}`
        )
      : window.open(
          url,
          "_self",
          title,
          `width=${width},height=${height},left=${left},top=${top}`
        );
  return externalPopup;
};

const TikTokOauthPopup = ({
  title = "",
  width = 600,
  height = 500,
  children,
  onCode,
  brandType,
  onClose,
}) => {
  const [externalWindow, setExternalWindow] = useState();
  const intervalRef = useRef();

  const clearTimer = () => {
    window.clearInterval(intervalRef.current);
  };

  const onContainerClick = async () => {
    const response = await Api.ContainerClicked(brandType);
    // await axios.get(helper.url + '/tiktok/connect');
    if (response.data) {
      let url = response.data;
      setExternalWindow(
        createPopup({
          url,
          title,
          width,
          height,
          brandType
        })
      );
    }
  };

  useEffect(() => {
    if (externalWindow) {
      intervalRef.current = window.setInterval(() => {
        try {
          const currentUrl = externalWindow.location.href;
          const params = new URL(currentUrl).searchParams;
          const code = params.get("code");
          if (!code) {
            return;
          }
          onCode(code, params);
          clearTimer();
          // externalWindow.close();
        } catch (error) {
          // eslint-ignore-line
        } finally {
          if (!externalWindow || externalWindow.closed) {
            onClose();
            clearTimer();
          }
        }
      }, 700);
    }
    return () => {
      // if (externalWindow) externalWindow.close();
      if (onClose) onClose();
    };
  }, [externalWindow]);

  return (
    // eslint-disable-next-line
    <div
      onClick={() => {
        onContainerClick();
      }}
    >
      {children}
    </div>
  );
};

export default TikTokOauthPopup;
