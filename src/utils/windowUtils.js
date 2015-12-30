export function createPopup(url, title, w, h) {
  // from http://stackoverflow.com/questions/4068373/center-a-popup-window-on-screen
  const left = (screen.width / 2) - (w / 2);
  const top = (screen.height / 2) - (h / 2);

  const attrs = 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=no, resizable=no, copyhistory=no, width='+w+', height='+h+', top='+top+', left='+left;

  return window.open(url, title, attrs);
}


export function createMessageListener(callback, expectedSenderUrl) {
  // Applied from http://stackoverflow.com/questions/8822907/html5-cross-browser-iframe-postmessage-child-to-parent

  const eventMethod = window.addEventListener ? 'addEventListener' : 'attachEvent';
  const eventer = window[eventMethod];
  const messageEvent = eventMethod == 'attachEvent' ? 'onmessage' : 'message';

  // Listen to message from child window
  eventer(messageEvent, event => {
    if (event.origin === expectedSenderUrl) {
      callback(event)
    }
    else {
      console.error('Got Message-event from unexpected origin:', event.origin);
    }
  }, false); // that false equals event to be non-Transferable
}
