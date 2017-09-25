export const removeItems = ( Hidden, onRemove ) => {
    return (value) => {
        Hidden.remove(value, onRemove);
    }
}

export const dragItems = ( Hidden, onDrag ) => {
    return ( list, listItems ) => {
        const values = onDrag(list, listItems);
        Hidden.update(values);
    }
}

export const onDragObject = (list, listItems) => {
    return [].reduce.call( listItems, (acc, listItem) => {
        const value = {
            id: listItem.dataset.id,
            title: listItem.querySelector('span').innerHTML
        }
        return acc.concat([value]);
    }, [] );
}

export const onDragText = (list, listItems) => {
    return [].reduce.call( listItems, (acc, listItem) => {
        const value = listItem.querySelector('span').innerHTML;
        return acc.concat([value]);
    }, [] );
}

export const onRemoveObject = (currentValue, newValue) => {
    return currentValue.filter( (current) => current.title !== newValue );
}

export const onRemoveText = (currentValue, newValue) => {
    return currentValue.filter( (current) => current !== newValue );
}
