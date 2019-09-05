// Add to document to load data
const link = document.createElement('link');

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

