// // ZegoCall.js
// import React, { useState, useRef, useEffect } from "react";
// import { ZIM } from "zego-zim-web";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// export default function ZegoCall({ userId, userName, calleeId }) {
//   const zeroCloudInstance = useRef(null);

//   useEffect(() => {
//     async function init() {
//       const appID = 1423329821;
//       const serverSecret = "321b87cbaeaabbc39837cc015aed0cf4";

//       const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//         appID,
//         serverSecret,
//         null,
//         userId,
//         userName
//       );

//       zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
//       zeroCloudInstance.current.addPlugins({ ZIM });

//       zeroCloudInstance.current.setCallInvitationConfig({
//         enableCustomCallInvitationDialog: true,
//         onConfirmDialogWhenReceiving: (callType, caller, refuse, accept, data) => {
//           const confirmDialogDom = document.createElement('div');
//           confirmDialogDom.className = 'custom-confirm-dialog';
//           confirmDialogDom.innerHTML = `
//             <div>Call from ${caller.userName}</div>
//             <button id="refuse-button">Refuse</button>
//             <button id="accept-button">Accept</button>
//           `;
//           document.body.appendChild(confirmDialogDom);

//           document.getElementById('refuse-button').onclick = () => {
//             refuse();
//             confirmDialogDom.style.display = 'none';
//           };
//           document.getElementById('accept-button').onclick = () => {
//             accept();
//             confirmDialogDom.style.display = 'none';
//           };
//         },
//         onCallInvitationEnded: (reason) => {
//           const confirmDialogDom = document.querySelector('.custom-confirm-dialog');
//           if (confirmDialogDom) {
//             confirmDialogDom.style.display = 'none';
//           }
//         }
//       });
//     }

//     init();
//   }, [userId, userName]);

//   const handleSendCall = (callType) => {
//     if (!calleeId) {
//       alert("Callee ID cannot be empty!!");
//       return;
//     }

//     zeroCloudInstance.current
//       .sendCallInvitation({
//         callees: [{ userID: calleeId, userName: "user_" + calleeId }],
//         callType: callType,
//         timeout: 60,
//       })
//       .then((res) => {
//         if (res.errorInvitees.length) {
//           alert("The user does not exist or is offline.");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   return (
//     <div>
//       <button onClick={() => handleSendCall(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}>
//         Voice Call
//       </button>
//     </div>
//   );
// }





// import React, { useEffect, useRef } from "react";
// import { ZIM } from "zego-zim-web";
// import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";

// export default function ZegoCall({ userId, userName, calleeId }) {
//   const zeroCloudInstance = useRef(null);

//   useEffect(() => {
//     const initializeZego = async () => {
//       try {
//         const appID = 1423329821;
//         const serverSecret = "321b87cbaeaabbc39837cc015aed0cf4";

//         const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
//           appID,
//           serverSecret,
//           null,
//           userId,
//           userName
//         );

//         zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
//         zeroCloudInstance.current.addPlugins({ ZIM });

//         await zeroCloudInstance.current.login(userId, userName); // Ensure login is successful
//         console.log("Zego login successful");

//         zeroCloudInstance.current.setCallInvitationConfig({
//           enableCustomCallInvitationDialog: true,
//           onConfirmDialogWhenReceiving: (callType, caller, refuse, accept, data) => {
//             const confirmDialogDom = document.createElement('div');
//             confirmDialogDom.className = 'custom-confirm-dialog';
//             confirmDialogDom.innerHTML = `
//               <div>Call from ${caller.userName}</div>
//               <button id="refuse-button">Refuse</button>
//               <button id="accept-button">Accept</button>
//             `;
//             document.body.appendChild(confirmDialogDom);

//             document.getElementById('refuse-button').onclick = () => {
//               refuse();
//               confirmDialogDom.style.display = 'none';
//             };
//             document.getElementById('accept-button').onclick = () => {
//               accept();
//               confirmDialogDom.style.display = 'none';
//             };
//           },
//           onCallInvitationEnded: (reason) => {
//             const confirmDialogDom = document.querySelector('.custom-confirm-dialog');
//             if (confirmDialogDom) {
//               confirmDialogDom.style.display = 'none';
//             }
//           }
//         });
//       } catch (error) {
//         console.error("Zego login failed:", error);
//       }
//     };

