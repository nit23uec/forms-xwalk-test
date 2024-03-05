//var insertedNodes = [];
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        for(var i = 0; i < mutation.addedNodes.length; i++)
            console.log(mutation.addedNodes[i]);
    })
});
observer.observe(document, {
    childList: true,
    subtree: true
});