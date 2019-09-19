const marker = document.createElement("web-marker");
document.body.appendChild(marker);

const popup = document.createElement("pop-up");
let showPopup = false;


// Listens for messages from background script
chrome.runtime.onMessage.addListener(request => {

  // Show or hides the popup component
  if (request.id === 'togglePopup') {
    !showPopup ? document.body.appendChild(popup) : document.body.removeChild(popup);
    if (!showPopup) {
      closePopupOnOutsideClick();
    };
    showPopup = true;
  } else {
    showPopup = false
  }
});

function closePopupOnOutsideClick() {
  document.body.onclick = (e) => {
    if (e.target !== popup) {
      popup.remove();
      showPopup = false;
      document.body.onclick = undefined;
    }
  }
}