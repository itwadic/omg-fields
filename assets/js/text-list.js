import list from './list';
import hidden from './serialized-input';
import { removeItems, dragItems, onDragText, onRemoveText } from './utilities';

export default function( args ) {
    const listFields = document.querySelectorAll(args.parent);

    if ( ! listFields ) {
        return false;
    }

    [].forEach.call( listFields, ( listField ) => {
        const textInput = listField.querySelector( 'input[type=text]' );
        const addButton = listField.querySelector( args.button );
        const Hidden = hidden( listField, args.hidden );
        const remove = removeItems( Hidden, onRemoveText );
        const drag = dragItems( Hidden, onDragText );
        const List = list( listField, Object.assign( args, { onDrag: drag, onRemove: remove} ) );

        listField.addEventListener( 'keypress', (e) => {
            if ( 13 === e.keyCode ) {
                e.preventDefault();
                List.add( textInput.value );
                Hidden.add( textInput.value );
                textInput.value = '';
            }
        } );

        addButton.addEventListener( 'click', (e) => {
            e.preventDefault();
            List.add( textInput.value);
            Hidden.add( textInput.value );
            textInput.value = '';
        } );

    } );
}
