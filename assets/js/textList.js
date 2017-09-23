import list from './list';

export default function( args ) {
    const listFields = document.querySelectorAll(args.parent);

    if ( ! listFields ) {
        return false;
    }

    [].forEach.call( listFields, ( listField ) => {
        const textInput = listField.querySelector( 'input[type=text]' );
        const addButton = listField.querySelector( args.button );
        const List = list( listField, args );

        listField.addEventListener( 'keypress', (e) => {
            if ( 13 === e.keyCode ) {
                e.preventDefault();
                List.add( textInput.value );
                textInput.value = '';
            }
        } );

        addButton.addEventListener( 'click', (e) => {
            e.preventDefault();
            List.add( textInput.value);
            textInput.value = '';
        } );

    } );
}
