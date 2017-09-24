import list from './list';
import { onAutoSuggestInput, getOptions, buildEndpoint, updateOptions } from './autosuggest';

export default function( args ) {

    const fields = document.querySelectorAll(args.parent);
    const endpoint = buildEndpoint();

    if ( ! fields ) {
        return false;
    }

    [].forEach.call( fields, ( autoList ) => {
        const input = autoList.querySelector( 'input[type=text]' );
        const List = list( autoList, args );
        const spinner = input.nextElementSibling;

        let xhr = false;

        input.addEventListener( 'keyup', (e) => {
            if ( 3 > e.target.value.length ) {
                return false;
            }

            spinner.classList.add('show');
            xhr = getOptions( xhr, updateOptions, input, endpoint );

        } );
        input.addEventListener( 'input', (e) => {
            const value = onAutoSuggestInput(e);

            if ( value ) {
                List.add( value );
                input.value = '';
            }

        } );

    } );
}
