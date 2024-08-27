import React, { useState, useRef, useEffect } from 'react';
import { ZIM } from 'zego-zim-web';
import { ZegoUIKitPrebuilt } from '@zegocloud/zego-uikit-prebuilt';

const ZegoCallComponent = ({ callerId, calleeId, callType }) => {
  const zeroCloudInstance = useRef(null);

  useEffect(() => {
    const init = async () => {
      const userName = `user_${callerId}`;
      const appID = 1423329821;
      const serverSecret = '321b87cbaeaabbc39837cc015aed0cf4';

      const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
        appID,
        serverSecret,
        null,
        callerId,
        userName
      );

      zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
      zeroCloudInstance.current.addPlugins({ ZIM });

      // Customizing the call invitation dialog and waiting page
      zeroCloudInstance.current.setCallInvitationConfig({
        enableCustomCallInvitationWaitingPage: true,
        onWaitingPageWhenSending: (callType, callees, cancel) => {
          const waitingPageDom = document.createElement('div');
          waitingPageDom.className = 'custom-waiting-page';
          waitingPageDom.innerHTML = `
            <div>Waiting for call...</div>
            <button id="cancel-button">Cancel</button>
          `;
          document.body.appendChild(waitingPageDom);

          document.getElementById('cancel-button').onclick = () => {
            cancel();
            waitingPageDom.style.display = 'none';
          };
        },
        onSetRoomConfigBeforeJoining: (callType) => {
          const waitingPageDom = document.querySelector('.custom-waiting-page');
          if (waitingPageDom) {
            waitingPageDom.style.display = 'none';
          }
        },
        onCallInvitationEnded: (reason) => {
          const waitingPageDom = document.querySelector('.custom-waiting-page');
          if (waitingPageDom) {
            waitingPageDom.style.display = 'none';
          }
        },
        enableCustomCallInvitationDialog: true,
        onConfirmDialogWhenReceiving: (callType, caller, refuse, accept, data) => {
          const confirmDialogDom = document.createElement('div');
          confirmDialogDom.className = 'custom-confirm-dialog';
          confirmDialogDom.innerHTML = `
            <div>Call from ${caller.userName}</div>
            <button id="refuse-button">Refuse</button>
            <button id="accept-button">Accept</button>
          `;
          document.body.appendChild(confirmDialogDom);

          document.getElementById('refuse-button').onclick = () => {
            refuse();
            confirmDialogDom.style.display = 'none';
          };
          document.getElementById('accept-button').onclick = () => {
            accept();
            confirmDialogDom.style.display = 'none';
          };
        },
        onCallInvitationEnded: (reason) => {
          const confirmDialogDom = document.querySelector('.custom-confirm-dialog');
          if (confirmDialogDom) {
            confirmDialogDom.style.display = 'none';
          }
        },
      });
    };

    init();
  }, [callerId]);

  const handleSend = () => {
    if (!calleeId) {
      alert('Callee ID cannot be empty!');
      return;
    }

    zeroCloudInstance.current
      .sendCallInvitation({
        callees: [{ userID: calleeId, userName: `user_${calleeId}` }],
        callType: callType,
        timeout: 60,
      })
      .then((res) => {
        if (res.errorInvitees.length) {
          alert('The user does not exist or is offline.');
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div className="call-invitation-modal-container">
      <button onClick={handleSend}>
        {callType === ZegoUIKitPrebuilt.InvitationTypeVideoCall ? 'Video call' : 'Voice call'}
      </button>
    </div>
  );
};

export default ZegoCallComponent;
