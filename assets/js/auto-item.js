import { onAutoSuggestInput, getOptions, buildEndpoint, updateOptions } from './autosuggest';

export default function( args ) {
    const fields = document.querySelectorAll(args.parent);
    const endpoint = buildEndpoint();

    if ( ! fields ) {
        return false;
    }

    [].forEach.call( fields, ( field ) => {
        const input = field.querySelector( 'input[type=text]' );
        const hidden = field.querySelector(args.hidden);
        const spinner = input.nextElementSibling;

        let xhr = false;

        input.addEventListener( 'keyup', (e) => {
            if ( 0 === e.target.value.length ) {
                hidden.value = JSON.stringify( '' );
            }

            if ( 3 > e.target.value.length ) {
                return false;
            }

            spinner.classList.add('show');
            xhr = getOptions( xhr, updateOptions, input, endpoint );

        } );
        input.addEventListener( 'input', (e) => {
            const value = onAutoSuggestInput(e);

            if ( value ) {
                hidden.value = JSON.stringify( value );
            }

        } );

    } );
}
