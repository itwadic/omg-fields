export const removeItems = (Hidden, onRemove) => {
  return value => {
    Hidden.remove(value, onRemove);
  };
};

export const dragItems = (Hidden, onDrag) => {
  return (list, listItems) => {
    const values = onDrag(list, listItems);
    Hidden.update(values);
  };
};

export const onDragObject = (list, listItems) => {
  return [].reduce.call(
    listItems,
    (acc, listItem) => {
      const value = {
        id: listItem.dataset.id,
        title: listItem.querySelector('span').innerHTML,
      };
      return acc.concat([value]);
    },
    [],
  );
};

export const onDragText = (list, listItems) => {
  return [].reduce.call(
    listItems,
    (acc, listItem) => {
      const value = listItem.querySelector('span').innerHTML;
      return acc.concat([value]);
    },
    [],
  );
};

export const onDragImage = (list, listItems) => {
  return [].reduce.call(
    listItems,
    (acc, listItem) => {
      const value = parseInt(listItem.querySelector('span').innerHTML);
      return acc.concat([value]);
    },
    [],
  );
};

export const onRemoveObject = (currentValue, newValue) => {
  return currentValue.filter(current => current.title !== newValue);
};

export const onRemoveText = (currentValue, newValue) => {
  return currentValue.filter(current => current !== newValue);
};

export const onRemoveImage = (currentValue, newValue) => {
  return currentValue.filter(current => current !== parseInt(newValue));
};

export const onDragTable = (list, listItems) => {
  return [].reduce.call(
    listItems,
    (acc, listItem) => {
      const key = listItem.querySelector('.table-list-key').innerHTML;
      const value = listItem.querySelector('.table-list-value').innerHTML;
      return acc.concat([{ key: key, value: value }]);
    },
    [],
  );
};

export const onRemoveTable = (currentValue, newValue) => {
  return currentValue.filter(current => current.key !== newValue);
};
