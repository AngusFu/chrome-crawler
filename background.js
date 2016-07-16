
chrome.browserAction.onClicked.addListener(function updateIcon() {
    
    chrome.tabs.query({
        url: location.protocol + '//' + location.host + '/index.html'
    }, function (tabs) {
        if (!tabs.length) {
            chrome.tabs.create({
                url: "./index.html"
            });
        } else {
            chrome.tabs.update(tabs[0].id, { selected : true });
        }
    });
});
