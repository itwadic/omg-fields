import list from './list';
import autoSuggest from './autosuggest';
import hidden from './serialized-input';
import { removeItems, dragItems, onDragObject, onRemoveObject } from './utilities';

export default function( args ) {

    const fields = document.querySelectorAll(args.parent);

    if ( ! fields ) {
        return false;
    }

    [].forEach.call( fields, ( autoList ) => {
        const Hidden = hidden( autoList, args.hidden );
        const remove = removeItems( Hidden, onRemoveObject );
        const drag = dragItems( Hidden, onDragObject );
        const List = list( autoList, Object.assign( args, { onDrag: drag, onRemove: remove} ) );

        autoSuggest('.autosuggest-list-input', args.endpoint, (value, input) => {
            List.add(value);
            input.value = '';
            Hidden.add( value );
        });
    } );
}
