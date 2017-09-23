import serialInput from './serializeInput';
import dragula from 'dragula';

export default function( parent, args ) {
    const list = parent.querySelector(args.list);
    const Hidden = serialInput( parent, args.hidden )

    registerDragEvents(list, Hidden);
    registerRemoveEvents(list, Hidden);

    return {
        add: function(value) {
            const html = args.listTemplate( value );
            const listItem = document.createRange().createContextualFragment(html);

            list.appendChild( listItem );
            Hidden.add(value);
        }
    }
}

const registerRemoveEvents = (list, Hidden) => {
    const listItems = list.querySelectorAll('li');

    list.addEventListener('click', (e) => {
        const target = ('svg' === e.target.tagName) ? e.target : e.target.closest('svg');

        if ( 'svg' === target.tagName ) {
            const listItem = e.target.closest('li');
            const value = listItem.querySelector('span').innerHTML;
            list.removeChild( listItem );
            Hidden.remove(value);
        }
    });

    return listItems;
}

const registerDragEvents = (list, Hidden) => {
    const drake = dragula([list]);

    drake.on('dragend', (el) => {
        const listItems = list.querySelectorAll('li');

        const values = [].reduce.call( listItems, (acc, listItem) => {
            const value = listItem.querySelector('span').innerHTML;
            return acc.concat([value]);
        }, [] );

        Hidden.update(values);
    });
}
