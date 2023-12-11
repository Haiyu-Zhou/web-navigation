chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request.action === 'getLastHour') {
      const thisHour = new Date().getTime() - ( 60 * 60 * 1000);
      chrome.history.search({ text: '', startTime: thisHour, maxResults: 1000 }, function (historyItems) {
          sendResponse({ historyItems });
    });
    return true;
  }else if (request.action === 'getLast24Hour') {
    const today = new Date().getTime() - ( 24 * 60 * 60 * 1000); 
    chrome.history.search({ text: '', startTime: today, maxResults: 1000 }, function (historyItems) {
        sendResponse({ historyItems });
  });
  return true;
} else if (request.action === 'getLastWeek') {
  const thisWeek = new Date().getTime() - ( 7 * 24 * 60 * 60 * 1000);
  chrome.history.search({ text: '', startTime: thisWeek, maxResults: 1000 }, function (historyItems) {
      sendResponse({ historyItems });
});
return true;
}
});