// Add to document to load data
const marker = document.createElement("web-marker");
document.body.appendChild(marker);
// window.addEventListener("contextmenu", (e) => {
//   hideMarkerTool();
//   if (window.getSelection().toString().length) showMarkerTool(e.clientX, e.clientY);
// });
// window.addEventListener("click", (e) => {
//   hideMarkerTool();
// });
const style = document.createElement("style");
style.innerHTML = `
mark {
  border-radius: 5px;
  padding: 2px 2px;
}
mark, mark > * {
  background-color: #92ffaa;
  color: #000;
}`;
document.body.appendChild(style);
function showMarkerTool(x, y) {
    const marker = document.createElement("web-marker");
    marker.textContent = "Mark";
    marker.style.position = "fixed";
    marker.style.left = x + "px";
    marker.style.top = y - 50 + "px";
    document.body.appendChild(marker);
}
function hideMarkerTool() {
    try {
        let markers = document.getElementsByTagName('web-marker');
        markers[0].remove();
    }
    catch (error) {
    }
}
//# sourceMappingURL=content.js.map