import apiFetch from '@wordpress/api-fetch';
import domReady from '@wordpress/dom-ready';
import { delegate, extractClassValue } from '../../utility';

/**
 * Called when one of the portfolio category filter buttons is clicked.
 *
 * @param {event}   event
 * @this  {Element}
 */
function filterButtonClick( event ) {
	event.preventDefault();

	let item = this.parentElement;

	if ( item ) {
		let cat = extractClassValue( item, 'cat-item-' );

		if ( cat && cat.length > 0 ) {
			let wrap = item.closest( '.wpzoom-blocks_portfolio-block' ).querySelector( '.wpzoom-blocks_portfolio-block_items-list' ),
			    show = 'all' == cat ? wrap.querySelectorAll( '[data-category]' ) : wrap.querySelectorAll( '[data-category="' + cat + '"]' ),
			    hide = 'all' == cat ? [] : wrap.querySelectorAll( '[data-category]:not([data-category="' + cat + '"])' );

			item.parentNode.querySelectorAll( 'li' ).forEach( filterBtn => {
				filterBtn.classList.remove( 'current-cat' );
			} );
			item.classList.add( 'current-cat' );

			show.forEach( theItem => {
				let classList = theItem.classList;

				if ( classList.contains( 'fade-out' ) ) {
					classList.remove( 'fade-out' );
				}

				if ( ! classList.contains( 'fade-in' ) ) {
					classList.add( 'fade-in' );
				}
			} );

			hide.forEach( theItem => {
				let classList = theItem.classList;

				if ( classList.contains( 'fade-in' ) ) {
					classList.remove( 'fade-in' );
				}

				if ( ! classList.contains( 'fade-out' ) ) {
					classList.add( 'fade-out' );
				}
			} );
		}
	}
}

/**
 * Called when one of the portfolio items is clicked.
 *
 * @param {event}   event
 * @this  {Element}
 */
function portfolioItemClick( event ) {
	let item = this.closest( '.wpzoom-blocks_portfolio-block_item' );

	if ( item.querySelector( '.wpzoom-blocks_portfolio-block_item-bgvid, .wpzoom-blocks_portfolio-block_item-thumbnail' ) ) {
		event.preventDefault();

		item.classList.add( 'lightbox' );

		if ( item.classList.contains( 'fade-in' ) ) {
			item.classList.remove( 'fade-in' );
		}

		if ( item.classList.contains( 'fade-out' ) ) {
			item.classList.remove( 'fade-out' );
		}
	}
}

/**
 * Called when the close button in a lightbox is clicked.
 *
 * @param {event}   event
 * @this  {Element}
 */
function portfolioItemLightboxClose( event ) {
	let item = this.closest( '.wpzoom-blocks_portfolio-block_item' );

	if ( item.classList.contains( 'lightbox' ) && event.target.matches( '.wpzoom-blocks_portfolio-block_item-bgvid, .wpzoom-blocks_portfolio-block_item-thumbnail' ) ) {
		event.preventDefault();

		item.classList.remove( 'lightbox' );
	}
}

/**
 * Called when the show more portfolio items button is clicked.
 *
 * @param {event}   event
 * @this  {Element}
 */
function portfolioShowMoreClick( event ) {
	event.preventDefault();

	let container = this.closest( '.wpzoom-blocks_portfolio-block' ),
	    itemsContainer = container.querySelector( '.wpzoom-blocks_portfolio-block_items-list' ),
	    page = parseInt( extractClassValue( container, 'page-' ) ) || 2,
	    params = new URLSearchParams( {
	        layout:         extractClassValue( container, 'layout-' ),
	        order:          extractClassValue( container, 'order-' ),
	        order_by:       extractClassValue( container, 'orderby-' ),
	        per_page:       parseInt( extractClassValue( container, 'perpage-' ) ) || 6,
	        page:           page,
	        show_thumbnail: container.classList.contains( 'show-thumbnail' ),
	        thumbnail_size: extractClassValue( container, 'thumbnail-size-' ),
	        show_video:     container.classList.contains( 'show-video' ),
	        show_author:    container.classList.contains( 'show-author' ),
	        show_date:      container.classList.contains( 'show-date' ),
	        show_excerpt:   container.classList.contains( 'show-excerpt' ),
	        show_read_more: container.classList.contains( 'show-readmore' ),
			source: container.classList.contains( 'post_type-post' ) ? 'post' : 'portfolio_item'
	    } ),
	    fetchRequest = apiFetch( { path: '/wpzoom-blocks/v1/portfolio-posts?' + params.toString() } );

	fetchRequest.then( response => {
		if ( response ) {
			let items = 'items' in response ? response.items : [],
			    hasMore = 'has_more' in response ? response.has_more : true;

			if ( items ) {
				itemsContainer.insertAdjacentHTML( 'beforeend', items );

				container.querySelector( '.wpzoom-blocks_portfolio-block_filter .current-cat a' ).click();

				if ( container.classList.contains( 'page-' + page ) ) {
					container.classList.replace( 'page-' + page, 'page-' + ( page + 1 ) );
				} else {
					container.classList.add( 'page-' + ( page + 1 ) );
				}

				if ( ! hasMore ) {
					let moreBtn = container.querySelector( '.wpzoom-blocks_portfolio-block_show-more' );
					moreBtn.style.display = 'none';
					moreBtn.parentElement.classList.add( 'single-button' );
				}
			}
		}
	} );
}

domReady( () => {
	delegate(
		'click',
		'.wpzoom-blocks_portfolio-block .wpzoom-blocks_portfolio-block_filter a',
		filterButtonClick
	);

	delegate(
		'click',
		'.wpzoom-blocks_portfolio-block.use-lightbox .wpzoom-blocks_portfolio-block_lightbox_icon',
		portfolioItemClick
	);

	delegate(
		'click',
		`.wpzoom-blocks_portfolio-block.use-lightbox .wpzoom-blocks_portfolio-block_item-bgvid,
		.wpzoom-blocks_portfolio-block.use-lightbox .wpzoom-blocks_portfolio-block_item-thumbnail`,
		portfolioItemLightboxClose
	);

	delegate(
		'click',
		'.wpzoom-blocks_portfolio-block .wpzoom-blocks_portfolio-block_show-more a',
		portfolioShowMoreClick
	);
	
	document.onkeydown = function( evt ) {
		evt = evt || window.event;
		var isEscape = false;
		if ( "key" in evt ) {
			isEscape = ( evt.key === "Escape" || evt.key === "Esc" );
		} else {
			isEscape = (evt.keyCode === 27);
		}
		if ( isEscape ) {
			let elems = document.getElementsByClassName('wpzoom-blocks_portfolio-block_item lightbox');
			[].forEach.call(elems, function(el) {
				el.classList.remove('lightbox');
			});
		}
	};

} );