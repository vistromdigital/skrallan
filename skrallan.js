(function () {
	var currentDirection,
		currentYOffset,
		currentXOffset,
		previousYDirection,
		previousXDirection,
		previousYOffset = window.pageYOffset,
		previousXOffset = window.pageXOffset,
		scrollDownEvent,
		scrollUpEvent,
		scrollLeftEvent,
		scrollRightEvent,
		scrollDownStartEvent,
		scrollUpStartEvent,
		scrollLeftStartEvent,
		scrollRightStartEvent;

	// Initialize events
	try {
		scrollDownEvent = new Event('scrolldown');
		scrollUpEvent = new Event('scrollup');
		scrollLeftEvent = new Event('scrollleft');
		scrollRightEvent = new Event('scrollright');
		scrollDownStartEvent = new Event('scrolldownstart');
		scrollUpStartEvent = new Event('scrollupstart');
		scrollLeftStartEvent = new Event('scrollleftstart');
		scrollRightStartEvent = new Event('scrollrightstart');
	} catch (e) {
		// No browser support for Event constructor, use
		// the old-fashioned way :(

		scrollDownEvent = document.createEvent('Event');
		scrollUpEvent = document.createEvent('Event');
		scrollLeftEvent = document.createEvent('Event');
		scrollRightEvent = document.createEvent('Event');
		scrollDownStartEvent = document.createEvent('Event');
		scrollUpStartEvent = document.createEvent('Event');
		scrollLeftStartEvent = document.createEvent('Event');
		scrollRightStartEvent = document.createEvent('Event');

		scrollDownEvent.initEvent('scrolldown', true, true);
		scrollUpEvent.initEvent('scrollup', true, true);
		scrollLeftEvent.initEvent('scrollleft', true, true);
		scrollRightEvent.initEvent('scrollright', true, true);
		scrollDownStartEvent.initEvent('scrolldownstart', true, true);
		scrollUpStartEvent.initEvent('scrollupstart', true, true);
		scrollLeftStartEvent.initEvent('scrollleftstart', true, true);
		scrollRightStartEvent.initEvent('scrollrightstart', true, true);
	}

	/**
	 * Trigger additional scroll events.
	 *
	 * @param Event  event  The original scroll event
	 */
	function onScroll(event) {
		currentYOffset = window.pageYOffset;
		currentXOffset = window.pageXOffset;

		// Determine the current scroll direction (Y-axis)
		if (currentYOffset < previousYOffset) {
			currentYDirection = 'up';
		} else if (currentYOffset > previousYOffset) {
			currentYDirection = 'down';
		} else {
			currentYDirection = undefined;
		}

		// Determine the current scroll direction (X-axis)
		if (currentXOffset < previousXOffset) {
			currentXDirection = 'left';
		} else if (currentXOffset > previousXOffset) {
			currentXDirection = 'right';
		} else {
			currentXDirection = undefined;
		}

		// Has the scroll direction changed since the last scroll? (Y-axis)
		if (currentYDirection !== previousYDirection) {
			if (currentYDirection === 'up') {
				window.dispatchEvent(scrollUpStartEvent);
			} else if (currentYDirection === 'down') {
				window.dispatchEvent(scrollDownStartEvent);
			}
		}

		// Has the scroll direction changed since the last scroll? (X-axis)
		if (currentXDirection !== previousXDirection) {
			if (currentXDirection === 'left') {
				window.dispatchEvent(scrollLeftStartEvent);
			} else if (currentXDirection === 'right') {
				window.dispatchEvent(scrollRightStartEvent);
			}
		}

		if (currentYDirection === 'up') {
			window.dispatchEvent(scrollUpEvent);
		} else if (currentYDirection === 'down') {
			window.dispatchEvent(scrollDownEvent);
		}

		if (currentXDirection === 'left') {
			window.dispatchEvent(scrollLeftEvent);
		} else if (currentXDirection === 'down') {
			window.dispatchEvent(scrollRightEvent);
		}

		previousYDirection = currentYDirection;
		previousXDirection = currentXDirection;
		previousYOffset = currentYOffset;
		previousXOffset = currentXOffset;
	}

	window.addEventListener('scroll', onScroll, false);
})();
