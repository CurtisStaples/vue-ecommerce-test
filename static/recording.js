console.log("recording in session...")

// client-side-recording.js

var sessionData = [];

function captureMouseMove(event) {
    var mouseX = event.clientX;
    var mouseY = event.clientY;
    sessionData.push({ type: 'mousemove', x: mouseX, y: mouseY });
}

function captureScroll(event) {
    var scrollX = window.scrollX || window.pageXOffset;
    var scrollY = window.scrollY || window.pageYOffset;
    sessionData.push({ type: 'scroll', x: scrollX, y: scrollY });
}

function captureClick(event) {
    var clickX = event.clientX;
    var clickY = event.clientY;
    sessionData.push({ type: 'click', x: clickX, y: clickY });
}

function captureDOMState(mutations) {
    // Log or process mutation information
    mutations.forEach(function (mutation) {
        sessionData.push({ type: 'domstate', mutation: mutation });
    });
    console.log(sessionData)
}

// Add event listeners
document.addEventListener('mousemove', captureMouseMove);
window.addEventListener('scroll', captureScroll);
document.addEventListener('click', captureClick);

// Create a Mutation Observer
var observer = new MutationObserver(captureDOMState);

// Configuration for the observer
var config = {
    attributes: true,
    childList: true,
    subtree: true,
    characterData: true,
};

// Start observing the entire document
var targetNode = document.documentElement;
observer.observe(targetNode, config);

// Send the data to the server (example using fetch)
function sendDataToServer() {
    fetch('/api/record-session', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(sessionData),
    });
}
