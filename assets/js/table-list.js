import list from './list';
import hidden from './serialized-input';
import {
  removeItems,
  dragItems,
  onDragTable,
  onRemoveTable,
} from './utilities';

export default function() {
  const tableLists = document.querySelectorAll('.table-list');

  if (!tableLists) {
    return false;
  }

  [].forEach.call(tableLists, tableList => {
    const addRow = tableList.querySelector('.table-list-add');
    const Hidden = hidden(tableList, '.table-list-hidden');
    const remove = removeItems(Hidden, onRemoveTable);
    const drag = dragItems(Hidden, onDragTable);
    const List = list(tableList, {
      list: '.table-list-list',
      onDrag: drag,
      onRemove: remove,
      listTemplate: tableItem,
    });

    const wrapper = tableList.querySelector('.text-list-wrapper');
    const key = wrapper.querySelector('.table-list-key');
    const value = wrapper.querySelector('.table-list-value');

    addRow.addEventListener('click', event => {
      event.preventDefault();

      const rowData = {
        key: key.value,
        value: value.value,
      };

      List.add(rowData);
      Hidden.add(rowData);

      key.value = '';
      value.value = '';
    });
  });
}

const tableItem = rowData => {
  return `<li class="text-list-item table-list-item">
    <span class="table-list-key">${rowData.key}</span>
    <span class="table-list-value">${rowData.value}</span>
    <svg viewBox="0 0 20 20">
        <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
    </svg>
</li>`;
};
