import autoSuggest from './autosuggest';

export default function( args ) {
    const fields = document.querySelectorAll(args.parent);

    if ( ! fields ) {
        return false;
    }

    [].forEach.call( fields, ( autoItem ) => {
        const hidden = autoItem.querySelector(args.hidden);

        autoSuggest(
            args.input,
            args.endpoint,
            (value, input) => {
                hidden.value = JSON.stringify( value );
            },
            () => {
                hidden.value = '';
            }
        );
    } );
}
