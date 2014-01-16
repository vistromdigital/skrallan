# Skrållan
Skrållan is a vanilla JavaScript library for detecting scroll events. In addition to the standard way of detecting when the user scrolls the page, Skrållan lets you easily detect which direction the user is scrolling.

## Description
This library works by triggering some extra events on the `window` object, in addition to the standard `scroll` event. The events `scrolldown` and `scrollup` are triggered every time the user scrolls up or down, while the events `scrolldownstart` and `scrollupstart` are triggered once every time the scrolling direction changes. Scrolling left and right results in the events `scrollleft` and `scrollright`, accompanied by the events `scrollleftstart` and `scrollrightstart`.

## Installation
### Step 1: Include the file
```html
<script src="skrallan.js"></script>
```

### Step 2: Start listening for some scroll events
```javascript
window.addEventListener('scrolldownstart', onScrollDownStart, false);

function onScrollDownStart(e) {
    // Yay, the user started scrolling down, what should we do?
}
```

Or, if you're using jQuery:

```javascript
$(window).on('scrolldownstart', onScrollDownStart);

function onScrollDownStart(e) {
    // Wohoo, it works with jQuery too!
}
```
