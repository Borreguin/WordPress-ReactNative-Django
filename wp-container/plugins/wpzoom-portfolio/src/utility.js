/**
 * Delegates the specified event on the given elements to the given callback function.
 *
 * @param {string}   eventName
 * @param {string}   elementSelector
 * @param {function} handler
 */
export function delegate( eventName, elementSelector, handler ) {
	document.addEventListener( eventName, function( event ) {
		for ( let target = event.target; target && target != this; target = target.parentNode ) {
			if ( target.matches( elementSelector ) ) {
				handler.call( target, event );

				break;
			}
		}
	}, false );
}

/**
 * Extracts a value from a CSS class on a given element.
 *
 * @param {Element}  element      The element to extract the CSS class value from.
 * @param {string}   searchPrefix The prefix of the CSS class to search for.
 * @example
 * // There is a CSS class on "element" like "value-10"...
 * extractClassValue( element, 'value-' )
 * // Returns "10"
 * @returns {string} Returns the extracted value from the CSS class, or an empty string on failure.
 */
export function extractClassValue( element, searchPrefix ) {
	let result = '';

	if ( element && element instanceof Element && searchPrefix && searchPrefix.length > 0 ) {
		let classes = element.className.split( /\s/ );

		if ( classes.length > 0 ) {
			let filteredClasses = classes.filter( cn => { return cn.indexOf( searchPrefix ) === 0 } );

			if ( filteredClasses.length > 0 ) {
				let matchedClass = filteredClasses[ 0 ];

				if ( matchedClass ) {
					let value = matchedClass.replace( searchPrefix, '' );

					if ( value && value.length > 0 ) {
						result = value;
					}
				}
			}
		}
	}

	return result;
}