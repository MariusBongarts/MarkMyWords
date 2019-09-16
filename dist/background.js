//+++++++++++++++++++++++
//+++++++++++++++++++++++
//+++++++++++++++++++++++
// START INTERFACES START
// END INTERFACES
//+++++++++++++++++++++++
//+++++++++++++++++++++++
//+++++++++++++++++++++++
window.marks = [];
//+++++++++++++++++++++++
//+++++++++++++++++++++++
//+++++++++++++++++++++++
// START CHROME STUFF
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    window.marks.push(request.selection);
    console.log(request.selection);
    sendResponse(window.marks);
});
// chrome.browserAction.onClicked.addListener(function (tab) {
//   // chrome.tabs.create({ url: 'http://ec2-3-130-73-179.us-east-2.compute.amazonaws.com:8080' });
//   chrome.tabs.create({ url: 'https://marius96.uber.space' });
// })
// Sends message to current contentScript when page changes
chrome.tabs.onUpdated.addListener(() => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        const marks = window.marks.filter(mark => mark.url === tabs[0].url);
        console.log(tabs[0].url);
        chrome.tabs.sendMessage(tabs[0].id, {
            id: 'init',
            marks: marks
        });
    });
});
chrome.runtime.onInstalled.addListener(function () {
    // chrome.storage.sync.set({jwt_key: 'mySecretKey'});
    chrome.contextMenus.create({
        id: "selection",
        title: "Save: ' %s '",
        contexts: ["selection"],
    });
});
chrome.storage.onChanged.addListener(function (changes, namespace) {
    for (var key in changes) {
        var storageChange = changes[key];
        console.log('Storage key "%s" in namespace "%s" changed. ' +
            'Old value was "%s", new value is "%s".', key, namespace, storageChange.oldValue, storageChange.newValue);
    }
});
// Sends message to current contentScript when context menu is clicked
chrome.contextMenus.onClicked.addListener((info, tab) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        console.log(info);
        chrome.tabs.sendMessage(tabs[0].id, {
            id: 'create'
        });
    });
});
// END CHROME STUFF
//+++++++++++++++++++++++
//+++++++++++++++++++++++
//+++++++++++++++++++++++
//   window.marks.push(mark);
//   // Sends message to current contentScript
//   chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
//     const marks = window.marks;
//     chrome.tabs.sendMessage(tabs[0].id, {
//       marks
//     });
//   });
// });
//# sourceMappingURL=background.js.map