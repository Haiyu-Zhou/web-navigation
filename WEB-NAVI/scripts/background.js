chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.action === 'getHistory') {
        const today = new Date().getTime() - (24 * 60 * 60 * 1000); // to get history from last 24 hrs
        chrome.history.search({ text: '', startTime: today, maxResults: 100 }, function (historyItems) {
            sendResponse({ historyItems });
      });
      return true;
    }
  });