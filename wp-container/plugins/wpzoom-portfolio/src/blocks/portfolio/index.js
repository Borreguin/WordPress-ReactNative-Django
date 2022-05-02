import apiFetch from '@wordpress/api-fetch';
import { InspectorControls } from '@wordpress/block-editor';
import { registerBlockType } from '@wordpress/blocks';
import { Disabled, HorizontalRule, PanelBody, Placeholder, RadioControl, RangeControl, SelectControl, Spinner, TextControl, ToggleControl, TreeSelect , ColorPalette } from '@wordpress/components';
import { withSelect } from '@wordpress/data';
import { Component, Fragment } from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import { groupBy } from 'lodash';
import ServerSideRender from '@wordpress/server-side-render';

/**
 * Internal dependencies
 */
import { blockColors } from './colors-palette';
import { secondaryColors } from './colors-palette';

function buildTermsTree( flatTerms ) {
	const flatTermsWithParentAndChildren = flatTerms.map( ( term ) => {
		return {
			children: [],
			parent: null,
			...term,
		};
	} );

	const termsByParent = groupBy( flatTermsWithParentAndChildren, 'parent' );
	if ( termsByParent.null && termsByParent.null.length ) {
		return flatTermsWithParentAndChildren;
	}
	const fillWithChildren = ( terms ) => {
		return terms.map( ( term ) => {
			const children = termsByParent[ term.id ];
			return {
				...term,
				children:
					children && children.length
						? fillWithChildren( children )
						: [],
			};
		} );
	};

	return fillWithChildren( termsByParent[ '0' ] || [] );
}

function dynamicSort( property ) {
	var sortOrder = 1;

	if ( property[0] === '-' ) {
		sortOrder = -1;
		property = property.substr( 1 );
	}

	return function( a, b ) {
		if ( sortOrder == -1 ) {
			return b[ property ].localeCompare( a[ property ] );
		} else {
			return a[ property ].localeCompare( b[ property ] );
		}        
	}
}

