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
}

my-marker {
  left: 0;
  opacity: 0;
  visibility: hidden;
  -webkit-transition: opacity 500ms, visibility 500ms;
  animation: slideOut 0.6s forwards;
}

mark:hover my-marker {
  visibility: visible;
  opacity: 1;
  -webkit-animation: slideIn 0.4 forwards;
  animation: slideIn 0.4s forwards;
}

\
@keyframes slideIn {\
    100% {\
      -webkit-transform:  translate(0%, -100%);\
    }\
    0% {\
      -webkit-transform: translate(0%, -300%);\
    }\
}\
\
\
@keyframes slideOut {\
    0% {\
      -webkit-transform:translate(0%, -100%);\
    }\
    100% {\
      -webkit-transform: translate(0%, -300%);\
    }\
}\
\
`;


// let slideIn = `\
// @keyframes slideIn {\
//     100% {\
//       transform: translateY(0%);\
//     }\
//     0% {\
//       transform: translateY(-100%);\
//     }\
// }\
// \
// `;

// let slideOut = `\
// @keyframes slideOut {\
//     0% {\
//       transform: translateY(0%);\
//     }\
//     100% {\
//       transform: translateY(-100%);\
//     }\
// }\
// \
// `;

// style.innerHTML += slideIn;
// style.innerHTML += slideOut;
// document.body.appendChild(style);
