import baseCss from '../css/index.css';
import textList from './text-list';
import autoList from './auto-list';
import imageUploads from './image-uploads';

const createTextItem = (value) => {
	return `<li class="text-list-item">
        <span>${value}</span>
        <svg viewBox="0 0 20 20">
            <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
        </svg>
    </li>`;
}

const createAutoSuggestItem = (value) => {
	return `<li class="text-list-item" data-id="${value.id}">
        <span>${value.title}</span>
        <svg viewBox="0 0 20 20">
            <path d="M10 2c4.42 0 8 3.58 8 8s-3.58 8-8 8-8-3.58-8-8 3.58-8 8-8zM15 13l-3-3 3-3-2-2-3 3-3-3-2 2 3 3-3 3 2 2 3-3 3 3z"></path>
        </svg>
    </li>`;
}

document.addEventListener( 'DOMContentLoaded', function() {
  imageUploads();
  textList({
	  parent: '.text-list',
	  button: '.text-list-add',
	  list: '.text-list-list',
	  hidden: '.text-list-hidden',
	  listTemplate: createTextItem,
	  onDrag: (list, listItems) => {
		  return [].reduce.call( listItems, (acc, listItem) => {
              const value = listItem.querySelector('span').innerHTML;
              return acc.concat([value]);
          }, [] );
	  },
	  onRemove: (currentValue, newValue) => {
		  return currentValue.filter( (current) => current !== newValue );
	  }
  });

  autoList({
	  parent: '.autosuggest-list',
	  list: '.autosuggest-list-list',
	  hidden: '.autosuggest-list-hidden',
	  listTemplate: createAutoSuggestItem,
	  resource: 'posts',
	  onDrag: (list, listItems) => {
		  return [].reduce.call( listItems, (acc, listItem) => {
              const value = {
				  id: listItem.dataset.id,
				  title: listItem.querySelector('span').innerHTML
			  }

              return acc.concat([value]);
          }, [] );
	  },
	  onRemove: (currentValue, newValue) => {
		  return currentValue.filter( (current) => current.title !== newValue );
	  }
  });
} );