registerBlockType( 'wpzoom-blocks/portfolio', {
	title: __( 'Portfolio', 'wpzoom-portfolio' ),
	description: __( 'Display a customizable grid of portfolio items.', 'wpzoom-portfolio' ),
	icon: 'images-alt2',
	category: 'wpzoom-blocks',
	supports: {
		align: true,
		html: false
	},
	example: {},
	edit: withSelect( select => {
		const { getEntityRecords } = select( 'core' );

		var cats = [];
		var taxonomies = [];
		
		var cats1 = getEntityRecords( 'taxonomy', 'portfolio', { per_page: -1, hide_empty: false } );
		if ( Array.isArray( cats1 ) ) taxonomies.push( ...cats1 );
		
		var cats2 = getEntityRecords( 'taxonomy', 'category', { per_page: -1, hide_empty: false } );
		if ( Array.isArray( cats2 ) ) cats.push( ...cats2 );
		
		cats.sort( dynamicSort( 'name' ) );
		cats.unshift( { id: -1, name: __( 'All', 'wpzoom-portfolio' ) } );

		taxonomies.sort( dynamicSort( 'name' ) );
		taxonomies.unshift( { id: -1, name: __( 'All', 'wpzoom-portfolio' ) } );

		return {
			taxonomyList: taxonomies,
			categoriesList: cats
		};
	} )( class extends Component {
		constructor() {
			super( ...arguments );

			this.state = {
				imageSizes: []
			};
		}

		componentDidMount() {
			this.isStillMounted = true;

			this.fetchRequest = apiFetch( { path: '/wpzoom-blocks/v1/image-sizes' } );

			this.fetchRequest.then(
				( imageSizes ) => {
					if ( this.isStillMounted ) {
						this.setState( { imageSizes } );
					}
				}
			);

			this.fetchRequest.catch(
				() => {
					if ( this.isStillMounted ) {
						this.setState( { imageSizes: [] } );
					}
				}
			);
		}

		componentWillUnmount() {
			this.isStillMounted = false;
		}

		// eslint-disable-next-line class-methods-use-this
		onShortcodeClick( event ) {
			window.getSelection().selectAllChildren( event.target );
		}

		// fix the problem with Gutenberg shortcode transform (allowed only plain text pasted).
		// eslint-disable-next-line class-methods-use-this
		onShortcodeCopy( event ) {
			// fix the problem with Gutenberg shortcode transform (allowed only plain text pasted).
			const copyText = window.getSelection().toString().replace( /[\n\r]+/g, '' );

			event.clipboardData.setData( 'text/plain', copyText );
			event.preventDefault();
		}

		render() {
			const { attributes, setAttributes, categoriesList, taxonomyList } = this.props;
			const { amount, categories, columnsAmount, columnsGap, layout, lazyLoad, lightbox,
					lightboxCaption, order, orderBy, readMoreLabel, showAuthor, showCategoryFilter, showDate,
					showExcerpt, showReadMore, showThumbnail, showViewAll, source, thumbnailSize, viewAllLabel, viewAllLink, primaryColor, secondaryColor } = attributes;
			const { imageSizes } = this.state;

			const post_type = wp.data.select( 'core/editor' ).getCurrentPostType();
			const post_id   = wp.data.select('core/editor').getCurrentPost().id;

			if ( ! taxonomyList || ! imageSizes ) {
				return (
					<>
						<Placeholder icon="list-view" label={ __( 'WPZOOM Portfolio', 'wpzoom-portfolio' ) }>
							<Spinner /> { __( 'Loading...', 'wpzoom-portfolio' ) }
						</Placeholder>
					</>
				);
			}

			const termsTree = buildTermsTree( taxonomyList );
			const catTree   = buildTermsTree( categoriesList );

			let fields = <>
				<ToggleControl
					label={ __( 'Show Author', 'wpzoom-portfolio' ) }
					checked={ showAuthor }
					onChange={ ( value ) => setAttributes( { showAuthor: value } ) }
				/>

				<HorizontalRule />

				<ToggleControl
					label={ __( 'Show Date', 'wpzoom-portfolio' ) }
					checked={ showDate }
					onChange={ ( value ) => setAttributes( { showDate: value } ) }
				/>

				<HorizontalRule />

				<ToggleControl
					label={ __( 'Show Excerpt', 'wpzoom-portfolio' ) }
					checked={ showExcerpt }
					onChange={ ( value ) => setAttributes( { showExcerpt: value } ) }
				/>

				<HorizontalRule />

				<ToggleControl
					label={ __( 'Show Read More Button', 'wpzoom-portfolio' ) }
					checked={ showReadMore }
					onChange={ ( value ) => setAttributes( { showReadMore: value } ) }
				/>

				{ showReadMore &&
					<TextControl
						label={ __( 'Read More Button Label', 'wpzoom-portfolio' ) }
						value={ readMoreLabel }
						onChange={ ( value ) => setAttributes( { readMoreLabel: value } ) }
					/>
				}
			</>;

			if ( 'list' != layout ) {
				fields = <Disabled>{ fields }</Disabled>;
			}

			return (
				<>
					<InspectorControls>
						<PanelBody title={ __( 'Options', 'wpzoom-portfolio' ) } className="wpzb-settings-panel">
							{ 'portfolio_layout' == post_type && (
							<PanelBody title={ __( 'Shortcode', 'wpzoom-portfolio' ) } className="wpzb-sub-panel">
								<p>{ __( 'To output this custom layout you can use the following shortcodes:', 'wpzoom-portfolio' ) }</p>
								<p>
									{ __( 'Layout:', 'wpzoom-portfolio' ) }
									<br />
									<code
										role="button"
										tabIndex="0"
										aria-hidden="true"
										onClick={ this.onShortcodeClick }
										onCopy={ this.onShortcodeCopy }
										onCut={ this.onShortcodeCopy }
									>
										[wpzoom_portfolio_layout id=&quot;
										{ post_id }
										&quot;]
									</code>
								</p>
							</PanelBody>						
							)}
							<PanelBody title={ __( 'Accent Color', 'wpzoom-portfolio' ) } className="wpzb-sub-panel">
									<ColorPalette
									colors={ blockColors }
									value={ primaryColor }
									onChange={ ( color ) => setAttributes( { primaryColor: color } ) }
								/>
							</PanelBody>
                            <PanelBody title={ __( 'Secondary Color', 'wpzoom-portfolio' ) } className="wpzb-sub-panel">
                                    <ColorPalette
                                    colors={ secondaryColors }
                                    value={ secondaryColor }
                                    onChange={ ( color ) => setAttributes( { secondaryColor: color } ) }
                                />
                            </PanelBody>
							<PanelBody title={ __( 'Filtering', 'wpzoom-portfolio' ) } className="wpzb-sub-panel">
								<SelectControl
									label={ __( 'Portfolio Items Source', 'wpzoom-portfolio' ) }
									value={ source }
									options={ [
										{
											label: __( 'Portfolio Posts', 'wpzoom-portfolio' ),
											value: 'portfolio_item'
										},
										{
											label: __( 'Blog Posts', 'wpzoom-portfolio' ),
											value: 'post'
										}
									] }
									onChange={ ( value ) => setAttributes( { source: value, categories: [] } ) }
								/>

								<SelectControl
									label={ __( 'Order By', 'wpzoom-portfolio' ) }
									value={ `${ orderBy }/${ order }` }
									options={ [
										{
											label: __( 'Newest to Oldest', 'wpzoom-portfolio' ),
											value: 'date/desc'
										},
										{
											label: __( 'Oldest to Newest', 'wpzoom-portfolio' ),
											value: 'date/asc'
										},
										{
											label: __( 'A → Z', 'wpzoom-portfolio' ),
											value: 'title/asc'
										},
										{
											label: __( 'Z → A', 'wpzoom-portfolio' ),
											value: 'title/desc'
										}
									] }
									onChange={ ( value ) => {
										const [ newOrderBy, newOrder ] = value.split( '/' );
										if ( newOrder !== order ) {
											setAttributes( { order: newOrder } );
										}
										if ( newOrderBy !== orderBy ) {
											setAttributes( { orderBy: newOrderBy } );
										}
									} }
								/>
								{ 'post' ===  source && (
								<TreeSelect
									label={ __( 'Categories', 'wpzoom-portfolio' ) }
									help={ __( 'Multiple selections allowed.', 'wpzoom-portfolio' ) }
									tree={ catTree }
									selectedId={ typeof categories !== 'undefined' && categories.length > 0 ? categories : [-1] }
									multiple
									onChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
								/>
								)}
								{ 'post' !== source && (
								<TreeSelect
									label={ __( 'Categories', 'wpzoom-portfolio' ) }
									help={ __( 'Multiple selections allowed.', 'wpzoom-portfolio' ) }
									tree={ termsTree }
									selectedId={ typeof categories !== 'undefined' && categories.length > 0 ? categories : [-1] }
									multiple
									onChange={ ( value ) => setAttributes( { categories: '' !== value ? value : undefined } ) }
								/>
								) }

								<RangeControl
									label={ __( 'Number of Items', 'wpzoom-portfolio' ) }
									value={ amount }
									onChange={ ( value ) => setAttributes( { amount: value } ) }
									min={ 1 }
									max={ 100 }
									required
								/>
							</PanelBody>

							<PanelBody title={ __( 'Layout', 'wpzoom-portfolio' ) } className="wpzb-sub-panel">
								<RadioControl
									className="wpzb-button-select wpzb-button-select-icons"
									label={ __( 'Layout Type', 'wpzoom-portfolio' ) }
									onChange={ ( value ) => setAttributes( { layout: value } ) }
									options={ [
										{ value: 'list', label: __( 'Columns', 'wpzoom-portfolio' ) },
										{ value: 'grid', label: __( 'Overlay', 'wpzoom-portfolio' ) }
									] }
									selected={ layout }
								/>

								{ layout == 'grid' &&
									<RangeControl
										label={ __( 'Amount of Columns', 'wpzoom-portfolio' ) }
										max={ 6 }
										min={ 1 }
										onChange={ ( value ) => setAttributes( { columnsAmount: value } ) }
										value={ columnsAmount }
									/>
								}

                                { layout == 'grid' &&
								<RangeControl
									label={ __( 'Columns Gap', 'wpzoom-portfolio' ) }
									max={ 100 }
									min={ 0 }
									onChange={ ( value ) => setAttributes( { columnsGap: value } ) }
									value={ columnsGap }
								/>
                                }
								<HorizontalRule />

								<ToggleControl
									label={ __( 'Show Category Filter at the Top', 'wpzoom-portfolio' ) }
									checked={ showCategoryFilter }
									onChange={ ( value ) => setAttributes( { showCategoryFilter: value } ) }
								/>

								<HorizontalRule />

								<ToggleControl
									label={ __( 'Show View All Button', 'wpzoom-portfolio' ) }
									checked={ showViewAll }
									onChange={ ( value ) => setAttributes( { showViewAll: value } ) }
								/>

								{ showViewAll &&
									<TextControl
										label={ __( 'View All Button Label', 'wpzoom-portfolio' ) }
										value={ viewAllLabel }
										onChange={ ( value ) => setAttributes( { viewAllLabel: value } ) }
									/>
								}

								{ showViewAll &&
									<TextControl
										type="url"
										label={ __( 'View All Button Link', 'wpzoom-portfolio' ) }
										value={ viewAllLink }
										onChange={ ( value ) => setAttributes( { viewAllLink: value } ) }
									/>
								}
							</PanelBody>

							<PanelBody title={ __( 'Fields', 'wpzoom-portfolio' ) } className="wpzb-sub-panel">
								<ToggleControl
									label={ __( 'Show Thumbnail', 'wpzoom-portfolio' ) }
									checked={ showThumbnail }
									onChange={ ( value ) => setAttributes( { showThumbnail: value } ) }
								/>

								{ showThumbnail &&
									<SelectControl
										label={ __( 'Thumbnail Size', 'wpzoom-portfolio' ) }
										value={ thumbnailSize }
										options={ imageSizes }
										onChange={ ( value ) => setAttributes( { thumbnailSize: value } ) }
									/>
								}

								<HorizontalRule />


								{ fields }
							</PanelBody>

							<PanelBody title={ __( 'Other', 'wpzoom-portfolio' ) } className="wpzb-sub-panel">
								<ToggleControl
									label={ __( 'Open Portfolio Items in a Lightbox', 'wpzoom-portfolio' ) }
									checked={ lightbox }
									onChange={ ( value ) => setAttributes( { lightbox: value } ) }
								/>

								{ lightbox &&
									<ToggleControl
										label={ __( 'Show Lightbox Caption', 'wpzoom-portfolio' ) }
										checked={ lightboxCaption }
										onChange={ ( value ) => setAttributes( { lightboxCaption: value } ) }
									/>
								}
							</PanelBody>
						</PanelBody>
					</InspectorControls>

					<Fragment>
						<ServerSideRender block="wpzoom-blocks/portfolio" attributes={ attributes } />
					</Fragment>
				</>
			);
		}
	} )
} );