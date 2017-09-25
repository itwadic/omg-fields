import dragula from 'dragula';

export default function( parent, args ) {
    const list = parent.querySelector(args.list);

    registerDragEvents(list, args.onDrag);
    registerRemoveEvents(list, args.onRemove);

    return {
        add: function(value) {
            const html = args.listTemplate( value );
            const listItem = document.createRange().createContextualFragment(html);

            list.appendChild( listItem );
        }
    }
}

const registerRemoveEvents = (list, onRemove) => {
    const listItems = list.querySelectorAll('li');

    list.addEventListener('click', (e) => {
        const target = ('svg' === e.target.tagName) ? e.target : e.target.closest('svg');

        if ( 'svg' === target.tagName ) {
            const listItem = e.target.closest('li');
            const value = listItem.querySelector('span').innerHTML;
            list.removeChild( listItem );
            onRemove( value );
        }
    });

    return listItems;
}

const registerDragEvents = (list, callback) => {
    const drake = dragula([list]);

    drake.on('dragend', (el) => {
        const listItems = list.querySelectorAll('li');
        callback(list, listItems);
    });
}
