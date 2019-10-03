const marker = document.createElement("web-marker");
document.body.appendChild(marker);
const popup = document.createElement("pop-up");
document.body.appendChild(popup);
// Listens for messages from background script
chrome.runtime.onMessage.addListener(request => {
    closePopupOnOutsideClick();
    // Show or hides the popup component
    if (request.id === 'togglePopup') {
        popup.showAccountPopup ? popup.showAccountPopup = false : popup.showAccountPopup = true;
    }
    ;
});
function closePopupOnOutsideClick() {
    document.body.onclick = (e) => {
        if (e.target !== popup) {
            try {
                // document.body.onclick = undefined;
                // popup.remove();
                popup.showAccountPopup = false;
            }
            catch (error) {
            }
        }
    };
}
//# sourceMappingURL=content.js.map