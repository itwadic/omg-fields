import autoSuggest from './autosuggest';

export default function( args ) {
    const fields = document.querySelectorAll(args.parent);

    if ( ! fields ) {
        return false;
    }

    [].forEach.call( fields, ( autoItem ) => {
        const hidden = autoItem.querySelector(args.hidden);
        const input = autoItem.querySelector( '.autosuggest-input' );
        const elName = `autoList_${input.getAttribute( 'list' )}`;
        const endpoint = `${OMGFields.baseURL}/wp-json/wp/v2/${window[elName].resource}?search=`;

        autoSuggest(
            input,
            endpoint,
            (value, input) => {
                hidden.value = JSON.stringify( value );
            },
            () => {
                hidden.value = '';
            }
        );
    } );
}