//     initializeZego();
//   }, [userId, userName]);

//   const handleSendCall = (callType) => {
//     if (!calleeId) {
//       alert("Callee ID cannot be empty!!");
//       return;
//     }

//     zeroCloudInstance.current
//       .sendCallInvitation({
//         callees: [{ userID: calleeId, userName: "user_" + calleeId }],
//         callType: callType,
//         timeout: 60,
//       })
//       .then((res) => {
//         if (res.errorInvitees.length) {
//           alert("The user does not exist or is offline.");
//         }
//       })
//       .catch((err) => {
//         console.error(err);
//       });
//   };

//   return (
//     <div>
//       <button onClick={() => handleSendCall(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}>
//         Voice Call
//       </button>
//     </div>
//   );
// }






import React, { useEffect, useRef } from "react";
import { ZIM } from "zego-zim-web";
import { ZegoUIKitPrebuilt } from "@zegocloud/zego-uikit-prebuilt";
// import "./ZegoCall.css";  // Import the CSS file

export default function ZegoCall({ userId, userName, calleeId }) {
  const zeroCloudInstance = useRef(null);

  useEffect(() => {
    const initializeZego = async () => {
      try {
        const appID = 1423329821;
        const serverSecret = "321b87cbaeaabbc39837cc015aed0cf4";

        const KitToken = ZegoUIKitPrebuilt.generateKitTokenForTest(
          appID,
          serverSecret,
          null,
          userId,
          userName
        );

        zeroCloudInstance.current = ZegoUIKitPrebuilt.create(KitToken);
        zeroCloudInstance.current.addPlugins({ ZIM });

        await zeroCloudInstance.current.login(userId, userName);
        console.log("Zego login successful");

        zeroCloudInstance.current.setCallInvitationConfig({
          enableCustomCallInvitationDialog: true,
          onConfirmDialogWhenReceiving: (callType, caller, refuse, accept, data) => {
            const confirmDialogDom = document.createElement('div');
            confirmDialogDom.className = 'custom-confirm-dialog'; // Use CSS class
            confirmDialogDom.innerHTML = `
              <div class="custom-dialog-content">
                <div>Call from ${caller.userName}</div>
                <button id="refuse-button">Refuse</button>
                <button id="accept-button">Accept</button>
              </div>
            `;
            document.body.appendChild(confirmDialogDom);

            document.getElementById('refuse-button').onclick = () => {
              refuse();
              confirmDialogDom.remove(); // Clean up dialog
            };
            document.getElementById('accept-button').onclick = () => {
              accept();
              confirmDialogDom.remove(); // Clean up dialog
            };
          },
          onCallInvitationEnded: (reason) => {
            const confirmDialogDom = document.querySelector('.custom-confirm-dialog');
            if (confirmDialogDom) {
              confirmDialogDom.remove(); // Clean up dialog
            }
          }
        });
      } catch (error) {
        console.error("Zego login failed:", error);
      }
    };

    initializeZego();

    return () => {
      const confirmDialogDom = document.querySelector('.custom-confirm-dialog');
      if (confirmDialogDom) {
        confirmDialogDom.remove(); // Clean up dialog on unmount
      }
    };
  }, [userId, userName]);

  const handleSendCall = (callType) => {
    if (!calleeId) {
      alert("Callee ID cannot be empty!!");
      return;
    }

    zeroCloudInstance.current
      .sendCallInvitation({
        callees: [{ userID: calleeId, userName: "user_" + calleeId }],
        callType: callType,
        timeout: 60,
      })
      .then((res) => {
        if (res.errorInvitees.length) {
          alert("The user does not exist or is offline.");
        }
      })
      .catch((err) => {
        console.error(err);
      });
  };

  return (
    <div>
      <button onClick={() => handleSendCall(ZegoUIKitPrebuilt.InvitationTypeVoiceCall)}>
        Voice Call
      </button>
    </div>
  );
}
