const marker = document.createElement("web-marker");
document.body.appendChild(marker);
const popup = document.createElement("pop-up");
let showPopup = false;
// Listens for messages from background script
chrome.runtime.onMessage.addListener(request => {
    // Show or hides the popup component
    if (request.id === 'togglePopup') {
        try {
            document.body.removeChild(popup);
        }
        catch (error) {
            document.body.appendChild(popup);
            // closePopupOnOutsideClick();
        }
    }
    ;
});
// function closePopupOnOutsideClick() {
//   document.body.onclick = (e) => {
//     if (e.target !== popup) {
//       try {
//         document.body.onclick = undefined;
//         popup.remove();
//       } catch (error) {
//       }
//     }
//   }
// }
//# sourceMappingURL=content.js.map