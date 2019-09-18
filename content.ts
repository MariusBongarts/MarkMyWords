const marker = document.createElement("web-marker");
document.body.appendChild(marker);

const popup = document.createElement("pop-up");
let showPopup = false;

chrome.runtime.onMessage.addListener(request => {

  if (request.id === 'togglePopup') {
    !showPopup ? document.body.appendChild(popup) : document.body.removeChild(popup);
    showPopup ? showPopup = false : showPopup = true;
  }

  return;
});