(function () {
	var currentDirection,
		currentOffset,
		previousDirection,
		previousOffset = window.pageYOffset,
		scrollDownEvent,
		scrollUpEvent,
		scrollDownStartEvent,
		scrollUpStartEvent;

	// Initialize events
	try {
		scrollDownEvent = new Event('scrolldown');
		scrollUpEvent = new Event('scrollup');
		scrollDownStartEvent = new Event('scrolldownstart');
		scrollUpStartEvent = new Event('scrollupstart');
	} catch (e) {
		// No browser support for Event constructor, use
		// the old-fashioned way :(

		scrollDownEvent = document.createEvent('Event');
		scrollUpEvent = document.createEvent('Event');
		scrollDownStartEvent = document.createEvent('Event');
		scrollUpStartEvent = document.createEvent('Event');

		scrollDownEvent.initEvent('scrolldown', true, true);
		scrollUpEvent.initEvent('scrollup', true, true);
		scrollDownStartEvent.initEvent('scrolldownstart', true, true);
		scrollUpStartEvent.initEvent('scrollupstart', true, true);
	}

	/**
	 * Trigger additional scroll events.
	 *
	 * @param Event  event  The original scroll event
	 */
	function onScroll(event) {
		currentOffset = window.pageYOffset;

		// Determine the current scroll direction
		if (currentOffset < previousOffset) {
			currentDirection = 'up';
		} else if (currentOffset > previousOffset) {
			currentDirection = 'down';
		} else {
			currentDirection = undefined;
		}

		// Has the scroll direction changed since the last scroll?
		if (currentDirection !== previousDirection) {
			if (currentDirection === 'up') {
				window.dispatchEvent(scrollUpStartEvent);
			} else if (currentDirection === 'down') {
				window.dispatchEvent(scrollDownStartEvent);
			}
		}

		if (currentDirection === 'up') {
			window.dispatchEvent(scrollUpEvent);
		} else if (currentDirection === 'down') {
			window.dispatchEvent(scrollDownEvent);
		}

		previousDirection = currentDirection;
		previousOffset = currentOffset;
	}

	window.addEventListener('scroll', onScroll, false);
})();
