import React, { useState, useRef, useEffect } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
import './CallInvitationComponent.css';

const CallInvitationComponent = ({ userId, userName }) => {
  const [userInfo, setUserInfo] = useState({
    userName: userName || "",
    userId: userId || "",
  });
  const [calleeId, setCalleeId] = useState("");
  const zeroCloudInstance = useRef(null);

  async function init() {
    setUserInfo({
      userName,
      userId,
    });

    const appID = 1423329821;
    const serverSecret = "321b87cbaeaabbc39837cc015aed0cf4";

    const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
      appID,
      serverSecret,
      null,
      userId,
      userName
    );

    console.log("KitToken generated:", KitToken);

    zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
    zeroCloudInstance.current.addPlugins({ ZIM });

    console.log("ZegoUIKitPrebuilt instance created:", zeroCloudInstance.current);
  }

  async function handleSend(callType) {
    if (!zeroCloudInstance.current) {
      // Initialize the instance if it's not already initialized
      await init();
    }

    const callee = calleeId.trim();
    if (!callee) {
      alert("UserID cannot be empty!!");
      return;
    }

    zeroCloudInstance.current
      .sendCallInvitation({
        callees: [{ userID: callee, userName: "user_" + callee }],
        callType: callType,
        timeout: 60,
      })
      .then((res) => {
        console.warn(res);
        if (res.errorInvitees.length) {
          alert("The user does not exist or is offline.");
        }
      })
      .catch((err) => {
        console.error("Error sending call invitation:", err);
      });
  }

  useEffect(() => {
    const handleResize = () => {
      const zegoUI = document.querySelector('.zego-ui-kit');
      if (zegoUI) {
        zegoUI.style.position = 'fixed';
        zegoUI.style.top = '50%';
        zegoUI.style.left = '50%';
        zegoUI.style.transform = 'translate(-50%, -50%)';
        zegoUI.style.maxHeight = '90%';
        zegoUI.style.overflowY = 'auto';
      }
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="call-invitation-modal-container">
      <div>
        My username: <span>{userInfo.userName}</span>
      </div>
      <div>
        My userId: <span>{userInfo.userId}</span>
      </div>
      <input
        type="text"
        placeholder="Callee's userID"
        onChange={(event) => {
          setCalleeId(event.target.value);
        }}
      />
      <div className="call-buttons-container">
        <button
          className="call-invitation-modal"
          onClick={() => {
            handleSend(ZegoUIKitPrebuilt.InvitationTypeVideoCall);
          }}
        >
          Video call
        </button>
        <button
          className="call-invitation-modal"
          onClick={() => {
            handleSend(ZegoUIKitPrebuilt.InvitationTypeVoiceCall);
          }}
        >
          Voice call
        </button>
      </div>
    </div>
  );
};

export default CallInvitationComponent;
