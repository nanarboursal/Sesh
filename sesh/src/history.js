chrome.history.search({text: '', maxResults: 10}, function(data) {
    data.forEach(function(page) {
        console.log(page.url);
    });
});